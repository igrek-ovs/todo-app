import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  IconButton,
  Tab,
  Table,
  TableCell,
  TableContainer,
  Tabs,
} from '@mui/material';
import styled from 'styled-components';

export const StyledTaskContainer = styled(Container)`
  padding-top: 20px;
`;

export const StyledTaskHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const StyledTaskTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: orange;
  }
`;

export const StyledTab = styled(Tab)({
  '&.Mui-selected': {
    color: 'orange',
    fontWeight: 'bold',
  },
});

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 400px;
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

export const StyledDialogActions = styled(DialogActions)`
  justify-content: flex-end;
`;

export const StyledTableContainer = styled(TableContainer)`
  max-height: 60vh;
  overflow-y: auto;
`;

export const StyledTable = styled(Table)`
  min-width: 650px;
`;

export const StyledTableHeadCell = styled(TableCell)`
  background-color: #f9f9f9;
  font-weight: bold;
  text-align: center;
`;

export const StyledTableCell = styled(TableCell)`
  text-align: center;
`;

export const StyledEditCell = styled(TableCell)`
  width: 50px;
`;

export const LoadingContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
