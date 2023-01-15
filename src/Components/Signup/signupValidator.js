import * as Yup from 'yup';

export const signupValidationScheme = Yup.object({
  email: Yup.string()
    .email('Некорректный адрес электронной почты')
    .required('Обязательное поле'),
  group: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});
