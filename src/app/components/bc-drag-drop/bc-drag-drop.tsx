import React, {useEffect, useRef, useState, DragEvent} from 'react';
import BackupIcon from '@material-ui/icons/Backup';
import {Button, Typography, withStyles} from "@material-ui/core";
import styles from "./bc-drag-drop-style";
import emptyImage from "../../../assets/img/dummy-big.jpg";

interface Props {
  classes: any,
  onDrop: (files: FileList) => void;
  images?: string[];
}

function BCDragAndDrop ({onDrop, images=[], classes} : Props) {
  const [drag, setDrag] = useState(false);
  const [thumbs, setThumbs] = useState<any[]>(images);

  console.log({images, thumbs});

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    setDrag(true);
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDragIn = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true);
    }
  }

  const handleDragOut = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false);
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDrop(e.dataTransfer.files)
      e.dataTransfer.clearData()
    }
  }

  const showDialog = () => {
    const btn = document.getElementById('selectedFile');
    if (btn) btn.click();
  }

/*  useEffect(() => {
    setThumbs(images);
  }, [images])*/

  return (
    <div
      className={classes.container}
    >
      <div
        className={`${classes.dropContainer} ${drag ? classes.dropContainerActive : ''}`}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDrop={handleDrop}
        onDragOver={handleDrag}
      >
        <BackupIcon fontSize={'large'} style={{color: '#bdbdbd'}}/>
        <Typography
          variant={'caption'}
          color={'textSecondary'}
        >Drop image files<br/>here to upload or</Typography>
        <Button
          classes={{root: classes.button, label: classes.buttonText}}
          variant={'contained'}
          disableElevation={true}
          onClick={showDialog}
        >Choose File(s)</Button>

      </div>

      <div className={classes.imageContainer} >
        <img className={classes.image} src={images.length > 0 ? images[0] : emptyImage}/>
        <img className={classes.image} src={images.length > 1 ? images[1] : emptyImage}/>
        <img className={classes.image} src={images.length > 2 ? images[2] : emptyImage}/>
      </div>
      <input
        type={'file'}
        id={'selectedFile'}
        accept={"image/*"}
        multiple={true}
        style={{display: 'none'}}
        onChange={(e: any) => onDrop(e.currentTarget.files)}
      />
    </div>
  )

}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCDragAndDrop);
