import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AssistancePage } from './pages/AssistancePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';
import { EmergencyBanner } from './components/EmergencyBanner';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'assistance' | 'resources' | 'about'>('home');
  const [prefillProblem, setPrefillProblem] = useState<string>('');
  const [prefillCategory, setPrefillCategory] = useState<string>('auto');
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);

  const handleStartAssistance = (problem?: string, category?: string) => {
    if (problem) setPrefillProblem(problem);
    if (category) setPrefillCategory(category);
    setActiveTab('assistance');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmergencyClick = () => {
    setShowEmergencyModal(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onEmergencyClick={handleEmergencyClick}
      />

      {/* Emergency banner if crisis triggered */}
      {showEmergencyModal && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 no-print">
          <EmergencyBanner
            reason="You have requested immediate crisis or emergency assistance. If you are in immediate danger or facing violence, please call emergency services immediately."
            onDismiss={() => setShowEmergencyModal(false)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'home' && (
          <HomePage
            onStartAssistance={handleStartAssistance}
            onNavigateResources={() => {
              setActiveTab('resources');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateAbout={() => {
              setActiveTab('about');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'assistance' && (
          <AssistancePage
            initialProblem={prefillProblem}
            initialCategory={prefillCategory}
          />
        )}

        {activeTab === 'resources' && (
          <ResourcesPage
            onStartAssistance={() => {
              setActiveTab('assistance');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
