import React, { useState } from 'react';
import {
  Box,
  Fab,
  withStyles,
  Badge
} from '@material-ui/core';
import groupBy from 'lodash.groupby';
import CommentIcon from '@material-ui/icons/Comment';
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import CloseIcon from '@material-ui/icons/Close';
import classnames from 'classnames';
import styles from './bc-mini-sidebar.style';
import { formatDatTimelll } from 'helpers/format';

interface MiniSidebarProps {
  classes: any;
  data: any;
}

const BCMiniSidebar = ({classes, data}: MiniSidebarProps) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const techniciansReference = data.job?.tasks?.map((task:any) => ({id:task.technician._id, name: task.technician.profile.displayName})) || [];
  const comments = data.job?.tasks?.filter((task:any) => task.comment).map((task:any) => ({commentValue:task.comment, name: task.technician.profile.displayName})) || [];
  const technicianImages = data.job?.technicianImages?.map((image:any) => ({date:image.createdAt, url:image.imageUrl ,uploader:techniciansReference.find((ref:any) => ref.id === image.uploadedBy).name})) || [];
  const groupedTechnicianImages = Object.values(groupBy(technicianImages, (image:any) => `${image.uploader}-${image.date?.slice(0,19)}`));
  
  const handleDrawerOpen = () => {
    setOpen(true);
    setOpen2(false);
  };

  const handleDrawerOpen2 = () => {
    setOpen(false);
    setOpen2(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  
  return (
    <>
      <Box
        position='fixed'
        top={146}
        right={open ? 290 : 0}
        className={classes.fab}
      >
        <Fab
          size='medium'
          className={classes.fab}
          onClick={open ? handleDrawerClose : handleDrawerOpen}
        >
          <Badge color="secondary" badgeContent={comments.length}>
            {open
              ? <CommentIcon style={{ fontSize: 25, color: '#00AAFF' }} />
              : <CommentIcon style={{ fontSize: 25, color: '#D0D3DC' }}/>
            }
          </Badge>
        </Fab>
      </Box>
      <Drawer
        open={open}
        onClose={handleDrawerClose}
        anchor="right"
        variant="persistent"
        PaperProps={{
          className: classes.drawer
        }}
        className={classnames(classes.open, {
          [classes.drawerClose]: !open,
        })}
      >
        <Box
          position='absolute'
          top={15}
          right={15}
          onClick={handleDrawerClose}
          style={{ cursor: 'pointer'}}
        >
          <CloseIcon style={{ fontSize: 25, color: '#D0D3DC' }}/>
        </Box>
        {comments.length ? comments.map((comment:any, index:number) => (
          <div key={index} className={classes.drawerContentContainer}>
            <p className={classes.technicianName}>{comment.name}</p>
            <p className={classes.textContent}>{comment.commentValue}</p>
          </div>
        )) : (
          <div className={classes.drawerContentContainer}>
            <p className={classes.emptyContent}>There's nothing to show</p>
          </div>
        )}
      </Drawer>

      <Box
        position='fixed'
        top={194}
        right={open2 ? 290 : 0}
        className={classes.fab}
      >
        <Fab
          size='medium'
          className={classes.fab}
          onClick={open2 ? handleDrawerClose : handleDrawerOpen2}
        >
          <Badge color="secondary" badgeContent={technicianImages.length}>
            {open2
              ? <PhotoLibraryIcon style={{ fontSize: 25, color: '#00AAFF' }} />
              : <PhotoLibraryIcon style={{ fontSize: 25, color: '#D0D3DC' }}/>
            }
          </Badge>
        </Fab>
      </Box>
      <Drawer
        open={open2}
        onClose={handleDrawerClose}
        anchor="right"
        variant="persistent"
        PaperProps={{
          className: classes.drawer2
        }}
        className={classnames(classes.open, {
          [classes.drawerClose]: !open2,
        })}
      >
        <Box
          position='absolute'
          top={15}
          right={15}
          onClick={handleDrawerClose}
          style={{ cursor: 'pointer'}}
        >
          <CloseIcon style={{ fontSize: 25, color: '#D0D3DC' }}/>
        </Box>
        {technicianImages.length ? groupedTechnicianImages.map((group:any, index:number) => (
          <div key={index} className={classes.drawerContentContainer}>
            <p className={classes.technicianName}>{group[0].uploader}</p>
            <p className={classes.date}>{formatDatTimelll(group[0].date)}</p>
            <Grid container spacing={2}>
              {group.map((image:any, index:number) => (
                <Grid key={index} item xs={6}>
                  <div 
                    style={{
                      width: 100,
                      height: 100,
                      backgroundImage: `url('${image.url}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 8,
                      cursor: 'pointer',
                    }}
                    onClick={()=>setImageUrl(image.url)}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        )) : (
          <div className={classes.drawerContentContainer}>
            <p className={classes.emptyContent}>There's nothing to show</p>
          </div>
        )}
      </Drawer>
      <Dialog
        open={!!imageUrl}
        onClose={() => setImageUrl('')}
      >
        <img src={imageUrl} />
      </Dialog>
    </>
  );
}


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCMiniSidebar);