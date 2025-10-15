// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title LiquidityPool
 * @notice Minimal constant product AMM for CreatorToken <-> ETH swaps for MVP.
 *         NOT production-ready; no fees, no flash-loan resistance, simplified logic.
 */
contract LiquidityPool is Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;

    uint112 public reserveToken; // CreatorToken reserve
    uint112 public reserveETH;   // ETH reserve
    uint32  public lastUpdate;   // timestamp of last reserve update

    event LiquidityAdded(address indexed provider, uint256 tokenAmount, uint256 ethAmount);
    event LiquidityRemoved(address indexed provider, uint256 tokenAmount, uint256 ethAmount);
    event Swapped(address indexed trader, bool tokenToEth, uint256 amountIn, uint256 amountOut);

    constructor(address token_, address owner_) Ownable(owner_) {
        require(token_ != address(0), "TOKEN_REQUIRED");
        token = IERC20(token_);
    }

    // x * y = k invariant; 0.3% fee can be added later if needed
    function _updateReserves(uint256 tokenBal, uint256 ethBal) private {
        reserveToken = uint112(tokenBal);
        reserveETH = uint112(ethBal);
        lastUpdate = uint32(block.timestamp);
    }

    function getReserves() public view returns (uint112, uint112) {
        return (reserveToken, reserveETH);
    }

    // Add liquidity by providing both assets in proportion to current reserves
    function addLiquidity(uint256 tokenAmount) external payable {
        require(tokenAmount > 0 && msg.value > 0, "INVALID_AMOUNTS");
        (uint112 rT, uint112 rE) = (reserveToken, reserveETH);
        if (rT == 0 && rE == 0) {
            // first liquidity sets the initial price
            token.safeTransferFrom(msg.sender, address(this), tokenAmount);
            _updateReserves(token.balanceOf(address(this)), address(this).balance);
        } else {
            // enforce ratio
            require(uint256(rT) * msg.value == uint256(rE) * tokenAmount, "BAD_RATIO");
            token.safeTransferFrom(msg.sender, address(this), tokenAmount);
            _updateReserves(token.balanceOf(address(this)), address(this).balance);
        }
        emit LiquidityAdded(msg.sender, tokenAmount, msg.value);
    }

    // Remove liquidity proportionally (simple MVP: owner only to reduce complexity)
    function removeLiquidity(uint256 tokenAmount, uint256 ethAmount) external onlyOwner {
        require(tokenAmount <= reserveToken && ethAmount <= reserveETH, "EXCEEDS_RESERVES");
        token.safeTransfer(msg.sender, tokenAmount);
        (bool ok, ) = payable(msg.sender).call{value: ethAmount}("");
        require(ok, "ETH_TRANSFER_FAIL");
        _updateReserves(token.balanceOf(address(this)), address(this).balance);
        emit LiquidityRemoved(msg.sender, tokenAmount, ethAmount);
    }

    // Swap token -> ETH
    function swapTokenForETH(uint256 amountIn, uint256 minOut) external {
        require(amountIn > 0, "ZERO_IN");
        (uint112 rT, uint112 rE) = (reserveToken, reserveETH);
        require(rT > 0 && rE > 0, "NO_LIQ");

        // constant product: out = (amountIn * rE) / (rT + amountIn)
        uint256 amountOut = (amountIn * rE) / (rT + amountIn);
        require(amountOut >= minOut && amountOut < rE, "SLIPPAGE_OR_EMPTY");

        token.safeTransferFrom(msg.sender, address(this), amountIn);
        (bool ok, ) = payable(msg.sender).call{value: amountOut}("");
        require(ok, "ETH_TRANSFER_FAIL");

        _updateReserves(token.balanceOf(address(this)), address(this).balance);
        emit Swapped(msg.sender, true, amountIn, amountOut);
    }

    // Swap ETH -> token
    function swapETHForToken(uint256 minOut) external payable {
        require(msg.value > 0, "ZERO_IN");
        (uint112 rT, uint112 rE) = (reserveToken, reserveETH);
        require(rT > 0 && rE > 0, "NO_LIQ");

        uint256 amountOut = (msg.value * rT) / (rE + msg.value);
        require(amountOut >= minOut && amountOut < rT, "SLIPPAGE_OR_EMPTY");

        token.safeTransfer(msg.sender, amountOut);
        _updateReserves(token.balanceOf(address(this)), address(this).balance);
        emit Swapped(msg.sender, false, msg.value, amountOut);
    }

    // Allow owner to rescue tokens or ETH in emergencies
    function rescue(address to, address erc20, uint256 amount) external onlyOwner {
        if (erc20 == address(0)) {
            (bool ok, ) = payable(to).call{value: amount}("");
            require(ok, "ETH_TRANSFER_FAIL");
        } else {
            IERC20(erc20).safeTransfer(to, amount);
        }
        _updateReserves(token.balanceOf(address(this)), address(this).balance);
    }
}


