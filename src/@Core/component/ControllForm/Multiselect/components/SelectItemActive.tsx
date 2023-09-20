interface SelectItemActiveProps {
   item: { [key: string]: any };
   _id: string;
   _value: string;
   onClick: Function;
}

function SelectItemActive(props: SelectItemActiveProps) {
   const { item, _id, _value, onClick } = props;

   return (
      <div className="flex items-center gap-2 px-2 py-1 m-1 rounded-lg bg-[#E3E5E8] " style={{}}>
         <div className="text-base font-bold">{item[_value]}</div>
         <div className="" onClick={() => onClick(item[_id])}>
            <CloseItem />
         </div>
      </div>
   );
}

export const CloseItem = () => {
   return (
      <p className="cursor-pointer">
         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
               d="M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z"
               fill="#C8CBD1"
            />
            <path
               d="M11.25 6.75L6.75 11.25"
               stroke="#5B5B5B"
               strokeWidth="1.5"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
            <path
               d="M11.25 11.25L6.75 6.75"
               stroke="#5B5B5B"
               strokeWidth="1.5"
               strokeLinecap="round"
               strokeLinejoin="round"
            />
         </svg>
      </p>
   );
};

export default SelectItemActive;
