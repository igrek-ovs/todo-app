import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks/redux';
import { updateTask } from '../../store/actions/TaskActions';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  DialogContent,
  InputLabel,
  MenuItem,
  Select,
  StyledEngineProvider,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';
import React from 'react';
import { handleApiError } from '../errorHandler';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogTitle,
  StyledForm,
  StyledFormControl,
  StyledIconButton,
} from './components';
import { EditTaskProps, EditTaskValidationSchema, TaskType } from './types';

const EditTaskDialog = ({ initialValues, open, onClose }: EditTaskProps) => {
  const {
    values,
    touched,
    resetForm,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: EditTaskValidationSchema,
    onSubmit: async (values: any) => {
      try {
        await dispatch(updateTask(values)).unwrap();

        toast.success(t('messages.task_updated_msg'));
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
          {t('main.edit_task')}
          <StyledIconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </StyledIconButton>
        </StyledDialogTitle>
        <DialogContent>
          <StyledForm onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={t('task.task_name')}
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && Boolean(errors.name)}
            />
            <TextField
              fullWidth
              label={t('task.task_desc')}
              name="description"
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && Boolean(errors.description)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={t('task.task_date')}
                value={values.dueDate}
                onChange={(value) => {
                  values.dueDate = value;
                }}
                format="YYYY-MM-DD"
              />
            </LocalizationProvider>
            <StyledFormControl fullWidth>
              {values.taskType !== TaskType.ACCUMULATING && (
                <>
                  <InputLabel>{t('task.task_completed')}</InputLabel>
                  <Select
                    label={t('task.task_completed')}
                    name="isCompleted"
                    value={values.isCompleted}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.isCompleted && Boolean(errors.isCompleted)}
                  >
                    <MenuItem value={true as any}>{t('yes')}</MenuItem>
                    <MenuItem value={false as any}>{t('no')}</MenuItem>
                  </Select>
                </>
              )}
            </StyledFormControl>
            <StyledDialogActions>
              <Button
                variant="contained"
                type="submit"
                sx={{ bgcolor: 'orange.main' }}
              >
                {t('save')}
              </Button>
            </StyledDialogActions>
          </StyledForm>
        </DialogContent>
      </StyledDialog>
    </StyledEngineProvider>
  );
};

export default EditTaskDialog;
