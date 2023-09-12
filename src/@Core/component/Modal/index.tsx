/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import cn from '../../helpers/cn';
import Button from '../Button';

interface TypeModal {
   open: boolean;
   children: React.ReactNode;
}

function Modal(props: TypeModal) {
   const { open, children } = props;

   return (
      <>
         {open ? (
            <div
               className={cn('fixed top-0 left-0 right-0 bottom-0 w-full h-[100vh] z- bg-[#00000080] overflow-hidden')}
            >
               <div className="h-full w-full">
                  <div className="h-full flex justify-center items-center">
                     <div className=" bg-white rounded-[32px]">{children}</div>
                  </div>
               </div>
            </div>
         ) : (
            <></>
         )}
      </>
   );
}
export default React.memo(Modal);
