import React from 'react';
import ExtendTdTable from '../../../component/customs/Table/components/ExtendTdTable';

function index(props: { columns: string[] }) {
   const rows = Array.from({ length: 3 }, (_, index) => index + 1);

   return rows.map((row) => {
      return (
         <tr key={row}>
            <ExtendTdTable className="p-2">
               <div className="animate-pulse">
                  <div className="flex-1 space-y-6 py-1 h-10">
                     <div className="h-full bg-slate-200 rounded"></div>
                  </div>
               </div>
            </ExtendTdTable>
            {props.columns.map((_, index) => {
               return (
                  <ExtendTdTable className="p-2" key={index}>
                     <div className="animate-pulse">
                        <div className="flex-1 space-y-6 py-1 h-10">
                           <div className="h-full bg-slate-200 rounded"></div>
                        </div>
                     </div>
                  </ExtendTdTable>
               );
            })}
         </tr>
      );
   });
}
export default React.memo(index);
