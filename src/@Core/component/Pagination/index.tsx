import React from 'react';
import PaginationItem from './component/PaginationItem';
import cn from '../../helpers/cn';
import useSearchParamFilterTableUrl from './hook/useSearchParamFilterTableUrl';

function Pagination(props: { totalPage: number }) {
   const perPage = 1;

   const { setPage, page: currentPage } = useSearchParamFilterTableUrl();

   const pages = Array.from({ length: props.totalPage }, (_, index) => index + 1);
   let ellipsisShown = false; // Biến để kiểm tra xem đã hiển thị '...' chưa

   return (
      <div className="flex items-center">
         <PaginationPrev
            active={Boolean(currentPage <= 1)}
            currentPage={currentPage}
            onClick={() => {
               setPage(String(currentPage - 1));
            }}
         />
         {pages.map((page) => {
            if (page === currentPage || (page <= currentPage + perPage && page >= currentPage - perPage)) {
               ellipsisShown = false; // Reset biến khi hiển thị trang thường
               return (
                  <PaginationItem
                     key={page}
                     active={Boolean(currentPage === page)}
                     children={page}
                     onClick={() => {
                        setPage(String(page));
                     }}
                  />
               );
            }

            if (props.totalPage > currentPage + perPage && !ellipsisShown) {
               ellipsisShown = true; // Đánh dấu đã hiển thị '...'
               return <PaginationItem key={page} active={false} children="..." />;
            }

            if (props.totalPage === page) {
               ellipsisShown = false; // Reset biến khi hiển thị trang cuối
               return (
                  <PaginationItem
                     key={page}
                     active={Boolean(currentPage === page)}
                     children={page}
                     onClick={() => {
                        setPage(String(page));
                     }}
                  />
               );
            }
         })}
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

const PaginationPrev = (props: { active: boolean; currentPage: number; onClick: Function }) => {
   const { active, onClick } = props;

   return (
      <div
         className="w-7 h-[30px] bg-white border border-solid border-[#D5D8DD] cursor-pointer"
         onClick={() => !active && onClick()}
      >
         <div className={cn('w-full h-full flex justify-center items-center ')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="none">
               <path
                  d="M12.5 16.25L6.25 10L12.5 3.75"
                  stroke={active ? '#C7CBD1' : 'black'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               />
            </svg>
         </div>
      </div>
   );
};
const PaginationNext = (props: { active: boolean; currentPage: number; onClick: Function }) => {
   const { active, onClick } = props;

   return (
      <div
         className="w-7 h-[30px] block bg-white border border-solid border-[#D5D8DD] cursor-pointer"
         onClick={() => !active && onClick()}
      >
         <div className={cn(' w-full h-full flex justify-center items-center rotate-180 ')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="none">
               <path
                  d="M12.5 16.25L6.25 10L12.5 3.75"
                  stroke={active ? '#C7CBD1' : 'black'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               />
            </svg>
         </div>
      </div>
   );
};

export default Pagination;
