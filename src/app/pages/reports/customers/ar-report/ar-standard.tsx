import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Typography, withStyles} from '@material-ui/core';

import styles, {SummaryContainer} from './styles';
import BCCircularLoader
  from "app/components/bc-circular-loader/bc-circular-loader";
import {generateAccountReceivableReport} from 'api/reports.api';
import {error} from 'actions/snackbar/snackbar.action';
import BCDateTimePicker
  from "../../../../components/bc-date-time-picker/bc-date-time-picker";
import BCItemsFilter
  from "../../../../components/bc-items-filter/bc-items-filter";
import {
  abbreviateNumber,
  formatCurrency,
  formatDateYMD
} from "../../../../../helpers/format";
import {GRAY3, PRIMARY_BLUE} from "../../../../../constants";
import ApexChart from 'react-apexcharts';

interface RevenueStandardProps {
  classes: any;
}

interface ReportData {
  title: string;
  value: string;
}

const INITIAL_ITEMS = [
  {id: '0', value: 'Aging'},
  {id: '1', value: 'Customize'},
];

const chartColors = ['#349785', PRIMARY_BLUE, PRIMARY_BLUE, PRIMARY_BLUE, '#F50057']

const chartOptions = {
  chart: {
    height: 350,
    type: 'bar' as 'bar',
  },

  legend: {
    horizontalAlign: 'right' as 'right',
    customLegendItems: ['Current', '1 - 90 Days Past Due', '91 and Over Past Due'],
    markers: {
      fillColors: ['#349785', PRIMARY_BLUE, '#F50057']
    },
  },

  plotOptions: {
    bar: {
      borderRadius: 4,
      distributed: true,
      columnWidth: '40%',
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    }
  },

  colors: chartColors,

  dataLabels: {
    enabled: true,
    formatter: (val: any) => formatCurrency(val),
    offsetY: -20,
    style: {
      fontSize: '12px',
      colors: chartColors,
    }
  },

  grid: {
    position: 'back' as 'back',
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    }
  },

  xaxis: {
    // type: 'category' as 'category',
    position: 'bottom',
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: true,
      offsetY: -20,
    },
    // tickAmount: 3,
    // tickPlacement: 'between',
    style: {
      color: GRAY3,
      textTransform: 'uppercase',
    },
    labels: {
      show: true,
      style: {
        colors: GRAY3,
      }
    },
    tooltip: {
      enabled: true,
    }
  },

  yaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: true,
      formatter: (val: any) => `$${abbreviateNumber(val, 2)}`,
    },
    style: {
      colors: [GRAY3],
    }
  },
}

const ARStandardReport = ({classes}: RevenueStandardProps) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [xLabels, setXLabels] = useState<string[]>([]);
  const [asOfDate, setAsOfDate] = useState(new Date());

  const getReportData = async () => {
    setIsLoading(true);
    const {
      status,
      report,
      message
    } = await generateAccountReceivableReport(1, formatDateYMD(asOfDate));
    if (status === 1) {
      const temp: ReportData[] = [];
      const tempChart: any[] = [];
      const tempLabels: string[] = [];
      Object.keys(report).forEach((key, index) => {
        if (index === 0) {
          temp.push({
            title: 'total unpaid',
            value: formatCurrency(report[key])
          });
        } else {
          temp.push({
            title: report[key].label,
            value: formatCurrency(report[key].totalUnpaid)
          });
          tempChart.push(report[key].totalUnpaid);
          tempLabels.push(report[key].label.toUpperCase());
        }
      })
      setReportData(temp);
      setChartData([{name: 'Unpaid', data: tempChart}]);
      setXLabels(tempLabels);
    } else {
      dispatch(error(message));
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getReportData();
  }, [asOfDate]);

  // console.log(chartData)

  return (
    <div style={{padding: '20px 20px 0 20px'}}>
      {isLoading ?
        <BCCircularLoader heightValue={'20vh'}/>
        :
        <>
          <div className={classes.toolbar}>
            <Typography style={{alignSelf: 'center'}}>As Of</Typography>
            <div style={{width: 300}}>
              <BCDateTimePicker
                // label="As Of"
                className={'due_date'}
                handleChange={(date: Date) => setAsOfDate(date)}
                name={'dueDate'}
                id={'dueDate'}
                placeholder={'Date'}
                value={asOfDate}
              />
            </div>
            <BCItemsFilter
              single
              items={INITIAL_ITEMS}
              selected={['0']}
              onApply={() => {
              }}
            />
          </div>

          <SummaryContainer>
            {reportData.map((data, index) => <div key={data.title}>
                <p
                  className={index === 0 ? classes.valueBig : classes.value}>{data.value}</p>
                <p className={classes.label}>{data.title}</p>
              </div>
            )}
          </SummaryContainer>
          <div id="chart">
            <ApexChart
              options={{...chartOptions, xaxis: {...chartOptions.xaxis, categories: xLabels}}}
              series={chartData}
              type="bar"
              height={350}
            />
          </div>
        </>
      }
    </div>
  )
}

export default withStyles(
  styles,
  {'withTheme': true}
)(ARStandardReport);
