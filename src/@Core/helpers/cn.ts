import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...props: ClassValue[]) => {
   return twMerge(clsx(props));
};

export default cn;
