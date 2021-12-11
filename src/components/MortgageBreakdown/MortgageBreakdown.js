import React, { Component, createRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { debounce } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';

import NumberFormat from '../../utils/numberFormat';

const styles = () => ({
  container: {
    padding: '20px',
    display: 'flex',
    height: '300px',
    width: '300px',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    position: 'relative',
  },

  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 20px',
    // height: '100%',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  flexRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  squareBlue: {
    backgroundColor: '#4d64ff',
    width: '10px',
    height: '10px',
    display: 'block',
    marginRight: '10px',
  },
  squareGreen: {
    backgroundColor: '#7bd896',
    width: '10px',
    height: '10px',
    display: 'block',
    marginRight: '10px',
  },
  squareYellow: {
    backgroundColor: '#f5e144',
    width: '10px',
    height: '10px',
    display: 'block',
    marginRight: '10px',
  },
  squareRed: {
    backgroundColor: '#d97f9f',
    width: '10px',
    height: '10px',
    display: 'block',
    marginRight: '10px',
  },
  smallHeading: {
    fontWeight: '600',
    fontSize: '1.1rem',
    padding: '0',
    margin: '2rem 0',
  },
  mediumHeading: {
    fontSize: '1.5em',
    fontWeight: '600',
    // padding: '10px 0',
    // margin: '20px',
  },
  fontXl: {
    fontSize: '1.8em',
  },
  symbol: {
    position: 'relative',
    top: '-10px',
  },
  paymentBreakdown: {
    marginBottom: '30px',
  },
  centerPayment: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  centerText: {
    textAlign: 'center',
  },
  noPadding: {
    padding: 0,
  },
  contentRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  textField: {
    // marginTop: '8px',
    // marginBottom: '8px',
    width: '100%',

    // '& label + .MuiInput-formControl, & .MuiInput-formControl, &.MuiInput-root': {
    //   padding: '10px',
    //   border: '1px solid #ccc',
    //   boxShadow: '0 4px 10px -8px rgba(0,0,0,0.16)',
    // },

    // '& .MuiInputLabel-shrink': {
    //   transform: 'translate(0, 1.5px) scale(1)',
    // },

    // '& .MuiInputLabel-formControl': {
    //   transform: 'translate(0, -10px) scale(1)',
    // },
  },
  tableTextField: {
    marginTop: 0,
    marginBottom: 0,
    marginRight: '5px',
    width: '100px',
    maxWidth: '200px',

    '& label + .MuiInput-formControl, & .MuiInput-formControl, &.MuiInput-root': {
      padding: '4px',
    },

    '& .MuiInputBase-input': {
      textAlign: 'right',
      marginRight: '5px',
    },
  },
});

class MortgageBreakdown extends Component {
  state = {
    monthlyPayment: 0,
    propertyTax: 0,
    propertyTaxMonthly: 0,
    ownerInsurance: 0,
    hoaFees: 0,
  };

  componentDidMount() {
    this.chart = createRef();
    this.setState({
      monthlyPayment: this.props.monthlyPayment,
      propertyTax: this.props.propertyTax,
      propertyTaxMonthly: this.props.propertyTax / 12,
      ownerInsurance: this.props.ownerInsurance,
      hoaFees: this.props.hoaFees,
      totalMonthlyPayment: this.props.totalMonthlyPayment,
    });

    this.updatePropertyTax = debounce(this.updatePropertyTax, 5);
    this.updateOwnerInsurance = debounce(this.updateOwnerInsurance, 500);
    this.updateHoaFees = debounce(this.updateHoaFees, 500);
  }

  updatePropertyTax = (value) => {
    this.props.updatePropertyTax(value);
  };

  updateOwnerInsurance = (value) => {
    this.props.updateOwnerInsurence(value);
  };

  updateHoaFees = (value) => {
    this.props.updateHOAFees(value);
  };

