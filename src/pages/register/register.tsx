import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser, selectIsAuth } from '../../services/slices/UserSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [name, setUserName] = useState('');
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
    dispatch(registerUser({ email, name, password }));
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
