import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './@App/App.tsx';
import './main.css';
import { Provider } from 'react-redux';
import store from './@App/redux/store.ts';
import InitApp from './@App/component/InitApp.ts';
import { QueryClientProvider, QueryClient, focusManager } from 'react-query';

const queryClient = new QueryClient();
focusManager.setFocused(false);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.Fragment>
      <Provider store={store}>
         <QueryClientProvider client={queryClient}>
            <InitApp>
               <App />
            </InitApp>
         </QueryClientProvider>
      </Provider>
   </React.Fragment>,
);
