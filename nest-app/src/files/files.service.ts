import {
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from '@nestjs/common';
import fs, { createReadStream } from 'fs';
import { join } from 'path/posix';
import config from '../common/config';

@Injectable()
export class FilesService {
  /**
   * Reads the file from STATIC_FILES_DIR provided in .env and returns as a stream
   * @param fileName name of the file to stream
   * @returns StreamableFile stream
   * @throws InternalServerErrorException if the file is nit found
   */
  getFile(fileName: string): StreamableFile {
    const filePath = join(config.STATIC_FILES_DIR, fileName);
    const isFileExists = fs.existsSync(filePath);

    if (!isFileExists)
      throw new InternalServerErrorException(`File ${fileName} not found.`);

    const fileStream = createReadStream(filePath);

    return new StreamableFile(fileStream);
  }

  /**
   * Removes the file from STATIC_FILES_DIR provided in .env and returns the success message
   * @param fileName name of the file to remove
   * @returns text success message
   * @throws InternalServerErrorException if the file is nit found
   */
  async removeFile(fileName: string): Promise<string> {
    const filePath = join(config.STATIC_FILES_DIR, fileName);
    const isFileExists = fs.existsSync(filePath);

    if (!isFileExists)
      throw new InternalServerErrorException(`File ${fileName} not found.`);

    try {
      await fs.promises.rm(filePath);
      return `File "${fileName}" successfully removed from server.`;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
