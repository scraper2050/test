import React, { useState } from 'react';
import { Box, Fab, withStyles, Badge } from '@material-ui/core';
import groupBy from 'lodash.groupby';
import Carousel from 'react-material-ui-carousel';
import CommentIcon from '@material-ui/icons/Comment';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import CloseIcon from '@material-ui/icons/Close';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Drawer from '@material-ui/core/Drawer';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import classnames from 'classnames';
import styles from './bc-mini-sidebar.style';
import { formatDatTimelll } from 'helpers/format';

interface MiniSidebarProps {
  classes: any;
  data: any;
}

const BCMiniSidebar = ({ classes, data }: MiniSidebarProps) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [imageSlide, setImageSlide] = useState<any>(null);
  const [commentDetail, setCommentDetail] = useState<any>(null);

  const techniciansReference =
    data.job?.tasks?.map((task: any) => ({
      id: task.technician._id,
      name: task.technician?.profile?.displayName,
    })) || [];
  const comments =
    data.job?.tasks
      ?.filter((task: any) => task.comment)
      .map((task: any) => ({
        commentValue: task.comment,
        name: task.technician.profile.displayName,
      })) || [];
  const technicianImages =
    data.job?.technicianImages?.map((image: any) => ({
      date: image.createdAt,
      url: image.imageUrl,
      uploader: image.uploadedBy?.profile?.displayName,
    })) || [];
  const groupedTechnicianImages = Object.values(
    groupBy(
      technicianImages,
      (image: any) => `${image.uploader}-${image.date?.slice(0, 19)}`
    )
  );

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
        position="fixed"
        top={146}
        right={open ? 290 : 0}
        className={classes.fab}
      >
        <Fab
          size="medium"
          className={classes.fab}
          onClick={open ? handleDrawerClose : handleDrawerOpen}
        >
          <Badge color="secondary" badgeContent={comments.length}>
            {open ? (
              <CommentIcon style={{ fontSize: 25, color: '#00AAFF' }} />
            ) : (
              <CommentIcon style={{ fontSize: 25, color: '#D0D3DC' }} />
            )}
          </Badge>
        </Fab>
      </Box>
      <Drawer
        open={open}
        onClose={handleDrawerClose}
        anchor="right"
        variant="persistent"
        PaperProps={{
          className: classes.drawer,
        }}
        className={classnames(classes.open, {
          [classes.drawerClose]: !open,
        })}
      >
        <Box
          position="absolute"
          top={15}
          right={15}
          onClick={handleDrawerClose}
          style={{ cursor: 'pointer' }}
        >
          <CloseIcon style={{ fontSize: 25, color: '#D0D3DC' }} />
        </Box>
        {comments.length ? (
          comments.map((comment: any, index: number) => (
            <div
              key={index}
              className={classes.drawerContentContainer}
              onClick={() => setCommentDetail(comment)}
              style={{ cursor: 'pointer' }}
            >
              <p className={classes.technicianName}>{comment.name}</p>
              <p
                className={classes.textContent}
                style={{
                  maxHeight: 208,
                  display: '-webkit-box',
                  WebkitLineClamp: 9,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {comment.commentValue}
              </p>
            </div>
          ))
        ) : (
          <div className={classes.drawerContentContainer}>
            <p className={classes.emptyContent}>There's nothing to show</p>
          </div>
        )}
      </Drawer>

      <Box
        position="fixed"
        top={194}
        right={open2 ? 290 : 0}
        className={classes.fab}
      >
        <Fab
          size="medium"
          className={classes.fab}
          onClick={open2 ? handleDrawerClose : handleDrawerOpen2}
        >
          <Badge color="secondary" badgeContent={technicianImages.length}>
            {open2 ? (
              <PhotoLibraryIcon style={{ fontSize: 25, color: '#00AAFF' }} />
            ) : (
              <PhotoLibraryIcon style={{ fontSize: 25, color: '#D0D3DC' }} />
            )}
          </Badge>
        </Fab>
      </Box>
      <Drawer
        open={open2}
        onClose={handleDrawerClose}
        anchor="right"
        variant="persistent"
        PaperProps={{
          className: classes.drawer2,
        }}
        className={classnames(classes.open, {
          [classes.drawerClose]: !open2,
        })}
      >
        <Box
          position="absolute"
          top={15}
          right={15}
          onClick={handleDrawerClose}
          style={{ cursor: 'pointer' }}
        >
          <CloseIcon style={{ fontSize: 25, color: '#D0D3DC' }} />
        </Box>
        {technicianImages.length ? (
          groupedTechnicianImages.map((group: any, index: number) => (
            <div key={index} className={classes.drawerContentContainer}>
              <p className={classes.technicianName}>{group[0].uploader}</p>
              <p className={classes.date}>{formatDatTimelll(group[0].date)}</p>
              <Grid container spacing={2}>
                {group.map((image: any, index: number) => (
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
                      onClick={() => setImageSlide({ group, index })}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          ))
        ) : (
          <div className={classes.drawerContentContainer}>
            <p className={classes.emptyContent}>There's nothing to show</p>
          </div>
        )}
      </Drawer>
      <Modal open={!!imageSlide} onClose={() => setImageSlide(null)}>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ height: '100%' }}
          onClick={() => setImageSlide(null)}
        >
          <Grid item onClick={(e) => e.stopPropagation()}>
            <Carousel
              navButtonsAlwaysVisible
              autoPlay={false}
              index={imageSlide?.index || 0}
            >
              {imageSlide &&
                imageSlide.group &&
                imageSlide.group.length &&
                imageSlide.group.map((image: any, index: number) => (
                  <span key={index}>
                    <Box
                      position="absolute"
                      top={10}
                      left={10}
                      onClick={() => window.open(image.url)}
                      style={{
                        cursor: 'pointer',
                        zIndex: 2000,
                        backgroundColor: '#494949',
                        height: 40,
                        borderRadius: '50%',
                      }}
                    >
                      <FullscreenIcon
                        style={{ fontSize: 40, color: '#D0D3DC' }}
                      />
                    </Box>
                    <Box
                      position="absolute"
                      top={10}
                      right={10}
                      onClick={() => setImageSlide(null)}
                      style={{
                        cursor: 'pointer',
                        zIndex: 2000,
                        backgroundColor: '#494949',
                        height: 40,
                        borderRadius: '50%',
                      }}
                    >
                      <CloseIcon style={{ fontSize: 40, color: '#D0D3DC' }} />
                    </Box>
                    <img src={image.url} style={{ height: '90vh' }} />
                  </span>
                ))}
            </Carousel>
          </Grid>
        </Grid>
      </Modal>
      <Dialog open={!!commentDetail} onClose={() => setCommentDetail(null)}>
        <DialogTitle>
          Technician: {commentDetail && commentDetail.name}
        </DialogTitle>
        <Box
          position="absolute"
          top={15}
          right={15}
          onClick={() => setCommentDetail(null)}
          style={{ cursor: 'pointer' }}
        >
          <CloseIcon style={{ fontSize: 25, color: '#D0D3DC' }} />
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {commentDetail && commentDetail.commentValue}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(BCMiniSidebar);
