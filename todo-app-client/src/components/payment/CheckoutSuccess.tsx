import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  Container,
  ContinueShoppingButton,
  SuccessIcon,
  SuccessMessage,
  SuccessPaper,
} from './components';

const CheckoutSuccess = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <SuccessPaper elevation={3}>
        <SuccessIcon>✔️</SuccessIcon>
        <SuccessMessage variant="h5">
          {t('payment.checkout_success')}
        </SuccessMessage>
        <Typography>{t('messages.checkout_succ_msg')}</Typography>
        <ContinueShoppingButton
          variant="contained"
          color="primary"
          href="/tasks"
          sx={{ bgcolor: 'green.main' }}
        >
          {t('to_home_page')}
        </ContinueShoppingButton>
      </SuccessPaper>
    </Container>
  );
};

export default CheckoutSuccess;
