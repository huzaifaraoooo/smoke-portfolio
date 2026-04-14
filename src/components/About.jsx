import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 0.5], [24, -24]);

  return (
    <motion.section ref={ref} id="about" style={{ y }} className="relative py-24 px-6 z-10">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          About <span className="text-primary">Me</span>
        </motion.h2>
        <motion.div
          className="glass-card p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img
            src="/profile.png"
            alt="Huzaifa Akbar"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover object-top ring-2 ring-white/10 flex-shrink-0"
          />  
          <div>
            <p className="text-white/80 leading-relaxed mb-6">
              I am a passionate Web Developer who enjoys building modern, responsive, and user-friendly
              web applications. I specialize in creating clean and efficient websites using technologies
                like React, JavaScript, and backend tools.

              I love turning ideas into real digital products that not only look good but also perform smoothly
              and deliver great user experience.

              I am continuously learning new technologies and improving my skills to stay updated with modern
              web development trends. My goal is to build impactful projects that solve real-world problems and provide value to users.

            Let’s build something amazing together
            </p>
            <div className="space-y-2 text-white/70">
              <p><span className="text-primary font-medium">Education:</span> BS Computer Science (2021–2025)</p>
              <p><span className="text-primary font-medium">Location:</span> Lahore</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
