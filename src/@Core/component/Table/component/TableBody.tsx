import React from 'react';
import { DataRow, TableColumn } from '..';

function TableBody(props: { data: DataRow[]; columns: TableColumn[] }) {
   const { data, columns } = props;

   return (
      <tbody>
         {data.length > 0 &&
            data.map((row, index) => {
               return (
                  <tr key={index}>
                     {columns.map((column, index) => {
                        return (
                           <th key={index} className="p-3  border border-solid border-[#E3E5E8]">
                              {row[column.headerItem]}
                           </th>
                        );
                     })}
                  </tr>
               );
            })}
      </tbody>
   );
}
export default React.memo(TableBody);
