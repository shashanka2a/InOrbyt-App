import { motion } from 'motion/react';
import { Rocket, Gift, Briefcase } from 'lucide-react';

const steps = [
  {
    icon: Rocket,
    title: 'Launch Token',
    description: 'Create your creator token in minutes. Set initial price and supply.',
  },
  {
    icon: Gift,
    title: 'Add Perks',
    description: 'Offer exclusive content, access, or experiences to token holders.',
  },
  {
    icon: Briefcase,
    title: 'Hire Freelancers',
    description: 'Pay collaborators with your token. Build your creative team.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-lora text-[#f9f4e1] mb-4" style={{ fontSize: '48px', fontWeight: 700 }}>
            How It Works
          </h2>
          <p className="text-[#f9f4e1]/70 max-w-2xl mx-auto" style={{ fontSize: '20px' }}>
            Three simple steps to launch your creator economy
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  boxShadow: '0 20px 60px rgba(249, 115, 22, 0.2)'
                }}
                className="relative bg-gradient-to-br from-[#151922] to-[#0f1218] p-8 rounded-2xl border border-[#f9f4e1]/10 group overflow-hidden cursor-pointer"
              >
                {/* Glow effect on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-orange-500/10 rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Step number with parallax */}
                <motion.div 
                  className="absolute top-6 right-6 text-[#f9f4e1]/10 group-hover:text-[#f9f4e1]/20 transition-colors duration-300" 
                  style={{ fontSize: '72px', fontWeight: 700, lineHeight: 1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {index + 1}
                </motion.div>

                {/* Animated connection line */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
                  />
                )}

                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      boxShadow: '0 20px 40px rgba(249, 115, 22, 0.5)'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="w-8 h-8 text-white relative z-10" />
                    </motion.div>
                  </motion.div>

                  <h3 className="text-[#f9f4e1] mb-3 group-hover:text-orange-200 transition-colors duration-300" style={{ fontSize: '24px', fontWeight: 700 }}>
                    {step.title}
                  </h3>
                  <p className="text-[#f9f4e1]/70 group-hover:text-[#f9f4e1]/90 transition-colors duration-300" style={{ fontSize: '16px' }}>
                    {step.description}
                  </p>
                </div>

                {/* Hover spotlight */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(600px circle at 50% 50%, rgba(249, 115, 22, 0.1), transparent 40%)'
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
