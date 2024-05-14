import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from 'entities/Article';
import { getUserAuthData } from 'entities/User';

const getCanEditArticle = createSelector(getArticleDetailsData, getUserAuthData, (article, user) => {
  if (!article || !user) {
    return false;
  }
  return true;
  // return article?.user?.id === user?.id;
});

export default getCanEditArticle;
