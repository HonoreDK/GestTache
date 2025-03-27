import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, CheckCircle, Circle } from 'lucide-react';
import { RootState } from '../store/store';
import { useAppDispatch } from '../hooks/redux';
import { supprimerTache, basculerTache } from '../store/tachesSlice';
import { FiltreTaches, Tache } from '../types/tache';

interface Props {
  filtre: FiltreTaches;
}

export const ListeTaches: React.FC<Props> = ({ filtre }) => {
  const taches = useSelector((state: RootState) => state.taches.taches);
  const dispatch = useAppDispatch();

  const tachesFiltrees = taches.filter((tache) => {
    if (filtre === 'actives') return !tache.terminee;
    if (filtre === 'terminees') return tache.terminee;
    return true;
  });

  return (
    <AnimatePresence>
      <ul className="space-y-2">
        {tachesFiltrees.map((tache: Tache) => (
          <motion.li
            key={tache.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch(basculerTache(tache.id))}
                className="text-gray-500 hover:text-green-500 transition-colors"
              >
                {tache.terminee ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>
              <span
                className={`${
                  tache.terminee ? 'line-through text-gray-400' : 'text-gray-700'
                }`}
              >
                {tache.texte}
              </span>
            </div>
            <button
              onClick={() => dispatch(supprimerTache(tache.id))}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  );
};