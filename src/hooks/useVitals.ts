import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../firebase';
import { Patient, RiskLevel } from '../types';

function getRiskLevel(pdi: number): RiskLevel {
  if (pdi >= 70) return 'Critical';
  if (pdi >= 40) return 'Warning';
  return 'Normal';
}

export const useVitals = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const processedRef = ref(rtdb, 'processed_data');

    const unsubscribe = onValue(
      processedRef,
      (snapshot) => {
        const data = snapshot.val();

        if (!data) {
          setPatients([]);
          setIsConnected(true);
          return;
        }

        const now = new Date().toISOString();

        const patientList: Patient[] = Object.entries(data).map(([patientId, readings]) => {
          const readingEntries = Object.entries(readings as Record<string, any>);

          // Get latest reading
          const latestReading = readingEntries[readingEntries.length - 1][1];

          // Build vitals history from all readings
          const history = readingEntries.map(([, r]) => ({
            timestamp: now,
            heartRate: r.hr ?? 0,
            spO2: r.spo2 ?? 0,
            pdi: r.pdi ?? 0,
          }));

          const pdi = latestReading.pdi ?? 0;

          return {
            id: patientId,
            name: patientId,            // replace with real name if stored in Firebase
            age: 0,                     // not in ESP data
            gender: 'Other' as const,
            bedNumber: patientId,       // using patientId as bed number fallback
            ward: 'Ward A',
            diagnosis: 'Monitoring',
            doctorAssigned: 'Unassigned',
            admissionDate: now,
            status: getRiskLevel(pdi),  // auto-computed from PDI
            pdi,
            vitals: {
              heartRate: latestReading.hr ?? 0,
              spO2: latestReading.spo2 ?? 0,
              respiratoryRate: 0,       // not in ESP data
              temperature: 0,           // not in ESP data
              lastUpdated: now,
            },
            history,
            notes: [],
          };
        });

        setPatients(patientList);
        setIsConnected(true);
      },
      (error) => {
        console.error('Firebase Realtime DB error:', error);
        setIsConnected(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { patients, isConnected };
};