import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dogFoodApi } from '../../api/DogFoodApi';
import { getTokenSelector } from '../../redux/slices/userSlice/tokenSlice';
import { Loader } from '../Loader/Loader';
import { Comment } from '../Comment/Comment';
import commentsStyle from './comments.module.css';

export function Comments() {
  const token = useSelector(getTokenSelector);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
  }, [token]);
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['allReviews'],
    queryFn: () => dogFoodApi.getAllReviews(token),
    enabled: !!token,
  });
  if (isLoading) return <Loader />;
  if (isError) {
    return <div className={commentsStyle.errorMessage}>{error.message}</div>;
  }
  reviews.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  return (
    <ul className={commentsStyle.reviews}>
      {reviews.map((review) => (
        <Comment
          review={review}
          key={review['_id']}
        />
      ))}
    </ul>
  );
}
