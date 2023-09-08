import cn from '../../@Core/helpers/cn';

function LazyLoadingFullScreen() {
   return (
      <div className={cn('fixed w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2')}>
         <h1 className="text-2xl">Base project</h1>
      </div>
   );
}

export default LazyLoadingFullScreen;
