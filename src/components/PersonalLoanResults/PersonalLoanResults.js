import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Link,
} from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 20px',
  },
  resultsContainer: {
    padding: '20px',
    border: '1px solid #eee',
  },
  leadSection: {
    padding: '0 0.75rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
  },
  flexRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  resultsTable: {
    marginTop: '0.5rem',
    marginBottom: '1rem',
  },

  paymentSummary: {
    order: 2,
    padding: '.75rem',
  },
  paymentInfo: {
    order: 1,
    padding: '.75rem',
  },
  noPadding: {
    padding: 0,
  },

  textCenter: {
    textAlign: 'center'
  },
  '@media (max-width: 959px)': {
    root: {
      padding: 0,
      marginTop: '20px',
    },
    contentCenter: {
      justifyContent: 'center',
    },
  },
}));

const PersonalLoanResults = (props) => {
  const classes = useStyles();
  const { updatePaymentTable } = props;

  useEffect(() => {
    updatePaymentTable();
  }, [updatePaymentTable]);

  return (
    <div className={classes.root}>
      <Grid item container className={classes.resultsContainer}>
        <Typography variant="h1">Your results</Typography>
        <Grid item container className={classes.flex}>
          <Grid item xs={12} md={6} className={classes.paymentSummary}>
            <Grid
              item
              xs={12}
              className={[classes.flex, classes.contentCenter].join(' ')}
            >
              <div className={classes.leadSection}>
                <Typography variant="h6" className={classes.textCenter}>Estimated payment</Typography>
                <Typography variant="h2" className={classes.noPadding}>
                  ${props.monthlyPayment.toLocaleString('en')}
                </Typography>
              </div>
              <div className={classes.leadSection}>
                <Typography variant="h6" className={classes.textCenter}>Loan term (yrs)</Typography>
                <Typography variant="h2" className={classes.noPadding}>
                  {props.loanTerm}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} className={classes.paymentInfo}>
            <div>
              <TableContainer
                component={Paper}
                className={classes.resultsTable}
              >
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className={classes.flex}>
                          <span>Total Principal Paid</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={classes.flexRight}>
                          <span>${props.loanAmount.toLocaleString('en')}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className={classes.flex}>
                          <span>Total Interest Paid</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={classes.flexRight}>
                          <span>
                            {props.totalInterestPayment
                              ? '$' +
                                props.totalInterestPayment.toLocaleString('en')
                              : null}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div>
              <Typography>
                <Link
                  component="button"
                  variant="h6"
                  color="secondary"
                  onClick={() => props.updateShowSchedule(!props.showSchedule)}
                >
                  {!props.showSchedule
                    ? 'Show amortization schedule'
                    : 'Hide amortization schedule'}
                </Link>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    monthlyPayment: state.personal.monthlyPayment,
    totalInterestPayment: state.personal.totalInterestPayment,
    loanTerm: state.personal.formData.loanTerm,
    loanAmount: state.personal.formData.loanAmount,
    showSchedule: state.app.personal.schedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShowSchedule: (value) =>
      dispatch({ type: 'SHOW_PERSONAL_SCHEDULE', value: value }),
    updatePaymentTable: () =>
      dispatch({ type: 'UPDATE_PERSONAL_PAYMENT_TABLE' }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalLoanResults);
