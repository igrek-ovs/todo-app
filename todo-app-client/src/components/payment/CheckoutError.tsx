import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  ContinueShoppingButton,
  SuccessIcon,
  SuccessMessage,
  SuccessPaper,
} from './components';

const CheckoutError = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <SuccessPaper elevation={3}>
        <SuccessIcon>❌️</SuccessIcon>
        <SuccessMessage variant="h5">
          {t('payment.checkout_error')}
        </SuccessMessage>
        <Typography>{t('messages.checkout_err_msg')}</Typography>
        <ContinueShoppingButton
          variant="contained"
          color="primary"
          href="/tasks"
          sx={{ bgcolor: 'red.main' }}
        >
          {t('to_home_page')}
        </ContinueShoppingButton>
      </SuccessPaper>
    </Container>
  );
};

export default CheckoutError;
