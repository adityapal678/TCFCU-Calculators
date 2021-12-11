import React from 'react';
import { Toolbar,AppBar, Typography, Container } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

const useStyes = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuButtons: {
    marginRight: '20px',
  },
  lightBar: {
    backgroundColor: '#fff'
  },
  amountInfo: {
    padding: '0 2rem'
  }
}));

const Navbar = (props) => {
  const classes = useStyes();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.lightBar}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Container>
            <div className={classes.amountInfo}>

          {props.mortgageMonthlyPayment ? <Typography variant="body1" className={classes.title}>
          <Typography variant="h5" component="span" color="primary">Your estimated monthly payment:</Typography> <Typography component="span" variant="h3">${props.mortgageMonthlyPayment.toLocaleString('en')}</Typography>
          </Typography> : null
          }
          </div>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    mortgageMonthlyPayment: state.mortgage.totalMonthlyPayment    
  }
}

export default connect(mapStateToProps)(Navbar);
