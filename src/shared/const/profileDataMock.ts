import { Currency } from 'entities/Currency/model/types/currency';
import { Country } from 'entities/Country';
import { IProfile } from 'entities/Profile';

export const profileDataMock: IProfile = {
  id: '1',
  username: 'admin',
  age: 32,
  country: Country.Russia,
  lastname: 'Veselov',
  first: 'Stanislav',
  city: 'Moscow',
  currency: Currency.RUB,
  avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
};
