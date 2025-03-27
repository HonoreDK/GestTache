import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAppDispatch } from '../hooks/redux';
import { ajouterTache } from '../store/tachesSlice';

export const FormulaireTache: React.FC = () => {
  const [nouvelleTache, setNouvelleTache] = useState('');
  const dispatch = useAppDispatch();

  const gererSoumission = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(ajouterTache(nouvelleTache));
    setNouvelleTache('');
  };

  return (
    <form onSubmit={gererSoumission} className="flex gap-2">
      <input
        type="text"
        value={nouvelleTache}
        onChange={(e) => setNouvelleTache(e.target.value)}
        placeholder="Ajouter une nouvelle tâche..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Ajouter
      </button>
    </form>
  );
};