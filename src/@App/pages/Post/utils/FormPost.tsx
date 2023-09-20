import * as yup from 'yup';
import ERORR_VALIDATION from '../../../../@Core/config/ErrorValidation';

export const getBase64 = (file: File): Promise<string> => {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
   });
};

export const schemaFrom = yup.object().shape({
   name: yup.string().required(`Tên bài viết ${ERORR_VALIDATION.required}`),
   description: yup.string().required(`Mô tả bài viết ${ERORR_VALIDATION.required}`),
   content: yup.string().required(`Nội dung bài viết ${ERORR_VALIDATION.required}`),
   slug: yup.string().required(`Slug ${ERORR_VALIDATION.required}`),
   image: yup.mixed().required(`Hình ảnh ${ERORR_VALIDATION.required}`),
   topicId: yup.string().required(`Chủ đề ${ERORR_VALIDATION.required}`),
   authorId: yup.string().required(`Tác giả ${ERORR_VALIDATION.required}`),
   tagId: yup.array().of(yup.string()).min(1, 'Tag không được để trống'),
   publish: yup.string(),
});

export type MySchema = yup.InferType<typeof schemaFrom>;
