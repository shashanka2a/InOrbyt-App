import { motion } from 'motion/react';
import { Twitter, Github, MessageCircle, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-16 px-6" style={{ backgroundColor: '#005257' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-lora text-[#f9f4e1] mb-4" style={{ fontSize: '24px', fontWeight: 700 }}>
              InOrbyt.io
            </div>
            <p className="text-[#f9f4e1]/70 mb-6" style={{ fontSize: '14px' }}>
              Creator-owned.<br />Fan-powered.
            </p>
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-10 h-10 bg-[#f9f4e1]/10 hover:bg-[#f9f4e1]/20 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <Twitter className="w-5 h-5 text-[#f9f4e1]" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-10 h-10 bg-[#f9f4e1]/10 hover:bg-[#f9f4e1]/20 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <Github className="w-5 h-5 text-[#f9f4e1]" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-10 h-10 bg-[#f9f4e1]/10 hover:bg-[#f9f4e1]/20 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <MessageCircle className="w-5 h-5 text-[#f9f4e1]" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-10 h-10 bg-[#f9f4e1]/10 hover:bg-[#f9f4e1]/20 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <Mail className="w-5 h-5 text-[#f9f4e1]" />
              </motion.a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-[#f9f4e1] mb-4" style={{ fontSize: '16px', fontWeight: 600 }}>
              Product
            </h3>
            <ul className="space-y-3">
              {['How It Works', 'Features', 'Pricing', 'Demo'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#f9f4e1]/70 hover:text-[#f9f4e1] transition-colors duration-200" style={{ fontSize: '14px' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#f9f4e1] mb-4" style={{ fontSize: '16px', fontWeight: 600 }}>
              Company
            </h3>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Press Kit'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#f9f4e1]/70 hover:text-[#f9f4e1] transition-colors duration-200" style={{ fontSize: '14px' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[#f9f4e1] mb-4" style={{ fontSize: '16px', fontWeight: 600 }}>
              Legal
            </h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#f9f4e1]/70 hover:text-[#f9f4e1] transition-colors duration-200" style={{ fontSize: '14px' }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#f9f4e1]/10 text-center">
          <p className="text-[#f9f4e1]/60" style={{ fontSize: '14px' }}>
            © 2025 InOrbyt.io. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
