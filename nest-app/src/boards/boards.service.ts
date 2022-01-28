import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import Board from './entities/board.entity';

@Injectable()
export class BoardsService {
  private BOARD_RELATIONS = { relations: ['columns'] };

  constructor(
    @InjectRepository(Board)
    private repo: Repository<Board>,
  ) {}

  /**
   * Adds a Board to repository
   * @param createBoardDto board dto
   * @returns added board (Promise)
   */
  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const newBoardData = await this.repo.create(createBoardDto);

    const newBoard = await this.repo.save(newBoardData);

    return newBoard;
  }

  /**
   * Returns all Boards in the repo (Promise)
   * @returns All Boards (Promise)
   */
  async findAll(): Promise<Board[]> {
    const boards = await this.repo.find(this.BOARD_RELATIONS);

    return boards;
  }

  /**
   * Returns the Board by Board id
   * @param id Board id
   * @returns Board (Promise)
   * @throws NotFoundException if the Board is not found
   */
  async findOne(id: string): Promise<Board> {
    const board = await this.repo.findOne(id, this.BOARD_RELATIONS);

    if (!board) throw new NotFoundException('Board not found!');

    return board;
  }

  /**
   * Updates a Board by id
   * @param id id of the Board to get updated
   * @param updateBoardDto update Board DTO
   * @returns updated Board (Promise)
   * @throws NotFoundException if Board is not found
   */
  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const board = this.repo.findOne(id);

    if (!board) throw new NotFoundException('Board not found!');

    const updatedBoard = { ...board, ...updateBoardDto };

    await this.repo.save(updatedBoard);

    return updatedBoard;
  }

  /**
   * Removes a board from the repository
   * @param id id of the board to be deleted
   * @returns void (Promise)
   * @throws NotFoundException if Board is not found
   */
  async remove(id: string) {
    const board = this.repo.findOne(id);
    if (!board) throw new NotFoundException('Board not found!');

    const deleteResult = await this.repo.delete(id);

    if (!deleteResult.affected)
      throw new InternalServerErrorException('Board not deleted!');
  }
}
