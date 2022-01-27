import { FilesService } from './files.service';
import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { originalname, filename } = file;
    return `File "${originalname}" uploaded to server. Saved as ${filename}`;
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
