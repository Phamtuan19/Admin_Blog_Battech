import { NavLink } from 'react-router-dom';

import cn from '../../../../@Core/helpers/cn';
import logo from './svg/logo.svg';
import SidebarItem from './SidebarItem';
import nodeBook from './svg/nodeBook.svg';
import image from './svg/image.svg';
import setting from './svg/setting.svg';
import Account from './Account';

const LISTSIDEBAR = [
   {
      icon: nodeBook,
      title: 'Viết bài',
      children: [
         {
            path: 'posts',
            title: 'Bài viết',
         },
         {
            path: 'topic',
            title: 'Chủ đề',
         },
         {
            path: 'author',
            title: 'Tác giả',
         },
         {
            path: 'tags',
            title: 'Tag',
         },
      ],
   },
   {
      icon: image,
      path: '/',
      title: 'Ảnh',
   },
   {
      icon: setting,
      path: '/setting',
      title: 'Cài đặt',
   },
];

function Sidebar() {
   return (
      <div className={cn('fixed top-0 left-0 bottom-0 h-[100vh] w-sidebar bg-sidebar flex flex-col')}>
         <div className="w-full flex-1">
            <div className={cn('h-[124px] w-full bg-default flex justify-center items-center ')}>
               <img src={logo} alt="" className="object-none" />
            </div>
            <div className={cn('py-5 px-2 flex flex-col gap-2 text-white')}>
               {LISTSIDEBAR.map((item, index) => {
                  if (item.children) {
                     return <SidebarItem key={index} {...item}></SidebarItem>;
                  }

                  return (
                     <NavLink key={index} to={item.path} className={cn('block py-3 px-3 rounded-lg', {})}>
                        <div className="flex gap-2 items-center flex-1">
                           <img src={item.icon} alt="" />
                           <p>{item.title}</p>
                        </div>
                     </NavLink>
                  );
               })}
            </div>
         </div>
         <Account />
      </div>
   );
}
export default Sidebar;
