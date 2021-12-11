import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import PrintIcon from '@material-ui/icons/Print';
import { withStyles } from '@material-ui/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { connect } from 'react-redux';

import { StyledTableCell } from '../UI/Table/Table';

const styles = () => ({
  root: {
    padding: '0 20px',
  },
  tableContainer: {
    border: '1px solid #eee',
    padding: '20px',
    margin: '20px 0',
  },
  loanInfoContainer: {
    margin: '20px 0',
  },
  contentCenter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentRight: {
    display: 'flex',
    alignItems: 'flex-end',
  },

  inputLabel: {
    color: '#333',
    '& :hover': {
      cursor: 'pointer',
    },
  },
  textField: {
    marginTop: '8px',
    marginBottom: '8px',
    width: '100%',

    '& label + .MuiInput-formControl, & .MuiInput-formControl, &.MuiInput-root': {
      padding: '10px',
      border: '1px solid #ccc',
      boxShadow: '0 4px 10px -8px rgba(0,0,0,0.16)',
    },

    '& .MuiInputLabel-shrink': {
      transform: 'translate(0, 1.5px) scale(1)',
    },

    '& .MuiInputLabel-formControl': {
      transform: 'translate(0, -10px) scale(1)',
    },
  },
  w200: {
    width: '200px',
  },
  tableHedingContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  noPadding: {
    padding: 0,
  },
  '@media (max-width: 959px)': {
    root: {
      padding: 0,
    },
  },
});

class PersonalLoanTable extends Component {
  componentDidMount() {
    this.props.updatePaymentTable();
    this.componentRef = this;
  }

  componentDidUpdate(prevProps) {
    const startDateUpdated = prevProps.startDate !== this.props.startDate;
    const loanAmountUpdated =
      prevProps.formData.loanAmount !== this.props.formData.loanAmount;
    const loanTermUpdated =
      prevProps.formData.loanTerm !== this.props.formData.loanTerm;
    const interestRateUpdated =
      prevProps.formData.interestRate !== this.props.formData.interestRate;
    if (
      startDateUpdated ||
      loanAmountUpdated ||
      loanTermUpdated ||
      interestRateUpdated
    ) {
      this.props.updatePaymentTable();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.tableContainer}>
          <Grid container item className={classes.loanInfoContainer}>
            <Grid item xs={6} className={classes.tableHedingContainer}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <label
                  htmlFor="mortgage-start-date"
                  className={classes.inputLabel}
                >
                  Start Date:
                </label>
                <KeyboardDatePicker
                  margin="normal"
                  id="mortgage-start-date"
                  format="MM/dd/yyyy"
                  value={this.props.startDate}
                  onChange={(event, newVal) =>
                    this.props.updateStartDate(newVal)
                  }
                  KeyboardButtonProps={{
                    'aria-label': 'change loan payment start date',
                  }}
                  className={[classes.textField, classes.w200].join(' ')}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid
              item
              xs={6}
              className={[
                classes.contentRight,
                classes.tableHedingContainer,
              ].join(' ')}
            >
              <Typography variant="h5" className={classes.noPadding}>
                Estimated Payoff Date
              </Typography>
              <Typography variant="h3" className={classes.noPadding}>
                {this.props.payoffDate ? this.props.payoffDate : null}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.contentCenter}>
              <Typography variant="h3">Amortization Schedule</Typography>
              <ReactToPrint content={() => this.componentRef}>
                <PrintContextConsumer>
                  {({ handlePrint }) => (
                    <Link
                      style={{ display: 'flex' }}
                      onClick={handlePrint}
                      component="button"
                      variant="h6"
                      color="secondary"
                    >
                      <PrintIcon />
                      Print
                    </Link>
                  )}
                </PrintContextConsumer>
              </ReactToPrint>
            </Grid>
            <Grid item xs={12}>
              <TableContainer
                component={Paper}
                className={classes.paymentBreakdown}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right">
                        Payment Date
                      </StyledTableCell>
                      <StyledTableCell align="right">Payment</StyledTableCell>
                      <StyledTableCell align="right">Principal</StyledTableCell>
                      <StyledTableCell align="right">Interest</StyledTableCell>
                      <StyledTableCell align="right">
                        Total Interest
                      </StyledTableCell>
                      <StyledTableCell align="right">Balance</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.schedulePaymentData
                      ? this.props.schedulePaymentData.map(
                          (paymentData, index) => {
                            return (
                              <Fragment key={index}>
                                <TableRow>
                                  <TableCell align="right">
                                    {paymentData.date.formattedDate}
                                  </TableCell>
                                  <TableCell align="right">
                                    $
                                    {paymentData.monthlyPayment.toLocaleString(
                                      'en'
                                    )}
                                  </TableCell>
                                  <TableCell align="right">
                                    $
                                    {paymentData.principal.toLocaleString('en')}
                                  </TableCell>
                                  <TableCell align="right">
                                    ${paymentData.interest.toLocaleString('en')}
                                  </TableCell>
                                  <TableCell align="right">
                                    $
                                    {(+paymentData.paidSummary
                                      .interest).toLocaleString('en')}
                                  </TableCell>
                                  <TableCell align="right">
                                    $
                                    {(+paymentData.balance).toLocaleString(
                                      'en'
                                    )}
                                  </TableCell>
                                </TableRow>
                              </Fragment>
                            );
                          }
                        )
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    schedulePaymentData: state.personal.schedulePaymentData,
    startDate: state.personal.startDate,
    payoffDate: state.personal.payoffDate,
    formData: state.personal.formData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStartDate: (value) =>
      dispatch({ type: 'UPDATE_PAYMENT_START_DATE', value: value }),
    updatePaymentTable: () =>
      dispatch({ type: 'UPDATE_PERSONAL_PAYMENT_TABLE' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(withStyles(styles)(PersonalLoanTable));
