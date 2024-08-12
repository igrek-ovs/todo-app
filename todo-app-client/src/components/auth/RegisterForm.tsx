import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  getUserInfo,
  register,
  resendCode,
} from '../../store/actions/AuthActions';
import { useAppDispatch } from '../../hooks/redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  StyledButton,
  StyledButtonWrapper,
  StyledFormWrapper,
  StyledLink,
} from '../../components/auth/components';
import { ToDoRoutes } from '../../routes/toDoRoutes';
import { handleApiError } from '../errorHandler';
import LanguageSelector from '../selectors/LanguageSelector';
import { validationSchema } from './types';

const RegisterForm = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: validationSchema,

    onSubmit: async (values): Promise<void> => {
      try {
        let email: string;
        let userId: string;

        await dispatch(register(values))
          .unwrap()
          .then(async (data) => {
            userId = data.userId;
            await dispatch(getUserInfo(userId))
              .unwrap()
              .then((info) => {
                email = info.email;
              });
            await dispatch(resendCode({ userId, email })).unwrap();
          });

        toast.success(t('messages.register_success_msg'));

        navigate(ToDoRoutes.CONFIRM);
      } catch (error: any) {
        handleApiError(error);
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <LanguageSelector />
      <StyledFormWrapper>
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
          {t('auth.register')}
        </Typography>
        <TextField
          sx={{ marginBottom: 2 }}
          label={t('auth.email')}
          variant="outlined"
          fullWidth
          name="email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          InputProps={{
            style: {
              fontSize: 17,
            },
          }}
        />
        <TextField
          label={t('auth.password')}
          variant="outlined"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={values.password}
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          InputProps={{
            style: {
              fontSize: 17,
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <StyledButtonWrapper>
          <StyledButton
            variant="contained"
            type="submit"
            sx={{ bgcolor: 'orange.main' }}
          >
            {t('auth.register')}
          </StyledButton>

          <StyledLink href="/login">{t('auth.have_account')}</StyledLink>
        </StyledButtonWrapper>
      </StyledFormWrapper>
    </form>
  );
};

export default RegisterForm;
