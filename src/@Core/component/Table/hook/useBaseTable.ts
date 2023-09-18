import { TypeColumnHelper } from './createColumnHelper';

interface TypeBaseTableProps<TData> {
   data: Array<TData>;
   columns: TypeColumnHelper[];
}

export const useBaseTable = <TB>(propsTable: TypeBaseTableProps<TB>) => {
   const { data, columns } = propsTable;

   console.log(data);
};
