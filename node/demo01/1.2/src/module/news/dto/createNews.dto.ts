import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum NewsType {
  XINWEN = '新闻资讯',
  TONGZHI = '通知公告',
  RENSHI = '人事变动',
  QUWEN = '趣闻乐事',
}

export class CreateUserDto {
  @IsNotEmpty({
    message: '缺少title参数',
  })
  title: string;

  @IsEnum(NewsType)
  type: NewsType;

  @IsNotEmpty({
    message: '缺少content参数',
  })
  content: string;
}

export class UpdateUserDto {
  @IsNotEmpty({
    message: '缺少id参数',
  })
  @IsNumber()
  id: number;

  @IsNotEmpty({
    message: '缺少title参数',
  })
  title: string;

  @IsEnum(NewsType)
  type: NewsType;

  @IsNotEmpty({
    message: '缺少content参数',
  })
  content: string;
}
