import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { Line, Chart } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

import { getStringMonthFromNum } from '../../../utils/helpers';

const styles = {
  smallHeading: {
    fontWeight: '600',
    fontSize: '1.1rem',
    padding: '0',
    margin: '2rem 0',
  },
  paymentBreakdown: {
    marginBottom: '30px',
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
  squareRed: {
    backgroundColor: '#d97f9f',
    width: '10px',
    height: '10px',
    display: 'block',
    marginRight: '10px',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
};

class PaymentBreakdown extends Component {
  state = {
    paymentData: {
      principal: [],
      interest: [],
      balance: [],
    },
    currentPaymentData: {
      principal: null,
      interest: null,
      balance: null,
      date: null,
    },
    chartLoaded: false,
  };

  constructor(props) {
    super(props);
    Chart.pluginService.register({
      afterDraw: function (chart, easing) {
        if (
          chart.tooltip._active &&
          chart.tooltip._active.length &&
          chart.scales['y-axis-0']
        ) {
          const activePoint = chart.controller.tooltip._active[0];
          const ctx = chart.ctx;
          const x = activePoint.tooltipPosition().x;
          const topY = chart.scales['y-axis-0'].top;
          const bottomY = chart.scales['y-axis-0'].bottom;
          //   const topY = chart.legend.bottom;
          //   const bottomY = chart.chartArea.bottom;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#07c';
          ctx.stroke();
          ctx.restore();
        }
      },
    });
  }
  componentDidMount() {
    this.chart = createRef();
    // let interval = setInterval(() => {
    //   if (
    //     this.props.schedulePaymentData &&
    //     this.props.schedulePaymentData.length > 0
    //   ) {
    //     this.updatePaymentData();
    //     clearInterval(interval);
    //     this.setState({ chartLoaded: true });
    //   }
    // }, 100);
  }
  componentWillUnmount() {
    Chart.pluginService.register({
      afterDraw: null,
    });
  }

  updatePaymentData = () => {
    const principal = [];
    const interest = [];
    const balance = [];

    this.props.schedulePaymentData.forEach((p, i) => {
      principal.push({
        y: +p.paidSummary.principal,
        t: new Date(`${p.date.month}/${p.date.day}/${p.date.year}`),
      });
      interest.push({
        y: +p.paidSummary.interest,
        t: new Date(`${p.date.month}/${p.date.day}/${p.date.year}`),
      });
      balance.push({
        y: +p.paidSummary.balance,
        t: new Date(`${p.date.month}/${p.date.day}/${p.date.year}`),
      });
    });

    this.setState({
      paymentData: {
        principal: principal,
        interest: interest,
        balance: balance,
      },
      currentPaymentData: {
        principal: principal[0].y,
        interest: interest[0].y,
        balance: balance[0].y,
        date:
          getStringMonthFromNum(balance[0].t.getMonth()) +
          ', ' +
          balance[0].t.getFullYear(),
      },
    });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.schedulePaymentData !== this.props.schedulePaymentData &&
      this.props.schedulePaymentData.length > 0
    ) {
      this.updatePaymentData();
    }
  }
  handleChartUpdate = (tooltipItem, data) => {
    let key;
    if (tooltipItem.datasetIndex === 0) {
      key = 'balance';
    } else if (tooltipItem.datasetIndex === 1) {
      key = 'interest';
    } else if (tooltipItem.datasetIndex === 2) {
      key = 'principal';
    }
    const currDateArray = tooltipItem.label.split(' ');
    const currDate = currDateArray[0] + ', ' + currDateArray[1];
    this.setState({
      currentPaymentData: {
        ...this.state.currentPaymentData,
        date: currDate,
        [key]: tooltipItem.value,
      },
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container item>
          <Grid item xs={12}>
            <Line
              width={100}
              height={80}
              ref={this.chart}
              options={{
                legend: false,
                tooltips: {
                  intersect: false,
                  mode: 'index',
                  callbacks: {
                    label: this.handleChartUpdate,
                  },
                },
                elements: {
                  line: {
                    fill: true,
                  },
                  point: {
                    hoverRadius: 10,
                  },
                },
                scales: {
                  xAxes: [
                    {
                      type: 'time',
                      //   scaleLabel: {
                      //     display: true,
                      //     labelString: 'Month',
                      //   },
                      display: false,
                      time: {
                        unit: 'month',
                        tooltipFormat: 'MMM YYYY',
                      },
                    },
                  ],
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
              type="scatter"
              data={{
                datasets: [
                  {
                    backgroundColor: 'rgba(77, 100, 255, 0.3)',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    pointBorderWidth: 0,
                    pointBackgroundColor: 'transparent',
                    pointBorderColor: 'transparent',
                    pointHoverBackgroundColor: 'rgba(77, 100, 255, 1)',

                    label: 'balance',
                    data: this.state.paymentData.balance,
                  },
                  {
                    backgroundColor: 'rgba(217, 127, 159, 0.3)',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    pointBorderWidth: 0,
                    pointBackgroundColor: 'transparent',
                    pointBorderColor: 'transparent',
                    pointHoverBackgroundColor: 'rgba(217, 127, 159, 1)',
                    label: 'interest',
                    data: this.state.paymentData.interest,
                  },
                  {
                    backgroundColor: 'rgba(123, 216, 150, 0.3)',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    pointBorderWidth: 0,
                    pointBackgroundColor: 'transparent',
                    pointBorderColor: 'transparent',
                    pointHoverBackgroundColor: 'rgba(123, 216, 150, 1)',
                    label: 'principal',
                    data: this.state.paymentData.principal,
                  },
                ],
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {this.state.currentPaymentData.balance ? (
              <Fragment>
                <Typography variant="h4" className={classes.smallHeading}>
                  My payment breakdown as of{' '}
                  {this.state.currentPaymentData.date}
                </Typography>
                <TableContainer
                  component={Paper}
                  className={classes.paymentBreakdown}
                >
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.flex}>
                          <span className={classes.squareBlue}></span>
                          <span>Remaining balance</span>
                        </TableCell>
                        <TableCell className={classes.textRight}>
                          $
                          {(+this.state.currentPaymentData
                            .balance).toLocaleString('en')}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.flex}>
                          <span className={classes.squareGreen}></span>
                          <span>Principal</span>
                        </TableCell>
                        <TableCell className={classes.textRight}>
                          $
                          {(+this.state.currentPaymentData
                            .principal).toLocaleString('en')}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.flex}>
                          <span className={classes.squareRed}></span>
                          <span>Interest</span>
                        </TableCell>
                        <TableCell className={classes.textRight}>
                          $
                          {(+this.state.currentPaymentData
                            .interest).toLocaleString('en')}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Fragment>
            ) : null}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    schedulePaymentData: state.mortgage.schedulePaymentData,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(PaymentBreakdown));
