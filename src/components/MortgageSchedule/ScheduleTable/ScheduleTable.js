import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { withStyles } from '@material-ui/styles';

import { StyledTableCell } from '../../UI/Table/Table';

import { getNumberStringWithCommas } from '../../../utils/helpers';

const styles = () => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  paperTable: {
    flexGrow: 1,
  },
  container: {
    maxHeight: '440px',
  },
  fullMaxHeight: {
    maxHeight: 'none',
  },
  sticky: {
    position: 'sticky',
    top: '37px',
    fontWeight: 'bold',
  },
  padding10: {
    padding: '10px'
  }
});

class ScheduleTable extends Component {



  handleShowFull = () => {
    this.props.updateShowFull(!this.props.showFull);
  }

  render() {
    const { classes } = this.props;


    const classNames = [classes.container];

    if (this.props.showFull) {
      classNames.push(classes.fullMaxHeight);
    }

    let scheduleTableData = null;

    if (this.props.scheduleTable && this.props.scheduleTable.length) {
      scheduleTableData = (
        <TableContainer component={Paper} className={classNames.join(' ')} >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Payment</StyledTableCell>
                <StyledTableCell align="right">Principal</StyledTableCell>
                <StyledTableCell align="right">Interest</StyledTableCell>
                <StyledTableCell align="right">Balance</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.scheduleTable.map((paymentData, index) => {
                return (
                  <Fragment key={index}>
                    <TableRow hover>
                      <TableCell align="right">
                        {paymentData.date.formattedDate}
                      </TableCell>
                      <TableCell align="right">
                        ${getNumberStringWithCommas(paymentData.monthlyPayment)}
                      </TableCell>
                      <TableCell align="right">
                        ${getNumberStringWithCommas(paymentData.principal)}
                      </TableCell>
                      <TableCell align="right">
                        ${getNumberStringWithCommas(paymentData.interest)}
                      </TableCell>
                      <TableCell align="right">
                        $
                        {
                          // (+paymentData.balance).toLocaleString('en')
                          getNumberStringWithCommas(paymentData.balance)
                        }
                      </TableCell>
                    </TableRow>
                    {paymentData.date.month === 12 ||
                      this.props.scheduleTable.length - 1 === index ? (
                        <TableRow hover>
                          <StyledTableCell
                            className={classes.sticky}
                            component="th"
                            align="right"
                          >
                            Total (as of {paymentData.date.year})
                        </StyledTableCell>
                          <StyledTableCell
                            className={classes.sticky}
                            component="th"
                            align="right"
                          >
                            $
                          {getNumberStringWithCommas(paymentData.paidSummary
                            .monthlyPayment)}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.sticky}
                            component="th"
                            align="right"
                          >
                            $
                          {getNumberStringWithCommas(paymentData.paidSummary.principal)}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.sticky}
                            component="th"
                            align="right"
                          >
                            $
                          {getNumberStringWithCommas(paymentData.paidSummary.interest)}
                          </StyledTableCell>
                          <StyledTableCell
                            className={classes.sticky}
                            component="th"
                            align="right"
                          >
                            $
                          {getNumberStringWithCommas(paymentData.paidSummary.balance)}
                          </StyledTableCell>
                        </TableRow>
                      ) : null}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
    return (
      <div className={classes.root}>
        {scheduleTableData}
        <div className={classes.padding10}>
          <Typography>
            <Link component="button" variant="h6" color="secondary" onClick={() => this.handleShowFull()}>
              {!this.props.showFull ? 'Click to expand' : 'Click to collapse'}
            </Link>
          </Typography>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    scheduleTable: state.mortgage.schedulePaymentData,
    showFull: state.app.mortgage.fullSchedule
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateShowFull: (value) => dispatch({ type: 'TOGGLE_MORTGAGE_FULL_SCHEDULE', value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(withStyles(styles)(ScheduleTable));
