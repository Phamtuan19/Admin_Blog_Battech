import React from 'react';
import TableHeader from './component/TableHeader';
import TableBody from './component/TableBody';
import Button from '../Button';

import search from './image/search.svg';
import filter from './image/filter.svg';

export interface DataRow {
   [key: string]: any;
}

export type TableColumn = {
   headerItem: string;
   headerName?: string;
   render?: (props: any) => React.ReactNode;
};

type TypeTableProps = React.ComponentProps<'table'> & {
   data: DataRow[];
   columns: Array<TableColumn>;
};

function Table(props: TypeTableProps) {
   const { data, columns } = props;

   const dataTable = [data, columns];

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
            <TableBody data={data} columns={columns} />
         </table>
      </div>
   );
}
export default Table;
