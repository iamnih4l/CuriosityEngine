import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft } from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const [apiKey, setApiKey] = useState('');
  const [theme, setTheme] = useState('dark');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Load settings from Electron Store
    const loadSettings = async () => {
      if ((window as any).electronAPI) {
        const storedKey = await (window as any).electronAPI.getSetting('apiKey');
        const storedTheme = await (window as any).electronAPI.getSetting('theme');
        if (storedKey) setApiKey(storedKey);
        if (storedTheme) setTheme(storedTheme);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    if ((window as any).electronAPI) {
      await (window as any).electronAPI.saveSetting('apiKey', apiKey);
      await (window as any).electronAPI.saveSetting('theme', theme);
      // Let App.tsx know the theme changed if we had a global context, but we will just reload
      window.location.reload(); 
    }
    setSaving(false);
  };

  return (
    <div className="flex-col h-full p-5 animate-fade-in relative scrollable">
      <div className="flex items-center gap-3 mb-6">
        <button className="btn" style={{ padding: '6px' }} onClick={onBack}>
          <ArrowLeft size={16} />
        </button>
        <h2 className="text-xl font-bold">Settings</h2>
      </div>

      <div className="flex-col gap-5">
        <div>
          <label className="text-sm font-semibold mb-1 block">Theme</label>
          <select 
            className="w-full p-2 rounded-lg text-sm"
            style={{ 
              background: 'rgba(0,0,0,0.1)', 
              color: 'inherit', 
              border: '1px solid rgba(128,128,128,0.2)' 
            }}
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold mb-1 block">Google Gemini API Key</label>
          <input 
            type="password" 
            placeholder="AIzaSy..."
            className="w-full p-2 rounded-lg text-sm"
            style={{ 
              background: 'rgba(0,0,0,0.1)', 
              color: 'inherit', 
              border: '1px solid rgba(128,128,128,0.2)' 
            }}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted mt-1">Required to generate daily curiosity topics.</p>
        </div>

        <button className="btn btn-primary mt-4 w-full py-2" onClick={handleSave} disabled={saving}>
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
