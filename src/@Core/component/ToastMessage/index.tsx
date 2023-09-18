import cn from '../../helpers/cn';
import { useToastMessage } from '../../../@App/redux/slice/toastMessage.slice';
import React, { useEffect } from 'react';

const CONFIGSTATUS: string[] = ['success', 'error', 'info', 'warning'];

interface ToastMessageProps {
   closeTime?: number;
}

function ToastMessage(props: ToastMessageProps) {
   const { closeTime } = props;

   const { toastMessage, setToastMessage } = useToastMessage();

   const handleClose = () => {
      setToastMessage(null, 'info');
   };

   useEffect(() => {
      if (toastMessage.message) {
         const timeOutCloseToastMessage = setTimeout(() => {
            setToastMessage(null, 'info');
         }, closeTime || 3500);

         return () => {
            clearTimeout(timeOutCloseToastMessage);
         };
      }

      return;
   }, [toastMessage]);

   return (
      <React.Fragment>
         {toastMessage?.message && Object.keys(toastMessage).length > 0 ? (
            <div className="absolute z-[1908] top-5 right-3">
               <div
                  className={cn(
                     'mx-2 sm:mx-auto max-w-sm min-w-[250px] flex flex-row items-center justify-between p-3 text-sm leading-none font-medium rounded-xl whitespace-no-wrap text-black',
                     {
                        'bg-green-50': toastMessage.status === CONFIGSTATUS[0],
                        'bg-red-50': toastMessage.status === CONFIGSTATUS[1],
                        'bg-blue-200': toastMessage.status === CONFIGSTATUS[2],
                        'bg-yellow-50': toastMessage.status === CONFIGSTATUS[3],
                     },
                  )}
               >
                  <div className={cn('inline-flex items-center ')}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                     >
                        <path
                           fillRule="evenodd"
                           d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                           clipRule="evenodd"
                        />
                     </svg>
                     {toastMessage?.message ?? toastMessage?.message}
                  </div>
                  <span className="" onClick={handleClose}>
                     <svg
                        className="fill-current h-6 w-6 text-red-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                     >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                     </svg>
                  </span>
               </div>
            </div>
         ) : (
            <></>
         )}
      </React.Fragment>
   );
}

export default ToastMessage;
