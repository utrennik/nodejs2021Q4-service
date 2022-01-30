/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable node/no-extraneous-import */
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import config from '../common/config';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
        destination: (_, file, cb) => {
          cb(null, config.STATIC_FILES_DIR);
        },
      }),
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
