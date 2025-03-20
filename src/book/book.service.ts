import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SearchBookDto } from './dto/search-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  // Add-REQ-01: Librarians shall add new books to the system
  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookModel.create(createBookDto as any);
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookModel.findByPk(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  // Edit-REQ-01: Librarians shall edit existing book information
  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    // Update the book with new values
    await book.update(updateBookDto);

    return book;
  }

  // Delete-REQ-01: Librarians shall delete books from the system
  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await book.destroy();
  }

  // Search-REQ-04: Librarians shall search for books in the system
  async search(searchBookDto: SearchBookDto): Promise<Book[]> {
    const whereConditions = {};

    // Build search criteria
    if (searchBookDto.title) {
      whereConditions['title'] = { [Op.iLike]: `%${searchBookDto.title}%` };
    }

    if (searchBookDto.author) {
      whereConditions['author'] = { [Op.iLike]: `%${searchBookDto.author}%` };
    }

    if (searchBookDto.isbn) {
      whereConditions['isbn'] = { [Op.iLike]: `%${searchBookDto.isbn}%` };
    }

    if (searchBookDto.category) {
      whereConditions['category'] = {
        [Op.iLike]: `%${searchBookDto.category}%`,
      };
    }

    // If no search criteria provided, return all books
    if (Object.keys(whereConditions).length === 0) {
      return this.findAll();
    }

    return this.bookModel.findAll({
      where: whereConditions,
    });
  }
}
