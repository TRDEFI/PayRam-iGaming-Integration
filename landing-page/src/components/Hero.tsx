"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-float"
          style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s", transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s", transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)` }}
        />
        
        {/* 3D Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        </div>
      </div>

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          {/* 3D Card with Motion */}
          <div className={`perspective-1000 mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div 
              className="inline-block p-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-2xl animate-pulse-glow"
              style={{ transform: `rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)` }}
            >
              <div className="bg-black/80 backdrop-blur-sm rounded-2xl px-8 py-4">
                <span className="text-orange-400 font-semibold">PayRam Altyapısı ile Güçlendirildi</span>
              </div>
            </div>
          </div>

          <h1 className={`text-4xl md:text-7xl font-bold text-white mb-6 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Kripto Ödemelerin{" "}
            <span className="text-gradient">Geleceği</span>
          </h1>
          
          <p className={`text-xl text-gray-300 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Bireysel kullanıcılar için kolay kripto alım-satım, işletmeler için güçlü B2B ödeme altyapısı. Tek platformda, tek noktadan.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a href="#cta" className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
              Ücretsiz Başla
            </a>
            <a href="#how-it-works" className="border border-orange-500/50 hover:border-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-orange-500/10">
              Nasıl Çalışır?
            </a>
          </div>
        </div>

        {/* 3D Stats Cards */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="card-3d bg-black/60 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 text-center hover:border-orange-500/50 transition-all duration-500">
            <div className="text-5xl font-bold text-orange-400 mb-3">$100M+</div>
            <div className="text-gray-400 text-lg">İşlem Hacmi</div>
          </div>
          <div className="card-3d bg-black/60 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 text-center hover:border-orange-500/50 transition-all duration-500" style={{ animationDelay: "0.2s" }}>
            <div className="text-5xl font-bold text-amber-400 mb-3">850K+</div>
            <div className="text-gray-400 text-lg">Zincir Üzerinde İşlem</div>
          </div>
          <div className="card-3d bg-black/60 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 text-center hover:border-orange-500/50 transition-all duration-500" style={{ animationDelay: "0.4s" }}>
            <div className="text-5xl font-bold text-yellow-400 mb-3">190+</div>
            <div className="text-gray-400 text-lg">Ülke Desteği</div>
          </div>
        </div>

        {/* Floating 3D Elements */}
        <div className="absolute top-40 left-10 animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl rotate-12 opacity-30" />
        </div>
        <div className="absolute bottom-40 right-20 animate-float" style={{ animationDelay: "3s" }}>
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full -rotate-12 opacity-20" />
        </div>
        <div className="absolute top-60 right-40 animate-float" style={{ animationDelay: "5s" }}>
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg rotate-45 opacity-25" />
        </div>
      </div>
    </div>
  );
}
