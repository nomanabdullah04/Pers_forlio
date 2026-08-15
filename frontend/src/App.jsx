import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NeuralNetworkHero from './components/NeuralNetworkHero';
import AboutSection from './components/AboutSection';
import SkillsMatrix from './components/SkillsMatrix';
import ProjectsShowcase from './components/ProjectsShowcase';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleToggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleExploreProjects = () => {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar onOpenChat={handleOpenChat} />

      <main>
        <NeuralNetworkHero
          onOpenChat={handleOpenChat}
          onExploreProjects={handleExploreProjects}
        />
        <AboutSection />
        <SkillsMatrix />
        <ProjectsShowcase />
        <ExperienceTimeline />
        <ContactSection />
      </main>

      <Footer />

      <AIChatbot
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        onToggle={handleToggleChat}
      />
    </div>
  );
}
