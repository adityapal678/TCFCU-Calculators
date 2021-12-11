import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';




import PersonalLoanForm from '../../components/PersonalLoanForm/PersonalLoanForm';
import PersonalLoanResults from '../../components/PersonalLoanResults/PersonalLoanResults';
import PersonalLoanTable from '../../components/PersonalLoanTable/PersonalLoanTable';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    marginTop: '72px',
    height: '3000px',
    justifyContent: 'center',
  },
  pageHeader: {
    marginBottom: '2rem',
  },
});

class PersonalCalculator extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Container className={classes.container}>
          <Grid item xs={12} className={classes.pageHeader}>
            <Typography variant="h1">Personal Loan Calcualtor</Typography>
            <Typography variant="h5">
              This personal loan calculator will help you determine the monthly
              payments on a loan.
            </Typography>
          </Grid>
          <Grid container item>
            <Grid item md={4} xs={12}>
              <PersonalLoanForm />
            </Grid>
            <Grid item md={8} xs={12}>
              <PersonalLoanResults />
              {this.props.showSchedule ? <PersonalLoanTable /> : null}
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showSchedule: state.app.personal.schedule,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(PersonalCalculator));
