import React from 'react';
import Button from '../../../@Core/component/Button';
import { useNavigate } from 'react-router-dom';
import Table from './component/Table';

function Post() {
   const navigate = useNavigate();

   return (
      <div>
         <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
               <h1 className="text-2xl font-bold">Danh mục bài viết</h1>
            </div>
            <div className="">
               <Button className="px-[10px] py-1" onClick={() => navigate('create')}>
                  Bài viết mới
               </Button>
            </div>
         </div>
         <div className="my-4 rounded-2xl">
            <Table />
         </div>
      </div>
   );
}

export default Post;
