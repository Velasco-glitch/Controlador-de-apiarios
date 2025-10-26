
export type PopulationLevel = 'low' | 'medium' | 'high';
export const POPULATION_LEVELS: PopulationLevel[] = ['low', 'medium', 'high'];

export type BroodState = 'healthy' | 'patchy' | 'diseased';
export const BROOD_STATES: BroodState[] = ['healthy', 'patchy', 'diseased'];

export interface Inspection {
  id: string;
  date: string;
  queenPresent: boolean;
  population: PopulationLevel;
  broodState: BroodState;
  honeyStoresKg: number;
  diseaseNotes: string;
  varroaDetected: boolean;
  notes: string;
}

export interface Hive {
  id: number;
  createdAt: string;
  inspections: Inspection[];
}
