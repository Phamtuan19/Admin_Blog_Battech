import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';

import Lable from '../../../../@Core/custom/Lable';
import Input from '../../../../@Core/custom/Input';
import { NavLink } from 'react-router-dom';
import Button from '../../../../@Core/custom/Button';
import ERORR_VALIDATION from '../../../../@Core/config/ErrorValidation';
import regexs from '../../../../@Core/config/Regex';

interface FromLogin {
   email: string;
   password: string;
}

const schemaLogin = yup
   .object()
   .shape({
      email: yup
         .string()
         .required('Email ' + ERORR_VALIDATION.required)
         .matches(regexs.email, 'Email ' + ERORR_VALIDATION.email),
      password: yup
         .string()
         .required('Mật khẩu ' + ERORR_VALIDATION.required)
         .min(6, 'Mật khẩu phải lớn hơn 6 ký tự'),
   })
   .required();

function FromLogin() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FromLogin>({
      resolver: yupResolver(schemaLogin),
   });

   const onSubmitFrom = async (data: FromLogin) => {
      console.log(data);
   };

   return (
      <div className="mt-10 w-full">
         <h1 className="text-2xl font-bold mb-4">Đăng nhập tài khoản</h1>
         <form onSubmit={handleSubmit(onSubmitFrom)}>
            <div className="mb-5">
               <Lable id="email" className="ml-4">
                  Email
               </Lable>
               <Input fullWidth className="rounded-3xl px-5" {...register('email')} />
               {errors && errors?.email && <p className="text-red-400 text-default ml-4">{errors?.email?.message}</p>}
            </div>
            <div className="mb-5">
               <Lable id="password" className="ml-4">
                  Password
               </Lable>
               <Input fullWidth className="rounded-3xl px-5" {...register('password')} />
               {errors && errors?.password && (
                  <p className="text-red-400 text-default ml-4">{errors?.password?.message}</p>
               )}
            </div>
            <div className="flex justify-between">
               <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-auto" id="remember-password" />
                  <label htmlFor="remember-password">Nhớ mật khẩu</label>
               </div>
               <div className="">
                  <NavLink to="" className="block text-[#0070EA] underline">
                     Quên mật khẩu
                  </NavLink>
               </div>
            </div>
            <div className="mt-7">
               <Button type="submit" fullWidth className="rounded-full bg-[#F27024] font-bold">
                  Đăng nhập
               </Button>
            </div>
         </form>
      </div>
   );
}

export default React.memo(FromLogin);
