import { classNames } from 'shared/lib/classNames/classNames';
import { FC, useMemo } from 'react';
import { useTAddNs } from 'shared/lib/i18/hooks/useTAddNs';
import { Select } from 'shared/ui/Select/Select';
import { IClientSelectOption } from 'shared/lib/options/types/IClientSelectOption';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types/SortOrder';
import cls from './ArticleSortSelector.module.scss';

interface IArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector: FC<IArticleSortSelectorProps> = (props) => {
  const {
    className,
    onChangeSort,
    onChangeOrder,
    order,
    sort,
  } = props;
  const t = useTAddNs('ArticleSortSelector');
  const orderOptions = useMemo<IClientSelectOption<SortOrder>[]>(() => [{
    value: 'asc',
    content: t('возрастанию'),

  }, {
    value: 'desc',
    content: t('убыванию'),

  }], [t]);

  const sortFieldOptions = useMemo<IClientSelectOption<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED,
      content: t('дате создания'),
    },
    {
      value: ArticleSortField.TITLE,
      content: t('названию'),
    },
    {
      value: ArticleSortField.VIEWS,
      content: t('просмотрам'),
    },
  ], [t]);

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select
        name="sort"
        options={sortFieldOptions}
        label={t('Сортировать ПО')}
        value={sort}
        onChange={onChangeSort}
      />
      <Select
        name="order"
        options={orderOptions}
        label={t('по')}
        value={order}
        onChange={onChangeOrder}
        className={cls.order}

      />
    </div>
  );
};
