import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

import { LightTooltip } from '../UI/Tooltip/Tooltip';
import NumberFormat from '../../utils/numberFormat';

import { styles } from './Styles';

class PersonalLoanForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanAmount: this.props.loanAmount,
      loanPurpose: this.props.loanPurpose,
      loanTerm: this.props.loanTerm,
      interestRate: this.props.interestRate,
      zipCode: this.props.zipCode,
      creditScore: this.props.creditScore,
      anualIncome: this.props.anualIncome,
      loanPurposeItems: this.props.loanPurposeItems,
      toolTip: {
        zipCode: false,
        creditScore: false,
        anualIncome: false,
      },
    };
  }

  componentDidMount() {
    this.updateMonthlyPayment();
  }
  componentDidUpdate(prevProps) {
    const loanAmountUpdated = this.props.loanAmount !== prevProps.loanAmount;
    const loanTermUpdated = this.props.loanTerm !== prevProps.loanTerm;
    const interestRateUpdated =
      this.props.interestRate !== prevProps.interestRate;
    if (loanAmountUpdated || loanTermUpdated || interestRateUpdated) {
      this.updateMonthlyPayment();
    }
  }

  updateMonthlyPayment = () => {
    const formData = {
      loanAmount: this.state.loanAmount,
      loanPurpose: this.state.loanPurpose,
      loanTerm: this.state.loanTerm,
      interestRate: this.state.interestRate,
      zipCode: this.state.zipCode,
      creditScore: this.state.creditScore,
      anualIncome: this.state.anualIncome,
    };
    this.props.updateMonthlyPayment(formData);
  };

  handleLoanAmountChange = (value) => {
    if (value < 0) {
      value = 0;
    }
    this.setState({ loanAmount: value });
  };

  handleLoanPurposeChange = (value) => {
    this.setState({ loanPurpose: value });
  };

  handleLoanTermChange = (value) => {
    if (value <= 0) {
      value = 1;
    }
    if (value > 30) {
      value = 30;
    }
    this.setState({ loanTerm: value });
  };
  handleInterestChange = (value) => {
    if (value <= 0) {
      value = 1;
    }
    if (value > 30) {
      value = 30;
    }
    this.setState({ interestRate: value });
  };

  handleZipCodeChange = (value) => {
    this.setState({ zipCode: value });
  };

  handleCreditScoreChange = (value) => {
    this.setState({ creditScore: value });
  };
  handleAnualIncomeChange = (value) => {
    if (value < 0) {
      value = 0;
    }
    this.setState({ anualIncome: value });
  };

  hideToolTip = (toolTip) => {
    if(!this.state.toolTip[toolTip]) {
      return;
    }
    this.setState({
      toolTip: {
        ...this.state.toolTip,
        [toolTip]: false,
      },
    });
  }

  handleToolTipToggle = (toolTip) => {
    this.setState({
      toolTip: {
        ...this.state.toolTip,
        [toolTip]: !this.state.toolTip[toolTip],
      },
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h3">Loan info </Typography>

        <div className={classes.flexColumn}>
          <div className={classes.controlContainer}>
            <Grid container item>
              <Grid item xs={12} className={classes.labelContainer}>
                <label htmlFor="loan-amount" className={classes.inputLabel}>
                  Loan amount
                </label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="loan-amount"
                  className={classes.textField}
                  value={this.state.loanAmount}
                  onChange={(event) =>
                    this.handleLoanAmountChange(+event.target.value)
                  }
                  InputProps={{
                    inputComponent: NumberFormat,
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
                <label htmlFor="purpose-of-loan" className={classes.inputLabel}>
                  Purpose of loan
                </label>
              </Grid>
              <Grid item xs={12}>
                <Select
                  id="purpose-of-loan"
                  value={this.state.loanPurpose}
                  className={classes.textField}
                  onChange={(event) =>
                    this.handleLoanPurposeChange(+event.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>Please Select one</em>
                  </MenuItem>
                  {this.state.loanPurposeItems.map((item, index) => {
                    return (
                      <MenuItem key={index} value={index + 1}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={classes.flexColumn}>
          <div className={classes.controlContainer}>
            <Grid container item>
              <Grid item xs={12} className={classes.labelContainer}>
                <label htmlFor="loan-term" className={classes.inputLabel}>
                  Loan term (yrs)
                </label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="loan-term"
                  className={classes.textField}
                  value={this.state.loanTerm}
                  onChange={(event) =>
                    this.handleLoanTermChange(+event.target.value)
                  }
                  InputProps={{
                    type: 'number',
                    endAdornment: (
                      <InputAdornment position="end">(YRS)</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={classes.flexColumn}>
          <div className={classes.controlContainer}>
            <Grid container item>
              <Grid item xs={12} className={classes.labelContainer}>
                <label htmlFor="interest-rate" className={classes.inputLabel}>
                  Interest rate
                </label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="interest-rate"
                  className={classes.textField}
                  value={this.state.interestRate}
                  onChange={(event) =>
                    this.handleInterestChange(+event.target.value)
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

        <Typography variant="h3">Your info</Typography>
        <div className={classes.flexColumn}>
          <div className={classes.controlContainer}>
            <Grid container item>
              <Grid item xs={12} className={classes.labelContainer}>
                <label htmlFor="zip-code" className={classes.inputLabel}>
                  Zip code
                </label>
                <ClickAwayListener onClickAway={() => this.hideToolTip('zipCode')} >
                    <LightTooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={() => this.handleToolTipToggle('zipCode')}
                      open={this.state.toolTip.zipCode}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title="We use your zip code to show you information from leading partners that can service your area."
                      placement="top-end"
                    >
                      <IconButton
                        aria-label="info"
                        onClick={() => this.handleToolTipToggle('zipCode')}
                      >
                        <InfoIcon />
                      </IconButton>
                    </LightTooltip>
                </ClickAwayListener>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="zip-code"
                  className={classes.textField}
                  value={this.state.zipCode}
                  onChange={(event) =>
                    this.handleZipCodeChange(+event.target.value)
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
                <label htmlFor="credit-score" className={classes.inputLabel}>
                  Credit score
                </label>
                <ClickAwayListener onClickAway={() => this.hideToolTip('creditScore')}>
                <LightTooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={() => this.handleToolTipToggle('creditScore')}
                  open={this.state.toolTip.creditScore}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="We use your credit score to show estimated rates from leading partners that are accurate as possible to help you calculate your potential loan payments."
                  placement="top-end"
                >
                  <IconButton
                    aria-label="info"
                    onClick={() => this.handleToolTipToggle('creditScore')}
                  >
                    <InfoIcon />
                  </IconButton>
                </LightTooltip>
                </ClickAwayListener>
              </Grid>
              <Grid item xs={12}>
                <Select
                  id="credit-score"
                  value={this.state.creditScore}
                  className={classes.textField}
                  onChange={(event) =>
                    this.handleCreditScoreChange(+event.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>Please Select one</em>
                  </MenuItem>
                  <MenuItem value={750}>Excellent (750+)</MenuItem>
                  <MenuItem value={700}>Good (700-749)</MenuItem>
                  <MenuItem value={640}>Fair (640-699)</MenuItem>
                  <MenuItem value={639}>Needs Work ( &lt; 640 )</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={classes.flexColumn}>
          <div className={classes.controlContainer}>
            <Grid container item>
              <Grid item xs={12} className={classes.labelContainer}>
                <label htmlFor="anual-income" className={classes.inputLabel}>
                  Anual income
                </label>
                <ClickAwayListener onClickAway={() => this.hideToolTip('anualIncome')}>
                <LightTooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={() => this.handleToolTipToggle('anualIncome')}
                  open={this.state.toolTip.anualIncome}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="We use your anual income to show estimated rates from leading partners that are as accurate as possible to help you calcuate you potential loan payments."
                  placement="top-end"
                >
                  <IconButton
                    aria-label="info"
                    onClick={() => this.handleToolTipToggle('anualIncome')}
                  >
                    <InfoIcon />
                  </IconButton>
                </LightTooltip>
                </ClickAwayListener>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="anual-income"
                  className={classes.textField}
                  value={this.state.anualIncome}
                  onChange={(event) =>
                    this.handleAnualIncomeChange(+event.target.value)
                  }
                  InputProps={{
                    inputComponent: NumberFormat,
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
          <Button
            className={classes.marginY2}
            variant="contained"
            color="primary"
            onClick={this.updateMonthlyPayment}
          >
            Calculate
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loanAmount: state.personal.formData.loanAmount,
    loanTerm: state.personal.formData.loanTerm,
    loanPurpose: state.personal.formData.loanPurpose,
    interestRate: state.personal.formData.interestRate,
    zipCode: state.personal.formData.zipCode,
    creditScore: state.personal.formData.creditScore,
    anualIncome: state.personal.formData.anualIncome,
    loanPurposeItems: state.personal.loanPurposeItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMonthlyPayment: (formData) =>
      dispatch({ type: 'UPDATE_PERSONAL_MONTHLY_PAYMENT', value: formData }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PersonalLoanForm));
