import React from 'react';
import { Controller, FieldValues, Control } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './style.css';

interface TypeControlEditor<TFieldValues extends FieldValues = FieldValues> {
   control: Control<TFieldValues>;
   name: string;
   setValue: Function;
   defaultValue?: string;
   placeholder?: string;
}

function ControlEditor<TFieldValues extends FieldValues = FieldValues>(props: TypeControlEditor<TFieldValues>) {
   const { control, name, setValue, defaultValue, ...rest } = props;

   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <React.Fragment>
                  <CKEditor
                     editor={ClassicEditor}
                     onChange={(_, editor) => {
                        const data = editor.getData();
                        setValue(name, data);
                     }}
                     data={field.value || ''}
                  />
                  {error && <span className="text-red-500">{error?.message}</span>}
               </React.Fragment>
            );
         }}
         name={name as any}
         control={control}
      />
   );
}

export default ControlEditor;
