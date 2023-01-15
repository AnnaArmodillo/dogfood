import * as Yup from 'yup';

export const signinValidationScheme = Yup.object({
  email: Yup.string()
    .email('Некорректный адрес электронной почты')
    .required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});
