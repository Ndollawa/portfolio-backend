import { diskStorage } from 'multer';
import multerFilter from '@app/common/config/multerConfig';
// import { MulterOptions } from '@nestjs/common';

export const FileOptions = (destination: string) => {
  return {
    storage: diskStorage({
      destination,
      filename: function (req, file, callback) {
        callback(null, Date.now() + '--' + file.originalname);
      },
    }),
    fileFilter: multerFilter,
  };
};
