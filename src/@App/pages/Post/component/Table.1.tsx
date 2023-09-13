import React from 'react';
import { useQuery } from 'react-query';
import postService from '../../../services/posts.service';
import Button from '../../../../@Core/component/Button';
import { images } from '../../../../assets';
import PaginationTable from '../../../component/customs/PaginationTable';

export default function Table() {
   const { data: postsList, refetch } = useQuery('getPosts', async () => {
      try {
         const res = await postService.getAllPosts();
         return res;
      } catch (error) {
         console.log(error);
      }
   });

   console.log(postsList?.currentPage);

   const columns = ['ID', 'Tên bài viết', 'Mô tả', 'Chủ đề', 'Ngày đăng bài', 'Thao tác'];
   return (
      <>
         <div className="mb-2 flex justify-between ">
            <div className="flex gap-3">
               <Button className="bg-white border border-solid border-[#9D9D9D]">
                  <img src={images.search} alt="" />
               </Button>
               <Button className="bg-white border border-solid border-[#9D9D9D] text-black flex gap-2">
                  <img src={images.filter} alt="" />
                  <span className="text-sm">Bộ lọc</span>
               </Button>
            </div>
            <Button className="bg-white border border-solid border-[#9D9D9D] text-black flex gap-2">
               <img src={images.sort} alt="" />
               <span className="text-sm">Sắp xếp</span>
            </Button>
         </div>
         <div className="">
            <table className="w-full border-collapse bg-white border border-solid border-[#E3E5E8] ">
               <thead className="rounded-2xl border border-solid">
                  <tr className="bg-default text-white border border-solid rounded-md">
                     <th>
                        <input type="checkbox" className="w-[15px] h-[15px]" />
                     </th>
                     {columns.map((column, index) => (
                        <th
                           key={index}
                           className="p-3 text-base text-center text-[#F2F5F9] border border-solid border-[#E3E5E8] "
                        >
                           {column}
                        </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {postsList?.data.map((post: any, index: number) => {
                     return (
                        <tr key={index}>
                           <td className="text-base p-3 font-medium text-center border border-solid border-[#E3E5E8]">
                              <input type="checkbox" className="w-[15px] h-[15px]" />
                           </td>
                           <td
                              className="text-base p-3 font-medium text-center border border-solid border-[#E3E5E8]"
                              width={230}
                           >
                              {post._id}
                           </td>
                           <td className="text-base p-3 font-medium text-center border border-solid border-[#E3E5E8]">
                              {post.name}
                           </td>
                           <td className="text-base p-3 font-medium text-center border border-solid border-[#E3E5E8]">
                              {post.description}
                           </td>
                           <td className="text-base p-3 font-medium text-center border border-solid border-[#E3E5E8]">
                              {post.topicId.name}
                           </td>
                           <td className="text-base p-3 font-medium text-center border border-solid border-[#E3E5E8]">
                              {post.createdAt}
                           </td>
                           <td className="border border-solid border-[#E3E5E8]">
                              <div className="flex gap-2 justify-center">
                                 <span className="cursor-pointer ">
                                    <img src={images.coppy} alt="" />
                                 </span>
                                 <span className="cursor-pointer ">
                                    <img src={images.edit} alt="" />
                                 </span>
                                 <span className="cursor-pointer ">
                                    <img src={images.delete1} alt="" />
                                 </span>
                              </div>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
               <tfoot>
                  <tr>
                     <th colSpan={7}>
                        <PaginationTable
                           currentPage={(postsList && postsList?.currentPage) || 1}
                           totalItem={(postsList && postsList?.total) || 10}
                           callBackIsFetch={refetch}
                        />
                     </th>
                  </tr>
               </tfoot>
            </table>
         </div>
      </>
   );
}
