import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import useSearchParamFilterTableUrl from '../../../../@Core/component/Pagination/hook/useSearchParamFilterTableUrl';
import { useConfirm } from '../../../../@Core/component/Comfirm';
import authorService from '../../../services/author.service';
import Filter from '../../../component/customs/Filter';
import TableHeader from '../../../component/customs/TableHeader';
import SekeletonLoadingTable from '../../../component/customs/SekeletonLoadingTable';
import { images } from '../../../../assets';
import TableFooter from '../../../component/customs/TableFooter';
import cn from '../../../../@Core/helpers/cn';

const FILTERACTIONS = [
   {
      value: 'name',
      title: 'Tên bài viết',
   },
];

function Table() {
   const { page, limit, category, search, sortBy } = useSearchParamFilterTableUrl();

   const { setConfirm } = useConfirm();

   const {
      data: authors,
      isLoading,
      refetch,
   } = useQuery<any>(['getAuthor', page, limit, category, search, sortBy], async () => {
      try {
         const res = await authorService.getAll({ page, limit, category, search, sortBy });
         return res.data;
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
               const res = authorService.deleteAuthor(id);
               console.log(res);
               console.log('xóa thành công');
               refetch();
            } catch (error) {
               console.log('Xóa thất bại');
            }
         },
      });
   };

   // const handleClickCoppy = async (id: string) => {
   //    setConfirm({
   //       isIcon: true,
   //       title: 'Sao chép bài viết',
   //       content: 'Bạn có chắc muốn xóa bài viết này hay không?',
   //       confirmOk: 'Xóa',
   //       isButtonOk: true,
   //       callback: () => {
   //          try {
   //             // const res = postService.deletePost(id);
   //             // console.log('xóa thành công');
   //             // refetch();
   //          } catch (error) {
   //             console.log('Xóa thất bại');
   //          }
   //       },
   //    });
   // };

   console.log(authors?.data);

   const columns = ['ID', 'Tên tác giả', 'Thao tác'];
   return (
      <>
         <div className="mb-2 flex justify-between ">
            <Filter filterActions={FILTERACTIONS} />
         </div>
         <div className="">
            <table className="w-full border-collapse bg-white border border-solid border-[#E3E5E8] ">
               <TableHeader columns={columns} />
               <tbody>
                  {isLoading ? (
                     <SekeletonLoadingTable columns={columns} />
                  ) : authors?.data && authors?.data.length > 0 ? (
                     authors?.data.map((author: any, index: number) => {
                        return (
                           <tr key={index}>
                              <ExtendTdTable>
                                 <input type="checkbox" className="w-[15px] h-[15px]" />
                              </ExtendTdTable>
                              <ExtendTdTable width={50}>{index + 1}</ExtendTdTable>
                              <ExtendTdTable>{author.name}</ExtendTdTable>
                              <ExtendTdTable width={100}>
                                 <div className="flex gap-2 justify-center">
                                    <span className="cursor-pointer">
                                       <img src={images.coppy} alt="" />
                                    </span>
                                    <Link to={author._id} className="cursor-pointer">
                                       <img src={images.edit} alt="" />
                                    </Link>
                                    <span className="cursor-pointer" onClick={() => handleClickDelete(author._id)}>
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
                           <h1 className="text-lg font-bold">Không có tác giả nào trong danh sách.</h1>
                        </td>
                     </tr>
                  )}
               </tbody>
               <TableFooter colSpan={columns.length + 1} totalPage={authors?.totalPage || 1} />
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
      <td className={cn('text-base p-3 font-medium  border border-solid border-[#E3E5E8] ', className)} {...rest}>
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
