import React, { useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { images } from '../../../assets';
import Label from '../../../@Core/component/Label';
import Textarea from '../../../@Core/component/Textarea';
import cn from '../../../@Core/helpers/cn';

function CreatePost() {
   const editorRef = useRef(null);

   useEffect(() => {
      if (editorRef.current) {
         const editor = editorRef.current.editor;
         editor.ui.view.editable.setStyle('height', '500px');
      }
   }, []);

   return (
      <div>
         <div className="flex gap-2 items-center">
            <img src={images.left} alt="" />
            <h1 className="text-2xl font-bold">Bài viết mới</h1>
         </div>
         <div className="mt-5">
            <div className="grid grid-cols-12 gap-4">
               <div className="col-span-8 h-[300px] bg-white">
                  <div className="px-4">
                     <div className="grid grid-cols-12 gap-4 p-4">
                        <div className="col-span-6">
                           <Label htmlFor="email" className="text-[#393939] text-base" required>
                              Tên bài viết
                           </Label>
                           <Textarea className="rounded-lg h-[85px]" />
                        </div>
                        <div className="col-span-6">
                           <Label htmlFor="email" className="text-[#393939] text-base" required>
                              Mô tả
                           </Label>
                           <Textarea className="rounded-lg h-[85px]" />
                        </div>
                        <div className="col-span-12">
                           <CKEditor
                              editor={ClassicEditor}
                              data="<p>Hello from CKEditor&nbsp;5!</p>"
                              onReady={(editor) => {
                                 // You can store the "editor" and use when it is needed.
                                 console.log('Editor is ready to use!', editor);
                              }}
                              onChange={(event, editor) => {
                                 const data = editor.getData();
                                 console.log({ event, editor, data });
                              }}
                              onBlur={(event, editor) => {
                                 console.log('Blur.', editor);
                              }}
                              onFocus={(event, editor) => {
                                 console.log('Focus.', editor);
                              }}
                           />
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-span-4 bg-red h-[300px] bg-black"></div>
            </div>
         </div>
      </div>
   );
}
export default CreatePost;
