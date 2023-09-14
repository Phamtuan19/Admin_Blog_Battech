import React, { useState } from 'react';
import { useQuery } from 'react-query';
import postService from '../../../services/posts.service';
import { images } from '../../../../assets';
import PaginationTable from '../../../component/customs/PaginationTable';
import cn from '../../../../@Core/helpers/cn';
import useSearchParamFilterTableUrl from '../../../../@Core/component/Pagination/hook';
import TableHeader from '../../../component/customs/TableHeader';
import { format } from 'date-fns';
import Filter from '../../../component/customs/Filter';
import TableFooter from '../../../component/customs/TableFooter';
import SekeletonLoadingTable from '../../../component/customs/SekeletonLoadingTable';
import { useConfirm } from '../../../../@Core/component/Comfirm';

function Table() {
   const { page, limit, category, search, sortBy } = useSearchParamFilterTableUrl();

   const { setConfirm } = useConfirm();

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
               const res = postService.deletePost(id);
               console.log('xóa thành công');
               refetch();
            } catch (error) {
               console.log('Xóa thất bại');
            }
         },
      });
   };

   const columns = ['ID', 'Tên bài viết', 'Mô tả', 'Chủ đề', 'Tác giả', 'Ngày đăng bài', 'Thao tác'];
   return (
      <>
         <div className="mb-2 flex justify-between ">
            <Filter />
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
                              <ExtendTdTable width={50}>{index + 1}</ExtendTdTable>
                              <ExtendTdTable className="text-left">{post.name}</ExtendTdTable>
                              <ExtendTdTable className="text-left w-[400px]">{post.description}</ExtendTdTable>
                              <ExtendTdTable className="">{post.topicId.name}</ExtendTdTable>
                              <ExtendTdTable width={150}>{post.authorId.name}</ExtendTdTable>
                              <ExtendTdTable width={150}>
                                 {format(new Date(post.createdAt), 'MM/dd/yyyy')}
                              </ExtendTdTable>
                              <ExtendTdTable width={100}>
                                 <div className="flex gap-2 justify-center">
                                    <span className="cursor-pointer">
                                       <img src={images.coppy} alt="" />
                                    </span>
                                    <span className="cursor-pointer">
                                       <img src={images.edit} alt="" />
                                    </span>
                                    <span className="cursor-pointer" onClick={() => handleClickDelete(post._id)}>
                                       <img src={images.delete1} alt="" />
                                    </span>
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

type TypeExtendTdTable = React.ComponentProps<'td'> & {
   children?: React.ReactNode;
   className?: string;
};

export const ExtendTdTable = (props: TypeExtendTdTable) => {
   const { children, className, ...rest } = props;

   return (
      <td
         className={cn('text-base p-3 font-medium text-center border border-solid border-[#E3E5E8] ', className)}
         {...rest}
      >
         <div
            className="w-full overflow-hidden overflow-ellipsis"
            style={{
               display: '-webkit-box',
               WebkitLineClamp: 1,
               WebkitBoxOrient: 'vertical',
               textOverflow: 'ellipsis',
               whiteSpace: 'normal', // Sử dụng 'normal' thay vì 'nowrap'
            }}
         >
            {children}
         </div>
      </td>
   );
};

export default React.memo(Table);