  componentDidUpdate(prevProps) {
    const {
      monthlyPayment,
      propertyTax,
      ownerInsurance,
      hoaFees,
      totalMonthlyPayment,
    } = this.props;

    if (prevProps.monthlyPayment !== monthlyPayment) {
      this.setState({ monthlyPayment: monthlyPayment });
    }
    if (prevProps.propertyTax !== propertyTax) {
      this.setState({
        propertyTax: propertyTax,
      });
    }
    if (prevProps.ownerInsurance !== ownerInsurance) {
      this.setState({ ownerInsurance: ownerInsurance });
    }
    if (prevProps.hoaFees !== hoaFees) {
      this.setState({ hoaFees: hoaFees });
    }

    if (prevProps.totalMonthlyPayment !== totalMonthlyPayment) {
      this.setState({ totalMonthlyPayment: totalMonthlyPayment });
    }
  }

  tooltipFunc = (tooltipModel) => {
    // Tooltip Element
    var tooltipEl = document.getElementById('chartjs-tooltip');

    // Create element on first render
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      tooltipEl.innerHTML = '<div></div>';
      document.body.appendChild(tooltipEl);
    }

    // Hide if no tooltip
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
      tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
      tooltipEl.classList.add('no-transform');
    }


    // Set Text
    if (tooltipModel.body) {
      let bodyLines = tooltipModel.body.map((bodyItem) => bodyItem.lines);
      let style = `background: rgba(255,255,255, 0.97);
                    color: '#666';
                    box-shadow: 0 0 7px 0px rgba(0,0,0,.1);
                    font-size: 14px;
                    padding: .5em;
                    border: 1px solid #ddd;
                    border-radius: 0;
                    text-align: left;
                    background-color: rgba(255,255,255, 0.97);
      `;
      let innerHtml = `<div style="${style}">`;

      bodyLines.forEach(function (body, i) {
        let bodyArray = body[0].split(':');

        let element = `
          <div style="line-height: 0">
            <p style="font-size: 1em">${bodyArray[0]}</p>
            <p style="font-size: 1.5em; font-weight: 600; color: #98005e; font-family: '"Source Serif Pro", serif'">$${bodyArray[1].trim()}</p>
          </div>
        `;
        innerHtml += element;
      });
      innerHtml += '</div>';
      let root = tooltipEl.querySelector('div');
      root.innerHTML = innerHtml;
    }

    // `this` will be the overall tooltip
    // console.log();
    var position = this.chart.current.chartInstance.canvas.getBoundingClientRect();

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
    tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
    tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
    tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
    tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
    tooltipEl.style.pointerEvents = 'none';


  } 

  render() {
    const chartData = [];
    const { classes } = this.props;
    if (this.state.monthlyPayment > 0) {
      chartData.push(this.state.monthlyPayment);
    }
    if (this.state.ownerInsurance > 0) {
      chartData.push(this.state.ownerInsurance);
    }
    if (this.state.propertyTax > 0) {
      chartData.push(this.state.propertyTax);
    }
    if (this.state.hoaFees > 0) {
      chartData.push(this.state.hoaFees);
    }
    return (
      <div>
        <Grid container item>
          <Grid item xs={12} lg={6}>
            <div className={classes.container}>
              <Doughnut
                width={100}
                height={100}
                ref={this.chart}
                data={{
                  datasets: [
                    {
                      data: chartData,
                      backgroundColor: [
                        '#4d64ff',
                        '#7bd896',
                        '#d97f9f',
                        '#f5e144',
                      ],
                    },
                  ],
                  labels: [

                    'Principal & interest',
                    'Homeowner\'s insurance',
                    'Property tax',
                    'HOA fees'
                  ]
                }}
                options={{
                  cutoutPercentage: 70,
                  legend: false,
                  tooltips: {
                    enabled: false,
                    custom: this.tooltipFunc

                  },
                  elements: {
                    arc: {
                      borderWidth: 3,
                    },
                  },
                }}
              />
              <div className={classes.centerPayment}>
                <Typography variant="h4" component="span" className={classes.mediumHeading}>
                  <span className={classes.symbol}>$</span>
                  <span className={classes.fontXl}>
                    {this.state.totalMonthlyPayment
                      ? this.state.totalMonthlyPayment.toLocaleString('en')
                      : null}
                  </span>
                </Typography>
                <Typography variant="h5" className={classes.centerText}>
                  Monthly payment
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            {this.state.monthlyPayment ? (
              <div className={classes.tableContainer}>
                <Typography variant="h4" className={classes.smallHeading}>
                  How is my monthly payment calculated?
                </Typography>
                <TableContainer
                  component={Paper}
                  className={classes.paymentBreakdown}
                >
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className={classes.flex}>
                            <span className={classes.squareBlue}></span>
                            <span>Principal & interest</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={classes.flexRight}>
                            <span>${this.state.monthlyPayment}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className={classes.flex}>
                            <span className={classes.squareGreen}></span>
                            <span>Homeowner's insurance</span>
                          </div>
                        </TableCell>
                        <TableCell className={classes.noPadding}>
                          <div className={classes.flexRight}>
                            <TextField
                              id="owner-insurance"
                              className={[
                                classes.textField,
                                classes.tableTextField,
                              ].join(' ')}
                              value={parseInt(this.state.ownerInsurance)}
                              onChange={(event) =>
                                this.updateOwnerInsurance(+event.target.value)
                              }
                              InputProps={{
                                inputComponent: NumberFormat,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className={classes.flex}>
                            <span className={classes.squareRed}></span>
                            <span>Property tax</span>
                          </div>
                        </TableCell>
                        <TableCell className={classes.noPadding}>
                          <div className={classes.flexRight}>
                            <TextField
                              id="property-tax-1"
                              className={[
                                classes.textField,
                                classes.tableTextField,
                              ].join(' ')}
                              value={parseInt(this.state.propertyTax)}
                              onChange={(event) =>
                                // (event) => console.log(event.target.value)
                                this.updatePropertyTax(
                                  +event.target.value,
                                  event
                                )
                              }
                              InputProps={{
                                inputComponent: NumberFormat,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className={classes.flex}>
                            <span className={classes.squareYellow}></span>
                            <span>HOA fees</span>
                          </div>
                        </TableCell>
                        <TableCell className={classes.noPadding}>
                          <div className={classes.flexRight}>
                            <TextField
                              id="hoa-fees"
                              className={[
                                classes.textField,
                                classes.tableTextField,
                              ].join(' ')}
                              value={parseInt(this.state.hoaFees)}
                              onChange={(event) =>
                                this.updateHoaFees(+event.target.value)
                              }
                              InputProps={{
                                inputComponent: NumberFormat,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid item xs={12} className={classes.contentRight}>

                  <Typography variant="body1" className={classes.noPadding}>
                  <Typography variant="h4" component="span" className={classes.smallHeading}>Total monthly payment:</Typography> <Typography variant="h3" component="span">${this.state.totalMonthlyPayment.toLocaleString('en')}</Typography>
                  </Typography>
                </Grid>
              </div>
            ) : null}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    monthlyPayment: state.mortgage.monthlyPayment,
    propertyTax: state.mortgage.formData.propertyTax,
    ownerInsurance: state.mortgage.formData.ownerInsurance,
    hoaFees: state.mortgage.formData.hoaFees,
    totalMonthlyPayment: state.mortgage.totalMonthlyPayment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePropertyTax: (value) =>
      dispatch({ type: 'UPDATE_PROPERTY_TAX', value: value }),
    updateOwnerInsurence: (value) =>
      dispatch({ type: 'UPDATE_OWNER_INSURANCE', value: value }),
    updateHOAFees: (value) =>
      dispatch({ type: 'UPDATE_HOA_FEES', value: value }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MortgageBreakdown));
