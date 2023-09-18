import React from 'react';

export interface TypeColumnHelper {
   id: string;
   header: React.ReactNode;
   cell?: any;
   render?: (data: any, index: any) => any;
}

export const createColumnHelper = () => {
   const accessor = (propsAccessor: TypeColumnHelper) => {
      const { id, header, cell, render } = propsAccessor;

      return {
         id,
         header,
         cell,
         render,
      };
   };

   return { accessor };
};
