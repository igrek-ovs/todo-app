import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createTask } from '../../store/actions/TaskActions';
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
import dayjs from 'dayjs';
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
import { AddTaskProps, AddTaskValidationSchema, TaskType } from './types';

const AddTaskDialog = ({ open, onClose }: AddTaskProps) => {
  const { userId } = useAppSelector((state) => state.auth);
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      name: '',
      description: '',
      dueDate: dayjs(Date.now()),
      taskType: TaskType.ONETIME,
      accumulativeProgress: null,
      accumulativeGoal: null,
      frequency: null,
      isCompleted: false,
      userId: userId,
    },

    validationSchema: AddTaskValidationSchema,

    onSubmit: async (values: any) => {
      try {
        await dispatch(createTask(values)).unwrap();

        toast.success(t('messages.new_task_msg'));

        handleClose();
      } catch (error: any) {
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
          {t('main.add_task')}
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
            />
            <TextField
              fullWidth
              label={t('task.task_desc')}
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
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
              <InputLabel>{t('task.task_type')}</InputLabel>
              <Select
                label={t('task.task_type')}
                name="taskType"
                value={values.taskType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="ONE-TIME">{t('task.one_time')}</MenuItem>
                <MenuItem value="RECCURING">{t('task.reccuring')}</MenuItem>
                <MenuItem value="ACCUMULATING">
                  {t('task.accumulating')}
                </MenuItem>
              </Select>
            </StyledFormControl>
            {values.taskType === TaskType.RECCURING && (
              <StyledFormControl fullWidth>
                <InputLabel>{t('task.task_freq')}</InputLabel>
                <Select
                  label={t('task.task_freq')}
                  name="frequency"
                  value={values.frequency}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.frequency && Boolean(errors.frequency)}
                >
                  <MenuItem value="DAILY">{t('task.daily')}</MenuItem>
                  <MenuItem value="MONTHLY">{t('task.monthly')}</MenuItem>
                  <MenuItem value="YEARLY">{t('task.yearly')}</MenuItem>
                </Select>
              </StyledFormControl>
            )}
            {values.taskType === TaskType.ACCUMULATING && (
              <TextField
                type="number"
                label={t('task.task_acc_goal')}
                name="accumulativeGoal"
                value={values.accumulativeGoal}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.accumulativeGoal && Boolean(errors.accumulativeGoal)
                }
              />
            )}
            <StyledDialogActions>
              <Button
                variant="contained"
                type="submit"
                sx={{ bgcolor: 'orange.main' }}
              >
                {t('add')}
              </Button>
            </StyledDialogActions>
          </StyledForm>
        </DialogContent>
      </StyledDialog>
    </StyledEngineProvider>
  );
};

export default AddTaskDialog;
