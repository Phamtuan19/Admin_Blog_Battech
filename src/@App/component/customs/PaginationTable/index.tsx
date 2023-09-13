import React, { useState } from 'react';
import Pagination from '../../../../@Core/component/Pagination';
import { boolean } from 'yup';
import { useSearchParams } from 'react-router-dom';

interface TypePaginationTable {
   currentPage?: number;
   totalPage?: number;
   totalItem?: number;
   callBackIsFetch?: Function;
}

const TOTALOPTIONS = [10, 20, 30, 40, 50];

function PaginationTable(props: TypePaginationTable) {
   const [searchParams, setSearchParams] = useSearchParams();

   const [currentPage, setPage] = useState<number>(props.currentPage || Number(searchParams.get('page')) || 1);
   const [totalPage, setTotalPage] = useState<number>(props.totalPage || 1);
   const [totalItemPage, setTotalItemPage] = useState<number>(props.totalItem || 10);

   return (
      <div className="w-full bg-[#E3E5E8] h-[50px] flex items-center justify-between px-3">
         <div className="">
            <select
               name=""
               value={totalItemPage}
               className="px-3 py-1 rounded-md outline-none"
               onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setSearchParams({ totalItemPage: String(e.target.value) });
                  setTotalItemPage(e.target.value as any);
               }}
            >
               {TOTALOPTIONS.map((option) => (
                  <option key={option} value={option}>
                     {option}
                  </option>
               ))}
            </select>
         </div>

         <div className="">
            <Pagination
               currentPage={currentPage}
               totalPage={10}
               perPage={searchParams.get('perPage') as any}
               onClick={setPage}
            />
         </div>
      </div>
   );
}
export default React.memo(PaginationTable);
