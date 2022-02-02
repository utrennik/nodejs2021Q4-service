/* eslint-disable node/no-unsupported-features/node-builtins */
import * as fs from 'fs';
import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  InternalServerErrorException,
  Param,
  Get,
  Delete,
  StreamableFile,
} from '@nestjs/common';
import { pipeline } from 'stream';
import path from 'path/posix';
import { AuthGuard } from '../auth/auth.guard';
import config from '../common/config';
import { FilesService } from './files.service';

@Controller('files')
export class FilesControllerFastify {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async uploadFile(@Req() req, @Res() reply): Promise<void> {
    const data = await req.file('file');

    const { file, filename } = data;

    pipeline(
      file,
      fs.createWriteStream(path.resolve(config.STATIC_FILES_DIR, filename)),
      (err) => {
        if (err) throw new InternalServerErrorException(err.message);
        reply.send(`File ${filename} uploaded to server successfully.`);
      },
    );
  }

  @Get(':name')
  findOne(@Param('name') name: string): StreamableFile {
    const streamableFile = this.filesService.getFile(name);
    return streamableFile;
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    const removeResult = await this.filesService.removeFile(name);

    return removeResult;
  }
}
