import { useMemo } from 'react';

import { useQuery } from 'react-query';
import postService from '../../services/posts.service';
import useSearchParamFilterTableUrl from '../../../@Core/component/Pagination/hook/useSearchParamFilterTableUrl';
import { createColumnHelper } from '../../../@Core/component/Table/hook/createColumnHelper';
import { useBaseTable } from '../../../@Core/component/Table/hook/useBaseTable';
import TableCustom from '../../../@Core/component/Table';

export default function Home() {
   const { page, limit, category, search, sortBy } = useSearchParamFilterTableUrl();

   const { data: dataPost, isLoading } = useQuery('getPost', async () => {
      const res = await postService.getAllPosts({ page, limit, category, search, sortBy });
      return res;
   });

   const columnsHelper = createColumnHelper();

   const columns = [
      columnsHelper.accessor({
         id: '_id',
         header: 'ID',
         cell: () => {
            return <span>name</span>;
         },
         render: (_, index) => {
            return <span>{index + 1}</span>;
         },
      }),
      columnsHelper.accessor({
         id: 'name',
         header: 'Tên bài viết',
      }),
      columnsHelper.accessor({
         id: 'slug',
         header: 'slug',
      }),
   ];

   return <TableCustom data={dataPost?.data || []} columns={columns as any} />;
}
