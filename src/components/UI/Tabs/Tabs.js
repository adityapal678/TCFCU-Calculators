import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import { withStyles } from '@material-ui/styles';

const StyledTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})((props) => <Tabs />);

export default StyledTabs;
