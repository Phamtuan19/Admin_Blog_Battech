import React from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';

import postService from '../../../services/posts.service';
import useSearchParamFilterTableUrl from '../../../../@Core/component/Pagination/hook/useSearchParamFilterTableUrl';
import Filter from '../../../component/customs/Filter';
import TableFooter from '../../../component/customs/TableFooter';
import SekeletonLoadingTable from '../../../component/customs/SekeletonLoadingTable';
import { useConfirm } from '../../../../@Core/component/Comfirm';
import TableHeader from '../../../component/customs/Table/components/TableHeader';
import ExtendTdTable from '../../../component/customs/Table/components/ExtendTdTable';
import {
   ActionCoppyTableItem,
   ActionDeleteTable,
   ActionEditTable,
} from '../../../component/customs/Table/components/TableAction';
import { useToastMessage } from '../../../redux/slice/toastMessage.slice';

const FILTERACTIONS = [
   {
      value: 'name',
      title: 'Tên bài viết',
   },
   {
      value: 'description',
      title: 'Mô tả',
   },
   {
      value: 'topic',
      title: 'chủ đề',
   },
];

function Table() {
   const { page, limit, category, search, sortBy } = useSearchParamFilterTableUrl();

   const { setConfirm } = useConfirm();
   const { setToastMessage } = useToastMessage();

   const {
      data: postsList,
      isFetching,
      refetch,
   } = useQuery<any>(['getPosts', page, limit, category, search, sortBy], async () => {
      try {
         const res = await postService.getAllPosts({ page, limit, category, search, sortBy });
         return res;
      } catch (error) {
         console.log(error);
         throw error;
      }
   });

   const handleClickDelete = async (id: string) => {
      setConfirm({
         isIcon: true,
         title: 'Xóa bài viết',
         content: 'Bạn có chắc muốn xóa bài viết này hay không?',
         confirmOk: 'Xóa',
         isButtonOk: true,
         callback: () => {
            try {
               postService.deletePost(id);
               console.log('xóa thành công');
               refetch();
            } catch (error) {
               console.log('Xóa thất bại');
            }
         },
      });
   };

   const handleClickCoppy = async () => {
      setConfirm({
         isIcon: true,
         title: 'Sao chép bài viết',
         content: 'Bạn có chắc muốn coppy bài viết này hay không?',
         confirmOk: 'Coppy',
         isButtonOk: true,
         callback: () => {
            try {
               setToastMessage('Tính năng chưa phát triển');
            } catch (error) {
               setToastMessage('Có lỗi xảy ra!!!');
            }
         },
      });
   };

   const columns = ['ID', 'Tên bài viết', 'Mô tả', 'Chủ đề', 'Tác giả', 'Ngày đăng bài', 'Thao tác'];
   return (
      <>
         <div className="mb-2 flex justify-between ">
            <Filter filterActions={FILTERACTIONS} defaulCheckFilter="Tên bài viết" />
         </div>
         <div className="">
            <table className="w-full border-collapse bg-white border border-solid border-[#E3E5E8] ">
               <TableHeader columns={columns} />
               <tbody>
                  {isFetching ? (
                     <SekeletonLoadingTable columns={columns} />
                  ) : postsList?.data && postsList.data.length > 0 ? (
                     postsList?.data.map((post: any, index: number) => {
                        return (
                           <tr key={index}>
                              <ExtendTdTable>
                                 <input type="checkbox" className="w-[15px] h-[15px]" />
                              </ExtendTdTable>
                              <ExtendTdTable width={50} className="text-center">
                                 {index + 1}
                              </ExtendTdTable>
                              <ExtendTdTable>{post.name}</ExtendTdTable>
                              <ExtendTdTable className="w-[400px]">{post.description}</ExtendTdTable>
                              <ExtendTdTable width={250}>{post.topicId.name}</ExtendTdTable>
                              <ExtendTdTable width={180}>
                                 {(post.authorId && post.authorId.name) || 'Vô danh'}
                              </ExtendTdTable>
                              <ExtendTdTable className="text-center" width={150}>
                                 {format(new Date(post.createdAt), 'MM/dd/yyyy')}
                              </ExtendTdTable>
                              <ExtendTdTable width={100}>
                                 <div className="flex gap-2 justify-center">
                                    <ActionCoppyTableItem callback={handleClickCoppy} />
                                    <ActionEditTable id={post._id} />
                                    <ActionDeleteTable callback={() => handleClickDelete(post._id)} />
                                 </div>
                              </ExtendTdTable>
                           </tr>
                        );
                     })
                  ) : (
                     <tr>
                        <td colSpan={8} className="text-center py-3">
                           <h1 className="text-lg font-bold">Không có bài viết nào.</h1>
                        </td>
                     </tr>
                  )}
               </tbody>
               <TableFooter colSpan={columns.length + 1} totalPage={postsList?.totalPage || 1} />
            </table>
         </div>
      </>
   );
}

export default React.memo(Table);
