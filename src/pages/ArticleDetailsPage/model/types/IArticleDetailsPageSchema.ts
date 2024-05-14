import { IArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';
import { IArticleDetailsRecommendationsSchema } from 'pages/ArticleDetailsPage/model/types/IArticleDetailsRecommendationsSchema';

export interface IArticleDetailsPageSchema {
  comments: IArticleDetailsCommentsSchema;
  recommendations: IArticleDetailsRecommendationsSchema;
}
