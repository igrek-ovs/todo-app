import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import styled from 'styled-components';

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

export const StyledDialogActions = styled(DialogActions)`
  justify-content: flex-end;
`;

export const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const SuccessPaper = styled(Paper)`
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const SuccessIcon = styled.span`
  font-size: 64px;
  color: #4caf50;
`;

export const SuccessMessage = styled(Typography)`
  margin: 16px 0;
`;

export const ContinueShoppingButton = styled(Button)`
  margin-top: 16px;
`;
