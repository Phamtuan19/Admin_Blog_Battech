import React, { useEffect } from 'react';

interface OnClickOutsideProps {
   wrapperRef: React.RefObject<HTMLInputElement>;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function onClickOutside(props: OnClickOutsideProps) {
   const { wrapperRef, setOpen } = props;

   useEffect(() => {
      const handleClick = (e: any) => {
         if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            // Xử lý khi click bên ngoài component
            setOpen(false);
         }
      };

      document.addEventListener('click', handleClick);

      return () => {
         // Loại bỏ lắng nghe khi component unmount
         document.removeEventListener('click', handleClick);
      };
   }, []);
}

export default onClickOutside;
