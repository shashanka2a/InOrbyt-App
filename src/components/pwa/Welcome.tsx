import { motion } from 'motion/react';
import { Sparkles, Users, Zap } from 'lucide-react';

interface WelcomeProps {
  onNext: () => void;
  onLearnMore: () => void;
}

export function Welcome({ onNext, onLearnMore }: WelcomeProps) {
  const cards = [
    {
      icon: Sparkles,
      title: 'For Creators',
      description: 'Launch your token and monetize your community'
    },
    {
      icon: Users,
      title: 'For Fans',
      description: 'Invest early in creators you love and unlock exclusive perks'
    },
    {
      icon: Zap,
      title: 'For Freelancers',
      description: 'Get paid upfront and build a sustainable creator economy'
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf7ec] flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-lora text-[#0a0e1a] mb-4"
            style={{ fontSize: '56px', fontWeight: 700, lineHeight: '1.1' }}
          >
            Welcome to InOrbyt
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#0a0e1a]/70 max-w-2xl mx-auto"
            style={{ fontSize: '20px', lineHeight: '1.6' }}
          >
            Fund your work. Grow your community. Own your future.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(234, 83, 42, 0.25)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#ea532a] to-orange-600 text-white relative overflow-hidden group"
            style={{ fontSize: '17px', fontWeight: 600 }}
          >
            <span className="relative z-10">Let's Get Started</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <motion.button
            onClick={onLearnMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full border-2 border-[#0a0e1a]/20 text-[#0a0e1a] hover:border-[#ea532a] hover:text-[#ea532a] transition-colors"
            style={{ fontSize: '17px', fontWeight: 600 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 82, 87, 0.15)' }}
                className="bg-[#005257] rounded-3xl p-8 text-center cursor-pointer group transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                >
                  <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </motion.div>
                <h3
                  className="text-white mb-2"
                  style={{ fontSize: '20px', fontWeight: 600 }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-white/80"
                  style={{ fontSize: '14px', lineHeight: '1.5' }}
                >
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center mt-12 text-[#0a0e1a]/50"
          style={{ fontSize: '14px' }}
        >
          Join thousands of creators building their independent economy
        </motion.p>
      </motion.div>
    </div>
  );
}
