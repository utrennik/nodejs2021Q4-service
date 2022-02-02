import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post()
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const { filename } = file;
    return `File "${filename}" uploaded to server.`;
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
