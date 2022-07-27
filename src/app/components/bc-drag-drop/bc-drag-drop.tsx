import React, {
  useRef,
  useState,
  DragEvent,
  useLayoutEffect
} from 'react';
import BackupIcon from '@material-ui/icons/Backup';
import {Button, IconButton, Typography, withStyles} from "@material-ui/core";
import styles from "./bc-drag-drop-style";
import emptyImage from "../../../assets/img/dummy-big.jpg";
import CloseIcon from '@material-ui/icons/Close';
import styled from "styled-components";
import classNames from "classnames";

interface Props {
  classes: any,
  onDrop?: (files: FileList) => void;
  onDelete?: (index: number) => void;
  images?: string[];
  readonly?: boolean;
}

function BCDragAndDrop ({onDrop, onDelete, images=[], readonly = false, classes} : Props) {
  const [drag, setDrag] = useState(false);
  const [height, setHeight] = useState(114);
  const targetRef = useRef<HTMLDivElement>(null);

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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0 && onDrop) {
      onDrop(e.dataTransfer.files)
      e.dataTransfer.clearData()
    }
  }

  useLayoutEffect(() => {
    if (targetRef.current) {
      const width = targetRef.current.offsetWidth;
      setHeight((width - 12) /3);
    }
  }, [])

  const showDialog = () => {
    const btn = document.getElementById('selectedFile');
    if (btn) btn.click();
  }

  const renderImages = () => {
    const addNumber = images.length === 0 ? 3 : (3 - (images.length % 3)) % 3;
    const emptyImages = [...images];
    for(let i = 0; i < addNumber; i++) {
      emptyImages.push('');
    }

    return emptyImages;
  }

  return (
    <div className={classNames(classes.container, {[classes.noBottomPadding]: readonly })}>
      {!readonly &&
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
      }

      <div className={classNames(classes.imagesWrapper, {[classes.noBorder]: readonly })}>
        <ImageContainer ref={targetRef} height={height}>
          {renderImages().map((image, index, arr) =>
            <div key={index} className={classes.imageWrapper}>
              <img
                key={`image_${index}`}
                className={`${classes.image} ${index < arr.length - 1 ? classes.imageMargin : ''}`}
                src={image || emptyImage}
              />
              {!readonly && image && !image.startsWith('http') &&
              <IconButton size="small" className={classes.removeImage} onClick={() => {if (onDelete) onDelete(index)}}>
                <CloseIcon/>
              </IconButton>
              }
            </div>
            )
          }
        </ImageContainer>
      </div>

      <input
        type={'file'}
        id={'selectedFile'}
        accept={"image/*"}
        multiple={true}
        style={{display: 'none'}}
        onChange={(e: any) => {if (onDrop) onDrop(e.currentTarget.files)}}
      />
    </div>
  )

}

const ImageContainer = styled.div<{height: number}>`
  height: ${props => props.height}px;
  padding-right: 4px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow-y: auto;

  /* width */
  ::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #BDBDBD;
    border-radius: 2px;
    border: solid 3px transparent;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCDragAndDrop);
