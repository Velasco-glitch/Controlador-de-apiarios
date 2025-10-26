
import React, { useState } from 'react';
import { Inspection, POPULATION_LEVELS, BROOD_STATES, PopulationLevel, BroodState } from '../types';

interface InspectionModalProps {
  onClose: () => void;
  onSave: (inspection: Omit<Inspection, 'id'>) => void;
}

const InspectionModal: React.FC<InspectionModalProps> = ({ onClose, onSave }) => {
  const [queenPresent, setQueenPresent] = useState(true);
  const [population, setPopulation] = useState<PopulationLevel>('medium');
  const [broodState, setBroodState] = useState<BroodState>('healthy');
  const [honeyStoresKg, setHoneyStoresKg] = useState(0);
  const [diseaseNotes, setDiseaseNotes] = useState('');
  const [varroaDetected, setVarroaDetected] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      date: new Date().toISOString(),
      queenPresent,
      population,
      broodState,
      honeyStoresKg,
      diseaseNotes,
      varroaDetected,
      notes,
    });
  };
  
  const populationTextMap: Record<PopulationLevel, string> = { low: 'Baja', medium: 'Media', high: 'Alta' };
  const broodStateTextMap: Record<BroodState, string> = { healthy: 'Sana', patchy: 'Irregular', diseased: 'Enferma' };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-full overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Nueva Inspección</h2>
            <div className="space-y-4">
              {/* Queen & Varroa */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Reina Presente</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <button type="button" onClick={() => setQueenPresent(true)} className={`px-4 py-2 text-sm font-medium rounded-l-md w-full ${queenPresent ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'}`}>Sí</button>
                        <button type="button" onClick={() => setQueenPresent(false)} className={`px-4 py-2 text-sm font-medium rounded-r-md w-full ${!queenPresent ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'}`}>No</button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Varroa Detectada</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <button type="button" onClick={() => setVarroaDetected(true)} className={`px-4 py-2 text-sm font-medium rounded-l-md w-full ${varroaDetected ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'}`}>Sí</button>
                        <button type="button" onClick={() => setVarroaDetected(false)} className={`px-4 py-2 text-sm font-medium rounded-r-md w-full ${!varroaDetected ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'}`}>No</button>
                    </div>
                </div>
              </div>

              {/* Population */}
              <div>
                <label className="block text-sm font-medium text-slate-700">Población</label>
                <div className="mt-1 grid grid-cols-3 gap-1 rounded-md shadow-sm">
                    {POPULATION_LEVELS.map(level => (
                        <button type="button" key={level} onClick={() => setPopulation(level)} className={`px-4 py-2 text-sm font-medium first:rounded-l-md last:rounded-r-md ${population === level ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'}`}>{populationTextMap[level]}</button>
                    ))}
                </div>
              </div>
              
              {/* Brood State */}
              <div>
                <label className="block text-sm font-medium text-slate-700">Estado de Crías</label>
                <div className="mt-1 grid grid-cols-3 gap-1 rounded-md shadow-sm">
                    {BROOD_STATES.map(state => (
                        <button type="button" key={state} onClick={() => setBroodState(state)} className={`px-4 py-2 text-sm font-medium first:rounded-l-md last:rounded-r-md ${broodState === state ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'}`}>{broodStateTextMap[state]}</button>
                    ))}
                </div>
              </div>

              {/* Honey Stores */}
              <div>
                <label htmlFor="honey" className="block text-sm font-medium text-slate-700">Miel Almacenada (kg)</label>
                <input type="number" id="honey" value={honeyStoresKg} onChange={e => setHoneyStoresKg(Number(e.target.value))} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm" />
              </div>

              {/* Disease Notes */}
              <div>
                <label htmlFor="disease" className="block text-sm font-medium text-slate-700">Signos de Enfermedad</label>
                <input type="text" id="disease" value={diseaseNotes} onChange={e => setDiseaseNotes(e.target.value)} placeholder="Ej: loque, pollo escayolado" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm" />
              </div>
              
              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notas Adicionales</label>
                <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"></textarea>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
            <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-500 text-base font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm">
              Guardar
            </button>
            <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InspectionModal;
