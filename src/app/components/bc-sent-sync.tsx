import React, { useEffect, useRef } from 'react';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import {createStyles} from "@material-ui/core/styles";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {ERROR_RED, PRIMARY_GREEN} from "../../constants";
import {Link} from "react-router-dom";

interface Props {
  keyword: string;
  created: boolean;
  synced: boolean;
  showLine?: boolean;
  onTryAgain?: () => void
}

export default function BCSentSync({keyword, created, synced, showLine = true, onTryAgain = () => {}}:Props) {
  const componentStyles = styles();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef?.current?.scrollIntoView();
  }, [containerRef])


  return (
  <>
    {showLine && <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px'}}/>}
    <div className={componentStyles.container} ref={containerRef}>
      <div className={componentStyles.row}>
      {created ?
        <CheckCircleIcon style={{color: PRIMARY_GREEN, fontSize: 36}}/>
        :
        <WarningIcon style={{color: ERROR_RED, fontSize: 36}}/>
      }
        <span className={componentStyles.title}>{`The ${keyword} was ${created ? '' : 'not '}recorded`}</span>
      </div>

      <div className={componentStyles.row}>
        {synced ?
          <CheckCircleIcon style={{color: PRIMARY_GREEN, fontSize: 36}}/>
          :
          <WarningIcon style={{color: ERROR_RED, fontSize: 36}}/>
        }
        <span className={componentStyles.title}>
          {`The ${keyword} was ${synced ? '' : 'not '}synced to Quickbooks`}
          {/*{!synced && created && <>*/}
          {/*  <br/>Would you like to <Link to={'#'} onClick={onTryAgain}>try again</Link>?*/}
          {/*</>*/}
          {/*}*/}
        </span>
      </div>
    </div>
  </>
  )
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      //height: '40vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '5vh 4vw',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      padding: '8px 0',
      alignItems: 'center',
    },
    title: {
      color: '#4F4F4F',
      fontSize: 20,
      padding: '0 20px',
    }
  })
)

