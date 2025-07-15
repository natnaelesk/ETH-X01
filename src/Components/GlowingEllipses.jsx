import { motion } from 'framer-motion';

const ellipses = [
  {
    color: 'from-green-400 via-white to-green-400',
    delay: 0,
    blur: 'blur-3xl',
  },
  {
    color: 'from-purple-500 via-white to-purple-500',
    delay: 2,
    blur: 'blur-2xl',
  },
  {
    color: 'from-orange-500 via-white to-orange-500',
    delay: 4,
    blur: 'blur-xl',
  },
];

export default function GlowingEllipses() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0d0d0d] overflow-hidden">
      {ellipses.map((ellipse, idx) => (
        <motion.div
          key={idx}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[120px] rounded-full bg-gradient-to-r ${ellipse.color} opacity-30 ${ellipse.blur}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.2, 0.9, 1], opacity: [0, 0.4, 0.2, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: ellipse.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
