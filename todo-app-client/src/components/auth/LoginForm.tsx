import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks/redux';
import { getUserInfo, login } from '../../store/actions/AuthActions';
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
import { ToDoRoutes } from '../../routes/toDoRoutes';
import { handleApiError } from '../errorHandler';
import LanguageSelector from '../selectors/LanguageSelector';
import {
  StyledButton,
  StyledButtonWrapper,
  StyledFormWrapper,
  StyledLink,
} from './components';
import { validationSchema } from './types';

export const LoginForm = () => {
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
        await dispatch(login(values))
          .unwrap()
          .then(async (data) => {
            await dispatch(getUserInfo(data.userId)).unwrap();
          });

        toast.success(t('messages.login_success_msg'));

        navigate(ToDoRoutes.TASKS);
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
          {t('auth.login')}
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
            {t('login')}
          </StyledButton>
          <StyledLink href="/register">
            {t('auth.dont_have_account')}
          </StyledLink>
        </StyledButtonWrapper>
      </StyledFormWrapper>
    </form>
  );
};
