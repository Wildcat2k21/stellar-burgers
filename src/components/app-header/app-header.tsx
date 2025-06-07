import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectName } from '../../services/slices/UserSlice';

export const AppHeader: FC = () => {
  const name = useSelector(selectName);
  return <AppHeaderUI userName={name} />;
};
