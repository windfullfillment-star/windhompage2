import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SLIDES = [
  {
    id: '1',
    image: '/windhompage2/main-hero.png',
    title: '소수 고객사 집중 운영',
    subtitle: '우리는 양보다 질을 선택합니다. 당신의 비즈니스에만 집중합니다.',
  },
  {
    id: '2',
    image: '/windhompage2/main-hero2.jpg',
    title: '소통 중심의 물류 서비스',
    subtitle: '실시간 소통과 투명한 정산 시스템으로 신뢰를 쌓아갑니다.',
  },
  {
    id: '3',
    image: '/windhompage2/main-hero3.jpg',
    title: '스마트 물류 IT 시스템',
    subtitle: '스마트 WMS와 웹 정산 시스템으로 효율적인 물류 관리를 실현합니다.',
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={SLIDES[current].image}
            alt={SLIDES[current].title}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl text-white tracking-tighter mb-6"
            >
              {SLIDES[current].title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg md:text-xl text-white/80 max-w-2xl font-light"
            >
              {SLIDES[current].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center space-x-4">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={cn(
              'h-1 transition-all duration-500',
              current === idx ? 'w-16 bg-brand-blue' : 'w-8 bg-white/20 hover:bg-white/40'
            )}
          />
        ))}
      </div>
    </section>
  );
}
