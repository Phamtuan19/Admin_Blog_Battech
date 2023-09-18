import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider, QueryClient, focusManager } from 'react-query';

import App from './@App/App.tsx';
import './main.css';
import store from './@App/redux/store.ts';
import InitApp from './@App/component/InitApp.ts';
import CoreModalConfirmProvider from './@Core/component/Comfirm/index.tsx';

const queryClient = new QueryClient();
focusManager.setFocused(false);

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.Fragment>
      <CoreModalConfirmProvider>
         <Provider store={store}>
            <QueryClientProvider client={queryClient}>
               <Suspense fallback={<h1>...loading</h1>}>
                  <InitApp>
                     <App />
                  </InitApp>
               </Suspense>
            </QueryClientProvider>
         </Provider>
         <ToastContainer position="top-right" autoClose={3500} />
      </CoreModalConfirmProvider>
   </React.Fragment>,
);
