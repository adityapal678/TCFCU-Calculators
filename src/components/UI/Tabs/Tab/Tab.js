import React from 'react';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/styles';

const StyledTab = withStyles({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: '500',
    marginRight: '20px',
    height: '200px',
    backgroundColor: 'red',
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: '600',
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
})((props) => <Tab disableRipple {...props} />);

export default StyledTab;
