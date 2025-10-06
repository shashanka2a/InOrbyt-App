import { motion } from 'motion/react';
import { Check, Palette, Heart, Code } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'For Creators',
    benefits: [
      'Launch your token in minutes',
      'Set custom perks and rewards',
      'Built-in payment processing',
      'Track holder analytics',
      'No technical knowledge needed',
    ],
    cta: 'Start Building',
  },
  {
    icon: Heart,
    title: 'For Fans',
    benefits: [
      'Discover emerging creators',
      'Invest in your favorites early',
      'Unlock exclusive content',
      'Trade tokens anytime',
      'Built-in wallet included',
    ],
    cta: 'Explore Tokens',
  },
  {
    icon: Code,
    title: 'For Freelancers',
    benefits: [
      'Get paid in creator tokens',
      'Build diverse portfolio',
      'Collaborate with top creators',
      'Earn token upside',
      'Flexible project terms',
    ],
    cta: 'Find Work',
  },
];

export function FeaturesCards() {
  return (
    <section id="creators" className="py-24 px-6 bg-gradient-to-b from-[#0a0e1a] to-[#0d1520] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className="bg-[#151922] p-8 rounded-2xl border border-[#f9f4e1]/10 hover:border-orange-500/40 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className="relative z-10">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl flex items-center justify-center mb-6 border border-orange-500/10 group-hover:border-orange-500/30"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)'
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <Icon className="w-7 h-7 text-orange-500" />
                    </motion.div>
                  </motion.div>

                  <h3 className="font-lora text-[#f9f4e1] mb-6 group-hover:text-orange-100 transition-colors duration-300" style={{ fontSize: '28px', fontWeight: 700 }}>
                    {feature.title}
                  </h3>

                  <ul className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + idx * 0.05 }}
                      >
                        <motion.div 
                          className="mt-0.5 flex-shrink-0"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="w-5 h-5 text-orange-500" />
                        </motion.div>
                        <span className="text-[#f9f4e1]/80 group-hover:text-[#f9f4e1]/95 transition-colors duration-300" style={{ fontSize: '15px' }}>
                          {benefit}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 text-orange-500 hover:from-orange-500 hover:to-orange-600 hover:text-white hover:border-transparent transition-all duration-300 relative overflow-hidden group/button"
                    style={{ fontSize: '16px', fontWeight: 600 }}
                  >
                    <span className="relative z-10">{feature.cta}</span>
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 -translate-x-full group-hover/button:translate-x-full transition-transform duration-700"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                      }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
