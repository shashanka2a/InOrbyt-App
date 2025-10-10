import { motion } from 'motion/react';
import { Twitter, Github, MessageCircle, Mail } from 'lucide-react';
import { Logo } from './ui/Logo';

export function Footer() {
  return (
    <footer className="py-16 px-6" style={{ backgroundColor: '#005257' }}>
      <div className="max-w-7xl mx-auto">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[#f9f4e1] mb-4" style={{ fontSize: '32px', fontWeight: 700 }}>
            Ready to get started?
          </h2>
          <p className="text-[#f9f4e1]/70 mb-8 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Join our early waitlist and be the first to experience the future of creator-fan engagement.
          </p>
          <motion.a
            href="https://forms.inorbyt.io/hello"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(249, 115, 22, 0.4), 0 0 60px rgba(249, 115, 22, 0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/30"
            style={{ fontSize: '18px', fontWeight: 600 }}
          >
            Join InOrbyt Launchpad
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo variant="white" size="lg" showText={false} />
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
              <li>
                <a href="/#how-it-works" className="text-[#f9f4e1]/70 hover:text-[#f9f4e1] transition-colors duration-200" style={{ fontSize: '14px' }}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#features" className="text-[#f9f4e1]/70 hover:text-[#f9f4e1] transition-colors duration-200" style={{ fontSize: '14px' }}>
                  Features
                </a>
              </li>
              <li>
                <a href="/#pwa" className="text-[#f9f4e1]/70 hover:text-[#f9f4e1] transition-colors duration-200" style={{ fontSize: '14px' }}>
                  Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#f9f4e1] mb-4" style={{ fontSize: '16px', fontWeight: 600 }}>
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-[#f9f4e1]/70 hover:text-[#f9f4e1] transition-colors duration-200" style={{ fontSize: '14px' }}>
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-[#f9f4e1]/70 hover:text-[#f9f4e1] transition-colors duration-200" style={{ fontSize: '14px' }}>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[#f9f4e1] mb-4" style={{ fontSize: '16px', fontWeight: 600 }}>
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="text-[#f9f4e1]/70 hover:text-[#f9f4e1] transition-colors duration-200" style={{ fontSize: '14px' }}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-[#f9f4e1]/70 hover:text-[#f9f4e1] transition-colors duration-200" style={{ fontSize: '14px' }}>
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/disclaimer" className="text-[#f9f4e1]/70 hover:text-[#f9f4e1] transition-colors duration-200" style={{ fontSize: '14px' }}>
                  Disclaimer
                </a>
              </li>
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
