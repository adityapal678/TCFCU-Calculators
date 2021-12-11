import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Navbar from '../../components/UI/Navbar/Navbar';
import MortgageForm from '../../components/MortgageForm/MortgageForm';
import MortgageCalc from '../../components/MortgageCalc/MortgageCalc';
import MortgageSchedule from '../../components/MortgageSchedule/MortgageSchedule';
import MortgageBreakdown from '../../components/MortgageBreakdown/MortgageBreakdown';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },

  headerBar: {
    position: 'fixed',
    top: '-60px',
    height: '60px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    transition: 'top 0.5s',
    zIndex: '100',
  },

  content: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    // marginTop: '72px',
    minHeight: '600px',
    justifyContent: 'center',
  },

  headerInfo: {
    padding: '0',
    margin: '0',
  },

  formContainer: {
    borderRight: '1px solid #ccc',
    padding: '20px',
  },
  dataContainer: {
    padding: '20px',
  },

  tabs: {
    borderBottom: '1px solid #ccc',
    flexGrow: 1,
  },
  tabsContainer: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },

  tabPanel: {
    padding: '20px 10px',
  },
  pageHeader: {
    marginBottom: '2rem',
  },

  '@media (max-width:399px)': {
    content: {
      padding: 0,
    },
    dataContainer: {
      padding: 0,
    },
  },
});

class MortgageCalculator extends Component {
  state = {
    headerVisibility: false,
    headerTop: -60,
    tabs: [
      {
        id: 1,
        label: 'Payment breakdown',
      },
      {
        id: 2,
        label: 'Amortization schedule',
      },
    ],
    activeTab: 0,
  };

  componentDidMount() {
    document.addEventListener('scroll', (x) => {
      if (window.pageYOffset > 300 && this.state.headerVisibility === false) {
        this.setState({ headerTop: 0, headerVisibility: true });
      }

      if (window.pageYOffset < 300 && this.state.headerVisibility === true) {
        this.setState({ headerTop: -60, headerVisibility: false });
      }
    });

    // GETTING CURRENT INTEREST RATES FROM INTEREST RATES PAGE
    // DOMAIN https://www.tcfcu.com/rates/real-estate-loan-rates
    // IMPORTARNT: then block will not run if not in same domain
    axios
      .get('https://www.tcfcu.com/rates/real-estate-loan-rates') // real url
      // .get('http://localhost:5000') test url
      .then((response) => {
        // this part will only work when in same domain due to cross origin rules
        const el = document.createElement('div');
        el.innerHTML = response.data;

        const trs = el.querySelectorAll('.rate-chart__table tr');

        const interestRates = [];
        trs.forEach((tr) => {
          const tds = tr.children;
          if (!isNaN(parseInt(tds[1].innerText))) {
            const obj = {
              year: parseInt(tds[1].innerText),
              rate: parseFloat(tds[2].innerText),
            };

            interestRates.push(obj);
          }
        });
        //updating calucaluator interest rates with latest values
        this.props.initInterestRates(interestRates);
        // this.props.updateMonthlyPayment();
        // console.log(interestRates);
      })
      .catch((err) => {
        // updating calculator interest rates with predefined values
        this.props.initInterestRates(null);
      });
    this.props.updateMonthlyPayment();
  }

  handleFormData = (formData) => {
    this.setState({ ...formData });
  };

  handleTabChange = (event, newVal) => {
    this.setState({ activeTab: newVal });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          className={classes.headerBar}
          style={{ top: this.state.headerTop + 'px' }}
        >
          <Navbar />
        </Grid>
        <Container className={classes.content}>
          <Grid item xs={12} className={classes.pageHeader}>
            <Typography variant="h1">Mortgage Calculator</Typography>
            <Typography variant="body1">
              Use our mortgage calculator to estimate your monthly mortgage
              payment. You can input a different home price, down payment, loan
              term and interest rate to see how your monthly payment changes.
            </Typography>
            <br />
            <br />
            <Typography variant="body1">
              Our monthly payment estimates are broken down by principal and
              interest, property taxes and homeowners insurance. We take our
              calculator a step further by factoring in your credit score range,
              zip code and HOA fees to give you a more precise payment estimate.
              You’ll also go into the home-buying process with a more accurate
              picture of how to calculate mortgage payments and purchase with
              confidence. After you run some estimates, read on for more
              education and home-buying tips.
            </Typography>
          </Grid>
          <Grid container item>
            <Grid item md={3} xs={12} className={classes.formContainer}>
              <MortgageForm />
            </Grid>
            <Grid item md={9} xs={12} className={classes.dataContainer}>
              <Grid container item>
                <Grid item md={6} xs={12}>
                  <MortgageCalc />
                </Grid>
                {/* <Grid item xs={6}>
                <h1>Signup Form</h1>
              </Grid> */}
              </Grid>
              <Grid container>
                <Grid item xs={12} className={classes.tabsContainer}>
                  <Tabs
                    value={this.state.activeTab}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    className={classes.tabs}
                  >
                    {this.state.tabs.map((tab) => {
                      return <Tab key={tab.id} label={tab.label} />;
                    })}
                  </Tabs>
                  <div className={classes.tabPanel}>
                    {this.state.activeTab === 0 ? <MortgageBreakdown /> : null}
                    {this.state.activeTab === 1 ? <MortgageSchedule /> : null}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    price: state.mortgage.formData.price,
    downPayment: state.mortgage.formData.downPayment,
    downPaymentPercentage: state.mortgage.formData.downPaymentPercentage,
    loanDuration: state.mortgage.formData.loanDuration,
    interestRate: state.mortgage.formData.interestRate,
    zipCode: state.mortgage.formData.zipCode,
    creditScore: state.mortgage.formData.creditScore,
    propertyTax: state.mortgage.formData.propertyTax,
    ownerInsurance: state.mortgage.formData.ownerInsurance,
    hoaFees: state.mortgage.formData.hoaFees,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMonthlyPayment: (value) =>
      dispatch({ type: 'UPDATE_MONTHLY_PAYMENT' }),
    initInterestRates: (value) =>
      dispatch({ type: 'INIT_INTEREST_RATES', value: value }),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(MortgageCalculator)
);
