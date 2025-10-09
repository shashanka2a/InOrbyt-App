export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#faf7ec] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-lora text-[#0a0e1a] mb-4" style={{ fontSize: '40px', fontWeight: 700 }}>Disclaimer</h1>
        <h2 className="font-lora text-[#0a0e1a] mb-3" style={{ fontSize: '22px', fontWeight: 700 }}>No Financial, Investment, or Legal Advice</h2>
        <p className="text-[#0a0e1a]/80 mb-4" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          The information and services provided by InOrbyt are for general informational and creative engagement purposes only. Nothing on this platform constitutes financial, investment, or legal advice.
        </p>
        <p className="text-[#0a0e1a]/80 mb-4" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          Creator tokens offered through InOrbyt are designed for community access and participation, not for speculation or investment. You should not expect profit or resale value from owning or collecting tokens.
        </p>
        <p className="text-[#0a0e1a]/80 mb-4" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          InOrbyt LLC does not warrant that the platform will be uninterrupted or error-free, nor do we guarantee the accuracy of user-generated content.
        </p>
        <p className="text-[#0a0e1a]/80 mb-8" style={{ fontSize: '16px', lineHeight: '1.8' }}>
          Use of digital assets involves risk, including potential loss of value. By using InOrbyt, you acknowledge these risks. If you have questions or concerns, please contact <a href="mailto:support@inorbyt.io" className="underline">support@inorbyt.io</a>.
        </p>
      </div>
    </main>
  );
}


