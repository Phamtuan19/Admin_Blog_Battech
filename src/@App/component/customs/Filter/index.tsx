import React, { useState } from 'react';
import Button from '../../../../@Core/component/Button';
import { images } from '../../../../assets';
import Input from '../../../../@Core/component/Input';
import useSearchParamFilterTableUrl from '../../../../@Core/component/Pagination/hook/useSearchParamFilterTableUrl';
import Dropdown from './component/Dropdown';

const SORTBYACTIONS = [
   {
      title: 'Xắp xếp A - Z',
      value: 'asc',
   },
   {
      title: 'Xắp xếp Z - A',
      value: 'desc',
   },
];

interface FilterProps {
   filterActions: Array<{
      value: string;
      title: string;
   }>;
   defaulCheckFilter?: string;
}

function Filter(props: FilterProps) {
   const { filterActions, defaulCheckFilter } = props;
   const { search, category, sortBy, setSearch, setCategory, setSortBy } = useSearchParamFilterTableUrl();
   const [searchVal, setSearchVal] = useState<string>(search || '');
   const [categoryVal] = useState<string>(category || '');
   const handleClickSearch = () => {
      if (searchVal && categoryVal) {
         setSearch(searchVal);
      }
   };
   return (
      <>
         <div className="flex gap-3">
            <div className="flex gap-2">
               <Button className="bg-white border border-solid border-[#9D9D9D]" onClick={handleClickSearch}>
                  <img src={images.search} alt="" />
               </Button>
               <Input
                  className="bg-white rounded-lg"
                  value={searchVal}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                     setSearchVal(e.target.value);
                  }}
                  placeholder="Tìm kiếm ..."
               />
            </div>
            <div className="">
               <Dropdown
                  defaultValue={(categoryVal === 'name' && defaulCheckFilter) || 'Bộ lọc'}
                  options={filterActions}
                  image={images.filter}
                  callback={setCategory}
               />
            </div>
         </div>
         <div className="">
            <Dropdown
               defaultValue={sortBy === 'asc' ? SORTBYACTIONS[0].title : SORTBYACTIONS[1].title}
               options={SORTBYACTIONS}
               image={images.sort}
               callback={setSortBy}
            />
         </div>
      </>
   );
}

export default React.memo(Filter);
