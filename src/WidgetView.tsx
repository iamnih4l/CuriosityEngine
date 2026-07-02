import React, { useState, useEffect } from 'react';
import { BookOpen, Search, PlayCircle, Sparkles, BookmarkPlus, CheckCircle, Settings, Loader2 } from 'lucide-react';
import { generateTopic } from './ai';

interface WidgetViewProps {
  onLearnMore: (topic: any) => void;
  onSettings: () => void;
  currentTopic: any;
  setCurrentTopic: (topic: any) => void;
}

const defaultTopic = {
  title: "The Great Filter",
  teaser: "What if every advanced civilization destroys itself before becoming interstellar? The Great Filter is one of the most unsettling ideas in modern science and may explain why the universe appears silent.",
  category: "Astrophysics",
  details: {
    overview: "The Great Filter is a proposed solution to the Fermi Paradox, suggesting that an insurmountable evolutionary or technological hurdle prevents civilizations from becoming interstellar.",
    whyItMatters: "It forces us to ask: Is the filter behind us (we survived), or is it ahead of us (we are doomed)?",
    history: "Proposed by Robin Hanson in 1996, the concept attempts to mathematically formalize the statistical unlikelihood of our universe appearing devoid of life despite its vast age and size.",
    interestingFacts: [
      "If we discover simple life on Mars, it might be terrible news, suggesting the Great Filter is ahead of us.",
      "The concept is heavily debated among astrophysicists and futurists."
    ],
    questions: [
      "What could be the most likely candidate for a future Great Filter (e.g., nuclear war, climate change, AI)?",
      "If we are the only civilization to pass the filter, what are our cosmic responsibilities?"
    ]
  }
};

const WidgetView: React.FC<WidgetViewProps> = ({ onLearnMore, onSettings, currentTopic, setCurrentTopic }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize topic on first load
  useEffect(() => {
    if (!currentTopic) {
      setCurrentTopic(defaultTopic);
    }
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      let apiKey = '';
      if ((window as any).electronAPI) {
        apiKey = await (window as any).electronAPI.getSetting('apiKey');
      }
      
      if (!apiKey) {
        setError('Please set your Gemini API key in Settings first.');
        setLoading(false);
        return;
      }

      const newTopic = await generateTopic(apiKey);
      if (newTopic) {
        setCurrentTopic(newTopic);
      } else {
        setError('Failed to generate topic.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error generating topic.');
    } finally {
      setLoading(false);
    }
  };

  const handleExplore = async () => {
    if ((window as any).electronAPI && currentTopic) {
      await (window as any).electronAPI.openExternal(`https://www.google.com/search?q=${encodeURIComponent(currentTopic.title)}`);
    }
  };

  const handleWatch = async () => {
    if ((window as any).electronAPI && currentTopic) {
      await (window as any).electronAPI.openExternal(`https://www.youtube.com/results?search_query=${encodeURIComponent(currentTopic.title)}`);
    }
  };

  const handleSave = async () => {
    if ((window as any).electronAPI && currentTopic) {
      await (window as any).electronAPI.saveFavorite(currentTopic);
      // Feedback could be added here
    }
  };

  const handleMarkLearned = async () => {
    if ((window as any).electronAPI && currentTopic) {
      await (window as any).electronAPI.saveToHistory(currentTopic);
      
      const streak = await (window as any).electronAPI.getStreak();
      const today = new Date().toISOString().split('T')[0];
      if (streak.lastActiveDate !== today) {
        streak.consecutiveDays += 1;
        streak.lastActiveDate = today;
      }
      streak.topicsExplored += 1;
      await (window as any).electronAPI.updateStreak(streak);

      // Generate next topic
      handleGenerate();
    }
  };

  const topic = currentTopic || defaultTopic;

  return (
    <div className="flex-col h-full p-5 animate-fade-in relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">
          {loading ? 'Thinking...' : topic.category}
        </span>
        <button className="btn" style={{ padding: '6px' }} onClick={onSettings} title="Settings">
          <Settings size={14} />
        </button>
      </div>
      
      <h1 className="text-2xl font-bold mb-3 leading-tight min-h-[64px] flex items-center">
        {loading ? <Loader2 className="animate-spin" size={24} /> : topic.title}
      </h1>
      
      <p className="text-sm text-muted mb-6 leading-relaxed flex-grow">
        {error ? (
          <span className="text-red-400">{error}</span>
        ) : loading ? (
          "Scouring the depths of human knowledge for something fascinating..."
        ) : (
          topic.teaser
        )}
      </p>

      <div className="flex-col gap-3 mt-auto mb-2">
        <button className="btn btn-primary w-full py-3 text-base" onClick={() => onLearnMore(topic)} disabled={loading || !!error}>
          <BookOpen size={18} />
          Learn More
        </button>
        
        <div className="flex gap-2 w-full">
          <button className="btn flex-1" onClick={handleExplore} title="Search Google" disabled={loading || !!error}>
            <Search size={16} />
            Explore
          </button>
          <button className="btn flex-1" onClick={handleWatch} title="Search YouTube" disabled={loading || !!error}>
            <PlayCircle size={16} />
            Watch
          </button>
        </div>

        <div className="flex gap-2 w-full">
          <button className="btn flex-1" onClick={handleGenerate} title="Surprise Me" disabled={loading}>
            <Sparkles size={16} />
          </button>
          <button className="btn flex-1" onClick={handleSave} title="Save to Favorites" disabled={loading || !!error}>
            <BookmarkPlus size={16} />
          </button>
          <button className="btn flex-1" onClick={handleMarkLearned} title="Mark as Learned" disabled={loading || !!error}>
            <CheckCircle size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetView;
