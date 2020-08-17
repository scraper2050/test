import React from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import GrouptList from './grouptList';
import Activities from '../activity';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import './style.scoped.scss';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

const AntTabs = withStyles({
    root: {
      borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
      backgroundColor: '#1890ff',
    },
  })(Tabs);


const AntTab = withStyles((theme) => ({
    root: {      
      fontSize:'14px',
      textTransform: 'none',
      minWidth: 72,
      fontWeight:  500,
      marginRight: theme.spacing(4),
      fontFamily: [
        'Roboto,"Helvetica Neue",sans-serif;'
      ].join(','),
      '&:hover': {
        // color: '#40a9ff',
        // opacity: 1,
      },
      '&$selected': {
        color: 'gray',
        fontWeight: theme.typography.fontWeightMedium,
        outline: 'none',
      },
      '&:focus': {
        color: 'black',
      },
    },
    selected: {},
  }))((props : {label?: string}) => <Tab disableRipple {...props} />);
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    padding: {
      padding: theme.spacing(3),
    },
    demo1: {
      backgroundColor: '#e5e5e5',
    }
  }));

const Groups: () => JSX.Element = () =>{ 
  const classes = useStyles();
  const theme = useTheme();  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

    return(
        <React.Fragment>
            {/* People contents //////////////////////////////////////////////////// */}
            <div className={classes.root}>
                <div className={classes.demo1}>
                    <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                        <AntTab label="GROUP LIST"/>
                        <AntTab label="RECENT ACTIVITIES"/>
                    </AntTabs>
                </div>                       
            </div>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                style={{width:"100%", margin:"auto"}}
            >
                <TabPanel value={value} index={0} >
                    <GrouptList/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Activities/>
                </TabPanel>
            </SwipeableViews>

        </React.Fragment>
    )
}
export default Groups;
