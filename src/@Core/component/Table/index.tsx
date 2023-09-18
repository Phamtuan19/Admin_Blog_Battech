import React from 'react';
import TableHeader from './component/TableHeader';
import TableBody from './component/TableBody';
import Button from '../Button';

import search from './image/search.svg';
import filter from './image/filter.svg';
import { TypeColumnHelper } from './hook/createColumnHelper';

export interface DataRow {
   [key: string]: any;
}

type TypeTableProps = React.ComponentProps<'table'> & {
   data: DataRow[] | [];
   columns: TypeColumnHelper[];
};

// interface TypeTableProps<TData> {
//    data: Array<TData>;
//    columns: Array<TData>;
// }

function TableCustom(props: TypeTableProps) {
   const { data, columns } = props;
   console.log(columns);
   return (
      <div className="my-4 rounded-2xl ">
         <div className="mb-2 flex gap-3">
            <Button className="bg-white border border-solid border-[#9D9D9D]">
               <img src={search} alt="" />
            </Button>
            <Button className="bg-white border border-solid border-[#9D9D9D] text-black flex gap-2">
               <img src={filter} alt="" />
               <span className="text-sm">Bộ lọc</span>
            </Button>
         </div>
         <table className="w-full border-collapse bg-white border border-solid border-[#E3E5E8] ">
            <TableHeader data={data} columns={columns} />
            <TableBody data={data} columns={columns || []} />
         </table>
      </div>
   );
}
export default TableCustom;
