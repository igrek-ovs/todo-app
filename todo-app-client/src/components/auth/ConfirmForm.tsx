import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { confirmCode, resendCode } from '../../store/actions/AuthActions';
import { TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToDoRoutes } from '../../routes/toDoRoutes';
import { handleApiError } from '../errorHandler';
import {
  ResendButton,
  StyledButton,
  StyledButtonWrapper,
  StyledFormWrapper,
} from './components';
import { confirmValidationSchema } from './types';
import LanguageSelector from '../selectors/LanguageSelector';

const ConfirmForm = () => {
  const { t } = useTranslation();

  const [resendActive, setResendActive] = useState(true);
  const [timer, setTimer] = useState(0);

  const dispatch = useAppDispatch();
  const { userId, email } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    let interval: any;
    if (!resendActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer: any) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(interval);
      setResendActive(true);
    }

    return () => {
      clearInterval(interval);
    };
  }, [resendActive, timer]);

  const handleResendClick = async () => {
    try {
      await dispatch(resendCode({ userId, email })).unwrap();
      toast.success(t('messages.resend_code_msg'));
      setResendActive(false);
      setTimer(60);
    } catch (error: any) {
      handleApiError(error);
    }
  };

  const { values, handleBlur, errors, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        code: '',
      },

      validationSchema: confirmValidationSchema,

      onSubmit: async (values): Promise<void> => {
        try {
          const { code } = values;

          await dispatch(confirmCode({ userId, code })).unwrap();

          toast.success(t('messages.acc_success_msg'));

          navigate(ToDoRoutes.TASKS);
        } catch (error: any) {
          handleApiError(error);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <LanguageSelector />
      <StyledFormWrapper>
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
          {t('auth.acc_confirm')}
        </Typography>
        <TextField
          sx={{ marginBottom: 2 }}
          label={t('auth.code')}
          variant="outlined"
          onBlur={handleBlur}
          fullWidth
          name="code"
          value={values.code}
          onChange={handleChange}
          error={touched.code && Boolean(errors.code)}
          helperText={touched.code && errors.code}
          InputProps={{
            style: {
              fontSize: 17,
            },
          }}
        />
        <StyledButtonWrapper>
          <StyledButton
            variant="contained"
            type="submit"
            sx={{ bgcolor: 'orange.main' }}
          >
            {t('auth.confirm')}
          </StyledButton>
          <ResendButton onClick={handleResendClick} disabled={!resendActive}>
            {resendActive
              ? `${t('auth.send_code_again')}`
              : `${t('auth.code_sent', { timer: timer })}`}
          </ResendButton>
        </StyledButtonWrapper>
      </StyledFormWrapper>
    </form>
  );
};

export default ConfirmForm;
