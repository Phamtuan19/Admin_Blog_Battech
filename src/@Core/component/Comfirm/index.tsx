import React, { createContext, useCallback, useContext, useState } from 'react';
import cn from '../../helpers/cn';
import Button from '../Button';

interface ConfirmConfig {
   isIcon?: boolean;
   title?: string | null;
   content?: string | null;
   confirmOk?: string | null;
   isButtonOk?: boolean;
   callback?: () => void;
}

interface ConfirmContextType {
   setConfirm: (configs: ConfirmConfig) => void;
}

export const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const useConfirm = () => {
   const setConfirm = useContext(ConfirmContext);
   if (!setConfirm) {
      throw new Error('useConfirm phải được sử dụng trong CoreModalConfirmProvider');
   }
   return setConfirm;
};

function CoreModalConfirmProvider(props: { children: React.ReactNode }) {
   const [open, setOpen] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const [configs, setConfigs] = useState<ConfirmConfig>({
      title: null,
      content: null,
      confirmOk: null,
      callback: () => {},
   });

   const setConfirm = useCallback(
      (config: ConfirmConfig): void => {
         setConfigs(config);
         setOpen(true);
         setLoading(false);
      },
      [configs],
   );

   const handleClose = () => {
      setOpen(false);
   };

   const handleConfirm = async () => {
      if (configs.callback) {
         try {
            setOpen(false);
            setLoading(true);
            configs.callback();
         } catch (error) {
            setOpen(false);
            setLoading(true);
         }
      }
   };

   return (
      <ConfirmContext.Provider value={{ setConfirm }}>
         {props.children}
         {open && (
            <div
               className={cn('fixed top-0 left-0 right-0 bottom-0 w-full h-[100vh] z- bg-[#00000080] overflow-hidden')}
            >
               <div className="h-full w-full">
                  <div className="h-full flex justify-center items-center">
                     <div className=" bg-white rounded-[32px]">
                        {configs.title && (
                           <div className="flex flex-col w-full h-full">
                              <h3 className="text-[1.5rem] leading-[2rem] font-normal pt-10 px-8">{configs.title}</h3>
                           </div>
                        )}
                        {configs.content && (
                           <div className="flex flex-col w-full h-full">
                              <h3 className="text-[1.2rem] leading-[2rem] font-normal pt-10 px-8">{configs.content}</h3>
                           </div>
                        )}
                        <hr className="m-3" />
                        <div className="flex gap-3 justify-end px-5 pb-3">
                           <Button
                              onClick={handleClose}
                              autoFocus
                              disabled={Boolean(loading)}
                              className={cn(' outline-none', {
                                 'bg-[#E0E0E0]': Boolean(loading),
                              })}
                           >
                              {loading ? (
                                 <svg
                                    className="animate-spin  h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                 >
                                    <circle
                                       className="opacity-25"
                                       cx="12"
                                       cy="12"
                                       r="10"
                                       stroke="currentColor"
                                       stroke-width="4"
                                    ></circle>
                                    <path
                                       className="opacity-75"
                                       fill="currentColor"
                                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                 </svg>
                              ) : (
                                 'Đóng'
                              )}
                           </Button>
                           {configs.isButtonOk && (
                              <Button
                                 onClick={handleConfirm}
                                 className={cn('bg-red-600', {
                                    'bg-[#E0E0E0]': Boolean(loading),
                                 })}
                                 disabled={Boolean(loading)}
                              >
                                 <span>{configs.confirmOk || 'Xóa'}</span>
                              </Button>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </ConfirmContext.Provider>
   );
}

export default CoreModalConfirmProvider;
