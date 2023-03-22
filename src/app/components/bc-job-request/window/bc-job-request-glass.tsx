import {Grid, Typography, withStyles} from '@material-ui/core';
import React from 'react';
import styles from './bc-job-request.styles';
import {Tab} from "./bc-components";

const TITLES: any = {
  quantity: 'Quantity',
  glassSize: 'Window Size',
  windowType: 'Type',
  portionNeedingService: 'Portion needing reglaze',
  glassConfigurations: '',
  dividedLite: 'Divided lite',
  dividedLitePattern: 'Divided lite pattern',
  windowShape: 'Window shape viewed from outside',
  note: 'Additional notes',
  //sashType: 'Sash glass type',
  // glassType: 'Glass Type',
  // glassTransparency: 'Glass Transparency',
};

const WINDOW_TYPES = [
  {label: 'Single Hung', value: 1},
  {label: 'Picture Window', value: 2},
  {label: 'Horizontal Slider', value: 3},
];

export const SHAPES = [
  {
    id: null,
    label: 'Press to select window shape',
    note: '',
    shape: require('../../../../assets/img/window/unknown.png'),
  },
  {
    id: 'Square',
    label: 'Square or Rectangle',
    note: '',
    shape: require('../../../../assets/img/window/square.png'),
  },
  {
    id: 'Bullseye',
    label: 'Bullseye',
    note: '',
    shape: require('../../../../assets/img/window/bullseye.png'),
  },
  {
    id: 'Roundhead',
    label: 'Roundhead',
    note: '',
    shape: require('../../../../assets/img/window/roundhead.png'),
  },
  {
    id: '1/4 Eyebrow Left Hand',
    label: '1/4 Eyebrow Left Hand',
    note: '',
    shape: require('../../../../assets/img/window/eyebrowleft.png'),
  },
  {
    id: '1/4 Eyebrow Right Hand',
    label: '1/4 Eyebrow Right Hand',
    note: '',
    shape: require('../../../../assets/img/window/eyebrowright.png'),
  },
  {
    id: 'Eyebrow',
    label: 'Eyebrow',
    note: '',
    shape: require('../../../../assets/img/window/eyebrow.png'),
  },
  {
    id: 'Welded Roundhead',
    label: 'Welded Roundhead',
    note: '',
    shape: require('../../../../assets/img/window/welded.png'),
  },
  {
    id: 'Shape not in list',
    label: 'Custom Shape',
    note: '',
    shape: require('../../../../assets/img/window/custom.png'),
  },
];


function BCJobRequestGlass({
                             classes,
                             glass,
                             index,
                           }: any): JSX.Element {

  return <Grid container direction={'column'} className={classes.gridWrapper}>
    <Tab title='Reglaze'/>
    <Grid container direction={'row'} className={classes.innerGrid}>
      {Object.keys((TITLES)).map((key, index, array) => {
          const rawValue = glass[key];

          let rowItems: { label?: string, value?: string, image?: string }[] = []
          switch (key) {
            case 'windowType':
              rowItems.push({value: WINDOW_TYPES.find(type => type.value === rawValue)?.label || ''});
              break;
            case 'windowShape':
              const shape = SHAPES.find(shape => rawValue === shape.id);
              rowItems.push({value: shape?.label, image: shape?.shape});
              break;
            case 'dividedLite':
              rowItems.push({value: rawValue ? 'Yes' : 'No'});
              break;
            case 'glassSize':
              rowItems.push({value: rawValue ? rawValue.size : 4192});
              glass.windowType > 1 && rowItems.push({
                label: 'Sash glass type',
                value: rawValue.windowType
              });
              break;
            case 'glassConfigurations':
              rawValue.forEach((conf: any) => {
                rowItems.push({
                  label: `${conf.position || ''} Glass Type`,
                  value: conf.glassType
                });
                rowItems.push({
                  label: `${conf.position || ''} Glass Transparency`,
                  value: conf.glassTransparency
                });
              });
              break;
            default:
              rowItems.push({value: rawValue ? rawValue.toString() : null});
          }
          return rowItems.map((rowItem) => (
              rowItem.value ?
                <Grid item xs={3} key={rowItem.label || TITLES[key]}>
                  <Typography variant={'caption'}
                              className={classes.summaryCaption}>{rowItem.label || TITLES[key]}</Typography>
                  <div className={classes.glassImageWrapper}>
                    <Typography variant={'h6'} className={classes.summaryText}>
                      {rowItem.value}
                    </Typography>
                    {rowItem.image &&
                    <img src={rowItem.image} className={classes.glassImage}/>}
                  </div>
                </Grid>
                :
                null
            )
          )
        }
      )}
    </Grid>
  </Grid>
}

export default withStyles(
  styles,
  {'withTheme': true},
)(BCJobRequestGlass);


