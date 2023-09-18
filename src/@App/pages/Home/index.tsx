import Button from '../../../@Core/component/Button';
import { useToastMessage } from '../../redux/slice/toastMessage.slice';

export default function Home() {
   const { setToastMessage } = useToastMessage();

   const handleClick = (mes: string) => {
      setToastMessage(mes);
   };

   // return <TableCustom data={dataPost?.data || []} columns={columns as any} />;
   return (
      <>
         <Button onClick={() => handleClick('Click me!!!')}>Click me!</Button>
         <Button onClick={() => handleClick('Click ')}>Click me!</Button>
      </>
   );
}
