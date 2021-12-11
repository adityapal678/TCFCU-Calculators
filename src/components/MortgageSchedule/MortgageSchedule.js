import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
// import { debounce } from 'debounce';
import NumberFormat from '../../utils/numberFormat';
import ReactToPrint, {PrintContextConsumer} from 'react-to-print';
import PrintIcon from '@material-ui/icons/Print';
import {
  InputAdornment,
  TextField,
  debounce,
  Typography,
  Link
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import { withStyles } from '@material-ui/styles';

import ScheduleTable from './ScheduleTable/ScheduleTable';

import { styles } from './Styles';
import PaymentBreakdown from './PaymentBreakdown/PaymentBreakdown';

class MortgageSchedule extends Component {
  state = {
    extraMonthlyPayment: 0,
    anualPayment: 0,
    onetimePayment: 0,
  };


  componentDidMount() {
    this.updateExtraMonthlyPayment = debounce(
      this.updateExtraMonthlyPayment,
      1000
    );

    this.updateAnualPayment = debounce(this.updateAnualPayment, 1000);
    this.updateOnetimePayment = debounce(this.updateOnetimePayment, 1000);

    this.setState({
      extraMonthlyPayment: this.props.extraMonthlyPayment,
      anualPayment: this.props.anualPayment,
      onetimePayment: this.props.onetimePayment,
    });

    if (this.props.monthlyPayment) {
      let waiting = false;
      let limit = 100;

      if (!waiting) {
        waiting = true;
        const timeout = setTimeout(() => {
          this.props.updateSchedule();
          waiting = false;
          clearTimeout(timeout);
        }, limit);
      }
    }
  }

  handleExtraMonthlyPayment = (event) => {
    let amount = +event.target.value;

    if (amount < 0) {
      amount = 0;
    }
    if (amount >= this.props.price) {
      amount = this.props.price - this.props.monthlyPayment;
    }

    this.setState({ extraMonthlyPayment: +amount });
    this.updateExtraMonthlyPayment(+amount);
  };

  handleAnualPayment = (amount) => {
    if (amount < 0) {
      amount = 0;
    }
    if (amount >= this.props.price) {
      amount = this.props.price - this.props.monthlyPayment;
    }
    this.setState({ anualPayment: +amount });
    this.updateAnualPayment(+amount);
  };

  handleOnetimePayment = (amount) => {
    if (amount < 0) {
      amount = 0;
    }
    if (amount >= this.props.price) {
      amount = this.props.price - this.props.monthlyPayment;
    }
    this.setState({ onetimePayment: +amount });
    this.updateOnetimePayment(+amount);
  };

  updateExtraMonthlyPayment = (amount) => {
    this.props.updateExtraMonthlyPayment(amount);
  };

  updateAnualPayment = (amount) => {
    this.props.updateAnualPayment(amount);
  };

  updateOnetimePayment = (amount) => {
    this.props.updateOnetimePayment(amount);
  };

  componentDidUpdate(prevProps) {
    const monthlyPaymentUpdated =
      prevProps.monthlyPayment !== this.props.monthlyPayment &&
      !isNaN(this.props.monthlyPayment);
    const anualPaymentUpdated =
      prevProps.anualPayment !== this.props.anualPayment;
    const extraMonthlyPaymentUpdated =
      prevProps.extraMonthlyPayment !== this.props.extraMonthlyPayment;
    const onetimePaymentUpdated =
      prevProps.onetimePayment !== this.props.onetimePayment;
    const startDateUpdated = prevProps.startDate !== this.props.startDate;
    const anualPaymentMonthUpdated =
      prevProps.anualPaymentMonth !== this.props.anualPaymentMonth;
    const onetimePaymentDateUpdated =
      prevProps.onetimePaymentDate !== this.props.onetimePaymentDate;
    const downPaymentUpdated = prevProps.downPayment !== this.props.downPayment;

    if (
      monthlyPaymentUpdated ||
      anualPaymentUpdated ||
      extraMonthlyPaymentUpdated ||
      onetimePaymentUpdated ||
      startDateUpdated ||
      anualPaymentMonthUpdated ||
      onetimePaymentDateUpdated ||
      downPaymentUpdated
    ) {

      let waiting = false;
      let limit = 100;

      if (!waiting) {
        waiting = true;
        const timeout = setTimeout(() => {
          this.props.updateSchedule();
          waiting = false;
          clearTimeout(timeout);
        }, limit);
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={12} className={classes.marginY}>
          <Typography variant="h4">
            
            
            
            
            
            
            
            Want to pay your house off faster?
          
          
          
          
          
          
          
          </Typography>
          <Typography variant="body1" component="p">
            See how fast you can pay off your house by making extra payments.
            Calculate your payoff date by paying more each month, paying more
            each year, or paying a one-time amount.
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <div>
            <div className={classes.controlContainer}>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <label
                    htmlFor="mortgage-start-date"
                    className={classes.inputLabel}
                  >
                    Mortgage start date:
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
                      'aria-label': 'change mortgage start date',
                    }}
                    className={[classes.textField, classes.w90].join(' ')}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </div>
            <div className={classes.controlContainer}>
              <Grid item xs={6}>
                <label
                  htmlFor="extra-monthly-payment"
                  className={classes.inputLabel}
                >
                  Add extra monthly payment:
                </label>
                <TextField
                  id="extra-monthly-payment"
                  className={[classes.textField, classes.w90].join(' ')}
                  onChange={this.handleExtraMonthlyPayment}
                  value={this.state.extraMonthlyPayment}
                  InputProps={{
                    inputComponent: NumberFormat,
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </div>
            <div className={classes.controlContainer}>
              <Grid item xs={6}>
                <label htmlFor="anual-payment" className={classes.inputLabel}>
                  Anual payment:
                </label>
                <TextField
                  id="anual-payment"
                  className={[classes.textField, classes.w90].join(' ')}
                  onChange={(event) =>
                    this.handleAnualPayment(+event.target.value)
                  }
                  value={this.state.anualPayment}
                  InputProps={{
                    inputComponent: NumberFormat,
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <label
                    htmlFor="anual-payment-month"
                    className={classes.inputLabel}
                  >
                    Every:
                  </label>
                  <DatePicker
                    views={['month']}
                    id="anual-payment-month"
                    format="MMMM"
                    value={
                      new Date(
                        `${new Date().getFullYear()}-${
                          this.props.anualPaymentMonth
                        }`
                      )
                    }
                    onChange={(newDate) =>
                      this.props.updateAnualPaymentMonth(
                        +newDate.getMonth() + 1
                      )
                    }
                    className={[classes.textField, classes.w90].join(' ')}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </div>
            <div className={classes.controlContainer}>
              <Grid item xs={6}>
                <label htmlFor="onetime-payment" className={classes.inputLabel}>
                  One-time payment:
                </label>
                <TextField
                  id="onetime-payment"
                  className={[classes.textField, classes.w90].join(' ')}
                  onChange={(event) =>
                    this.handleOnetimePayment(+event.target.value)
                  }
                  value={this.state.onetimePayment}
                  InputProps={{
                    inputComponent: NumberFormat,
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <label
                    htmlFor="onetime-payment-date"
                    className={classes.inputLabel}
                  >
                    On:
                  </label>
                  <DatePicker
                    views={['year', 'month']}
                    id="onetime-payment-date"
                    minDate={new Date()}
                    value={this.props.onetimePaymentDate}
                    onChange={(newDate) =>
                      this.props.updateOnetimePaymentDate(newDate)
                    }
                    className={[classes.textField, classes.w90].join(' ')}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </div>
            <div className={classes.payoffInfo}>
              <Typography
                variant="h5"
                component="h5"
                className={classes.noPadding}
              >
                Mortgage payoff date:
              </Typography>
              {this.props.payoffDate ? (
                <Typography variant="h2" className={classes.payoffHeading}>
                  {this.props.payoffDate.strMonth}. {this.props.payoffDate.day},{' '}
                  {this.props.payoffDate.year}
                </Typography>
              ) : null}
            </div>
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <PaymentBreakdown />
        </Grid>

        <Grid item xs={12} className={classes.marginY}>
          <Grid item xs={12} className={classes.contentEnd}>
            <Typography variant="h3" className={classes.amortizationHeading}>
              Amortization schedule
            </Typography>
            <ReactToPrint 
              content={() => this.componentRef}
            
            >
              <PrintContextConsumer>
                {({handlePrint}) => (
                  <Link style={{display: 'flex'}} onClick={() => {
                    this.props.updateShowFull(true);
                    setTimeout(() => {
                      handlePrint();
                    }, 100)
                  }} component="button" variant="h6" color="secondary">
                    <PrintIcon />
                    Print payment schedule
                  </Link> 
                )}
              </PrintContextConsumer>
            </ReactToPrint>

            
            
          </Grid>
          <ScheduleTable ref={el => this.componentRef = el} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.mortgage.formData.price,
    monthlyPayment: state.mortgage.monthlyPayment,
    anualPayment: state.mortgage.anualPaymentData.amount,
    anualPaymentMonth: state.mortgage.anualPaymentData.month,
    extraMonthlyPayment: state.mortgage.extraMonthlyPayment,
    onetimePayment: state.mortgage.onetimePaymentData.amount,
    onetimePaymentDate: state.mortgage.onetimePaymentData.date,
    startDate: state.mortgage.startDate,
    payoffDate: state.mortgage.payoffDate,
    downPayment: state.mortgage.downPayment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSchedule: () => dispatch({ type: 'UPDATE_SCHEDULE' }),
    updateStartDate: (value) =>
      dispatch({ type: 'UPDATE_START_DATE', value: value }),
    updateExtraMonthlyPayment: (value) =>
      dispatch({ type: 'UPDATE_EXTRA_MONTHLY_PAYMENT', value: value }),
    updateAnualPayment: (value) =>
      dispatch({ type: 'UPDATE_ANUAL_PAYMENT', value: value }),
    updateAnualPaymentMonth: (value) =>
      dispatch({ type: 'UPDATE_ANUAL_PAYMENT_MONTH', value: value }),
    updateOnetimePayment: (value) =>
      dispatch({ type: 'UPDATE_ONETIME_PAYMENT', value: value }),
    updateOnetimePaymentDate: (value) =>
      dispatch({ type: 'UPDATE_ONETIME_PAYMENT_DATE', value: value }),
      updateShowFull : (value) => dispatch({type: 'TOGGLE_MORTGAGE_FULL_SCHEDULE', value: value})
  };
};

export default 
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MortgageSchedule));
