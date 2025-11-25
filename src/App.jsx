import { useState, useEffect } from 'react';
import ModelViewer from './components/ModelViewer';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import { 
  Menu, TrendingUp, Leaf, Zap, Globe, 
  MousePointerClick, Rotate3d, ZoomIn,
  Sun, Moon 
} from 'lucide-react';

const MODEL_URL = "/PhotonTech-web/panel2.glb";

function App() {
  // --- LÓGICA DEL MODO OSCURO ---
  
  // CAMBIO AQUÍ: Arranca siempre en "light" por defecto
  const [theme, setTheme] = useState("light");

  // Efecto para aplicar la clase al HTML cuando cambie el tema
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Función para alternar (Slidebar)
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const scrollToContact = () => {
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 flex items-center bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md p-4 justify-between border-b border-text-light/20 dark:border-text-dark/20 transition-colors duration-300">
        <h2 className="text-xl font-bold tracking-tight text-primary dark:text-bg-light">PhotonTech</h2>
        
        <div className="flex items-center gap-4">
          
          {/* --- SLIDEBAR (TOGGLE) --- */}
          <button 
            onClick={toggleTheme}
            className="relative w-14 h-8 rounded-full bg-primary/20 dark:bg-primary border border-primary/20 dark:border-bg-light/20 shadow-inner transition-colors duration-300 flex items-center px-1"
            aria-label="Cambiar modo oscuro"
          >
            <div 
              className={`absolute w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
              ${theme === 'dark' ? 'translate-x-6 bg-bg-dark' : 'translate-x-0 bg-white'}`}
            >
               {theme === 'dark' ? (
                 <Moon className="w-3.5 h-3.5 text-secondary" />
               ) : (
                 <Sun className="w-3.5 h-3.5 text-secondary" />
               )}
            </div>
          </button>

          <button onClick={scrollToContact} className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 text-sm font-bold bg-primary text-bg-light dark:text-bg-dark hover:bg-primary/90 transition shadow-md">
            <span className="truncate">Cotizar Ahora</span>
          </button>
          
          <button className="flex size-10 shrink-0 items-center justify-center text-primary dark:text-bg-light hover:bg-primary/5 rounded-full transition">
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </header>

      <main className="flex flex-col flex-grow">
        
        {/* --- HERO SECTION --- */}
        <div className="p-4 pt-8">
          <div className="flex min-h-[480px] flex-col gap-8 rounded-2xl items-center justify-center p-8 text-center bg-gradient-to-br from-[#E5E7EB]/65 via-[#FFD166]/5 to-[#F7B538]/15 dark:from-[#1A535C] dark:via-[#1A535C]/80 dark:to-[#F7B538]/20 relative overflow-hidden shadow-sm transition-all duration-500">
            {/* SOLES (Invertidos: Fuerte arriba derecha) */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-secondary/60 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/20 dark:bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative flex flex-col items-center justify-center z-10 max-w-2xl">
              <img 
                className="w-48 h-48 mb-6 rounded-full object-cover border-4 border-bg-light dark:border-bg-dark shadow-xl" 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Campo colombiano" 
              />
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter text-primary dark:text-bg-light drop-shadow-sm">
                  Un Proyecto de Vida Sostenible para el Campo Colombiano
                </h1>
                <p className="text-lg font-normal leading-relaxed text-text-light dark:text-text-dark max-w-lg mx-auto">
                  Descubre cómo la energía solar puede transformar tu hogar o negocio con rentabilidad e independencia energética.
                </p>
              </div>
              <button onClick={scrollToContact} className="mt-8 flex items-center justify-center rounded-full h-14 px-8 bg-primary text-bg-light dark:text-bg-dark text-lg font-bold shadow-lg transition-all duration-300">
                Solicita tu Cotización Gratis
              </button>
            </div>
          </div>
        </div>

        {/* --- SECCIÓN MODELO 3D --- */}
        <section className="px-4 py-16 bg-gradient-to-b from-transparent to-primary/5 dark:to-bg-dark/50 transition-colors duration-300">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 text-center md:text-left space-y-4">
                    <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary-dark dark:text-secondary text-xs font-bold rounded-full uppercase tracking-wider">
                        Tecnología 3D
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-bg-light">
                        Explora tu futuro con un Panel Solar
                    </h2>
                    <p className="text-text-light dark:text-text-dark text-lg">
                        No es solo una imagen ¡Interactúa con el modelo para ver cada detalle de la tecnología que impulsará tu finca, hogar o negocio!
                    </p>
                    
                    <div className="flex justify-center md:justify-start gap-6 mt-6 text-sm font-medium text-primary/70 dark:text-bg-light/70 font-display">
                        <div className="flex items-center gap-2">
                            <Rotate3d className="w-5 h-5 text-secondary" /> Gira
                        </div>
                        <div className="flex items-center gap-2">
                            <ZoomIn className="w-5 h-5 text-secondary" /> Acerca
                        </div>
                        <div className="flex items-center gap-2">
                            <MousePointerClick className="w-5 h-5 text-secondary" /> Clic
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-3/5 h-[500px] bg-white dark:bg-bg-dark/50 rounded-2xl shadow-2xl border border-text-light/10 overflow-hidden relative group">
                    <div className="absolute top-4 right-4 z-10 bg-black/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white pointer-events-none">
                      Vista Interactiva
                    </div>
                    <ModelViewer 
                      url={MODEL_URL} 
                      width="100%" 
                      height="100%" 
                      autoRotate={true}
                      autoRotateSpeed={0.5}
                      environmentPreset="forest"
                      ambientIntensity={0.6}
                      
                      // --- CAMBIOS PARA "IGNORAR" EL CUBO GIGANTE ---

                      // 1. ZOOM INICIAL EXTREMO: 
                      // Un valor pequeño (ej. 0.2 o 0.3) pone la cámara MUY cerca del centro (0,0,0)
                      // Antes estaba en 1.5, por eso se veía lejos.
                      defaultZoom={0.15} 

                      // 2. LÍMITE DE ACERCAMIENTO: 
                      // Permite al usuario hacer zoom hasta casi tocar el panel (0.1)
                      minZoomDistance={0.1}
                      
                      // 3. LÍMITE DE ALEJAMIENTO:
                      // Evita que se alejen tanto que vuelvan a ver el cubo feo de fondo
                      maxZoomDistance={4}

                      // 4. ALTURA DEL MODELO (Ajuste Fino):
                      // Como el cubo puede mover el centro, usa esto para subir/bajar el panel
                      // hasta que quede perfecto en el medio.
                      modelYOffset={0.2} 
                      modelZOffset={0.2} 
                      // 5. ÁNGULO INICIAL:
                      // Míralo casi de frente, no tanto desde arriba
                      defaultRotationX={-5}
                  />
                                  </div>
            </div>
        </section>

        {/* --- ENFOQUE RURAL --- */}
        <section className="flex flex-col px-4 py-16 max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-4 text-center mb-10">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter text-primary dark:text-bg-light">
              Nuestro Enfoque Rural
            </h2>
            <p className="text-base font-normal text-text-light dark:text-text-dark max-w-2xl mx-auto">
              Maximizamos la productividad y sostenibilidad de tu tierra con soluciones de energía solar a tu medida.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div className="flex flex-col items-center p-6 rounded-2xl border border-text-light/20 bg-bg-light dark:bg-bg-dark hover:shadow-lg transition-all text-center gap-3">
               <div className="flex items-center justify-center size-14 rounded-full bg-secondary/20 text-secondary mb-2">
                 <TrendingUp className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-primary dark:text-bg-light">Rentabilidad</h3>
               <p className="text-sm text-text-light dark:text-text-dark">Reduce tus costos de energía y aumenta tus ganancias.</p>
             </div>
             <div className="flex flex-col items-center p-6 rounded-2xl border border-text-light/20 bg-bg-light dark:bg-bg-dark hover:shadow-lg transition-all text-center gap-3">
               <div className="flex items-center justify-center size-14 rounded-full bg-secondary/20 text-secondary mb-2">
                 <Leaf className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-primary dark:text-bg-light">Sostenibilidad</h3>
               <p className="text-sm text-text-light dark:text-text-dark">Opera tu hogar, finca o negocio de manera ecológica.</p>
             </div>
             <div className="flex flex-col items-center p-6 rounded-2xl border border-text-light/20 bg-bg-light dark:bg-bg-dark hover:shadow-lg transition-all text-center gap-3">
               <div className="flex items-center justify-center size-14 rounded-full bg-secondary/20 text-secondary mb-2">
                 <Zap className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-primary dark:text-bg-light">Independencia</h3>
               <p className="text-sm text-text-light dark:text-text-dark">Asegura tu suministro sin depender de la red eléctrica.</p>
             </div>
             <div className="flex flex-col items-center p-6 rounded-2xl border border-text-light/20 bg-bg-light dark:bg-bg-dark hover:shadow-lg transition-all text-center gap-3">
               <div className="flex items-center justify-center size-14 rounded-full bg-secondary/20 text-secondary mb-2">
                 <Globe className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-primary dark:text-bg-light">Futuro Verde</h3>
               <p className="text-sm text-text-light dark:text-text-dark">Contribuye a un futuro más limpio para Colombia.</p>
             </div>
          </div>
        </section>

        {/* --- CÓMO FUNCIONA --- */}
        <section className="bg-primary/5 dark:bg-primary/10 px-4 py-16 transition-colors duration-300">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold leading-tight tracking-tighter text-center mb-12 text-primary dark:text-bg-light">
              Cómo Funciona
            </h2>
            
            <div className="relative flex flex-col gap-10 pl-4 md:pl-0">
              <div className="absolute left-[27px] md:left-1/2 md:-ml-px top-2 bottom-2 w-0.5 bg-secondary/30 hidden md:block"></div>
              <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-secondary/30 md:hidden"></div>

              <div className="relative flex items-center md:justify-between group">
                <div className="flex items-center md:w-1/2 md:justify-end md:pr-10">
                   <div className="md:text-right pl-12 md:pl-0">
                      <h3 className="font-bold text-xl text-primary dark:text-bg-light">Consulta Gratis</h3>
                      <p className="text-sm text-text-light dark:text-text-dark mt-1">Evaluamos tus necesidades energéticas sin costo alguno.</p>
                   </div>
                </div>
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary text-primary font-bold text-xl shadow-lg border-4 border-bg-light dark:border-bg-dark transition-colors">1</div>
                <div className="hidden md:block md:w-1/2"></div>
              </div>

              <div className="relative flex items-center md:justify-between group">
                <div className="hidden md:block md:w-1/2"></div>
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary text-primary font-bold text-xl shadow-lg border-4 border-bg-light dark:border-bg-dark transition-colors">2</div>
                <div className="flex items-center md:w-1/2 md:pl-10">
                   <div className="pl-12 md:pl-0">
                      <h3 className="font-bold text-xl text-primary dark:text-bg-light">Diseño a Medida</h3>
                      <p className="text-sm text-text-light dark:text-text-dark mt-1">Creamos un sistema solar personalizado.</p>
                   </div>
                </div>
              </div>

              <div className="relative flex items-center md:justify-between group">
                 <div className="flex items-center md:w-1/2 md:justify-end md:pr-10">
                   <div className="md:text-right pl-12 md:pl-0">
                      <h3 className="font-bold text-xl text-primary dark:text-bg-light">Instalación Profesional</h3>
                      <p className="text-sm text-text-light dark:text-text-dark mt-1">Nuestro equipo experto instala todo.</p>
                   </div>
                </div>
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary text-primary font-bold text-xl shadow-lg border-4 border-bg-light dark:border-bg-dark transition-colors">3</div>
                 <div className="hidden md:block md:w-1/2"></div>
              </div>

               <div className="relative flex items-center md:justify-between group">
                 <div className="hidden md:block md:w-1/2"></div>
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary text-primary font-bold text-xl shadow-lg border-4 border-bg-light dark:border-bg-dark transition-colors">4</div>
                <div className="flex items-center md:w-1/2 md:pl-10">
                   <div className="pl-12 md:pl-0">
                      <h3 className="font-bold text-xl text-primary dark:text-bg-light">Ahorro y Soporte</h3>
                      <p className="text-sm text-text-light dark:text-text-dark mt-1">Empieza a ahorrar y cuenta con nuestro apoyo.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
        <ContactForm />

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#CED6D3] dark:bg-[#131F1D] text-primary dark:text-bg-light p-8 md:p-12 transition-colors duration-300 border-t border-primary/10 dark:border-[#4ECDC4]/5">
        <div className="flex flex-col items-center text-center gap-6">
          <h2 className="text-2xl font-bold tracking-tight">PhotonTech</h2>
          
          <p className="text-sm max-w-xs text-primary/70 dark:text-gray-400">Energía limpia para un campo colombiano próspero y sostenible.</p>
          
          <div className="flex gap-6 text-2xl text-primary/60 dark:text-gray-500">
             <a href="#" className="hover:text-secondary dark:hover:text-secondary transition-colors transform hover:scale-110">
               <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.59 6.5 22.08 12 22.08C17.5 22.08 22 17.59 22 12.06C22 6.52998 17.5 2.03998 12 2.03998ZM16.9 15.91C16.6 16.59 15.3 17.26 14.9 17.43C14.5 17.6 13.3 18.04 12.1 17.52C10.9 16.99 10.1 15.93 9.89 15.65C9.69 15.38 8.91 14.33 8.91 14.33C8.91 14.33 8.64 13.88 8.91 13.67C9.17 13.46 9.49 13.51 9.71 13.73C9.93 13.94 10.2 14.33 10.3 14.44C10.5 14.61 10.6 14.78 10.8 14.95C11.1 15.22 11.3 15.38 11.5 15.46C11.8 15.58 12.1 15.54 12.3 15.27C12.5 15 12.6 14.38 12.3 13.94C12.1 13.5 11.6 12.87 11.3 12.55C11 12.22 10.7 11.95 10.6 11.74C10.4 11.53 10.2 11.32 10.3 11.05C10.4 10.78 10.9 10.38 11.2 10.22C11.5 10.06 11.8 10.01 12 10.01C12.2 10.01 12.4 10.01 12.6 10.01C12.8 10.01 12.9 9.93002 13.1 10.41C13.3 10.89 13.8 12.15 13.8 12.15C13.8 12.15 14.1 12.87 13.8 13.2C13.5 13.54 13.4 13.46 13.2 13.2C13.1 13.04 12.6 12.42 12.4 12.15C12.2 11.88 12 11.76 11.8 11.76C11.6 11.76 11.3 11.84 11.3 12.15C11.3 12.46 11.6 12.9 11.8 13.12C12 13.33 12.9 13.85 12.8 14.01C12.7 14.18 12.3 14.65 12 14.92C11.7 15.19 11.9 15.57 12.2 15.84C12.5 16.11 13.4 16.99 14.1 16.95C14.8 16.91 15.1 16.3 15.3 16.03C15.5 15.76 16 14.33 16 14.33C16 14.33 16.1 13.84 16.3 13.84C16.5 13.84 17.1 14.41 17.1 15.13C17.1 15.85 17.1 15.91 16.9 15.91Z"/></svg>
             </a>
             <a href="#" className="hover:text-secondary dark:hover:text-secondary transition-colors transform hover:scale-110">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm3.31 11.38c.28-.15.47-.43.47-.76c0-.5-.4-.9-.9-.9H13V9.5h1.79c.45 0 .82-.37.82-.82s-.37-.82-.82-.82H13V6.82c0-.45-.37-.82-.82-.82s-.82.37-.82.82V7.86H9.5c-.45 0-.82.37-.82.82s.37.82.82.82H11.36v1.36H9.6c-.5 0-.9.4-.9.9c0 .33.19.62.47.76c-.6.31-1 .93-1 1.62c0 1.02.83 1.85 1.85 1.85h.92V16.5h-.93c-.45 0-.82.37-.82.82s.37.82.82.82h1.86v1.04c0 .45.37.82.82.82s.82-.37.82-.82v-1.04h1.86c.45 0 .82-.37.82-.82s-.37-.82-.82-.82h-.93V14.85h.92c1.02 0 1.85-.83 1.85-1.85c0-.69-.4-1.31-1-1.62zM11.36 13.5v-1.36H13v1.36h-1.64zm.82 3.15v-1.36h1.64v1.36h-1.64z"></path></svg>
             </a>
          </div>
          
          <div className="text-xs text-primary/50 dark:text-gray-600 pt-4 border-t border-primary/10 dark:border-white/5 w-full">
            <p>© 2025 PhotonTech Colombia. Todos los derechos reservados.</p>
            <p>Bogotá, Colombia</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;