import { IUser } from 'entities/User';

export enum ArticleSortField {
  VIEWS = 'views',
  TITLE = 'title',
  CREATED = 'createdAt',
}

export const enum ArticleView {
  BIG = 'BIG',
  SMALL = 'SMALL',
}

export const enum ArticleBlockType {
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
}

export interface IArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export interface IArticleCodeBlock extends IArticleBlockBase {
  type: ArticleBlockType.CODE;
  code: string;
}

export interface IArticleImageBlock extends IArticleBlockBase {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
}

export interface IArticleTextBlock extends IArticleBlockBase {
  type: ArticleBlockType.TEXT;
  paragraphs: string[];
  title?: string;
}

export type ArticleBlock = IArticleCodeBlock | IArticleImageBlock | IArticleTextBlock;

export const enum ArticleType {
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECONOMICS = 'ECONOMICS',
  ALL = 'ALL'

}

export interface IArticle {
  id: string;
  title: string;
  user: IUser;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
}
