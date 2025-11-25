import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    // REEMPLAZA ESTO CON TU URL DE FORMSPREE
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzzqgyqa";

    try {
      setStatus("Enviando...");
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("¡Gracias! Tus datos han sido guardados. Te contactaremos pronto.");
        form.reset();
      } else {
        setStatus("Hubo un error al enviar. Por favor intenta de nuevo.");
      }
    } catch (error) {
      setStatus("Error de conexión.");
    }
  };

  return (
    <section className="bg-[#1A535C]/5 dark:bg-[#1A535C]/10 px-4 py-16" id="contacto">
      <div className="flex flex-col gap-4 text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-bold leading-tight tracking-tighter text-[#1A535C] dark:text-[#d4c8b8]">Transforma tu Hogar Hoy</h2>
        <p className="text-base font-normal text-[#A99985] dark:text-[#d4c8b8]">
          Déjanos tus datos y descubre el potencial de ahorro ¡Cotización sin compromiso!
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8 max-w-xl mx-auto">
        <input name="nombre" required className="w-full h-12 px-4 rounded-lg bg-[#F9F7F3] dark:bg-[#101a1b] border border-[#A99985]/20 placeholder-[#A99985]/80 text-[#1A535C] dark:text-[#d4c8b8]" placeholder="Nombre Completo" type="text" />
        <input name="telefono" required className="w-full h-12 px-4 rounded-lg bg-[#F9F7F3] dark:bg-[#101a1b] border border-[#A99985]/20 placeholder-[#A99985]/80 text-[#1A535C] dark:text-[#d4c8b8]" placeholder="Teléfono / WhatsApp" type="tel" />
        <input name="municipio" className="w-full h-12 px-4 rounded-lg bg-[#F9F7F3] dark:bg-[#101a1b] border border-[#A99985]/20 placeholder-[#A99985]/80 text-[#1A535C] dark:text-[#d4c8b8]" placeholder="Municipio" type="text" />
        <textarea name="mensaje" className="w-full h-24 p-4 rounded-lg bg-[#F9F7F3] dark:bg-[#101a1b] border border-[#A99985]/20 placeholder-[#A99985]/80 text-[#1A535C] dark:text-[#d4c8b8]" placeholder="Mensaje (opcional)"></textarea>
        
        <button type="submit" className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-[#F7B538] text-[#1A535C] text-base font-bold shadow-lg hover:bg-[#F7B538]/90 transition">
          <span className="truncate">Enviar y Cotizar Gratis</span>
        </button>

        {status && <p className="text-center font-bold text-[#1A535C] mt-2">{status}</p>}
      </form>
    </section>
  );
}