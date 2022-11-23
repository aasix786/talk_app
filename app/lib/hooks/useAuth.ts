import {useContext} from 'react';
import {UserContext} from '../contexts/User';

export const useAuth = () => {
  return useContext(UserContext);
};
