import { Patient, Vitals, RiskLevel } from '../types';

export const generateInitialPatients = (): Patient[] => {
  const patients: Patient[] = [
    {
      id: '1',
      name: 'John Doe',
      age: 65,
      gender: 'Male',
      bedNumber: 'ICU-101',
      ward: 'Intensive Care',
      diagnosis: 'Post-Op Cardiac Surgery',
      doctorAssigned: 'Dr. Sarah Chen',
      admissionDate: new Date(Date.now() - 86400000 * 2).toISOString(),
      status: 'Normal',
      pdi: 12,
      vitals: {
        heartRate: 72,
        spO2: 98,
        respiratoryRate: 16,
        temperature: 36.8,
        lastUpdated: new Date().toISOString(),
      },
      history: [],
      notes: [],
    },
    {
      id: '2',
      name: 'Elena Rodriguez',
      age: 42,
      gender: 'Female',
      bedNumber: 'ICU-102',
      ward: 'Intensive Care',
      diagnosis: 'Acute Respiratory Distress',
      doctorAssigned: 'Dr. Michael Vance',
      admissionDate: new Date(Date.now() - 86400000).toISOString(),
      status: 'Critical',
      pdi: 84,
      vitals: {
        heartRate: 115,
        spO2: 89,
        respiratoryRate: 28,
        temperature: 38.5,
        lastUpdated: new Date().toISOString(),
      },
      history: [],
      notes: [],
    },
    {
      id: '3',
      name: 'Robert Wilson',
      age: 78,
      gender: 'Male',
      bedNumber: 'W-304',
      ward: 'General Ward',
      diagnosis: 'Pneumonia',
      doctorAssigned: 'Dr. Sarah Chen',
      admissionDate: new Date(Date.now() - 86400000 * 5).toISOString(),
      status: 'Warning',
      pdi: 56,
      vitals: {
        heartRate: 92,
        spO2: 94,
        respiratoryRate: 22,
        temperature: 37.9,
        lastUpdated: new Date().toISOString(),
      },
      history: [],
      notes: [],
    },
    {
      id: '4',
      name: 'Amina Khan',
      age: 29,
      gender: 'Female',
      bedNumber: 'W-305',
      ward: 'General Ward',
      diagnosis: 'Post-Trauma Observation',
      doctorAssigned: 'Dr. Michael Vance',
      admissionDate: new Date(Date.now() - 3600000 * 12).toISOString(),
      status: 'Normal',
      pdi: 8,
      vitals: {
        heartRate: 68,
        spO2: 99,
        respiratoryRate: 14,
        temperature: 36.6,
        lastUpdated: new Date().toISOString(),
      },
      history: [],
      notes: [],
    },
  ];

  // Generate some history for each patient
  return patients.map(p => ({
    ...p,
    history: Array.from({ length: 20 }).map((_, i) => ({
      timestamp: new Date(Date.now() - (20 - i) * 300000).toISOString(),
      heartRate: p.vitals.heartRate + (Math.random() * 10 - 5),
      spO2: Math.min(100, p.vitals.spO2 + (Math.random() * 4 - 2)),
      pdi: Math.max(0, p.pdi + (Math.random() * 10 - 5)),
    })),
  }));
};

export const updatePatientVitals = (patient: Patient): Patient => {
  const hrChange = Math.random() * 4 - 2;
  const spo2Change = Math.random() * 2 - 1;
  const rrChange = Math.random() * 2 - 1;
  const tempChange = Math.random() * 0.2 - 0.1;

  const newVitals: Vitals = {
    heartRate: Math.round(patient.vitals.heartRate + hrChange),
    spO2: Math.min(100, Math.max(70, Math.round(patient.vitals.spO2 + spo2Change))),
    respiratoryRate: Math.round(patient.vitals.respiratoryRate + rrChange),
    temperature: Number((patient.vitals.temperature + tempChange).toFixed(1)),
    lastUpdated: new Date().toISOString(),
  };

  // Calculate new PDI based on vitals
  let pdi = 0;
  if (newVitals.heartRate > 100 || newVitals.heartRate < 50) pdi += 20;
  if (newVitals.spO2 < 92) pdi += 30;
  if (newVitals.spO2 < 88) pdi += 20;
  if (newVitals.respiratoryRate > 24 || newVitals.respiratoryRate < 10) pdi += 20;
  if (newVitals.temperature > 38.5 || newVitals.temperature < 35.5) pdi += 10;
  
  // Add some randomness to PDI
  pdi = Math.min(100, Math.max(0, pdi + Math.floor(Math.random() * 10)));

  let status: RiskLevel = 'Normal';
  if (pdi > 70) status = 'Critical';
  else if (pdi > 40) status = 'Warning';

  const newHistory = [
    ...patient.history.slice(-29),
    {
      timestamp: newVitals.lastUpdated,
      heartRate: newVitals.heartRate,
      spO2: newVitals.spO2,
      pdi: pdi,
    },
  ];

  return {
    ...patient,
    vitals: newVitals,
    pdi,
    status,
    history: newHistory,
  };
};
