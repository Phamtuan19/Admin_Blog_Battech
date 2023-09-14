import React from 'react';
import { DataRow, TableColumn } from '..';

interface TableHeader {
   data?: DataRow;
   columns: TableColumn[];
}

function TableHeader(props: TableHeader): JSX.Element {
   const { columns } = props;
   console.log(columns);

   return (
      <thead className="rounded-2xl border border-solid ">
         <tr className="bg-default text-white border border-solid rounded-md">
            {columns &&
               columns.map((column, index) => {
                  return (
                     <th
                        key={index}
                        className="p-3 text-base text-center text-[#F2F5F9] border border-solid border-[#E3E5E8] "
                     >
                        {column.headerName}
                     </th>
                  );
               })}
         </tr>
      </thead>
   );
}
export default React.memo(TableHeader);
