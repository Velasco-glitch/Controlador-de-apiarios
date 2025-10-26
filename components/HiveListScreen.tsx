
import React from 'react';
import { Hive } from '../types';
import { PlusIcon, BeeIcon, HoneyPotIcon, BugIcon } from './Icons';

interface HiveListScreenProps {
  hives: Hive[];
  onSelectHive: (hiveId: number) => void;
  onAddHive: () => void;
}

const HiveCard: React.FC<{ hive: Hive; onSelect: () => void }> = ({ hive, onSelect }) => {
  const latestInspection = hive.inspections[0];
  const populationColor = {
    low: 'bg-red-200 text-red-800',
    medium: 'bg-yellow-200 text-yellow-800',
    high: 'bg-green-200 text-green-800',
  };

  return (
    <div onClick={onSelect} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-slate-200">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className="bg-amber-100 p-2 rounded-full mr-3">
            <BeeIcon className="w-6 h-6 text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-700">Colmena #{hive.id}</h2>
        </div>
        {latestInspection && (
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${populationColor[latestInspection.population]}`}>
            {latestInspection.population === 'low' ? 'Baja' : latestInspection.population === 'medium' ? 'Media' : 'Alta'}
          </span>
        )}
      </div>
      {latestInspection ? (
        <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
          <div className="flex items-center space-x-2">
            <HoneyPotIcon className="w-4 h-4 text-slate-400" />
            <span>Miel: {latestInspection.honeyStoresKg} kg</span>
          </div>
           <div className="flex items-center space-x-2">
            <BugIcon className={`w-4 h-4 ${latestInspection.varroaDetected ? 'text-red-500' : 'text-slate-400'}`} />
            <span>Varroa: {latestInspection.varroaDetected ? 'Sí' : 'No'}</span>
          </div>
          <p className="col-span-2 text-xs text-slate-400 mt-2">
            Última inspección: {new Date(latestInspection.date).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Sin inspecciones todavía.</p>
      )}
    </div>
  );
};


const HiveListScreen: React.FC<HiveListScreenProps> = ({ hives, onSelectHive, onAddHive }) => {
  return (
    <div className="space-y-4">
      {hives.length === 0 ? (
        <div className="text-center py-10 px-4 bg-white rounded-lg shadow">
          <BeeIcon className="mx-auto w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-700">No hay colmenas registradas</h3>
          <p className="text-slate-500 mt-1">¡Añade tu primera colmena para empezar!</p>
        </div>
      ) : (
        hives.map(hive => (
          <HiveCard key={hive.id} hive={hive} onSelect={() => onSelectHive(hive.id)} />
        ))
      )}
      
      <button 
        onClick={onAddHive}
        className="fixed bottom-20 right-4 bg-amber-500 hover:bg-amber-600 text-white font-bold p-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
        aria-label="Añadir nueva colmena"
      >
        <PlusIcon className="w-8 h-8" />
      </button>
    </div>
  );
};

export default HiveListScreen;
