import React from 'react';
import { DataRow } from '..';
import { TypeColumnHelper } from '../hook/createColumnHelper';

function TableBody(props: { data: DataRow[]; columns: TypeColumnHelper[] }) {
   const { data, columns } = props;

   return (
      <tbody>
         {data.length > 0 &&
            data.map((row, index) => {
               return (
                  <tr key={index}>
                     {columns.map((column, index) => {
                        if (column.render) {
                           return (
                              <th key={index} className="p-3  border border-solid border-[#E3E5E8]">
                                 {column.render(row, index)}
                              </th>
                           );
                        }
                        return (
                           <th key={index} className="p-3  border border-solid border-[#E3E5E8]">
                              {row[column.id]}
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
