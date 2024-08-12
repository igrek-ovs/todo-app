import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),

  password: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      'Password must be at least 6 characters long, contain at least 1 uppercase letter and 1 digit',
    ),
});

export const confirmValidationSchema = Yup.object({
  code: Yup.string()
    .matches(
      /^[0-9A-Z]{6}$/,
      'Code should be 6 characters long and consist of digits and uppercase letters',
    )
    .required('Required'),
});
