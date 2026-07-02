import { useState, useEffect } from 'react';
import WidgetView from './WidgetView';
import SettingsView from './SettingsView';
import LearningView from './LearningView';
import './index.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [view, setView] = useState('widget'); // 'widget', 'learning', 'settings'
  const [currentTopic, setCurrentTopic] = useState<any>(null);

  useEffect(() => {
    // Load theme from store
    const loadTheme = async () => {
      if ((window as any).electronAPI) {
        const storedTheme = await (window as any).electronAPI.getSetting('theme');
        if (storedTheme) setTheme(storedTheme);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);

  const handleClose = () => {
    window.close();
  };

  return (
    <div className="glass-panel">
      {/* Draggable Header */}
      <div className="drag-header">
        <button className="btn" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={handleClose}>
          ✕
        </button>
      </div>

      <div className="h-full w-full" style={{ paddingTop: '40px' }}>
        {view === 'widget' && (
          <WidgetView 
            onLearnMore={(topic) => { setCurrentTopic(topic); setView('learning'); }} 
            onSettings={() => setView('settings')}
            currentTopic={currentTopic}
            setCurrentTopic={setCurrentTopic}
          />
        )}
        {view === 'learning' && (
          <LearningView 
            onBack={() => setView('widget')} 
            topic={currentTopic} 
          />
        )}
        {view === 'settings' && (
          <SettingsView 
            onBack={() => setView('widget')} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
