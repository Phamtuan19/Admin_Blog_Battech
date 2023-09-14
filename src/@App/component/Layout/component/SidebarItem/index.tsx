import { useState } from 'react';
import cn from '../../../../../@Core/helpers/cn';
import { images } from '../../../../../assets';
import { NavLink } from 'react-router-dom';

interface TypeProps {
   title: string;
   icon: string;
   children: { path: string; title: string }[];
   className?: string;
}

function SidebarItem(props: TypeProps) {
   const { title, icon, children, className } = props;

   // const segments: string[] = useMemo(() => {
   //    return window.location.pathname.split('/').filter((segment) => segment.trim() !== '');
   // }, []);

   const [openChildren, setOpenChildren] = useState<boolean>(false);

   const handleClickOpen = () => {
      setOpenChildren((prev) => !prev);
   };

   // useEffect(() => {
   //    segments[0] === path && setOpenChildren(true);
   // }, [segments]);

   return (
      <div className={cn('rounded-m cursor-pointer ', className)}>
         <div
            className={cn('p-3 flex mb-2 hover:bg-sidebarActive rounded-lg', {
               // 'bg-sidebarActive': segments[0] === path,
            })}
            onClick={handleClickOpen}
         >
            <div className="flex gap-2 items-center flex-1">
               <img src={icon} alt="" />
               <p>{title}</p>
            </div>
            <p>
               <img src={images.downArrow} width={24} height={24} alt="" />
            </p>
         </div>
         <div className="flex flex-col gap-1 sidebarItem">
            {openChildren &&
               children?.map((item, index) => {
                  return (
                     <NavLink
                        key={index}
                        to={`/${item.path}`}
                        className={({ isActive }) => {
                           return isActive
                              ? cn('block py-2 pl-11 rounded-lg hover:bg-sidebarActive', {
                                   'bg-sidebarActive': isActive,
                                })
                              : cn('block py-2 pl-11 rounded-lg hover:bg-sidebarActive');
                        }}
                     >
                        <p>{item.title}</p>
                     </NavLink>
                  );
               })}
         </div>
      </div>
   );
}
export default SidebarItem;
