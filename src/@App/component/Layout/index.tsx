import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import cn from '../../../@Core/helpers/cn';

function MainLayout() {
   return (
      <div className="relative">
         <Sidebar />
         <div className={cn('ml-sidebar px-4 pt-4 bg-[#F0F6FF]')}>
            <Outlet />
         </div>
      </div>
   );
}
export default MainLayout;
