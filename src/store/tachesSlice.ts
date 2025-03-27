import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tache } from '../types/tache';
import toast from 'react-hot-toast';

interface EtatTaches {
  taches: Tache[];
}

const etatInitial: EtatTaches = {
  taches: [],
};

const tachesSlice = createSlice({
  name: 'taches',
  initialState: etatInitial,
  reducers: {
    ajouterTache: (state, action: PayloadAction<string>) => {
      const texte = action.payload.trim();
      const tacheExiste = state.taches.some((tache) => tache.texte === texte);

      if (!texte) {
        toast.error('La tâche ne peut pas être vide !');
        return;
      }

      if (tacheExiste) {
        toast.error('Cette tâche existe déjà !');
        return;
      }

      state.taches.push({
        id: Date.now().toString(),
        texte,
        terminee: false,
      });
      toast.success('Tâche ajoutée !');
    },
    supprimerTache: (state, action: PayloadAction<string>) => {
      state.taches = state.taches.filter((tache) => tache.id !== action.payload);
      toast.success('Tâche supprimée !');
    },
    basculerTache: (state, action: PayloadAction<string>) => {
      const tache = state.taches.find((t) => t.id === action.payload);
      if (tache) {
        tache.terminee = !tache.terminee;
      }
    },
    supprimerTachesTerminees: (state) => {
      const nombreTachesTerminees = state.taches.filter((t) => t.terminee).length;
      if (nombreTachesTerminees === 0) {
        toast.error('Aucune tâche terminée à supprimer !');
        return;
      }
      state.taches = state.taches.filter((tache) => !tache.terminee);
      toast.success('Tâches terminées supprimées !');
    },
  },
});

export const {
  ajouterTache,
  supprimerTache,
  basculerTache,
  supprimerTachesTerminees,
} = tachesSlice.actions;
export default tachesSlice.reducer;