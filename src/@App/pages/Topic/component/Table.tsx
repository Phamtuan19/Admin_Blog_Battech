import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { images } from '../../../../assets';
import useSearchParamFilterTableUrl from '../../../../@Core/component/Pagination/hook/useSearchParamFilterTableUrl';
import TableHeader from '../../../component/customs/Table/components/TableHeader';
import TableFooter from '../../../component/customs/TableFooter';
import SekeletonLoadingTable from '../../../component/customs/SekeletonLoadingTable';
import { useConfirm } from '../../../../@Core/component/Comfirm';
import topicService from '../../../services/topic.service';
import Filter from '../../../component/customs/Filter';
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
      title: 'Tên chủ đề',
   },
];

function Table() {
   const { page, limit, category, search, sortBy } = useSearchParamFilterTableUrl();

   const { setConfirm } = useConfirm();
   const { setToastMessage } = useToastMessage();

   const {
      data: topics,
      isFetching,
      refetch,
   } = useQuery<any>(['getTopicAll', page, limit, category, search, sortBy], async () => {
      try {
         const res = await topicService.getAllTopics({ page, limit, category, search, sortBy });
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
               topicService.deleteTopic(id);
               refetch();
               setToastMessage('Xóa thành công', 'success');
            } catch (error) {
               setToastMessage('Xóa thất bại', 'error');
            }
         },
      });
   };

   const handleClickCoppy = async (id?: string) => {
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

   const columns = ['ID', 'Tên chủ đề', 'Slug', 'số bài viết', 'Thao tác'];
   return (
      <>
         <div className="mb-2 flex justify-between ">
            <Filter filterActions={FILTERACTIONS} defaulCheckFilter="Tên chủ đề" />
         </div>
         <div className="">
            <table className="w-full border-collapse bg-white border border-solid border-[#E3E5E8] ">
               <TableHeader columns={columns} />
               <tbody>
                  {isFetching ? (
                     <SekeletonLoadingTable columns={columns} />
                  ) : topics?.data.data && topics.data.data.length > 0 ? (
                     topics?.data.data.map((topic: any, index: number) => {
                        return (
                           <tr key={index}>
                              <ExtendTdTable className="text-center">
                                 <input type="checkbox" className="w-[15px] h-[15px]" />
                              </ExtendTdTable>
                              <ExtendTdTable width={50}>{index + 1}</ExtendTdTable>
                              <ExtendTdTable>{topic.topic.name}</ExtendTdTable>
                              <ExtendTdTable className="w-[400px]">{topic.topic.slug}</ExtendTdTable>
                              <ExtendTdTable width={180}>{topic.postCount}</ExtendTdTable>
                              <ExtendTdTable width={100}>
                                 <div className="flex gap-2 justify-center">
                                    <ActionCoppyTableItem callback={handleClickCoppy} />
                                    <ActionEditTable id={topic._id} />
                                    <ActionDeleteTable callback={() => handleClickDelete(topic.id)} />
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
               <TableFooter colSpan={columns.length + 1} totalPage={topics?.totalPage || 1} />
            </table>
         </div>
      </>
   );
}

export default React.memo(Table);
