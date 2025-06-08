import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectEmail,
  selectName,
  updateUser
} from '../../services/slices/UserSlice';

export const Profile: FC = () => {
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);

  const [formValue, setFormValue] = useState({
    name: name,
    email: email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: name,
      email: email
    }));
  }, [name, email]);

  const isFormChanged =
    formValue.name !== name ||
    formValue.email !== email ||
    !!formValue.password;

  const dispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: name,
      email: email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
