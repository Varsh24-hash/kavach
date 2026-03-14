import React from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Database, 
  User, 
  Monitor,
  ChevronRight,
  Hospital
} from 'lucide-react';

export const Settings = () => {
  const sections = [
    {
      title: 'Hospital Profile',
      icon: Hospital,
      items: [
        { label: 'Facility Information', description: 'Manage hospital name, address, and contact details' },
        { label: 'Ward Configuration', description: 'Configure wards, beds, and departments' },
      ]
    },
    {
      title: 'System Preferences',
      icon: Monitor,
      items: [
        { label: 'Display & Theme', description: 'Customize dashboard layout and dark mode settings' },
        { label: 'Language & Region', description: 'Set system language and time zone' },
      ]
    },
    {
      title: 'Notifications & Alerts',
      icon: Bell,
      items: [
        { label: 'Alert Thresholds', description: 'Configure PDI and vitals alert triggers' },
        { label: 'Notification Channels', description: 'Manage SMS, Email, and Push notifications' },
      ]
    },
    {
      title: 'Security & Privacy',
      icon: Shield,
      items: [
        { label: 'Access Control', description: 'Manage user roles and permissions' },
        { label: 'Data Encryption', description: 'Configure HIPAA compliance and encryption settings' },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-surface border border-white/10 rounded-2xl flex items-center justify-center">
          <SettingsIcon className="text-slate-400 w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">System Settings</h2>
          <p className="text-slate-400 text-sm">Configure KAVACH Clinical Command Center preferences</p>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <div key={i} className="glass-card overflow-hidden">
            <div className="px-8 py-4 bg-white/[0.02] border-b border-white/5 flex items-center gap-3">
              <section.icon className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{section.title}</h3>
            </div>
            <div className="divide-y divide-white/5">
              {section.items.map((item, j) => (
                <button key={j} className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/[0.01] transition-colors group text-left">
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 flex items-center justify-between border-critical/20">
        <div>
          <h3 className="text-lg font-bold text-white">Danger Zone</h3>
          <p className="text-xs text-slate-500 mt-1">Irreversible actions for the hospital system data</p>
        </div>
        <button className="px-6 py-2 bg-critical/10 border border-critical/30 text-critical text-sm font-bold rounded-xl hover:bg-critical/20 transition-colors">
          Reset System Data
        </button>
      </div>
    </div>
  );
};
