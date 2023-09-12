import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';

import { NavLink } from 'react-router-dom';
import Button from '../../../../@Core/component/Button';
import ERROR_VALIDATION from '../../../../@Core/config/ErrorValidation';
import regexs from '../../../../@Core/config/Regex';
import authService from '../../../services/auth.service';
import Input from '../../../../@Core/component/Input';
import Label from '../../../../@Core/component/Label';
import { useAuth } from '../../../redux/slice/auth.slice';

interface FormLogin {
   email: string;
   password: string;
}

const schemaLogin = yup.object().shape({
   email: yup
      .string()
      .required(`Email ${ERROR_VALIDATION.required}`)
      .matches(regexs.email, `Email ${ERROR_VALIDATION.email}`),
   password: yup.string().required(`Mật khẩu ${ERROR_VALIDATION.required}`).min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

function FormLogin() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormLogin>({
      resolver: yupResolver(schemaLogin),
   });

   const { postLogin } = useAuth();

   const onSubmitForm = async (data: FormLogin) => {
      try {
         const user = postLogin(data);
         console.log(user);
      } catch (error) {}
   };

   return (
      <div className="mt-16 w-full">
         <h1 className="text-2xl font-bold mb-4">Đăng nhập tài khoản</h1>
         <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="mb-5">
               <Label htmlFor="email" className="ml-4">
                  Email
               </Label>
               <Input fullWidth className="rounded-3xl px-5 h-[50px]" {...register('email')} />
               <ErrorMessage errors={errors} name="email" as={<p className="text-red-400 text-default ml-4" />} />
            </div>
            <div className="mb-5">
               <Label htmlFor="password" className="ml-4">
                  Password
               </Label>
               <Input fullWidth type="password" className="rounded-3xl px-5 h-[50px]" {...register('password')} />
               <ErrorMessage errors={errors} name="password" as={<p className="text-red-400 text-default ml-4" />} />
            </div>
            <div className="flex justify-between">
               <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-auto" id="remember-password"  />
                  <label htmlFor="remember-password">Nhớ mật khẩu</label>
               </div>
               <div className="">
                  <NavLink to="" className="block text-[#0070EA] underline">
                     Quên mật khẩu
                  </NavLink>
               </div>
            </div>
            <div className="mt-7">
               <Button type="submit" fullWidth className="rounded-full bg-[#F27024] font-bold h-[50px]">
                  Đăng nhập
               </Button>
            </div>
         </form>
      </div>
   );
}

export default React.memo(FormLogin);
