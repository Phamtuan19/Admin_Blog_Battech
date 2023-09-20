import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...props: ClassValue[]) => {
   return twMerge(clsx(props));
};

export default cn;
