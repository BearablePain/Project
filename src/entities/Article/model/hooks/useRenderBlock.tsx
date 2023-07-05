import { useCallback } from 'react';
import {
  ArticleBlock, ArticleBlockType, IArticleCodeBlock, IArticleImageBlock, IArticleTextBlock,
} from 'entities/Article/model/types/article';
import { ArticleCodeBlockComponent } from 'entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import cls from 'entities/Article/ui/ArticleDetails/ArticleDetails.module.scss';
import { ArticleImageBlockComponent } from 'entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from 'entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';

const useRenderBlock = () => useCallback((block: ArticleBlock) => ({
  [ArticleBlockType.CODE]: (
    <ArticleCodeBlockComponent
      key={block.id}
      block={block as IArticleCodeBlock}
      className={cls.block}
    />),
  [ArticleBlockType.IMAGE]: (<ArticleImageBlockComponent
    key={block.id}
    block={block as IArticleImageBlock}
    className={cls.block}
  />),
  [ArticleBlockType.TEXT]: (<ArticleTextBlockComponent
    key={block.id}
    className={cls.block}
    block={block as IArticleTextBlock}
  />),
}[block.type]), []);

export default useRenderBlock;
