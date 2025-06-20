import React, { useState, useEffect } from 'react';
import { Menu, X, Music, Users, Calendar, Award, Image, FileText, Home } from 'lucide-react';
import './App.css';

// Import components
import Hero from './components/Hero';
import About from './components/About';
import Members from './components/Members';
import Discography from './components/Discography';
import Gallery from './components/Gallery';
import News from './components/News';
import Tours from './components/Tours';
import Awards from './components/Awards';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: FileText },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'news', label: 'News', icon: FileText },
    { id: 'tours', label: 'Tours', icon: Calendar },
    { id: 'awards', label: 'Awards', icon: Award }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold text-red-500">
                LINKIN PARK
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {sections.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                      activeSection === id
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 backdrop-blur-md">
                {sections.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center space-x-2 ${
                      activeSection === id
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="members">
          <Members />
        </section>
        
        <section id="music">
          <Discography />
        </section>
        
        <section id="gallery">
          <Gallery />
        </section>
        
        <section id="news">
          <News />
        </section>
        
        <section id="tours">
          <Tours />
        </section>
        
        <section id="awards">
          <Awards />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-4">LINKIN PARK</h3>
              <p className="text-gray-400">
                One of the world's best-selling music artists with over 100 million records sold worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {sections.slice(1, 5).map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Latest</h4>
              <ul className="space-y-2">
                {sections.slice(5).map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-zinc-800">
            <p className="text-center text-gray-400">
              © 2024 Linkin Park. All rights reserved. | From Zero World Tour
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
