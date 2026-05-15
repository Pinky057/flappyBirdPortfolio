"use client"

import { useState } from "react"
import Image from "next/image"
import Game from "@/components/game"
import Modal from "@/components/modal"
import BottomNav from "@/components/bottom-nav"
import { GameProvider } from "@/context/game-context"

export default function Home() {
  const [activeSection, setActiveSection] = useState(null)
  const [isPaused, setIsPaused] = useState(false)

  const openSection = (section) => {
    setActiveSection(section)
    setIsPaused(section !== null)
  }

  const closeSection = () => {
    setActiveSection(null)
    setIsPaused(false)
  }

  return (
    <GameProvider>
      <main className="portfolio-wrapper bg-white min-h-screen pb-32 font-sans overflow-x-hidden relative">
        
        {/* Navbar */}
        <nav className="w-full pt-10 pb-8 pl-8 md:pl-16 flex items-center text-[#52796f] relative z-30">
           <div className="text-2xl font-bold tracking-widest font-serif text-[#2f3e46] mr-12 md:mr-16">PINKY.</div>
           <div className="hidden md:flex gap-8 md:gap-12 text-sm uppercase tracking-widest font-bold">
             <a href="#about" className="relative group hover:text-[#84a98c] transition-colors">
               About
               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#84a98c] transition-all duration-300 group-hover:w-full"></span>
             </a>
             <a href="#projects" className="relative group hover:text-[#84a98c] transition-colors">
               Projects
               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#84a98c] transition-all duration-300 group-hover:w-full"></span>
             </a>
             <a href="#blogs" className="relative group hover:text-[#84a98c] transition-colors">
               Blogs
               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#84a98c] transition-all duration-300 group-hover:w-full"></span>
             </a>
             <a href="#hobbies" className="relative group hover:text-[#84a98c] transition-colors">
               Hobbies
               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#84a98c] transition-all duration-300 group-hover:w-full"></span>
             </a>
             <a href="#contact" className="relative group hover:text-[#84a98c] transition-colors">
               Contact
               <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#84a98c] transition-all duration-300 group-hover:w-full"></span>
             </a>
           </div>
        </nav>

        {/* Portfolio Header Image (Positioned Top 0, Right) */}
        <div className="absolute top-0 right-0 w-full md:w-[85%] lg:w-[75%] max-w-6xl z-10 pointer-events-none">
          <Image 
            src="/potfolio header.png" 
            alt="Portfolio Header" 
            width={1400} 
            height={800} 
            className="w-full h-auto object-right-top object-contain" 
            priority
          />
        </div>

        {/* Game Canvas (Bigger width) */}
        <section className="w-full flex justify-center pt-[450px] sm:pt-[500px] md:pt-[600px] lg:pt-[700px] relative z-20 mt-12">
          <div className="relative w-[95%] md:w-[90%] lg:w-[85%] max-w-[1400px]">
            {/* Chibi Watching Game */}
            <div className="absolute -top-[120px] md:-top-[200px] left-1/2 -translate-x-1/2 w-[350px] md:w-[500px] z-30 pointer-events-none">
              <Image 
                src="/watching.png" 
                alt="Chibi Watching" 
                width={600} 
                height={600} 
                className="w-full h-auto drop-shadow-md"
              />
            </div>

            {/* Game Container */}
            <div className="w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden border-[6px] border-[#e9edc9] shadow-xl relative bg-[#f8f9fa]">
              <Game isPaused={isPaused} onSectionClick={openSection} />
            </div>
          </div>
        </section>

        {/* Cute Infographic Content Area (Inspired by Image 2) */}
        <section className="relative z-10 w-full mt-24 max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Organic Background "Tree/Leaves" Shape (Top Right) */}
          <div className="absolute -top-32 -right-32 w-[600px] md:w-[800px] h-[600px] md:h-[800px] z-0 text-[#cad2c5] opacity-60 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path fill="currentColor" d="M45.7,-76.4C58.9,-69.1,69.1,-55.4,78.2,-41.4C87.3,-27.3,95.3,-13.7,94.9,-0.2C94.5,13.3,85.6,26.6,76.5,40.1C67.4,53.6,58.1,67.3,45.5,76C32.9,84.7,16.4,88.4,0.7,87.3C-15.1,86.2,-30.2,80.3,-43.3,71.6C-56.4,62.9,-67.5,51.4,-75.7,37.8C-83.9,24.2,-89.2,8.5,-86.1,-5.5C-83,-19.5,-71.5,-31.8,-60.7,-43.1C-49.9,-54.4,-39.8,-64.7,-27.6,-72.4C-15.4,-80.1,-1.1,-85.2,13.6,-83.4C28.3,-81.6,42.5,-72.9,45.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-12 pt-16">
            
            {/* Left Column: Scattered Infographic Sections */}
            <div className="flex-1 space-y-24 pb-32">
              
              {/* About Me Section (With Hello Image & Growing Dialog) */}
              <div id="about" className="relative flex flex-col lg:flex-row items-center gap-6 lg:gap-8 -ml-4 md:-ml-12 group w-full pt-16 mt-[-4rem]">
                
                {/* Hello Avatar (Left) */}
                <div className="w-72 h-72 md:w-[350px] md:h-[350px] xl:w-[500px] xl:h-[500px] flex-shrink-0 relative z-20 transition-transform duration-500 group-hover:scale-105">
                  <Image 
                    src="/hello.png" 
                    alt="Pinky Hello" 
                    fill 
                    style={{ objectFit: 'contain' }}
                    className="drop-shadow-lg"
                  />
                </div>

                {/* Growing Dialog Pill Box (Right) */}
                <div className="relative flex-1 w-full max-w-none">
                  {/* The Box */}
                  <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-[3px] border-[#84a98c] transform group-hover:scale-[1.02] transition-transform duration-500 origin-left relative">
                    
                    {/* Speech Pointer Arrow */}
                    <div className="absolute top-1/2 -left-[20px] -translate-y-1/2 w-0 h-0 border-t-[16px] border-b-[16px] border-r-[22px] border-t-transparent border-b-transparent border-r-[#84a98c] hidden lg:block"></div>
                    <div className="absolute top-1/2 -left-[14px] -translate-y-1/2 w-0 h-0 border-t-[12px] border-b-[12px] border-r-[16px] border-t-transparent border-b-transparent border-r-white hidden lg:block z-10"></div>
                    
                    <h2 className="text-[#52796f] font-bold text-3xl mb-4 font-serif">Who am I?</h2>
                    <p className="text-[#354f52] text-lg leading-relaxed font-medium mb-8">
                      I'm a full-stack developer who treats code like a story. I build beautiful, interactive things and sometimes, I survive endless pipes.
                    </p>

                    {/* Dev.to Articles (Bento Grid) */}
                    <div className="mt-8">
                      <h3 className="text-[#84a98c] font-bold text-2xl font-serif mb-6 flex items-center gap-3">
                        <span className="text-3xl">📝</span> Dev.to Chronicles
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Large Featured Card */}
                        <a href="https://dev.to/pinky057/i-built-the-premium-admin-template-i-couldnt-find-for-free-nextjs-tailwind-ilo" target="_blank" rel="noreferrer" className="md:col-span-2 block p-6 rounded-[2rem] bg-[#f6f7f2] border-[3px] border-[#cad2c5] hover:border-[#84a98c] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#e9edc9] rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-125 z-0"></div>
                          <div className="relative z-10">
                            <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-bold uppercase tracking-widest text-[#84a98c] mb-3 shadow-sm border border-[#cad2c5]">Featured</span>
                            <div className="font-bold text-[#2f3e46] text-xl md:text-2xl mb-2 leading-tight">I built the "Premium" Admin Template I couldn't find for free 🚀</div>
                            <div className="text-sm text-[#52796f] font-medium flex items-center gap-2">
                               <span>dev.to/pinky057</span>
                               <span className="w-1 h-1 bg-[#52796f] rounded-full"></span>
                               <span>3 min read</span>
                            </div>
                          </div>
                        </a>
                        
                        {/* Smaller Bento Cards */}
                        <a href="https://dev.to/pinky057/i-stopped-writing-code-heres-what-i-do-instead-vibe-coding-in-2025-5661" target="_blank" rel="noreferrer" className="block p-6 rounded-[2rem] bg-white border-[3px] border-[#cad2c5] hover:border-[#84a98c] hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                          <div className="font-bold text-[#2f3e46] text-lg mb-4 leading-tight">I Stopped Writing Code. Here's What I Do Instead</div>
                          <div className="text-xs text-[#84a98c] font-bold uppercase tracking-wider">Vibe Coding in 2025</div>
                        </a>
                        
                        <a href="https://dev.to/pinky057/blooming-wecoded-landing-page-9lo" target="_blank" rel="noreferrer" className="block p-6 rounded-[2rem] bg-[#fff3e3] border-[3px] border-[#d4a373] hover:border-[#bc6c25] hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                          <div className="font-bold text-[#bc6c25] text-lg mb-4 leading-tight">Blooming WeCoded Landing Page</div>
                          <div className="text-xs text-[#dda15e] font-bold uppercase tracking-wider">WeCoded Challenge</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Full Width Live Projects Canvas */}
        <section id="projects" className="w-full flex justify-center mt-8 pb-8 relative z-20 pt-16 mt-[-4rem]">
          <div className="w-[95%] md:w-[90%] lg:w-[85%] max-w-[1400px] bg-[#e9f5e9] rounded-[3rem] p-10 md:p-16 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-[6px] border-[#84a98c] relative overflow-hidden flex flex-col items-center">
            
            {/* Decorative Background Blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#cad2c5] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#e9edc9] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="text-center max-w-2xl mb-16 relative z-10">
              <h2 className="text-[#354f52] font-bold text-4xl md:text-5xl mb-6 font-serif">Live Projects & Loot 🎮</h2>
              <p className="text-[#52796f] text-xl font-medium">
                A collection of fully deployed web apps, immersive clones, and interactive games. Click any card to embark on the adventure!
              </p>
            </div>

            {/* Rich Compact Browser Previews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full relative z-10">
              
              {/* Project 1: Nexus Admin Dashboard */}
              <a href="https://nexus-dashboard-phi-five.vercel.app/" target="_blank" rel="noreferrer" className="group relative flex flex-col bg-white rounded-3xl border-[4px] border-[#cad2c5] overflow-hidden h-[360px] hover:border-[#84a98c] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                 {/* Browser Dot Header */}
                 <div className="h-9 bg-[#f1f3f0] border-b-[3px] border-[#cad2c5] flex items-center px-4 gap-2 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                    <div className="ml-3 flex-1 bg-white rounded-md border border-[#cad2c5] text-[10px] text-[#84a98c] px-2 py-0.5 flex items-center truncate font-mono">nexus-dashboard.vercel.app</div>
                 </div>
                 {/* Viewport with Scaled Iframe */}
                 <div className="flex-1 bg-[#0f172a] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-[300%] h-[300%] scale-[0.333] origin-top-left select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                       <iframe src="https://nexus-dashboard-phi-five.vercel.app/" className="w-full h-full border-0" title="Nexus Preview" loading="lazy" />
                    </div>
                    {/* Premium Info Glass Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2f3e46] via-[#2f3e46]/70 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                       <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <span className="inline-block px-3 py-0.5 bg-[#ffbd2e] text-slate-900 text-[9px] font-bold tracking-widest uppercase rounded-full mb-2 shadow-sm">Featured Premium</span>
                          <h3 className="font-bold text-white text-2xl leading-tight mb-1">Nexus Dashboard ⭐</h3>
                          <p className="text-slate-300 text-xs font-medium mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Next.js 14 dashboard template featuring high-fidelity AI assistant and charting systems.</p>
                          <div className="flex flex-wrap gap-1.5">
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Next.js 14</span>
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Tailwind</span>
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Framer</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </a>

              {/* Project 2: Meridian Travel */}
              <a href="https://meridian-travel-69ym.vercel.app/" target="_blank" rel="noreferrer" className="group relative flex flex-col bg-white rounded-3xl border-[4px] border-[#cad2c5] overflow-hidden h-[360px] hover:border-[#84a98c] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                 <div className="h-9 bg-[#f1f3f0] border-b-[3px] border-[#cad2c5] flex items-center px-4 gap-2 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                    <div className="ml-3 flex-1 bg-white rounded-md border border-[#cad2c5] text-[10px] text-[#84a98c] px-2 py-0.5 flex items-center truncate font-mono">meridian-travel.vercel.app</div>
                 </div>
                 <div className="flex-1 bg-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-[300%] h-[300%] scale-[0.333] origin-top-left select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                       <iframe src="https://meridian-travel-69ym.vercel.app/" className="w-full h-full border-0" title="Meridian Preview" loading="lazy" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2f3e46] via-[#2f3e46]/70 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                       <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold text-white text-2xl leading-tight mb-1">Meridian Travel 🌍</h3>
                          <p className="text-slate-300 text-xs font-medium mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">High-fidelity travel booking platform with dynamic Leaflet mapping and pricing data.</p>
                          <div className="flex flex-wrap gap-1.5">
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Leaflet</span>
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Next.js</span>
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Tailwind</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </a>

              {/* Project 3: LinkedIn Clone */}
              <a href="https://linedin-clone.vercel.app/" target="_blank" rel="noreferrer" className="group relative flex flex-col bg-white rounded-3xl border-[4px] border-[#cad2c5] overflow-hidden h-[360px] hover:border-[#84a98c] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                 <div className="h-9 bg-[#f1f3f0] border-b-[3px] border-[#cad2c5] flex items-center px-4 gap-2 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                    <div className="ml-3 flex-1 bg-white rounded-md border border-[#cad2c5] text-[10px] text-[#84a98c] px-2 py-0.5 flex items-center truncate font-mono">linkedin-clone.vercel.app</div>
                 </div>
                 <div className="flex-1 bg-[#f3f2ef] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-[300%] h-[300%] scale-[0.333] origin-top-left select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                       <iframe src="https://linedin-clone.vercel.app/" className="w-full h-full border-0" title="LinkedIn Preview" loading="lazy" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2f3e46] via-[#2f3e46]/70 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                       <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold text-white text-2xl leading-tight mb-1">LinkedIn Clone 💼</h3>
                          <p className="text-slate-300 text-xs font-medium mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Pixel-perfect LinkedIn UI rebuild featuring interactive feed mechanics and profile layouts.</p>
                          <div className="flex flex-wrap gap-1.5">
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">React</span>
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Tailwind</span>
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Vercel</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </a>

              {/* Project 4: Hulu 2.0 */}
              <a href="https://hulu-2-0-clone-beta.vercel.app/" target="_blank" rel="noreferrer" className="group relative flex flex-col bg-white rounded-3xl border-[4px] border-[#cad2c5] overflow-hidden h-[360px] hover:border-[#84a98c] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                 <div className="h-9 bg-[#f1f3f0] border-b-[3px] border-[#cad2c5] flex items-center px-4 gap-2 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                    <div className="ml-3 flex-1 bg-white rounded-md border border-[#cad2c5] text-[10px] text-[#84a98c] px-2 py-0.5 flex items-center truncate font-mono">hulu-2-0.vercel.app</div>
                 </div>
                 <div className="flex-1 bg-[#06202a] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-[300%] h-[300%] scale-[0.333] origin-top-left select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                       <iframe src="https://hulu-2-0-clone-beta.vercel.app/" className="w-full h-full border-0" title="Hulu Preview" loading="lazy" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2f3e46] via-[#2f3e46]/70 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                       <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold text-white text-2xl leading-tight mb-1">Hulu 2.0 Clone 🎬</h3>
                          <p className="text-slate-300 text-xs font-medium mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Next-gen movie platform catalog mirroring modern layouts with live TMDB API integration.</p>
                          <div className="flex flex-wrap gap-1.5">
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">React</span>
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">TMDB API</span>
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Tailwind</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </a>

              {/* Project 5: Button Studio */}
              <a href="https://css-buttons-three.vercel.app/" target="_blank" rel="noreferrer" className="group relative flex flex-col bg-white rounded-3xl border-[4px] border-[#cad2c5] overflow-hidden h-[360px] hover:border-[#84a98c] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                 <div className="h-9 bg-[#f1f3f0] border-b-[3px] border-[#cad2c5] flex items-center px-4 gap-2 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                    <div className="ml-3 flex-1 bg-white rounded-md border border-[#cad2c5] text-[10px] text-[#84a98c] px-2 py-0.5 flex items-center truncate font-mono">css-buttons-studio.vercel.app</div>
                 </div>
                 <div className="flex-1 bg-[#fafafa] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-[300%] h-[300%] scale-[0.333] origin-top-left select-none pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                       <iframe src="https://css-buttons-three.vercel.app/" className="w-full h-full border-0" title="Buttons Preview" loading="lazy" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2f3e46] via-[#2f3e46]/70 to-transparent opacity-95 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                       <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold text-white text-2xl leading-tight mb-1">Button Studio 🎨</h3>
                          <p className="text-slate-300 text-xs font-medium mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">A curated visual showcase of creative hover states, micro-interactions, and modern CSS styles.</p>
                          <div className="flex flex-wrap gap-1.5">
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Vanilla CSS</span>
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Animations</span>
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">HTML5</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </a>

              {/* Project 6: Juicy Merge Interactive Card (No Iframe due to gameplay lock) */}
              <div onClick={() => setActiveSection("projects")} className="group relative flex flex-col bg-white rounded-3xl border-[4px] border-[#cad2c5] overflow-hidden h-[360px] hover:border-[#84a98c] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                 <div className="h-9 bg-[#f1f3f0] border-b-[3px] border-[#cad2c5] flex items-center px-4 gap-2 flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                    <div className="ml-3 flex-1 bg-white rounded-md border border-[#cad2c5] text-[10px] text-[#84a98c] px-2 py-0.5 flex items-center truncate font-mono">juicy-fruits-merge.arcade</div>
                 </div>
                 <div className="flex-1 bg-gradient-to-br from-[#ffe5e5] to-[#fff3e0] flex flex-col items-center justify-center relative overflow-hidden p-6 group-hover:scale-105 transition-transform duration-700">
                    <div className="text-6xl mb-3 animate-bounce">🍉</div>
                    <h3 className="font-bold text-[#2f3e46] text-2xl leading-tight mb-1">Juicy Merge 🕹️</h3>
                    <span className="text-xs font-bold text-[#e76f51] tracking-wider uppercase mb-4">Playable Arcade Suite</span>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2f3e46] via-[#2f3e46]/75 to-[#2f3e46]/30 opacity-0 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-6">
                       <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold text-white text-2xl leading-tight mb-1">Juicy Fruits Merge</h3>
                          <p className="text-slate-300 text-xs font-medium mb-3 line-clamp-2">Highly addictive physics arcade puzzle game featured on the global CrazyGames publisher platform.</p>
                          <div className="flex flex-wrap gap-1.5">
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Physics Engine</span>
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Matter.js</span>
                             <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-white/80 font-bold">Canvas</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </section>

        {/* Second Scattered Infographic Content Area */}
        <section className="relative z-10 w-full mt-8 max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative z-10 flex flex-col md:flex-row gap-12 pt-16">
            <div className="flex-1 space-y-24 pb-32">         
              
              {/* Blogs Section */}
              <div id="blogs" className="relative max-w-xl md:ml-24 pt-16 mt-[-4rem]">
                <div className="bg-[#fff3e3] rounded-[3rem] p-10 shadow-lg border-[3px] border-[#d4a373]">
                  <h2 className="text-[#bc6c25] font-bold text-3xl mb-4 font-serif">Writings 📝</h2>
                  <p className="text-[#dda15e] text-lg leading-relaxed mb-6 font-medium">
                    I share my learnings, tutorials, and rants on Dev.to and LinkedIn.
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-white px-6 py-3 rounded-full text-[#bc6c25] font-bold border-2 border-[#d4a373] shadow-sm hover:bg-[#d4a373] hover:text-white transition-colors">Dev.to</button>
                    <button className="bg-white px-6 py-3 rounded-full text-[#bc6c25] font-bold border-2 border-[#d4a373] shadow-sm hover:bg-[#d4a373] hover:text-white transition-colors">LinkedIn</button>
                  </div>
                </div>
              </div>

              {/* Devlog Videos Section */}
              <div id="devlog" className="relative max-w-2xl ml-auto pt-16 mt-[-4rem]">
                 <div className="bg-[#eef4ed] rounded-[3rem] p-10 shadow-lg border-[3px] border-[#52796f]">
                    <h2 className="text-[#2f3e46] font-bold text-3xl mb-6 font-serif">Ishrat's Devlogs 🎬</h2>
                    <div className="w-full aspect-video bg-[#cad2c5] rounded-3xl flex items-center justify-center relative overflow-hidden border-4 border-white shadow-inner cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                       <span className="text-6xl text-white">▶</span>
                    </div>
                 </div>
              </div>

            </div>

          </div>
        </section>

        {/* Full Width Hobbies Section */}
        <section id="hobbies" className="w-full flex justify-center mt-8 pb-8 relative z-20 pt-16 mt-[-4rem]">
          <div className="w-[95%] md:w-[90%] lg:w-[85%] max-w-[1400px] bg-[#f6f7f2] rounded-[3rem] p-10 md:p-16 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-[6px] border-[#84a98c] relative overflow-hidden flex flex-col xl:flex-row gap-12 xl:gap-20">
            
            {/* Left: Hobbies Grid */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-[#354f52] font-bold text-4xl mb-6 font-serif">Hobbies & Interests 🌟</h2>
              <p className="text-[#52796f] text-xl mb-8 font-medium">
                When I'm not coding or debugging, you can usually find me exploring these different worlds.
              </p>
              
              <div className="flex flex-wrap gap-4">
                 <div className="px-5 py-3 bg-white border-[3px] border-[#cad2c5] rounded-full font-bold text-[#52796f] shadow-sm flex items-center gap-2 hover:-translate-y-1 hover:border-[#84a98c] transition-all cursor-default">
                    <span className="text-xl">🎮</span> Gaming
                 </div>
                 <div className="px-5 py-3 bg-white border-[3px] border-[#cad2c5] rounded-full font-bold text-[#52796f] shadow-sm flex items-center gap-2 hover:-translate-y-1 hover:border-[#84a98c] transition-all cursor-default">
                    <span className="text-xl">📚</span> Reading
                 </div>
                 <div className="px-5 py-3 bg-white border-[3px] border-[#cad2c5] rounded-full font-bold text-[#52796f] shadow-sm flex items-center gap-2 hover:-translate-y-1 hover:border-[#84a98c] transition-all cursor-default">
                    <span className="text-xl">🎨</span> Pixel Art
                 </div>
                 <div className="px-5 py-3 bg-white border-[3px] border-[#cad2c5] rounded-full font-bold text-[#52796f] shadow-sm flex items-center gap-2 hover:-translate-y-1 hover:border-[#84a98c] transition-all cursor-default">
                    <span className="text-xl">🏺</span> Clay Art
                 </div>
                 <div className="px-5 py-3 bg-white border-[3px] border-[#cad2c5] rounded-full font-bold text-[#52796f] shadow-sm flex items-center gap-2 hover:-translate-y-1 hover:border-[#84a98c] transition-all cursor-default">
                    <span className="text-xl">🧶</span> Crochet
                 </div>
                 <div className="px-5 py-3 bg-white border-[3px] border-[#cad2c5] rounded-full font-bold text-[#52796f] shadow-sm flex items-center gap-2 hover:-translate-y-1 hover:border-[#84a98c] transition-all cursor-default">
                    <span className="text-xl">🌱</span> Gardening
                 </div>
                 <div className="px-5 py-3 bg-white border-[3px] border-[#cad2c5] rounded-full font-bold text-[#52796f] shadow-sm flex items-center gap-2 hover:-translate-y-1 hover:border-[#84a98c] transition-all cursor-default">
                    <span className="text-xl">🕊️</span> Peaceful Games
                 </div>
              </div>
            </div>

            {/* Right: YouTube Channels */}
            <div className="flex-1 flex flex-col justify-center border-t-4 xl:border-t-0 xl:border-l-4 border-[#84a98c]/30 pt-8 xl:pt-0 xl:pl-16">
              <h3 className="text-[#354f52] font-bold text-4xl mb-6 font-serif">My YouTube Channels 🎬</h3>
              <p className="text-[#52796f] text-xl mb-8 font-medium">
                Catch my latest tech devlogs or follow along with my life adventures!
              </p>
              
              <div className="flex flex-col gap-6 w-full">
                 {/* Devlog Channel */}
                 <a href="https://www.youtube.com/@ishrat_jahan" target="_blank" rel="noreferrer" className="flex-1 flex items-center gap-6 bg-white p-5 rounded-[2rem] border-[3px] border-[#cad2c5] hover:border-[#84a98c] hover:-translate-y-1 hover:shadow-md transition-all duration-300 group text-left">
                    <div className="w-14 h-14 bg-[#ff4d4d] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                       <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </div>
                    <div>
                       <h3 className="font-bold text-[#2f3e46] text-xl">Ishrat Jahan</h3>
                       <p className="text-sm text-[#52796f] mt-1 font-medium">Coding & Tech</p>
                    </div>
                 </a>
                 
                 {/* Social Journal Channel */}
                 <a href="https://www.youtube.com/channel/UCL_GOcGp5TFtz5lamCZMtwg" target="_blank" rel="noreferrer" className="flex-1 flex items-center gap-6 bg-white p-5 rounded-[2rem] border-[3px] border-[#cad2c5] hover:border-[#84a98c] hover:-translate-y-1 hover:shadow-md transition-all duration-300 group text-left">
                    <div className="w-14 h-14 bg-[#ff4d4d] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                       <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                    </div>
                    <div>
                       <h3 className="font-bold text-[#2f3e46] text-xl">Social Journal</h3>
                       <p className="text-sm text-[#52796f] mt-1 font-medium">Life & Vlogs</p>
                    </div>
                 </a>
              </div>
            </div>
            
          </div>
        </section>

        {/* Full Width Contact & Footer Section (Same width as Game Canvas) */}
        <section id="contact" className="w-full flex justify-center mt-8 pb-24 relative z-20 pt-16 mt-[-4rem]">
          <div className="w-[95%] md:w-[90%] lg:w-[85%] max-w-[1400px] bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-[6px] border-[#2f3e46] relative overflow-hidden flex flex-col items-center text-center">
            
            <h2 className="text-[#2f3e46] font-bold text-4xl md:text-5xl mb-6 font-serif">Let's Connect!</h2>
            <p className="text-[#52796f] text-xl mb-10 font-medium max-w-2xl">
              Need a dev to build something amazing? Found a bug in the matrix? Or just want to say hi?
            </p>
            <button className="bg-[#2f3e46] text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-[#52796f] hover:-translate-y-1 transition-all duration-300 shadow-md">
              Drop a Message 👋
            </button>
            
            {/* Built-in Footer */}
            <div className="mt-20 pt-8 border-t-[3px] border-[#cad2c5] w-full flex flex-col md:flex-row justify-between items-center text-[#52796f] font-bold gap-6">
               <div>© 2026 Ishrat Jahan Pinky. All rights reserved.</div>
               <div className="flex gap-8">
                  <a href="#" className="hover:text-[#2f3e46] transition-colors">GitHub</a>
                  <a href="https://linkedin.com/" className="hover:text-[#2f3e46] transition-colors">LinkedIn</a>
                  <a href="https://dev.to/pinky057" className="hover:text-[#2f3e46] transition-colors">Dev.to</a>
                  <a href="https://youtube.com/@ishrat_jahan" className="hover:text-[#2f3e46] transition-colors">YouTube</a>
               </div>
            </div>
            
          </div>
        </section>

        {activeSection && <Modal section={activeSection} onClose={closeSection} />}
      </main>
    </GameProvider>
  )
}

