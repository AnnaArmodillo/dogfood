import { ProductReview } from '../ProductReview/ProductReview';

export function ProductReviews({ reviews }) {
  reviews.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  return (
    <>
      <h3>Отзывы</h3>
      <ul>
        {reviews.map((review) => <ProductReview review={review} key={review.created_at} />)}
      </ul>
    </>
  );
}
