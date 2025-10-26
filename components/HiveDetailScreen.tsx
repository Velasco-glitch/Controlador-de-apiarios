
import React, { useState } from 'react';
import { Hive, Inspection } from '../types';
import InspectionModal from './InspectionModal';
import { ChevronLeftIcon, PlusIcon, CrownIcon, BeeIcon, HeartPulseIcon, HoneyPotIcon, BugIcon, BookOpenIcon } from './Icons';

interface HiveDetailScreenProps {
  hive: Hive;
  onBack: () => void;
  onAddInspection: (hiveId: number, inspection: Omit<Inspection, 'id'>) => void;
}

const InspectionCard: React.FC<{ inspection: Inspection }> = ({ inspection }) => (
    <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
        <p className="text-sm font-semibold text-slate-700 mb-2">{new Date(inspection.date).toLocaleString()}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600">
            <div className="flex items-center space-x-2"><CrownIcon className={`w-4 h-4 ${inspection.queenPresent ? 'text-green-500' : 'text-red-500'}`} /><span>Reina: {inspection.queenPresent ? 'Presente' : 'Ausente'}</span></div>
            <div className="flex items-center space-x-2"><BeeIcon className="w-4 h-4 text-slate-500" /><span>Población: {inspection.population}</span></div>
            <div className="flex items-center space-x-2"><HeartPulseIcon className="w-4 h-4 text-slate-500" /><span>Crías: {inspection.broodState}</span></div>
            <div className="flex items-center space-x-2"><HoneyPotIcon className="w-4 h-4 text-slate-500" /><span>Miel: {inspection.honeyStoresKg} kg</span></div>
            <div className="flex items-center space-x-2"><BugIcon className={`w-4 h-4 ${inspection.varroaDetected ? 'text-red-500' : 'text-green-500'}`} /><span>Varroa: {inspection.varroaDetected ? 'Sí' : 'No'}</span></div>
        </div>
        {inspection.diseaseNotes && <p className="mt-2 text-sm text-amber-800 bg-amber-100 p-2 rounded">Enfermedad: {inspection.diseaseNotes}</p>}
        {inspection.notes && <p className="mt-2 text-sm text-slate-500 flex items-start space-x-2"><BookOpenIcon className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>Notas: {inspection.notes}</span></p>}
    </div>
);


const HiveDetailScreen: React.FC<HiveDetailScreenProps> = ({ hive, onBack, onAddInspection }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddInspection = (inspection: Omit<Inspection, 'id'>) => {
    onAddInspection(hive.id, inspection);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200 mr-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">Colmena #{hive.id}</h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-600 border-b pb-2">Historial de Inspecciones</h3>
        {hive.inspections.length > 0 ? (
          hive.inspections.map(insp => <InspectionCard key={insp.id} inspection={insp} />)
        ) : (
          <p className="text-slate-500 text-center py-4 bg-white rounded-lg">No hay inspecciones para esta colmena.</p>
        )}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-4 bg-amber-500 hover:bg-amber-600 text-white font-bold p-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
        aria-label="Añadir nueva inspección"
      >
        <PlusIcon className="w-8 h-8" />
      </button>

      {isModalOpen && (
        <InspectionModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddInspection}
        />
      )}
    </div>
  );
};

export default HiveDetailScreen;
