import { Tab, Tabs } from '@mui/material';
import styled from 'styled-components';

export const StyledTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: orange;
  }
`;

export const StyledTab = styled(Tab)({
  '&.Mui-selected': {
    color: 'orange',
    fontWeight: 'bold',
  },
  width: 10,
  fontSize: 14,
});
