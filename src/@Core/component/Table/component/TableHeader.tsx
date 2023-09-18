import React from 'react';
import { DataRow } from '..';
import { TypeColumnHelper } from '../hook/createColumnHelper';

interface TableHeader<> {
   data?: DataRow;
   columns: TypeColumnHelper[];
}

function TableHeader(props: TableHeader): JSX.Element {
   const { columns } = props;

   return (
      <thead className="rounded-2xl border border-solid ">
         <tr className="bg-default text-white border border-solid rounded-md">
            {columns &&
               columns.map((column, index) => {
                  if (column.cell) {
                     return <ExtendThTable key={index}>{column.cell()}</ExtendThTable>;
                  }

                  return <ExtendThTable key={index}>{column.header}</ExtendThTable>;
               })}
         </tr>
      </thead>
   );
}

const ExtendThTable = (props: { children: React.ReactNode }) => {
   return (
      <th className="p-3 text-base text-center text-[#F2F5F9] border border-solid border-[#E3E5E8] ">
         {props.children}
      </th>
   );
};

export default React.memo(TableHeader);
