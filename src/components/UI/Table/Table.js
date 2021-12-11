import TableCell from '@material-ui/core/TableCell';

import { withStyles } from '@material-ui/styles';

export const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: '#98005e',
    color: '#fff',
    border: 0,
  },
  root: {
    backgroundColor: '#98005e',
    color: '#fff',
  },
  body: {
    fontSize: '1rem',
  },
}))(TableCell);
