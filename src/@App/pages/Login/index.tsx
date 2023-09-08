import React from 'react';
import { images } from '../../../assets';
import FromLogin from './component/FromLogin';

function Login() {
   return (
      <div className="w-full h-[100vh] overflow-hidden flex justify-center items-center">
         <div
            className="relative w-[1225px] h-[650px] bg-center bg-no-repeat bg-cover flex justify-center items-center"
            style={{
               backgroundImage: `url(${images.bgLoginSvg})`,
            }}
         >
            <div className="absolute left-[51%] bottom-10 -translate-x-[51%]  w-[400px] min-h-[500px] bg-white shadow-default rounded-lg">
               <div className="flex flex-col items-center px-10 pt-15 py-10">
                  <img src={images.logo} width={250} height={100} alt="" />
                  <FromLogin />
               </div>
            </div>
         </div>
      </div>
   );
}


export default Login;
