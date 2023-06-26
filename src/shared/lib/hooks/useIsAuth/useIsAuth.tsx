import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';

const useIsAuth = () => useSelector(getUserAuthData);

export default useIsAuth;
