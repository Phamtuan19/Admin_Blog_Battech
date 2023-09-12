import React from 'react';
import { Controller, FieldValues, Control } from 'react-hook-form';
import Select, { TypeSelect } from '../Select';

interface TypeControlSelect<TFieldValues extends FieldValues = FieldValues> extends TypeSelect {
   control: Control<TFieldValues>;
   name: string;
}

function ControlSelect<TFieldValues extends FieldValues = FieldValues>(props: TypeControlSelect<TFieldValues>) {
   const { control, name, ...res } = props;

   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <React.Fragment>
                  <Select {...res} {...field} />
                  {error && <span className="text-red-500">{error?.message}</span>}
               </React.Fragment>
            );
         }}
         name={name as any} // Chúng ta đang ép kiểu name về any ở đây để tránh lỗi dịch vụ tiền triển khai.
         control={control}
      />
   );
}

export default ControlSelect;
