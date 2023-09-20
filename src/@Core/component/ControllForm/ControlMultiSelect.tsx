import React from 'react';
import { Controller, Control, FieldValues, UseFormSetValue } from 'react-hook-form';
import Multiselect from './Multiselect';

interface ControlMultiSelectProps<TFieldValues extends FieldValues = FieldValues> {
   control: Control<TFieldValues>;
   name: string;
   options: { [key: string]: any }[];
   _value: string;
   _id: string;
   defaultValue?: string[];
   placeholder?: string;
   setValue: UseFormSetValue<TFieldValues>;
}

function ControlMultiSelect(props: ControlMultiSelectProps) {
   const { control, name, _id, _value, options, defaultValue, placeholder, setValue } = props;
   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <React.Fragment>
                  <Multiselect
                     _id={_id}
                     _value={_value}
                     options={options}
                     defaultValue={defaultValue || []}
                     placeholder={placeholder || ''}
                     setValue={setValue}
                     {...field}
                  />
                  {error && <span className="text-red-500">{error?.message}</span>}
               </React.Fragment>
            );
         }}
         name={name}
         control={control}
      />
   );
}

export default ControlMultiSelect;
