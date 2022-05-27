import React, { useState } from 'react';
import styles from './bc-company-profile.style';
import {IconButton, withStyles} from '@material-ui/core';
import NoCompanyLogo from 'assets/img/avatars/NoCompanyLogo.png';
import { useDispatch } from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import {ADMIN_SIDEBAR_BG, modalTypes} from '../../../constants';
import DropDownMenu, {DROP_ITEM} from "../bc-menu-dropdown";
import {Add as AddIcon, Business as BusinessIcon, Edit as EditIcon} from '@material-ui/icons';

interface Props {
  avatar: Avatar;
  noEdit?: boolean;
  companyName: string;
  companyID: string;
  classes: any;
}

interface Avatar {
  isEmpty?: string;
  url?: string;
  onChange?: (f: File) => void
  noUpdate?: boolean
  imageUrl?: any;
}

const LIST_ITEMS :DROP_ITEM[] = [
  {id: '0', title: 'Add New Location', icon: AddIcon, selectable: false},
  {id: '1', title: 'Location 1', icon: BusinessIcon, selectable: true},
  {id: '2', title: 'Location 2', selectable: true},
]

function BCCompanyLocation(props: Props) {
  const {
    avatar,
    noEdit,
    companyName,
    classes,
  } = props;

  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<DROP_ITEM | null>(null);
  const [showEdit, setEdit] = useState(false);

  const openAddContactModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'props': props,
        'modalTitle': 'title',
        'removeFooter': false
      },
      'type': modalTypes.EDIT_PROFILE
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, item: DROP_ITEM) => {
    if (item.selectable) {
      setSelectedItem(item);
    } else {

    }
  }


  return (
    <div className={classes.profilePane}>
      {
        avatar.isEmpty === 'NO' &&
        <div className={avatar.noUpdate ? classes.noUpdateAvatarArea : classes.avatarArea}>
          <img src={avatar.url === '' ? NoCompanyLogo : avatar.url}/>
        </div>
      }
      <div className={classes.namePane} >
        <span className={classes.labelText}>Company Name</span>
        <span className={classes.companyText}>{companyName}</span>
      </div>

      <div className={classes.locationPane}
        onMouseEnter={() => setEdit(true)}
        onMouseLeave={() => setEdit(false)}
      >
        <DropDownMenu
          selectedItem={selectedItem}
          items={LIST_ITEMS}
          onSelect={handleClick}
        />
        <IconButton
          disabled={!selectedItem}>
          <EditIcon style={{color: showEdit && selectedItem ? ADMIN_SIDEBAR_BG : 'white'}}/>
        </IconButton>
      </div>
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCCompanyLocation);
