import React from 'react';
import { Controller, FieldValues, Control } from 'react-hook-form';
import Input, { TypeInputProps } from '../Input';

interface TypeControlInput<TFieldValues extends FieldValues = FieldValues> extends TypeInputProps {
   control: Control<TFieldValues>;
   name: string;
   defaultValue?: string;
   placeholder?: string;
}

function ControlInput<TFieldValues extends FieldValues = FieldValues>(props: TypeControlInput<TFieldValues>) {
   const { control, name, fullWidth, defaultValue, ...rest } = props;

   return (
      <Controller
         render={({ field, fieldState: { error } }) => (
            <React.Fragment>
               <Input fullWidth={fullWidth} {...field} {...rest} value={field.value || ''} />
               {error && <span className="text-red-500">{error?.message}</span>}
            </React.Fragment>
         )}
         name={name as any}
         control={control}
      />
   );
}

export default ControlInput;
