import React from 'react';
import Pagination from '../../../../@Core/component/Pagination';
import useSearchParamFilterTableUrl from '../../../../@Core/component/Pagination/hook/useSearchParamFilterTableUrl';

const TOTALOPTIONS = [10, 20, 30, 40, 50];

function PaginationTable(props: { totalPage: number }) {
   const { limit, setLimit } = useSearchParamFilterTableUrl();

   return (
      <div className="w-full bg-[#E3E5E8] h-[50px] flex items-center justify-between px-3">
         <div className="">
            <select
               name=""
               value={limit}
               className="px-3 py-1 rounded-md outline-none"
               onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setLimit(e.target.value as any);
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
            <Pagination totalPage={props.totalPage} />
         </div>
      </div>
   );
}
export default React.memo(PaginationTable);
