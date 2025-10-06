import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-[#0a0e1a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Animated quote icon */}
          <motion.div 
            className="absolute -top-6 -left-4 opacity-20"
            animate={{ 
              rotate: [0, -5, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Quote className="w-20 h-20 text-orange-500" />
          </motion.div>

          {/* Testimonial card */}
          <motion.div 
            className="relative bg-gradient-to-br from-[#151922] to-[#0f1218] p-12 rounded-3xl border border-[#f9f4e1]/10 overflow-hidden group"
            whileHover={{ 
              borderColor: 'rgba(249, 115, 22, 0.3)',
              boxShadow: '0 20px 60px rgba(249, 115, 22, 0.2)'
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Star rating */}
            <motion.div 
              className="flex gap-1 mb-6"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ 
                    scale: 1.3,
                    rotate: 360 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Star className="w-5 h-5 fill-orange-500 text-orange-500" />
                </motion.div>
              ))}
            </motion.div>

            <blockquote className="font-lora text-[#f9f4e1] mb-8 leading-relaxed relative z-10" style={{ fontSize: '24px', fontWeight: 400 }}>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                "InOrbyt let me launch my token in under 10 minutes. My community can now invest in my growth, and I can reward my biggest fans with real perks. 
                <motion.span
                  className="inline-block bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% auto'
                  }}
                >
                  {' '}Game changer.
                </motion.span>
                "
              </motion.span>
            </blockquote>

            <motion.div 
              className="flex items-center gap-4 relative z-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center relative overflow-hidden"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 10px 30px rgba(249, 115, 22, 0.5)'
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="text-white relative z-10" style={{ fontSize: '24px', fontWeight: 700 }}>
                  S
                </span>
              </motion.div>
              <div>
                <motion.div 
                  className="text-[#f9f4e1]" 
                  style={{ fontSize: '18px', fontWeight: 600 }}
                  whileHover={{ x: 4 }}
                >
                  Sarah Chen
                </motion.div>
                <div className="text-[#f9f4e1]/60" style={{ fontSize: '15px' }}>
                  @sarahcreates · Digital Artist
                </div>
              </div>
            </motion.div>

            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
