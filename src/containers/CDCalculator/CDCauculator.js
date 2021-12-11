import React, { Component } from "react";
import CDForm from "../../components/CDForm/CDForm";
import Grid from "@material-ui/core/Grid";
import { Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import {styles} from "./Styles";


class CDCauculator extends Component {
  state = {
    cd: null,
    ie: 0
  };

  cod = (props) => {
    let PrincipalAmount = props.deposit;
    let rateOfIntrest = props.apy/100;
    let term = props.term;
    let termType = props.termDuration;

    // console.log("Initial Deposit(P): " + PrincipalAmount, "\nAPY(r): " + rateOfIntrest, "\nNumber of Terms(n): " + term, "\nTerm Duration(t): " + termType );
    const numberOfYears = (termType === 'year') ? term : term/12;
    const compoundPeriod = 1;

    //let mod_n = (t==='year')? 1 : 1;  
    //let mod_r = (r/100);

    // let cd = (P*(Math.pow(1+(mod_r/mod_n), mod_n*n))).toFixed(2);



    let cd = +(PrincipalAmount * (Math.pow(1 + (rateOfIntrest/compoundPeriod), numberOfYears))).toFixed(2);
    let interestEarned = +(cd-PrincipalAmount).toFixed(2);
    console.log(cd);
    this.setState({
      cd: cd,
      ie: interestEarned
    })

  };

  render() {
    const { classes } = this.props;
    let result;
    if(this.state.cd === null){
      result = '';
    }else{
      result = <div className={classes.cdresult}>
          <div className={classes.cdresultTitle}><Typography variant="h4">Total Amount:</Typography></div>
          <div className={classes.resultAmount}><Typography variant="h3" className={classes.noPadding}>${this.state.cd.toLocaleString('en')}</Typography></div>
          <div className={classes.resultHint}>(deposit + total interest at end of term)</div>

          <div className={classes.cdresultTitle}><Typography variant="h4">Total Interest Earned:</Typography></div>
          <div className={classes.resultAmount}><Typography variant="h3" className={classes.noPadding}>${this.state.ie.toLocaleString('en')}</Typography></div>

        </div>;
    }
    return (
      <div>
        <Grid container className={classes.container}>
          <Grid item xs={9} className={classes.box}>
            <Paper className={classes.paper} elevation={3}>
              <CDForm onChildClick={this.cod} />
              <div>
                {result}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(CDCauculator);
