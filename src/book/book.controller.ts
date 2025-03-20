import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SearchBookDto } from './dto/search-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Add-REQ-01: Add new books
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  // Edit-REQ-01: Edit existing book information
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  // Delete-REQ-01: Delete books
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }

  // Search-REQ-04: Search for books
  // Add this new endpoint for searching with a request body
  @Post('search/books')
  @UsePipes(new ValidationPipe({ transform: true }))
  searchWithBody(@Body() searchBookDto: SearchBookDto) {
    console.log('Search body:', searchBookDto); // For debugging
    return this.booksService.search(searchBookDto);
  }
}
