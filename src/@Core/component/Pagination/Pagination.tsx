import cn from '../../helpers/cn';
import PaginationItem from './component/PaginationItem';
import useSearchParamFilterTableUrl from './hook/useSearchParamFilterTableUrl';

export default function Pagination(props: { totalPage: number }) {
   const { totalPage } = props;
   // console.log(totalPage);

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
