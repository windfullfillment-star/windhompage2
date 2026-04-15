import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: React.ReactNode;
  dark?: boolean;
}

export function Section({ children, className, id, title, subtitle, dark }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-24 md:py-32 px-6',
        dark ? 'bg-black text-white' : 'bg-white text-black',
        className
      )}
    >
      <div className="container mx-auto">
        {(title || subtitle) && (
          <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl tracking-tighter mb-6 relative inline-block"
              >
                {title}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-blue" />
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={cn(
                  'text-lg md:text-xl max-w-2xl font-light leading-relaxed',
                  dark ? 'text-white/60' : 'text-gray-500'
                )}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
