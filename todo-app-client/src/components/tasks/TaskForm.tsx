import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { WebSocketContext } from '../../contexts/WebSocket';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  completeTask,
  deleteTask,
  fetchTasks,
  fetchTasksByName,
} from '../../store/actions/TaskActions';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import PaymentIcon from '@mui/icons-material/Payment';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Badge,
  Box,
  Button,
  IconButton,
  LinearProgress,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Task } from '../../models/Task';
import { ToDoRoutes } from '../../routes/toDoRoutes';
import { index } from '../../theme/index';
import { handleApiError } from '../errorHandler';
import LanguageSelector from '../selectors/LanguageSelector';
import AddTaskDialog from './AddTaskDialog';
import {
  LoadingContainer,
  StyledEditCell,
  StyledTab,
  StyledTable,
  StyledTableCell,
  StyledTableContainer,
  StyledTableHeadCell,
  StyledTaskContainer,
  StyledTaskHeader,
  StyledTaskTabs,
} from './components';
import EditTaskDialog from './EditTaskDialog';
import { EventTypes, TableTypes, TaskFrequency, TaskType } from './types';
import PaymentDialog from '../payment/PaymentDialog';

const TaskForm = () => {
  const { t } = useTranslation();

  const webSocket = useContext(WebSocketContext);

  const { isOnline } = useAppSelector((state) => state.online);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector((state) => state.task);

  const { userId, email } = useAppSelector((state) => state.auth);

  const [taskType, setTaskType] = useState(TableTypes.ALL);

  const [searchTerm, setSearchTerm] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [tableTasks, setTableTasks] = useState([]);

  const [editingTask, setEditingTask] = useState<Task>();
  const [paymentTask, setPaymentTask] = useState<Task>();
  const [openEditor, setOpenEditor] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openPaymentForm, setOpenPaymentForm] = useState(false);

  const filteredTasks: Task[] =
    taskType === TableTypes.ALL
      ? tasks
      : tasks.filter(
          (task: Task) =>
            task.isCompleted === (taskType === TableTypes.COMPLETED),
        );

  useEffect(() => {
    if (webSocket.socket) {
      webSocket.socket.on(EventTypes.TASK_UPDATED, async (data) => {
        console.log(data);
      });
    }

    sliceDataForTable();
  }, [page, tasks, filteredTasks, isOnline, editingTask]);

  const sliceDataForTable = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setTableTasks(filteredTasks.slice(startIndex, endIndex));
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchTermChange = async (event: any) => {
    setSearchTerm(event.target.value);

    setTimeout(() => {
      handleSearch();
    }, 1000);
  };

  const handleSearch = async () => {
    try {
      await dispatch(
        fetchTasksByName({ userId: userId, searchTerm: searchTerm }),
      ).unwrap();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(ToDoRoutes.LOGIN);
  };

  const handleTaskTypeChange = (type: string) => {
    setTaskType(type as TableTypes);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await dispatch(deleteTask(taskId)).unwrap();

      toast.success(t('messages.task_deleted_msg'));
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUpdateListClick = async () => {
    try {
      await dispatch(fetchTasks(userId)).unwrap();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await dispatch(completeTask(taskId)).unwrap();

      toast.success(t('messages.task_completed_msg'));
    } catch (error) {
      handleApiError(error);
    }
  };

  const choiceTranslation = (str: string) => {
    switch (str) {
      case TaskType.ONETIME:
        return t('task.one_time');
      case TaskType.RECCURING:
        return t('task.reccuring');
      case TaskType.ACCUMULATING:
        return t('task.accumulating');
      case TaskFrequency.DAILY:
        return t('task.daily');
      case TaskFrequency.MONTHLY:
        return t('task.monthly');
      case TaskFrequency.YEARLY:
        return t('task.yearly');
    }
  };

  return (
    <ThemeProvider theme={index}>
      <StyledTaskContainer>
        <StyledTaskHeader>
          <LanguageSelector />
          <Badge
            color={isOnline ? 'success' : 'error'}
            badgeContent={
              isOnline ? `${t('main.online')}` : `${t('main.offline')}`
            }
          />
          <Typography variant="subtitle1">
            {t('main.welcome', { email: email })}
          </Typography>
          <TextField
            label={t('main.search_task')}
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <Button
            sx={{ bgcolor: 'green.main', color: 'white' }}
            variant="contained"
            onClick={() => setOpenAddForm(true)}
          >
            {t('main.add_task')}
          </Button>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{ bgcolor: 'red.main', color: 'white' }}
          >
            {t('main.logout')}
          </Button>
        </StyledTaskHeader>
        <Box>
          <StyledTaskTabs value={taskType} centered sx={{ marginBottom: 2 }}>
            <StyledTab
              label={t('main.all')}
              value="All"
              onClick={() => handleTaskTypeChange(TableTypes.ALL)}
            />
            <StyledTab
              label={t('main.active')}
              value="Active"
              onClick={() => handleTaskTypeChange(TableTypes.ACTIVE)}
            />
            <StyledTab
              label={t('main.completed')}
              value="Completed"
              onClick={() => handleTaskTypeChange(TableTypes.COMPLETED)}
            />
          </StyledTaskTabs>
        </Box>
        <StyledTableContainer>
          {isLoading ? (
            <LoadingContainer>
              <CircularProgress color="primary" />
            </LoadingContainer>
          ) : (
            <StyledTable>
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell>
                    {t('task.task_name')}
                  </StyledTableHeadCell>
                  <StyledTableHeadCell>
                    {t('task.task_desc')}
                  </StyledTableHeadCell>
                  <StyledTableHeadCell>
                    {t('task.task_date')}
                  </StyledTableHeadCell>
                  <StyledTableHeadCell>
                    {t('task.task_type')}
                  </StyledTableHeadCell>
                  <StyledTableHeadCell>
                    {t('task.task_freq')}
                  </StyledTableHeadCell>
                  <StyledTableHeadCell>
                    {t('task.task_prog')}
                  </StyledTableHeadCell>
                  <StyledTableHeadCell>
                    {t('task.task_acc_goal')}
                  </StyledTableHeadCell>
                  <StyledTableHeadCell>
                    {t('task.task_completed')}
                  </StyledTableHeadCell>
                  <StyledTableHeadCell>
                    <IconButton onClick={() => handleUpdateListClick()}>
                      <RestartAltIcon />
                    </IconButton>
                  </StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableTasks.map((task: Task) => (
                  <TableRow key={task.id}>
                    <StyledTableCell>{task.name}</StyledTableCell>
                    <StyledTableCell>{task.description}</StyledTableCell>
                    <StyledTableCell>{task.dueDate.toString()}</StyledTableCell>
                    <StyledTableCell>
                      {choiceTranslation(task.taskType)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {choiceTranslation(task.frequency)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {task.taskType === TaskType.ACCUMULATING ? (
                        <>
                          <LinearProgress
                            variant="determinate"
                            value={
                              (task.accumulativeProgress /
                                task.accumulativeGoal) *
                              100
                            }
                          />
                          <Typography variant="body2">
                            ${task.accumulativeProgress} / $
                            {task.accumulativeGoal}
                          </Typography>
                        </>
                      ) : null}
                    </StyledTableCell>
                    <StyledTableCell>{task.accumulativeGoal}</StyledTableCell>
                    <StyledTableCell>
                      {task.isCompleted ? `${t('yes')}` : `${t('no')}`}
                    </StyledTableCell>
                    <StyledEditCell>
                      {task.taskType !== TaskType.ACCUMULATING &&
                      task.isCompleted === false ? (
                        <IconButton
                          onClick={() => handleCompleteTask(task.id)}
                          sx={{ color: 'green.light' }}
                        >
                          <CheckIcon />
                        </IconButton>
                      ) : null}
                      {task.taskType === TaskType.ACCUMULATING &&
                      task.isCompleted === false ? (
                        <IconButton
                          onClick={() => {
                            setPaymentTask(task);
                            setOpenPaymentForm(true);
                          }}
                          sx={{ color: 'green.light' }}
                        >
                          <PaymentIcon />
                        </IconButton>
                      ) : null}
                      <IconButton
                        onClick={() => {
                          setEditingTask(task);
                          console.log('Expected task');
                          console.log(task);
                          console.log('Editing task');
                          console.log(editingTask);
                          setOpenEditor(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="delete"
                        onClick={() => handleDeleteTask(task.id)}
                        sx={{ color: 'red.light' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledEditCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
          )}
        </StyledTableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={filteredTasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledTaskContainer>
      {editingTask && (
        <EditTaskDialog
          initialValues={{
            id: editingTask.id,
            name: editingTask.name,
            description: editingTask.description,
            dueDate: dayjs(editingTask.dueDate),
            taskType: editingTask.taskType,
            accumulativeProgress: editingTask.accumulativeProgress,
            accumulativeGoal: editingTask.accumulativeGoal,
            frequency: editingTask.frequency,
            isCompleted: editingTask.isCompleted,
            userId: editingTask.userId,
          }}
          open={openEditor}
          onClose={() => setOpenEditor(false)}
        />
      )}
      {paymentTask && (
        <PaymentDialog
          task={paymentTask}
          open={openPaymentForm}
          onClose={() => setOpenPaymentForm(false)}
        />
      )}
      <AddTaskDialog open={openAddForm} onClose={() => setOpenAddForm(false)} />
    </ThemeProvider>
  );
};

export default TaskForm;
