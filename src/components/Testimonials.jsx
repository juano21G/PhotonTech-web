import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Carlos Valderrama",
    location: "Antioquia, Colombia",
    text: "Con PhotonTech, mi finca cafetera ahora es más rentable y sostenible. La independencia de la red eléctrica en una zona rural es un cambio de vida.",
    image: "https://randomuser.me/api/portraits/men/32.jpg" 
  },
  {
    id: 2,
    name: "Maria González",
    location: "Cundinamarca, Colombia",
    text: "Instalamos paneles para el sistema de riego y el ahorro ha sido impresionante. Recomiendo totalmente el servicio y el soporte técnico.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Jorge Rodriguez",
    location: "Meta, Colombia",
    text: "La transición fue muy sencilla. Nos explicaron todo el proceso y ahora producimos nuestra propia energía limpia.",
    image: "https://randomuser.me/api/portraits/men/85.jpg"
  }
];

// Configuración de la animación
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    scale: 0.95,
    position: "absolute"
  })
};

export default function Testimonials() {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = Math.abs(page % testimonials.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="px-4 py-16 overflow-hidden">
      <h2 className="text-3xl font-bold leading-tight tracking-tighter text-center mb-10 text-primary dark:text-bg-light">
        Historias de Nuestra Gente
      </h2>
      
      <div className="relative max-w-3xl mx-auto h-[400px] flex items-center justify-center">
        
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            // --- AQUÍ ESTÁ EL CAMBIO DE COLOR ---
            className="absolute w-full flex flex-col gap-6 rounded-2xl 
            bg-gradient-to-br from-primary/20 via-[#FFD166]/5 to-secondary/20 
            dark:bg-none dark:bg-bg-dark/50 dark:border-primary/20
            p-8 text-center shadow-lg border border-secondary/10 dark:border-primary/20"
          >
            <img 
              className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-secondary shadow-md" 
              src={testimonials[imageIndex].image} 
              alt={testimonials[imageIndex].name} 
            />
            <Quote className="mx-auto text-secondary/50 dark:text-bg-light/20 w-10 h-10" />
            <blockquote className="text-lg font-normal leading-relaxed text-primary/80 dark:text-text-dark italic">
              "{testimonials[imageIndex].text}"
            </blockquote>
            <div className="font-bold text-primary dark:text-bg-light">
              <p className="text-xl">{testimonials[imageIndex].name}</p>
              <p className="text-sm font-normal text-text-light dark:text-text-dark/80 font-sans">{testimonials[imageIndex].location}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Botones de control flotantes */}
        <button 
          onClick={() => paginate(-1)} 
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-16 p-3 bg-primary text-bg-light rounded-full hover:bg-secondary hover:text-primary transition-all shadow-lg z-10"
          aria-label="Anterior"
        >
          <ChevronLeft />
        </button>
        <button 
          onClick={() => paginate(1)} 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-16 p-3 bg-primary text-bg-light rounded-full hover:bg-secondary hover:text-primary transition-all shadow-lg z-10"
          aria-label="Siguiente"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}