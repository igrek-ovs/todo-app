import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../hooks/redux';
import { checkoutPayment } from '../../store/actions/PaymentActions';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  DialogContent,
  StyledEngineProvider,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { handleApiError } from '../errorHandler';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogTitle,
  StyledForm,
  StyledIconButton,
} from './components';
import { PaymentDialogProps, PaymentDialogValidationSchema } from './types';

const PaymentDialog = ({ task, open, onClose }: PaymentDialogProps) => {
  const {
    values,
    resetForm,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      amount: 1,
    },

    validationSchema: PaymentDialogValidationSchema,

    onSubmit: async (values: any) => {
      try {
        await dispatch(
          checkoutPayment({ taskId: task.id, amount: values.amount }),
        ).unwrap();
      } catch (error) {
        handleApiError(error);
      }
    },
  });

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <StyledEngineProvider>
      <StyledDialog open={open} onClose={handleClose}>
        <StyledDialogTitle>
          {t('payment.payment_prog')}
          <StyledIconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </StyledIconButton>
        </StyledDialogTitle>
        <DialogContent>
          <StyledForm onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={t('payment.amount')}
              name="amount"
              value={values.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.amount && Boolean(errors.amount)}
            />
            <StyledDialogActions>
              <Button
                variant="contained"
                type="submit"
                sx={{ bgcolor: 'orange.main' }}
              >
                {t('payment.checkout')}
              </Button>
            </StyledDialogActions>
          </StyledForm>
        </DialogContent>
      </StyledDialog>
    </StyledEngineProvider>
  );
};

export default PaymentDialog;
