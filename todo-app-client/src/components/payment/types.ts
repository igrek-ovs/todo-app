import * as Yup from 'yup';
import { Task } from '../../models/Task';

export interface PaymentDialogProps {
  task: Task;
  open: any;
  onClose: any;
}

export const PaymentDialogValidationSchema = Yup.object({
  amount: Yup.number().required('Required').min(1),
});
