import React from 'react';

function index(props: { columns: Array<string> }) {
   return (
      <thead className="rounded-2xl border border-solid">
         <tr className="bg-default text-white border border-solid rounded-md">
            <th>
               <input type="checkbox" className="w-[15px] h-[15px]" />
            </th>
            {props.columns.map((column, index) => (
               <th
                  key={index}
                  className="p-3 text-base text-center text-[#F2F5F9] border border-solid border-[#E3E5E8] "
               >
                  {column}
               </th>
            ))}
         </tr>
      </thead>
   );
}
export default React.memo(index);
