import { useSearchParams } from 'react-router-dom';

const useSearchParamFilterTableUrl = () => {
   const [searchParams, setSearchParams] = useSearchParams();

   // Lấy tất cả các tham số hiện tại từ URL và chuyển chúng thành một đối tượng JavaScript
   const currentParams = Object.fromEntries(searchParams);

   // Lấy giá trị từ URL hoặc giá trị mặc định
   const page = Number(currentParams.page) || 1;
   const limit = Number(currentParams.limit) || 10;
   const search = currentParams.search || '';
   const category = currentParams.category || 'name';
   const sortBy = currentParams.sortBy || 'asc';

   // Hàm setter để thay đổi giá trị của tham số cụ thể
   const setPage = (newPage: string | number | null) => {
      currentParams.page = String(newPage);
      setSearchParams(currentParams);
   };

   const setLimit = (newLimit: string | number | null) => {
      currentParams.limit = String(newLimit);
      setSearchParams(currentParams);
   };

   const setSearch = (newSearch: string) => {
      currentParams.search = newSearch;
      setSearchParams(currentParams);
   };

   const setCategory = (newCategory: string) => {
      currentParams.category = newCategory;
      setSearchParams(currentParams);
   };

   const setSortBy = (newSortBy: string) => {
      currentParams.sortBy = newSortBy;
      setSearchParams(currentParams);
   };

   return { page, limit, search, category, sortBy, setPage, setLimit, setSearch, setCategory, setSortBy };
};

export default useSearchParamFilterTableUrl;
