import React from 'react';
import { images } from '../../../assets';
import Button from '../../../@Core/component/Button';
import { useNavigate } from 'react-router-dom';

function Tag() {
   const navigate = useNavigate();

   return (
      <div className="">
         <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
               <img src={images.left} alt="" />
               <h1 className="text-2xl font-bold">Tag</h1>
            </div>
            <div className="">
               <Button type="submit" className="px-[10px] py-1" onClick={() => navigate('create')}>
                  Thêm Tag
               </Button>
            </div>
         </div>
      </div>
   );
}
export default Tag;
