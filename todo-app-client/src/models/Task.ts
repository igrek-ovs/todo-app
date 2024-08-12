export interface Task {
  id?: string;

  name: string;

  description: string;

  dueDate: Date;

  taskType: string;

  accumulativeProgress?: number;

  accumulativeGoal?: number;

  frequency?: string;

  isCompleted: boolean;

  userId: string;
}
