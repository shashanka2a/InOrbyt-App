export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#faf7ec] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-lora text-[#0a0e1a] mb-2" style={{ fontSize: '40px', fontWeight: 700 }}>Terms of Service</h1>
        <p className="text-[#0a0e1a]/60 mb-8" style={{ fontSize: '14px' }}>Effective Date: October 2025</p>

        <p className="text-[#0a0e1a]/80 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          Welcome to InOrbyt. These Terms of Service (“Terms”) govern your access to and use of the InOrbyt platform, operated by InOrbyt LLC (“we,” “our,” or “us”). By using InOrbyt, you agree to these Terms.
        </p>

        <h2 className="font-lora text-[#0a0e1a] mb-3" style={{ fontSize: '28px', fontWeight: 700 }}>1. Eligibility</h2>
        <p className="text-[#0a0e1a]/80 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          You must be at least 18 years old and legally able to form a binding contract. You are responsible for complying with all laws that apply to your use of InOrbyt, including those governing digital assets.
        </p>

        <h2 className="font-lora text-[#0a0e1a] mb-3" style={{ fontSize: '28px', fontWeight: 700 }}>2. Accounts</h2>
        <p className="text-[#0a0e1a]/80 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          You are responsible for safeguarding your login credentials and wallet information. You agree to notify us immediately if you suspect unauthorized access.
        </p>

        <h2 className="font-lora text-[#0a0e1a] mb-3" style={{ fontSize: '28px', fontWeight: 700 }}>3. Payments and Tokens</h2>
        <p className="text-[#0a0e1a]/80 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          All payments are processed securely by third-party partners such as Stripe or Coinbase Pay. Creator tokens offered on InOrbyt represent access, utility, or engagement — not equity, financial instruments, or investment products. Token pricing and availability may vary. Users are solely responsible for understanding applicable regulations in their jurisdiction.
        </p>

        <h2 className="font-lora text-[#0a0e1a] mb-3" style={{ fontSize: '28px', fontWeight: 700 }}>4. Creator and User Content</h2>
        <p className="text-[#0a0e1a]/80 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          You retain ownership of the content you create and post. By uploading content, you grant InOrbyt a non-exclusive, worldwide, royalty-free license to host, display, and promote that content within the platform and related marketing materials. You may not post or share content that is unlawful, infringing, or violates the rights of others.
        </p>

        <h2 className="font-lora text-[#0a0e1a] mb-3" style={{ fontSize: '28px', fontWeight: 700 }}>5. Platform Use</h2>
        <p className="text-[#0a0e1a]/80 mb-2" style={{ fontSize: '16px', lineHeight: '1.8' }}>You agree not to use InOrbyt to:</p>
        <ul className="list-disc pl-6 space-y-2 text-[#0a0e1a]/80 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          <li>Engage in fraudulent or misleading activity.</li>
          <li>Upload malicious code or disrupt services.</li>
          <li>Violate intellectual property or privacy rights.</li>
          <li>Use the platform for illegal financial or speculative purposes.</li>
        </ul>

        <h2 className="font-lora text-[#0a0e1a] mb-3" style={{ fontSize: '28px', fontWeight: 700 }}>6. Intellectual Property</h2>
        <p className="text-[#0a0e1a]/80 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          All intellectual property related to the InOrbyt platform, including trademarks, code, and design, belongs to InOrbyt LLC.
        </p>

        <h2 className="font-lora text-[#0a0e1a] mb-3" style={{ fontSize: '28px', fontWeight: 700 }}>7. Termination</h2>
        <p className="text-[#0a0e1a]/80 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          We may suspend or terminate your account if you violate these Terms or engage in harmful activity. You may stop using the platform at any time.
        </p>

        <h2 className="font-lora text-[#0a0e1a] mb-3" style={{ fontSize: '28px', fontWeight: 700 }}>8. Limitation of Liability</h2>
        <p className="text-[#0a0e1a]/80 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          To the maximum extent permitted by law, InOrbyt LLC and its affiliates shall not be liable for any indirect, incidental, or consequential damages, including lost profits, arising from your use of the platform.
        </p>

        <h2 className="font-lora text-[#0a0e1a] mb-3" style={{ fontSize: '28px', fontWeight: 700 }}>9. Governing Law</h2>
        <p className="text-[#0a0e1a]/80 mb-6" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          These Terms are governed by the laws of the State of Florida, USA, without regard to conflict-of-law principles. Users outside the United States consent to the transfer and processing of their data in the United States.
        </p>

        <h2 className="font-lora text-[#0a0e1a] mb-3" style={{ fontSize: '28px', fontWeight: 700 }}>10. Contact</h2>
        <p className="text-[#0a0e1a]/80" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          Questions about these Terms may be sent to <a href="mailto:legal@inorbyt.io" className="underline">legal@inorbyt.io</a>.
        </p>
      </div>
    </main>
  );
}


