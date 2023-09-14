import React from 'react';
import { Controller, FieldValues, Control } from 'react-hook-form';
import Textarea from '../Textarea';

interface TypeControlTextarea<TFieldValues extends FieldValues = FieldValues> {
   control: Control<TFieldValues>;
   name: string;
   className?: string;
   defaultValue?: string;
   placeholder?: string;
}

function ControlTextarea<TFieldValues extends FieldValues = FieldValues>(props: TypeControlTextarea<TFieldValues>) {
   const { control, name, className, defaultValue, placeholder } = props;

   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <React.Fragment>
                  <Textarea
                     placeholder={placeholder}
                     className={className}
                     {...field}
                     value={field.value || ''}
                     defaultValue={defaultValue}
                  />
                  {error && <span className="text-red-500">{error?.message}</span>}
               </React.Fragment>
            );
         }}
         name={name as any} // Chúng ta đang ép kiểu name về any ở đây để tránh lỗi dịch vụ tiền triển khai.
         control={control}
      />
   );
}

export default ControlTextarea;
