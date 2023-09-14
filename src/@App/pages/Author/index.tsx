import Button from '../../../@Core/component/Button';
import { images } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import Table from './component/Table';

function Author() {
   const navigate = useNavigate();

   return (
      <div className="">
         <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
               <img src={images.left} alt="" />
               <h1 className="text-2xl font-bold">Danh sách tác giả</h1>
            </div>
            <div className="">
               <Button type="submit" className="px-[10px] py-1" onClick={() => navigate('create')}>
                  Thêm tác giả
               </Button>
            </div>
         </div>
         <div className="my-4 rounded-2xl">
            <Table />
         </div>
      </div>
   );
}
export default Author;
