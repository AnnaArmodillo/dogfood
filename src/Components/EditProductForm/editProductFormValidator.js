import * as Yup from 'yup';

export const editProductFormValidationScheme = Yup.object({
  name: Yup.string().required('Обязательное поле'),
  price: Yup.number()
    .typeError('Цена должна быть положительным числом')
    .min(0, 'Цена должна быть положительным числом')
    .required('Обязательное поле'),
  wight: Yup.string().required('Обязательное поле'),
  description: Yup.string().required('Обязательное поле'),
  stock: Yup.number()
    .typeError('Количество должно быть числом')
    .min(0, 'Количество не может быть отрицательным')
    .required('Обязательное поле'),
  discount: Yup.number()
    .typeError('Скидка должна быть числом')
    .min(0, 'Скидка не может быть отрицательной')
    .max(100, 'Скидка не может превышать 100%')
    .required('Обязательное поле'),
  pictures: Yup.string()
    .required('Обязательное поле'),
});
