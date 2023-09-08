import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './@App/App.tsx';
import './main.css';
import { Provider } from 'react-redux';
import store from './@App/redux/store.ts';
import InitApp from './@App/component/InitApp.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.Fragment>
      <Provider store={store}>
         <InitApp>
            <App />
         </InitApp>
      </Provider>
   </React.Fragment>,
);
