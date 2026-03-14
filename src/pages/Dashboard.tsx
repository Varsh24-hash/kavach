import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  AlertTriangle,
} from 'lucide-react';
import { useVitals } from '../hooks/useVitals';
import { PatientCard } from '../components/PatientCard';

export const Dashboard = () => {
  const { patients } = useVitals();

  const criticalPatients = patients.filter(p => p.status === 'Critical');
  const sortedPatients = [...patients].sort((a, b) => b.pdi - a.pdi);

  return (
    <div className="space-y-8">
      {/* Critical Alert Banner */}

      {criticalPatients.length > 0 && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="bg-critical/10 border border-critical/30 rounded-2xl p-4 flex items-center gap-4 overflow-hidden"
        >
          <div className="w-10 h-10 bg-critical/20 rounded-full flex items-center justify-center animate-pulse">
            <AlertTriangle className="text-critical w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-critical font-bold text-sm uppercase tracking-wider">Critical Alert</h4>
            <p className="text-text-main text-sm">
              <span className="font-bold">{criticalPatients.length} patients</span> require immediate attention. PDI threshold exceeded.
            </p>
          </div>
          <button className="px-4 py-2 bg-critical text-white text-xs font-bold rounded-lg hover:bg-critical/80 transition-colors">
            View All Critical
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-12">
        {/* Main Monitoring Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
              <Activity className="text-primary w-5 h-5" />
              Real-time Monitoring
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Feed</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {sortedPatients.map(patient => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
