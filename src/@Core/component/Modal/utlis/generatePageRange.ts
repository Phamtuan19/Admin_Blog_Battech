function generatePageRange(currentPage: number, perPage: number, totalPage: number) {
   var range = [];
   for (let i = Math.max(2, currentPage - perPage); i <= Math.min(totalPage - 1, currentPage + perPage); i += 1) {
      range.push(i);
   }

   if (currentPage - perPage > 2) {
      if (range.length == totalPage - 3) {
         range.unshift(2);
      } else {
         range.unshift('...');
      }
   }

   if (currentPage + perPage < totalPage - 1) {
      if (range.length == totalPage - 3) {
         range.push(totalPage - 1);
      } else {
         range.push('...');
      }
   }

   range.unshift(1);
   if (totalPage !== 1) range.push(totalPage);

   return range;
}

export default generatePageRange;
