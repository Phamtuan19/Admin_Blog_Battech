import { Outlet } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import cn from '../../../@Core/helpers/cn';
import React from 'react';

function MainLayout() {
   return (
      <div className="relative">
         <Sidebar />
         <div className={cn('ml-sidebar px-4 pt-4 bg-[#F0F6FF] min-h-[100vh]')}>
            <Outlet />
         </div>
      </div>
   );
}
export default React.memo(MainLayout);
