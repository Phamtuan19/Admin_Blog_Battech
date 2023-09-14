import { BrowserRouter } from 'react-router-dom';
import Routers from './routes';
import { useAuth } from './redux/slice/auth.slice';
import LazyLoadingFullScreen from './component/LazyLoadingFullScreen';

function App() {
   const { auth } = useAuth();
   if (!auth.isInitialized) return <LazyLoadingFullScreen />;

   return (
      
         <BrowserRouter>
            <Routers />
         </BrowserRouter>
   );
}

export default App;
