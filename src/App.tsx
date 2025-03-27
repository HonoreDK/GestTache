import react,{useState} from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { ListeTaches } from './components/ListeTaches';
import { FormulaireTache } from './components/FormulaireTache';
import { FiltresTaches } from './components/FiltresTaches';
import { store } from './store/store';
import { FiltreTaches } from './types/tache';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useAppDispatch } from './hooks/redux';
import { supprimerTachesTerminees } from './store/tachesSlice';
import { Trash2 } from 'lucide-react';

const AppContent = () => {
  const [filtre, setFiltre] = useState<FiltreTaches>('toutes');
  const taches = useSelector((state: RootState) => state.taches.taches);
  const dispatch = useAppDispatch();

  const tachesActives = taches.filter((t) => !t.terminee);
  const tachesTerminees = taches.filter((t) => t.terminee);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Ma Liste de Tâches
          </h1>

          <FormulaireTache />

          <div className="my-6">
            <FiltresTaches filtre={filtre} changerFiltre={setFiltre} />
          </div>

          <div className="mb-4 flex justify-between items-center text-sm text-gray-600">
            <span>{tachesActives.length} tâches restantes</span>
            {tachesTerminees.length > 0 && (
              <button
                onClick={() => dispatch(supprimerTachesTerminees())}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer les tâches terminées
              </button>
            )}
          </div>

          <ListeTaches filtre={filtre} />
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;