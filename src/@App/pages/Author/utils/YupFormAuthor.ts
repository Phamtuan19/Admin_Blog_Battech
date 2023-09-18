import * as yup from 'yup';
import ERORR_VALIDATION from '../../../../@Core/config/ErrorValidation';

export const schemaFrom = yup.object().shape({
   name: yup.string().required(`Tên chủ đề ${ERORR_VALIDATION.required}`),
});

export type MySchema = yup.InferType<typeof schemaFrom>;
