function changeToSlug(value: string) {
   return value
      .toLowerCase()
      .trim()
      .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a')
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e')
      .replace(/í|ì|ỉ|ĩ|ị/g, 'i')
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u')
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9-]/g, '-') // Thay thế các ký tự đặc biệt bằng dấu gạch ngang
      .replace(/-+/g, '-') // Đổi nhiều gạch ngang liên tiếp thành một gạch ngang
      .replace(/^-+|-+$/g, ''); // Xóa gạch ngang ở đầu và cuối
}

export default changeToSlug;
