import React, {useEffect, useState} from 'react';
import styles from './bc-company-profile.style';
import {IconButton, withStyles} from '@material-ui/core';
import NoCompanyLogo from 'assets/img/avatars/NoCompanyLogo.png';
import {useDispatch, useSelector} from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import {ADMIN_SIDEBAR_BG, modalTypes} from '../../../constants';
import DropDownMenu, {DROP_ITEM} from "../bc-menu-dropdown";
import {Add as AddIcon, Business as BusinessIcon, Edit as EditIcon} from '@material-ui/icons';
import {CompanyProfileStateType} from "../../../actions/user/user.types";

interface Props {
  avatar: Avatar;
  noEdit?: boolean;
  companyName: string;
  classes: any;
}

interface Avatar {
  isEmpty?: string;
  url?: string;
  onChange?: (f: File) => void
  noUpdate?: boolean
  imageUrl?: any;
}

function BCCompanyLocation(props: Props) {
  const {
    avatar,
    noEdit,
    companyName,
    classes,
  } = props;

  const dispatch = useDispatch();
  const profileState: CompanyProfileStateType = useSelector((state: any) => state.profile);
  const [selectedItem, setSelectedItem] = useState<DROP_ITEM | null>(null);
  const [locations, setLocations] = useState<DROP_ITEM[]>([]);
  const [showEdit, setEdit] = useState(false);

  useEffect(() => {
    const companyLocations = profileState.locations.map((location: any) => {
      const temp = {
        id: location._id,
        title: location.name,
        icon: location.isMainLocation ? BusinessIcon : undefined,
        selectable: true,
      };
      if (temp.id === selectedItem?.id) setSelectedItem(temp);
      return temp;
    });
    companyLocations.unshift({id: '0', title: 'Add New Location', icon: AddIcon, selectable: false});
    setLocations(companyLocations);
    if (!selectedItem) {
      setSelectedItem(companyLocations[1]);
    }
  }, [profileState.locations])



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
      if (item.id === '0') {
        dispatch(
          setModalDataAction({
            data: {
              companyLocation: null,
              //modalTitle: 'Add New Location',
              removeFooter: false,
            },
            type: modalTypes.COMPANY_LOCATION_MODAL,
          })
        );
        setTimeout(() => {
          dispatch(openModalAction());
        }, 200);
      }
    }
  }

  const editItem = () => {
    const fullItem = profileState.locations.find((location) => location._id === selectedItem?.id);
    dispatch(
      setModalDataAction({
        data: {
          companyLocation: fullItem,
          //modalTitle: 'Add New Location',
          removeFooter: false,
        },
        type: modalTypes.COMPANY_LOCATION_MODAL,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
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
          items={locations}
          onSelect={handleClick}
        />
        <IconButton
          disabled={!selectedItem}
          onClick={editItem}
        >
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
