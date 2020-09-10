import FirstPageIcon from '@material-ui/icons/FirstPage';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import React from 'react';
import { useTheme } from '@material-ui/core/styles';

function BCTablePagination(props: any) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={'flex-shrink-0 px-12 overflow-hidden'}>
      <IconButton
        aria-label={'first page'}
        disabled={page === 0}
        onClick={handleFirstPageButtonClick}>
        {theme.direction === 'rtl'
          ? <LastPageIcon />
          : <FirstPageIcon />}
      </IconButton>
      <IconButton
        aria-label={'previous page'}
        disabled={page === 0}
        onClick={handleBackButtonClick}>
        {theme.direction === 'rtl'
          ? <KeyboardArrowRight />
          : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        aria-label={'next page'}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        onClick={handleNextButtonClick}>
        {theme.direction === 'rtl'
          ? <KeyboardArrowLeft />
          : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        aria-label={'last page'}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        onClick={handleLastPageButtonClick}>
        {theme.direction === 'rtl'
          ? <FirstPageIcon />
          : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default BCTablePagination;
