import React from 'react';
import PaginationTable from '../PaginationTable';

function index(props: { totalPage: number; colSpan: number }) {
   return (
      <tfoot>
         <tr>
            <th colSpan={props.colSpan}>
               <PaginationTable totalPage={props.totalPage} />
            </th>
         </tr>
      </tfoot>
   );
}
export default React.memo(index);
