import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, selectIsAuth } from '../../services/slices/UserSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isAuth = useSelector(selectIsAuth);

  const location = useLocation();
  const fromPath = (location.state as { from?: string })?.from || '/';

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate(fromPath, { replace: true });
    }
  }, [isAuth, fromPath, navigate]);

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
