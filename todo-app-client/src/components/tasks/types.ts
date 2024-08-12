import * as Yup from 'yup';
import { Task } from '../../models/Task';

export interface EditTaskProps {
  initialValues: any;
  open: any;
  onClose: any;
}

export interface AddTaskProps {
  open: any;
  onClose: any;
}

export enum EventTypes {
  TASK_UPDATED = 'task.updated',
}

export enum TableTypes {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export enum TaskType {
  ONETIME = 'ONE-TIME',
  RECCURING = 'RECCURING',
  ACCUMULATING = 'ACCUMULATING',
}

export enum TaskFrequency {
  DAILY = 'DAILY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export const EditTaskValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().optional(),
  dueDate: Yup.date().required('Required'),
  isCompleted: Yup.boolean().required('Required'),
});

export const AddTaskValidationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().optional(),
  taskType: Yup.string().oneOf([
    TaskType.ONETIME,
    TaskType.RECCURING,
    TaskType.ACCUMULATING,
  ]),
});
