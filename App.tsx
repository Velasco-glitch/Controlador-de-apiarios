
import React, { useState, useMemo } from 'react';
import { Hive, Inspection } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import HiveListScreen from './components/HiveListScreen';
import HiveDetailScreen from './components/HiveDetailScreen';
import StatsScreen from './components/StatsScreen';
import { HomeIcon, BarChartIcon } from './components/Icons';

type View = 'LIST' | 'DETAIL' | 'STATS';

const App: React.FC = () => {
  const [hives, setHives] = useLocalStorage<Hive[]>('hives', []);
  const [view, setView] = useState<View>('LIST');
  const [selectedHiveId, setSelectedHiveId] = useState<number | null>(null);

  const addNewHive = () => {
    const newHiveId = hives.length > 0 ? Math.max(...hives.map(h => h.id)) + 1 : 1;
    const newHive: Hive = {
      id: newHiveId,
      createdAt: new Date().toISOString(),
      inspections: [],
    };
    setHives(prevHives => [...prevHives, newHive]);
  };

  const addInspection = (hiveId: number, inspection: Omit<Inspection, 'id'>) => {
    const newInspection: Inspection = {
      ...inspection,
      id: new Date().getTime().toString(),
    };
    setHives(prevHives => 
      prevHives.map(hive => 
        hive.id === hiveId 
          ? { ...hive, inspections: [newInspection, ...hive.inspections] } 
          : hive
      )
    );
  };

  const selectHive = (hiveId: number) => {
    setSelectedHiveId(hiveId);
    setView('DETAIL');
  };

  const navigateHome = () => {
    setSelectedHiveId(null);
    setView('LIST');
  };

  const selectedHive = useMemo(() => 
    hives.find(h => h.id === selectedHiveId) || null,
    [hives, selectedHiveId]
  );

  const renderContent = () => {
    switch (view) {
      case 'DETAIL':
        return selectedHive ? (
          <HiveDetailScreen 
            hive={selectedHive} 
            onBack={navigateHome}
            onAddInspection={addInspection} 
          />
        ) : null;
      case 'STATS':
        return <StatsScreen hives={hives} />;
      case 'LIST':
      default:
        return (
          <HiveListScreen 
            hives={hives} 
            onSelectHive={selectHive} 
            onAddHive={addNewHive} 
          />
        );
    }
  };
  
  return (
    <div className="min-h-screen font-sans bg-slate-100 text-slate-800">
      <div className="container mx-auto max-w-lg h-screen flex flex-col">
        <header className="bg-amber-400 text-white p-4 text-center shadow-md">
          <h1 className="text-2xl font-bold">Apiary Manager</h1>
        </header>
        
        <main className="flex-grow overflow-y-auto p-4 pb-20">
          {renderContent()}
        </main>
        
        <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-slate-200 shadow-t-md">
          <div className="flex justify-around items-center h-16">
            <button 
              onClick={navigateHome} 
              className={`flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-colors ${view === 'LIST' || view === 'DETAIL' ? 'text-amber-500' : 'text-slate-500 hover:text-amber-500'}`}
            >
              <HomeIcon className="w-6 h-6 mb-1" />
              <span>Colmenas</span>
            </button>
            <button 
              onClick={() => setView('STATS')}
              className={`flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-colors ${view === 'STATS' ? 'text-amber-500' : 'text-slate-500 hover:text-amber-500'}`}
            >
              <BarChartIcon className="w-6 h-6 mb-1" />
              <span>Estadísticas</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default App;
