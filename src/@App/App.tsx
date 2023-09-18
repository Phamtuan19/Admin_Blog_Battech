import { BrowserRouter } from 'react-router-dom';
import Routers from './routes';
import { useAuth } from './redux/slice/auth.slice';
import LazyLoadingFullScreen from './component/LazyLoadingFullScreen';
import ToastMessage from '../@Core/component/ToastMessage';

function App() {
   const { auth } = useAuth();
   if (!auth.isInitialized) return <LazyLoadingFullScreen />;

   return (
      <BrowserRouter>
         <Routers />
         <ToastMessage />
      </BrowserRouter>
   );
}

export default App;
