import React, { Component, Fragment } from 'react';

import { Route, Switch, Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/styles';

import MortgageCalculator from '../MortgageCalculator/MortgageCalculator';
import CDCauculator from '../CDCalculator/CDCauculator';
import PersonalCalculator from '../PersonalCalculator/PersonalCalculator';

const styles = (theme) => ({
  root: {
    marginTop: '20px',
    marginLeft: '20px',
  },

  link: {
    marginLeft: '20px',
    marginRight: '20px',
    '&:hover': {
      color: 'orange',
      textDecoration: 'none',
    },
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Switch>
          <Route path="/cd-calculator" component={CDCauculator} />
          <Route path="/mortgage-calculator" component={MortgageCalculator} />
          {/* <Route path="/mortgage-calculator" render={() => <div></div>} /> */}


          <Route path="/personal-calculator" component={PersonalCalculator} />
          <Route
            path="/"
            render={() => {
              return (
                <div className={classes.root}>
                  <Link
                    className={classes.link}
                    component={RouterLink}
                    to="/mortgage-calculator"
                  >
                    Mortage Calculator
                  </Link>
                  <Link
                    className={classes.link}
                    component={RouterLink}
                    to="/cd-calculator"
                  >
                    CD Calculator
                  </Link>
                  <Link
                    className={classes.link}
                    component={RouterLink}
                    to="/personal-calculator"
                  >
                    Personal Calculator
                  </Link>
                </div>
              );
            }}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Home);
