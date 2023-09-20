import React from 'react';
import PaginationItem from './component/PaginationItem';
import useSearchParamFilterTableUrl from './hook/useSearchParamFilterTableUrl';
import { PaginationPrev, PaginationNext } from '.';

export function Pagination(props: { totalPage: number }) {
   const { totalPage } = props;
   // console.log(totalPage);
   const totalPage = 10;

   const { setPage, page: currentPage } = useSearchParamFilterTableUrl();

   const perPage = 2;

   function generatePageRange() {
      var range = [];
      for (let i = Math.max(2, currentPage - perPage); i <= Math.min(totalPage - 1, currentPage + perPage); i += 1) {
         range.push(i);
      }

      if (currentPage - perPage > 2) {
         if (range.length == totalPage - 3) {
            range.unshift(2);
         } else {
            range.unshift('...');
         }
      }

      if (currentPage + perPage < totalPage - 1) {
         if (range.length == totalPage - 3) {
            range.push(totalPage - 1);
         } else {
            range.push('...');
         }
      }

      range.unshift(1);
      if (totalPage !== 1) range.push(totalPage);

      return range;
   }
   return (
      <div className="flex items-center">
         <PaginationPrev
            active={Boolean(currentPage <= 1)}
            currentPage={currentPage}
            onClick={() => {
               setPage(String(currentPage - 1));
            }}
         />
         {generatePageRange().map((page: any, index: any) => (
            <PaginationItem
               key={index}
               active={Boolean(currentPage === page)}
               children={page}
               onClick={() => {
                  setPage(String(page));
               }}
            />
         ))}
         <PaginationNext
            active={Boolean(currentPage >= props.totalPage)}
            currentPage={currentPage}
            onClick={() => {
               setPage(String(currentPage + 1));
            }}
         />
      </div>
   );
}
