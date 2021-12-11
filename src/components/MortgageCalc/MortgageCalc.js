import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { debounce } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { StyledSlider } from '../UI/Slider/Slider';

const styles = {
  root: {
    flexGrow: 1,
  },
  sliderLegend: {
    display: 'flex',
    alignItems: 'center',
  },
  sliderContainer: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  paymentHeading: {
    borderRight: '1px solid #ccc',

    '& h1': {
      margin: '0',
    },
  },
  paymentLabel: {
    paddingLeft: '10px',
  },

  bolder: {
    fontWeight: 700,
    display: 'flex'
  },

  '@media (max-width: 399px)' : {
    root: {
      paddingLeft: '1rem',
      paddingRight: '1rem'
    }
  }
};

class MortgageCalc extends Component {
  state = {
    sliderMinVal: 80000,
    sliderMaxIncrement: 5000,
    sliderMaxIntialVal: 1000000,
    totalMonthlyPayment: 0,
    // monthlyPayment: 0,
    price: 0
  };

  componentDidMount() {
    this.setState({
      totalMonthlyPayment: this.props.totalMonthlyPayment,
      // monthlyPayment: this.props.monthlyPayment,
      price: this.props.formData.price
    });
    this.updateMonthlyPayment = debounce(this.updateMonthlyPayment, 500);
  }

  // updateMonthlyPayment = (value) => {
  //   // const propertyTaxPercentage = this.props.formData.propertyTaxPercentage;

  //   const monthlyPayment = getMonthlyPaymentFromTotal(
  //     this.props.formData,
  //     value
  //   );
  //   const price = updatePriceFromMonthlyPayment(
  //     this.props.formData,
  //     monthlyPayment
  //   );

  //   this.props.updatePrice(price);
  // };

  // handleMonthlyPayment = (value) => {
  //   this.setState({ totalMonthlyPayment: +value });
  //   this.updateMonthlyPayment(+value);
  // };

  handlePriceChange = (value) => {
    this.props.updatePrice(value);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.totalMonthlyPayment !== this.props.totalMonthlyPayment ||
      // prevProps.monthlyPayment !== this.props.monthlyPayment ||
      prevProps.formData.price !== this.props.formData.price
    ) {
      this.setState({
        totalMonthlyPayment: +this.props.totalMonthlyPayment,
        // monthlyPayment: +this.props.monthlyPayment,
        price: +this.props.formData.price 
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.sliderLegend}>
          <Grid item xs={12} lg={6} className={classes.paymentHeading}>
            <Typography variant="h1" className={classes.bolder}>
              <Typography variant="h4" component="span">
                $
              </Typography>
              
              
              {this.state.totalMonthlyPayment.toLocaleString('en')}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6} className={classes.paymentLabel}>
            <Typography variant="h5">Your estimated monthly payment</Typography>
          </Grid>
        </div>
        <div className={classes.sliderContainer}>
          <StyledSlider
            value={this.state.price}
            min={this.state.sliderMinVal}
            step={5}
            max={
              this.state.price >= this.state.sliderMaxIntialVal
                ? this.state.price + this.state.sliderMaxIncrement
                : this.state.sliderMaxIntialVal
            }
            onChange={(event, newVal) => this.handlePriceChange(newVal)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalMonthlyPayment: state.mortgage.totalMonthlyPayment,
    // monthlyPayment: state.mortgage.monthlyPayment,
    formData: state.mortgage.formData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // updateMonthlyPayment: (value) =>
    //   dispatch({ type: 'UPDATE_MONTHLY_PAYMENT_MANUALLY', value: value }),
    updatePrice: (value) => dispatch({ type: 'UPDATE_PRICE', value: value }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MortgageCalc));
