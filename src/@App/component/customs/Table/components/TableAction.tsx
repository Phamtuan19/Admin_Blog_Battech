import { Link } from 'react-router-dom';
import { images } from '../../../../../assets';

interface ActionEditTableProps {
   id: string;
}

interface ActionDeleteTableProps {
   callback: () => void;
}

export const ActionEditTable = (props: ActionEditTableProps) => {
   const { id } = props;

   return (
      <Link to={id} className="cursor-pointer">
         <img src={images.edit} alt="" />
      </Link>
   );
};

export const ActionDeleteTable = (props: ActionDeleteTableProps) => {
   const { callback } = props;

   return (
      <span className="cursor-pointer" onClick={callback}>
         <img src={images.delete1} alt="" />
      </span>
   );
};

export const ActionCoppyTableItem = (props: { callback: () => void | Promise<void> }) => {
   const { callback } = props;

   return (
      <span className="cursor-pointer" onClick={callback}>
         <img src={images.coppy} alt="" />
      </span>
   );
};
