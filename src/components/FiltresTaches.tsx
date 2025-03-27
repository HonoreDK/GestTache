import React from 'react';
import { FiltreTaches } from '../types/tache';

interface Props {
  filtre: FiltreTaches;
  changerFiltre: (filtre: FiltreTaches) => void;
}

export const FiltresTaches: React.FC<Props> = ({ filtre, changerFiltre }) => {
  return (
    <div className="flex justify-center gap-4">
      {[
        { valeur: 'toutes', label: 'Toutes' },
        { valeur: 'actives', label: 'Actives' },
        { valeur: 'terminees', label: 'Terminées' },
      ].map((option) => (
        <button
          key={option.valeur}
          onClick={() => changerFiltre(option.valeur as FiltreTaches)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filtre === option.valeur
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};