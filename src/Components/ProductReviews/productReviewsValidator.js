import * as Yup from 'yup';

export const productReviewsValidationScheme = Yup.object({
  text: Yup.string()
    .required('Обязательное поле'),
  rating: Yup.number()
    .required('Необходимо указать рейтинг'),
});
