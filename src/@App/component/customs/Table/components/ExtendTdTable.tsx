import React from 'react';
import cn from '../../../../../@Core/helpers/cn';

type TypeExtendTdTable = React.ComponentProps<'td'> & {
   children?: React.ReactNode;
   className?: string;
};

function ExtendTdTable(props: TypeExtendTdTable) {
   const { children, className, ...rest } = props;

   return (
      <td className={cn('text-base p-3 font-normal  border border-solid border-[#E3E5E8] ', className)} {...rest}>
         <div
            className="w-full overflow-hidden overflow-ellipsis"
            style={{
               display: '-webkit-box',
               WebkitLineClamp: 1,
               WebkitBoxOrient: 'vertical',
               textOverflow: 'ellipsis',
               whiteSpace: 'normal', // Sử dụng 'normal' thay vì 'nowrap'
            }}
         >
            {children}
         </div>
      </td>
   );
}

export default React.memo(ExtendTdTable);
