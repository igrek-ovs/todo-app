import { Box, Button, Card, DialogTitle, Link } from '@mui/material';
import styled from 'styled-components';

export const StyledButtonWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export const StyledFormWrapper = styled(Card)`
  padding: 20px;
  width: 300px;
  margin: 10% auto auto;
`;

export const StyledButton = styled(Button)`
  color: white;
`;

export const StyledLink = styled(Link)`
  font-size: smaller;
  color: gray;
  text-decoration: none;
  margin-top: 10px;
`;

export const ResendButton = styled(Button)`
  color: gray;
  margin-top: 16px;
  cursor: pointer;
`;
