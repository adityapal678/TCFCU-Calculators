import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  InputAdornment,
  TextField,
  Grid,
  IconButton,
  Select,
  MenuItem,
  Link,
  debounce,
  Typography,
  ClickAwayListener,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import { withStyles } from '@material-ui/styles';

// import debounce from '../../utils/debounce';
import { StyledSlider } from '../UI/Slider/Slider';
import { LightTooltip } from '../UI/Tooltip/Tooltip';

import { styles } from './Styles';

import NumberFormat from '../../utils/numberFormat';

class MortgageForm extends Component {
  state = {
    toolTip: {
      downPayment: false,
      loanDuration: false,
      interestRate: false,
    },
    sliderMinVal: 80000,
    sliderMaxIncrement: 5000,
    sliderMaxIntialVal: 1000000,
    advancedOption: false,
    data: {
      price: 0,
      downPayment: 0,
      downPaymentPercentage: 0,
      interestRate: 0,
    },
  };

  componentDidMount() {
    this.updatePrice = debounce(this.updatePrice, 500);
    this.updateDownPayment = debounce(this.updateDownPayment, 500);
    this.updateInterestRate = debounce(this.updateInterestRate, 500);
    this.updateDownPaymentPercentage = debounce(
      this.updateDownPaymentPercentage,
      500
    );

    this.setState({
      data: {
        price: this.props.price,
        downPayment: this.props.downPayment,
        downPaymentPercentage: this.props.downPaymentPercentage,
        interestRate: this.props.interestRate,
        // propertyTax: this.props.propertyTax
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.downPayment !== this.props.downPayment ||
      prevProps.price !== this.props.price ||
      prevProps.interestRate !== this.props.interestRate
      // prevProps.propertyTax !== this.props.propertyTax
    ) {
      const data = {
        ...this.state.data,
        price: this.props.price,
        downPayment: this.props.downPayment,
        downPaymentPercentage: this.props.downPaymentPercentage,
        interestRate: this.props.interestRate,
        // propertyTax: this.props.propertyTax
      };

      this.setState({
        data: data,
      });

      // let waiting = false;
      // let limit = 100;

      // if (!waiting) {
      //   waiting = true;
      //   const timeout = setTimeout(() => {
      //     //this.props.updateMonthlyPayment();
      //     waiting = false;
      //     clearTimeout(timeout);
      //   }, limit);
      // }
    }

    // if (prevProps.price !== this.props.price) {
    //   const data = {
    //     ...this.state.data,
    //     price: this.props.price,
    //   };
    //   this.setState({ data: data });
    // }
  }

  updatePrice = (price) => {
    this.props.updatePrice(price);
  };

  updateDownPayment = (downPayment) => {
    this.props.updateDownPayment(downPayment);
  };

  updateDownPaymentPercentage = (percentage) => {
    this.props.updateDownPaymentPercentage(percentage);
  };

  handlePriceChange = (newVal, debounce) => {
    if (newVal < 0) {
      newVal = 0;
    }
    this.setState({ data: { ...this.state.data, price: newVal } });

    if (!debounce) {
      this.props.updatePrice(newVal);
    } else {
      this.updatePrice(newVal);
    }
  };

  handleDownPaymentChange = (newVal) => {
    if (newVal < 0) {
      newVal = 0;
    }
    if (newVal >= this.state.data.price) {
      newVal = this.state.data.price - (this.state.data.price * 10) / 100;
    }
    this.setState({ data: { ...this.state.data, downPayment: newVal } });
    this.updateDownPayment(newVal);
  };

  handleDownPaymentPercentageChange = (newVal) => {
    if (newVal > 90) {
      newVal = 90;
    }
    this.setState({
      data: { ...this.state.data, downPaymentPercentage: newVal },
    });
    this.updateDownPaymentPercentage(newVal);
  };

  handleInterestRateChange = (event) => {
    let interest = +event.target.value;
    if (interest < 0) {
      interest = 0;
    }
    if (interest > 50) {
      interest = 50;
    }

    this.setState({
      data: { ...this.state.data, interestRate: interest },
    });

    this.updateInterestRate(interest);
  };

  updateInterestRate = (value) => {
    this.props.updateInterestRate(value);
  };

  handleToolTipToggle = (toolTip) => {
    this.setState({
      toolTip: {
        ...this.state.toolTip,
        [toolTip]: !this.state.toolTip[toolTip],
      },
    });
  };

  hideToolTip = (toolTip) => {
    if (!this.state.toolTip[toolTip]) {
      return;
    }
    this.setState({
      toolTip: {
        ...this.state.toolTip,
        [toolTip]: false,
      },
    });
  };

  handleAdvandedToggle = () => {
    this.setState({
      advancedOption: !this.state.advancedOption,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <div className={classes.amountInfo}>
            <Grid item xs={7} className={classes.borderRight}>
              <TextField
                id="home-price"
                name="home-price"
                className={[
                  classes.textField,
                  classes.noBorder,
                  classes.fontBig,
                ].join(' ')}
                value={this.state.data.price}
                onChange={(event) =>
                  this.handlePriceChange(+event.target.value)
                }
                InputProps={{
                  inputComponent: NumberFormat,
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Typography variant="h5" component="span">
              Home Price
            </Typography>
          </div>
          <StyledSlider
            value={this.state.data.price}
            min={this.state.sliderMinVal}
            className={classes.slider}
            max={
              this.state.data.price >= this.state.sliderMaxIntialVal
                ? this.state.data.price + this.state.sliderMaxIncrement
                : this.state.sliderMaxIntialVal
            }
            onChange={(event, newVal) => this.handlePriceChange(newVal, false)}
          />
        </div>
        <div className={classes.flexColumn}>
          <div className={classes.controlContainer}>
            <Grid item container>
              <Grid item xs={12} className={classes.labelContainer}>
                <label htmlFor="down-payment" className={classes.inputLabel}>
                  Down Payment
                </label>
                <ClickAwayListener
                  onClickAway={() => this.hideToolTip('downPayment')}
                >
                  <LightTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={() => this.handleToolTipToggle('downPayment')}
                    open={this.state.toolTip.downPayment}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="The down payment is the portion of the sale price of a home that is not financed. The amount of the down payment can affect the interest rate you get, as lenders will typically offer lower rates for borrowers who make larger down payments."
                    placement="top-end"
                  >
                    <IconButton
                      aria-label="info"
                      onClick={() => this.handleToolTipToggle('downPayment')}
                    >
                      <InfoIcon />
                    </IconButton>
                  </LightTooltip>
                </ClickAwayListener>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  id="down-payment"
                  className={classes.textField}
                  value={this.state.data.downPayment}
                  onChange={(event) =>
                    this.handleDownPaymentChange(+event.target.value)
                  }
                  InputProps={{
                    inputComponent: NumberFormat,
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="down-payment-percent"
                  className={classes.textField}
                  value={this.state.data.downPaymentPercentage}
                  onChange={(event) =>
                    this.handleDownPaymentPercentageChange(+event.target.value)
                  }
                  InputProps={{
                    type: 'number',
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className={classes.flexColumn}>
          <div className={classes.controlContainer}>
            <Grid item container>
              <Grid item xs={12} className={classes.labelContainer}>
                <label htmlFor="length-of-loan" className={classes.inputLabel}>
                  Length of loan
                </label>
                <ClickAwayListener
                  onClickAway={() => this.hideToolTip('loanDuration')}
                >
                  <LightTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={() => this.handleToolTipToggle('loanDuration')}
                    open={this.state.toolTip.loanDuration}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="The loan term is the amount of time or number of years that you will have to repay a loan. Longer term mortgages can make the amount you pay each month smaller as opposed to shorter term loans, by stretching out your payments over more years."
                    placement="top-end"
                  >
                    <IconButton
                      aria-label="info"
                      onClick={() => this.handleToolTipToggle('loanDuration')}
                    >
                      <InfoIcon />
                    </IconButton>
                  </LightTooltip>
                </ClickAwayListener>
              </Grid>
              <Grid item xs={12}>
                <Select
                  id="length-of-loan"
                  value={this.props.loanDuration}
                  className={classes.textField}
                  onChange={(event) =>
                    this.props.updateLoanDuration(+event.target.value)
                  }
                >
                  <MenuItem key="select-key" value="">
                    <em>Please Select one</em>
                  </MenuItem>
                  {this.props.interestRates
                    ? this.props.interestRates.map((interestRate, i) => (
                        <MenuItem key={i} value={interestRate.year}>
                          {interestRate.year} Years
                        </MenuItem>
                      ))
                    : [
                        <MenuItem key={0} value={30}>
                          30 Years
                        </MenuItem>,
                        <MenuItem key={1} value={20}>
                          20 Years
                        </MenuItem>,
                        <MenuItem key={2} value={15}>
                          15 Years
                        </MenuItem>,
                        <MenuItem key={3} value={10}>
                          10 Years
                        </MenuItem>,
                        <MenuItem key={4} S value={5}>
                          5 Years
                        </MenuItem>,
                      ]}
                  {/* <MenuItem value={30}>30 Years</MenuItem>
                  <MenuItem value={20}>20 Years</MenuItem>
                  <MenuItem value={15}>15 Years</MenuItem>
                  <MenuItem value={10}>10 Years</MenuItem>
                  <MenuItem value={5}>5 Years</MenuItem> */}
                </Select>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={classes.flexColumn}>
          <div className={classes.controlContainer}>
            <Grid container item>
              <Grid item xs={12} className={classes.labelContainer}>
                <label htmlFor="interest-rate" className={classes.inputLabel}>
                  Interest Rate
                </label>
                <ClickAwayListener
                  onClickAway={() => this.hideToolTip('interestRate')}
                >
                  <LightTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={() => this.handleToolTipToggle('interestRate')}
                    open={this.state.toolTip.interestRate}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="The interest rate is the amount you’ll pay each year to borrow the money for your loan, expressed as a percentage."
                    placement="top-end"
                  >
                    <IconButton
                      aria-label="info"
                      onClick={() => this.handleToolTipToggle('interestRate')}
                    >
                      <InfoIcon />
                    </IconButton>
                  </LightTooltip>
                </ClickAwayListener>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="interest-rate"
                  className={classes.textField}
                  value={this.state.data.interestRate}
                  onChange={this.handleInterestRateChange}
                  InputProps={{
                    type: 'number',
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </div>

        {this.state.advancedOption ? (
          <Fragment>
            <div className={classes.flexColumn}>
              <div className={classes.controlContainer}>
                <Grid container item>
                  <Grid item xs={12} className={classes.labelContainer}>
                    <label htmlFor="zip-code" className={classes.inputLabel}>
                      Zip code
                    </label>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="zip-code"
                      className={classes.textField}
                      value={this.props.zipCode}
                      onChange={(event) =>
                        this.props.updateZipCode(+event.target.value)
                      }
                      InputProps={{
                        type: 'number',
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className={classes.flexColumn}>
              <div className={classes.controlContainer}>
                <Grid item container>
                  <Grid item xs={12} className={classes.labelContainer}>
                    <label
                      htmlFor="credit-score"
                      className={classes.inputLabel}
                    >
                      Credit score
                    </label>
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      id="credit-score"
                      value={this.props.creditScore}
                      className={classes.textField}
                      onChange={(event) =>
                        this.props.updateCreditScore(+event.target.value)
                      }
                    >
                      <MenuItem value="">
                        <em>Please Select one</em>
                      </MenuItem>
                      <MenuItem value={740}>740+</MenuItem>
                      <MenuItem value={720}>720 - 739</MenuItem>
                      <MenuItem value={700}>700 - 719</MenuItem>
                      <MenuItem value={680}>680 - 699</MenuItem>
                      <MenuItem value={660}>660 - 679</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className={classes.flexColumn}>
              <div className={classes.controlContainer}>
                <Grid item container>
                  <Grid item xs={12} className={classes.labelContainer}>
                    <label
                      htmlFor="property-tax"
                      className={classes.inputLabel}
                    >
                      Property tax
                    </label>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="property-tax"
                      className={classes.textField}
                      value={this.props.propertyTax}
                      onChange={(event) =>
                        this.props.updatePropertyTax(+event.target.value)
                      }
                      InputProps={{
                        inputComponent: NumberFormat,
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="property-tax-percent"
                      className={classes.textField}
                      value={this.props.propertyTaxPercentage}
                      onChange={(event) =>
                        this.props.updatePropertyTaxPercentage(
                          +event.target.value
                        )
                      }
                      InputProps={{
                        type: 'number',
                        endAdornment: (
                          <InputAdornment position="end">%(Y)</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className={classes.flexColumn}>
              <div className={classes.controlContainer}>
                <Grid item container>
                  <Grid item xs={12} className={classes.labelContainer}>
                    <label
                      htmlFor="owner-insurance"
                      className={classes.inputLabel}
                    >
                      Homeowner's insurance
                    </label>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="owner-insurance"
                      className={classes.textField}
                      value={this.props.ownerInsurance}
                      onChange={(event) =>
                        this.props.updateOwnerInsurence(+event.target.value)
                      }
                      InputProps={{
                        type: 'number',
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className={classes.flexColumn}>
              <div className={classes.controlContainer}>
                <Grid item container>
                  <Grid item xs={12} className={classes.labelContainer}>
                    <label htmlFor="hoa-fees" className={classes.inputLabel}>
                      HOA fees
                    </label>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="hoa-fees"
                      className={classes.textField}
                      value={this.props.hoaFees}
                      onChange={(event) =>
                        this.props.updateHOAFees(+event.target.value)
                      }
                      InputProps={{
                        type: 'number',
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </Fragment>
        ) : null}

        <div className={classes.flexColumn}>
          <Link
            component="button"
            variant="h6"
            color="secondary"
            // style={{  textDecoration: 'none'  }}
            onClick={this.handleAdvandedToggle}
          >
            {this.state.advancedOption
              ? 'Hide advanced option'
              : 'Show advanced option'}
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    interestRates: state.mortgage.interestRates,
    price: state.mortgage.formData.price,
    downPayment: state.mortgage.formData.downPayment,
    downPaymentPercentage: state.mortgage.formData.downPaymentPercentage,
    loanDuration: state.mortgage.formData.loanDuration,
    interestRate: state.mortgage.formData.interestRate,
    zipCode: state.mortgage.formData.zipCode,
    creditScore: state.mortgage.formData.creditScore,
    propertyTax: state.mortgage.formData.propertyTax,
    propertyTaxPercentage: state.mortgage.formData.propertyTaxPercentage,
    ownerInsurance: state.mortgage.formData.ownerInsurance,
    hoaFees: state.mortgage.formData.hoaFees,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMonthlyPayment: () => dispatch({ type: 'UPDATE_MONTHLY_PAYMENT' }),
    updateDownPayment: (value) =>
      dispatch({ type: 'UPDATE_DOWNPAYMENT', value: value }),
    updateDownPaymentPercentage: (value) =>
      dispatch({ type: 'UPDATE_DOWNPAYMENT_PERCENTAGE', value: value }),
    updatePrice: (value) => dispatch({ type: 'UPDATE_PRICE', value: value }),
    updateLoanDuration: (value) =>
      dispatch({ type: 'UPDATE_LOAN_DURATION', value: value }),
    updateInterestRate: (value) =>
      dispatch({ type: 'UPDATE_INTEREST_RATE', value: value }),
    updateZipCode: (value) =>
      dispatch({ type: 'UPDATE_ZIP_CODE', value: value }),
    updateCreditScore: (value) =>
      dispatch({ type: 'UPDATE_CREDIT_SCORE', value: value }),
    updatePropertyTax: (value) =>
      dispatch({ type: 'UPDATE_PROPERTY_TAX', value: value }),
    updatePropertyTaxPercentage: (value) =>
      dispatch({ type: 'UPDATE_PROPERTY_TAX_PERCENTAGE', value: value }),
    updateOwnerInsurence: (value) =>
      dispatch({ type: 'UPDATE_OWNER_INSURANCE', value: value }),
    updateHOAFees: (value) =>
      dispatch({ type: 'UPDATE_HOA_FEES', value: value }),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(MortgageForm)
);
