import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getTokenSelector } from '../../redux/slices/tokenSlice';
import { getUserIDSelector } from '../../redux/slices/userIDSlice';
import { Loader } from '../Loader/Loader';
import profileStyle from './profile.module.css';

export function Profile() {
  const token = useSelector(getTokenSelector);
  const userID = useSelector(getUserIDSelector);
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
    <div className={profileStyle.card}>
      <div className={profileStyle.photo}><img src={userData.avatar} alt="фото профиля" /></div>
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
  );
}
