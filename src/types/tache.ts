export interface Tache {
  id: string;
  texte: string;
  terminee: boolean;
}

export type FiltreTaches = 'toutes' | 'actives' | 'terminees';