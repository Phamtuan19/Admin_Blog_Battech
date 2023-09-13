import cn from '../../../helpers/cn';

type TypePaginationItem = React.ComponentProps<'button'> & {
   active: boolean;
   children: React.ReactNode;
};

function PaginationItem(props: TypePaginationItem) {
   const { active, children, ...rest } = props;

   return (
      <button
         className={cn(
            'border border-solid border-[#D5D8DD] bg-white text-black min-w-[30px] px-2 py-1 text-sm cursor-pointer',
            {
               'bg-default': active,
               'text-white': active,
            },
         )}
         {...rest}
      >
         {children}
      </button>
   );
}

export default PaginationItem;
