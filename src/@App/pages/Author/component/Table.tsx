import React from 'react';
import { useQuery } from 'react-query';

import useSearchParamFilterTableUrl from '../../../../@Core/component/Pagination/hook/useSearchParamFilterTableUrl';
import { useConfirm } from '../../../../@Core/component/Comfirm';
import authorService from '../../../services/author.service';
import Filter from '../../../component/customs/Filter';
import TableHeader from '../../../component/customs/Table/components/TableHeader';
import SekeletonLoadingTable from '../../../component/customs/SekeletonLoadingTable';
import TableFooter from '../../../component/customs/TableFooter';
import { useToastMessage } from '../../../redux/slice/toastMessage.slice';
import ExtendTdTable from '../../../component/customs/Table/components/ExtendTdTable';
import {
   ActionCoppyTableItem,
   ActionDeleteTable,
   ActionEditTable,
} from '../../../component/customs/Table/components/TableAction';

const FILTERACTIONS = [
   {
      value: 'name',
      title: 'Tên bài viết',
   },
];

function Table() {
   const { page, limit, category, search, sortBy } = useSearchParamFilterTableUrl();

   const { setConfirm } = useConfirm();
   const { setToastMessage } = useToastMessage();

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
         callback: async () => {
            try {
               await authorService.deleteAuthor(id);
               refetch();
               setToastMessage('xóa thành công', 'success');
            } catch (error) {
               setToastMessage('Xóa thất bại', 'error');
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

   const columns = ['ID', 'Tên tác giả', 'Thao tác'];
   return (
      <>
         <div className="mb-2 flex justify-between ">
            <Filter filterActions={FILTERACTIONS} defaulCheckFilter="Tên tác giả" />
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
                              <ExtendTdTable width={50} className="text-center">
                                 <input type="checkbox" className="w-[15px] h-[15px]" />
                              </ExtendTdTable>
                              <ExtendTdTable width={50} className="text-center">
                                 {index + 1}
                              </ExtendTdTable>
                              <ExtendTdTable>{author.name}</ExtendTdTable>
                              <ExtendTdTable width={100}>
                                 <div className="flex gap-2 justify-center">
                                    <ActionCoppyTableItem callback={handleClickCoppy} />
                                    <ActionEditTable id={author._id} />
                                    <ActionDeleteTable callback={() => handleClickDelete(author._id)} />
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

export default React.memo(Table);
