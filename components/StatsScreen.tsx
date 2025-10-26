
import React, { useMemo } from 'react';
import { Hive, PopulationLevel } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
// FIX: Import BarChartIcon to resolve 'Cannot find name' error.
import { BarChartIcon } from './Icons';

interface StatsScreenProps {
  hives: Hive[];
}

const populationToNumber = (level: PopulationLevel): number => {
    if (level === 'low') return 1;
    if (level === 'medium') return 2;
    if (level === 'high') return 3;
    return 0;
};

const numberToPopulation = (num: number): string => {
    if (num === 1) return 'Baja';
    if (num === 2) return 'Media';
    if (num === 3) return 'Alta';
    return '';
};


const StatsScreen: React.FC<StatsScreenProps> = ({ hives }) => {
    const totalHoney = useMemo(() => 
        hives.reduce((total, hive) => 
            total + hive.inspections.reduce((hiveTotal, insp) => hiveTotal + insp.honeyStoresKg, 0)
        , 0), [hives]);

    const honeyProductionData = useMemo(() => 
        hives.map(hive => ({
            name: `Colmena ${hive.id}`,
            miel: hive.inspections.reduce((sum, insp) => sum + insp.honeyStoresKg, 0)
        })).filter(d => d.miel > 0), [hives]);

    const populationTrendData = useMemo(() => {
        const dataByDate: { [key: string]: any } = {};
        hives.forEach(hive => {
            hive.inspections.forEach(insp => {
                const date = new Date(insp.date).toLocaleDateString();
                if (!dataByDate[date]) {
                    dataByDate[date] = { date };
                }
                dataByDate[date][`Colmena ${hive.id}`] = populationToNumber(insp.population);
            });
        });
        return Object.values(dataByDate).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [hives]);
    
    const healthStatusData = useMemo(() => {
        let healthy = 0;
        let varroa = 0;
        let disease = 0;
        hives.forEach(hive => {
            const latest = hive.inspections[0];
            if (latest) {
                if (latest.varroaDetected) varroa++;
                else if (latest.diseaseNotes.trim() !== '') disease++;
                else healthy++;
            }
        });
        return [
            { name: 'Sanas', value: healthy },
            { name: 'Con Varroa', value: varroa },
            { name: 'Con Enfermedad', value: disease }
        ].filter(d => d.value > 0);
    }, [hives]);

    const COLORS = ['#4ade80', '#facc15', '#f87171'];

    if (hives.length === 0) {
        return <div className="text-center py-10 px-4 bg-white rounded-lg shadow">
            <BarChartIcon className="mx-auto w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-700">No hay datos para mostrar</h3>
            <p className="text-slate-500 mt-1">Añade colmenas e inspecciones para ver las estadísticas.</p>
        </div>;
    }

    return (
        <div className="space-y-8">
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-slate-700 mb-1">Resumen del Apiario</h3>
                <p className="text-slate-600">Total de Colmenas: <span className="font-bold">{hives.length}</span></p>
                <p className="text-slate-600">Producción Total de Miel: <span className="font-bold">{totalHoney} kg</span></p>
            </div>
            
            {honeyProductionData.length > 0 && <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Producción de Miel por Colmena (kg)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={honeyProductionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="miel" fill="#f59e0b" />
                    </BarChart>
                </ResponsiveContainer>
            </div>}

            {populationTrendData.length > 0 && <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Tendencia de Población</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={populationTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 3]} tickFormatter={numberToPopulation} ticks={[1,2,3]}/>
                        <Tooltip formatter={(value: number) => numberToPopulation(value)} />
                        <Legend />
                        {hives.map((hive, i) => (
                            <Line key={hive.id} type="monotone" dataKey={`Colmena ${hive.id}`} stroke={`hsl(${i * 60}, 70%, 50%)`} connectNulls />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>}

            {healthStatusData.length > 0 && <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Estado de Salud del Apiario</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={healthStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                            {healthStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>}
        </div>
    );
};

export default StatsScreen;