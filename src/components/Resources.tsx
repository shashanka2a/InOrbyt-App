import { motion } from 'motion/react';
import { BookOpen, FileText, ArrowRight } from 'lucide-react';

export function Resources() {
  return (
    <section id="resources" className="py-24 px-6 bg-[#0d1520]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-lora text-[#f9f4e1] mb-4" style={{ fontSize: '48px', fontWeight: 700 }}>
            Resources
          </h2>
          <p className="text-[#f9f4e1]/70 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
            Learn more about creator tokens and the InOrbyt platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              y: -8,
              boxShadow: '0 20px 60px rgba(249, 115, 22, 0.2)'
            }}
            className="bg-gradient-to-br from-[#151922] to-[#0f1218] p-8 rounded-2xl border border-[#f9f4e1]/10 hover:border-orange-500/40 transition-all duration-500 cursor-pointer group relative overflow-hidden"
          >
            {/* Gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <motion.div 
              className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center mb-6 relative z-10"
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)'
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <BookOpen className="w-7 h-7 text-orange-500" />
            </motion.div>

            <h3 className="text-[#f9f4e1] mb-3 group-hover:text-orange-100 transition-colors duration-300 relative z-10" style={{ fontSize: '24px', fontWeight: 700 }}>
              Creator Guides
            </h3>
            <p className="text-[#f9f4e1]/70 mb-6 group-hover:text-[#f9f4e1]/90 transition-colors duration-300 relative z-10" style={{ fontSize: '16px' }}>
              Step-by-step tutorials on launching tokens, setting perks, and growing your community.
            </p>

            <motion.div 
              className="flex items-center gap-2 text-orange-500 group-hover:gap-3 transition-all duration-300 relative z-10" 
              style={{ fontSize: '15px', fontWeight: 600 }}
              whileHover={{ x: 4 }}
            >
              Read Guides 
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>

            {/* Hover spotlight */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(600px circle at 50% 50%, rgba(249, 115, 22, 0.1), transparent 40%)'
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              y: -8,
              boxShadow: '0 20px 60px rgba(249, 115, 22, 0.2)'
            }}
            className="bg-gradient-to-br from-[#151922] to-[#0f1218] p-8 rounded-2xl border border-[#f9f4e1]/10 hover:border-orange-500/40 transition-all duration-500 cursor-pointer group relative overflow-hidden"
          >
            {/* Gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <motion.div 
              className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center mb-6 relative z-10"
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)'
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FileText className="w-7 h-7 text-orange-500" />
            </motion.div>

            <h3 className="text-[#f9f4e1] mb-3 group-hover:text-orange-100 transition-colors duration-300 relative z-10" style={{ fontSize: '24px', fontWeight: 700 }}>
              Whitepaper
            </h3>
            <p className="text-[#f9f4e1]/70 mb-6 group-hover:text-[#f9f4e1]/90 transition-colors duration-300 relative z-10" style={{ fontSize: '16px' }}>
              Deep dive into the InOrbyt protocol, tokenomics, and vision for creator economies.
            </p>

            <motion.div 
              className="flex items-center gap-2 text-orange-500 group-hover:gap-3 transition-all duration-300 relative z-10" 
              style={{ fontSize: '15px', fontWeight: 600 }}
              whileHover={{ x: 4 }}
            >
              Download PDF 
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>

            {/* Hover spotlight */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(600px circle at 50% 50%, rgba(249, 115, 22, 0.1), transparent 40%)'
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
