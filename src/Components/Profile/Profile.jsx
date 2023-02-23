import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getTokenSelector } from '../../redux/slices/userSlice/tokenSlice';
import { getUserIDSelector } from '../../redux/slices/userSlice/userIDSlice';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { NewProductForm } from '../NewProductForm/NewProductForm';
import profileStyle from './profile.module.css';

export function Profile() {
  const token = useSelector(getTokenSelector);
  const userID = useSelector(getUserIDSelector);
  const navigate = useNavigate();
  const [isAddNewProductModalActive, setIsAddNewProductModalActive] = useState(false);
  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
  }, [token]);
  function closeModalHandler() {
    setIsAddNewProductModalActive(false);
  }
  function openModalHandler() {
    setIsAddNewProductModalActive(true);
  }
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => dogFoodApi.getUserByID(userID, token),
    enabled: !!token,
  });
  if (isLoading) return <Loader />;
  if (isError) {
    return <div className={profileStyle.errorMessage}>{error.message}</div>;
  }
  return (
    <>
      <div className={profileStyle.card}>
        <div className={profileStyle.photo}>
          <img
            src={userData.avatar}
            alt="фото профиля"
          />
        </div>
        <div className={profileStyle.infoWrapper}>
          <h1>{userData.name}</h1>
          <div className={profileStyle.info}>
            Должность:
            {' '}
            {userData.about}
          </div>
          <div className={profileStyle.info}>
            Email:
            {' '}
            {userData.email}
          </div>
          <div className={profileStyle.info}>
            Группа:
            {' '}
            {userData.group}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={openModalHandler}
        className={profileStyle.button}
      >
        Добавить новый товар в каталог
      </button>
      <Modal
        isModalActive={isAddNewProductModalActive}
        closeModalHandler={closeModalHandler}
      >
        <NewProductForm setIsAddNewProductModalActive={setIsAddNewProductModalActive} />
      </Modal>
    </>
  );
}
