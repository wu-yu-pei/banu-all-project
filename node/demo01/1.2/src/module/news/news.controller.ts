import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateUserDto, UpdateUserDto } from './dto/createNews.dto';
import { News, ResposeType } from './types';
import { isNumber } from 'src/utils';

@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('/news')
  createNews(@Body() createNewsDto: CreateUserDto): ResposeType<any> {
    return this.newsService.createNews(createNewsDto);
  }

  @Get('/news')
  // eslint-disable-next-line prettier/prettier
  getNews(@Query('pageSize') pageSize = 10, @Query('page') page = 1): ResposeType<News[]> {
    if (!isNumber(pageSize)) {
      throw new BadRequestException('pageSize必须是数字');
    }
    if (!isNumber(page)) {
      throw new BadRequestException('page必须是数字');
    }

    return this.newsService.getNews(pageSize, page);
  }

  @Get('/news/:id')
  getNewsDetial(@Param('id') id: number): ResposeType<News> {
    if (!isNumber(id)) {
      throw new BadRequestException('id必须是数字');
    }

    return this.newsService.getNewsDetial(id);
  }

  @Delete('/news/:id')
  deleteNews(@Param('id') id: number): ResposeType<any> {
    if (!isNumber(id)) {
      throw new BadRequestException('id必须是数字');
    }

    return this.newsService.deleteNewsDetial(id);
  }

  @Put('/news')
  updateNews(@Body() updateUserDto: UpdateUserDto): ResposeType<any> {
    const { id } = updateUserDto;

    return this.newsService.updateNews(id);
  }
}
