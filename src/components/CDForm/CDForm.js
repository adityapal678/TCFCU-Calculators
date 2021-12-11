import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import HelpIcon from "@material-ui/icons/Help";
import IconButton from "@material-ui/core/IconButton";
import NumberFormat from "../../utils/numberFormat";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
import { LightTooltip } from "../UI/Tooltip/Tooltip";
import { styles } from "./Styles";

class CDForm extends Component {
  state = {
    deposit: 10000,
    term: 5,
    termDuration: "year",
    apy: (1).toFixed(2),
  };

  // Change Input Handler
  changeHandler = (e) => {
    let { name, value } = e.target;

    switch (name) {
      case "deposit":
        value = value.length>7? 9999999:value;
        value = value<0? 1:value;
        break;
      case "term":
          value = value > 120 ? 120:value;
          value = value < 0 ? 1: value;
        break;
      case "apy":
        value = value > 100 ? 100:value;
        value = value<0? 1:value;
        break;
      default:
        break;
    }

    this.setState({
      [name]: value,
    });
  };

  // Click Button Handler
  clickHandler = () => {
    this.props.onChildClick(this.state);
  };

  // Render function
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h1" className={classes.cdH1}>
          CD Calculator
        </Typography>

        {/* Form Started */}
        <form className={classes.form}>
          {/* Deposit Amount */}
          <div className={classes.controlContainer}>
            <Grid item container>
              <Grid item xs={12} className={classes.labelContainer}>
                <label htmlFor="deposit" className={classes.inputLabel}>
                  Deposit
                </label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="deposit"
                  className={classes.textField}
                  InputProps={{
                    inputComponent: NumberFormat,
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={this.state.deposit}
                  name="deposit"
                  onChange={this.changeHandler}
                />
              </Grid>
            </Grid>
          </div>

          {/* CD Term Length */}
          <div className={classes.controlContainer}>
            <Grid item container>
              <Grid item xs={12} className={classes.labelContainer}>
                <label htmlFor="term" className={classes.inputLabel}>
                  CD term length
                </label>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="term"
                  className={classes.textField}
                  type="number"
                  InputProps={{
                    type: "number",
                  }}
                  value={this.state.term}
                  name="term"
                  onChange={this.changeHandler}
                />
              </Grid>
            </Grid>
          </div>


          {/* Radio Group Term Duration */}
          <div>
            <FormControl component="fieldset">
              <FormLabel className={classes.padding20} component="legend">In</FormLabel>
              <RadioGroup
                name="termDuration"
                value={this.state.termDuration}
                onChange={this.changeHandler}
                className={classes.RadioGroup}
              >
                <FormControlLabel
                  value="year"
                  control={<Radio />}
                  label="Year"
                />
                <FormControlLabel
                  value="month"
                  control={<Radio />}
                  label="Month"
                />
              </RadioGroup>
            </FormControl>
          </div>

          {/* Container for APY and Help( ? ) Tooltip */}
          <div className={classes.apyContainer}>
            <div>
              {/* APY */}
              <div>
                <Grid item container>
                  <Grid item xs={12} className={classes.labelContainer}>
                    <label htmlFor="apy" className={classes.inputLabel}>
                      APY (%)
                    </label>
                    <LightTooltip
                      title="Annual percentage yield, or APY, is the interest rate that factors in compounding."
                      placement="top-end"
                    >
                      <IconButton
                        aria-label="Help"
                        className={classes.tooltipbutton}
                      >
                        <HelpIcon />
                      </IconButton>
                    </LightTooltip>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="apy"
                      type="number"
                      className={classes.textField}
                      value={this.state.apy}
                      InputProps={{
                        type: "number",
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      name="apy"
                      onChange={this.changeHandler}
                    />
                  </Grid>
                </Grid>
              </div>
              {/* LigntTooltip */}
            </div>
          </div>
      
          {/* Button */}
          <Grid item xs={12} className={classes.padding20}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.clickHandler}
            className={classes.button}
          >
            Calculate
          </Button>
          </Grid>

          {/* Disclaimer */}
          <Grid item xs={12}  className={classes.padding20}>
          <Typography variant="body1" component="p" className={classes.disclaimer}>
            This calculator compounds interest daily. To see monthly or annual
            compounding, check out NerdWallet's compound interest calculator.
          </Typography>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CDForm);
