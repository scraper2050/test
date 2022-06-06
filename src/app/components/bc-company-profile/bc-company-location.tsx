import React, {useEffect, useState} from 'react';
import styles from './bc-company-profile.style';
import {IconButton, withStyles} from '@material-ui/core';
import NoCompanyLogo from 'assets/img/avatars/NoCompanyLogo.png';
import {useDispatch, useSelector} from 'react-redux';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import {ADMIN_SIDEBAR_BG, modalTypes} from '../../../constants';
import DropDownMenu, {DROP_ITEM} from "../bc-menu-dropdown";
import {Add as AddIcon, Business as BusinessIcon, Edit as EditIcon} from '@material-ui/icons';
import {
  CompanyLocation,
  CompanyProfile,
  CompanyProfileStateType
} from "../../../actions/user/user.types";
import {
  getCompanyProfileAction,
  updateCompanyProfileAction
} from "../../../actions/user/user.action";
import * as Yup from "yup";
import {
  phoneRegExp,
  zipCodeRegExp
} from "../../../helpers/format";
import {companyProfileFields} from "./fields";

interface Props {
  classes: any;
  setLocation: (location: CompanyLocation) => void;
}

interface Avatar {
  isEmpty?: string;
  url?: string;
  onChange?: (f: File) => void
  noUpdate?: boolean
  imageUrl?: any;
}

const companyProfileSchema = Yup.object().shape({
  companyName: Yup.string().required('Required'),
  companyEmail: Yup.string().email('Email is not email').required('Required'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  zipCode: Yup.string().matches(zipCodeRegExp, 'Zip code is not valid')
});

function BCCompanyLocation(props: Props) {
  const {
    classes,
    setLocation,
  } = props;

  const dispatch = useDispatch();
  const profileState: CompanyProfileStateType = useSelector((state: any) => state.profile);
  const [selectedItem, setSelectedItem] = useState<DROP_ITEM | null>(null);
  const [locations, setLocations] = useState<DROP_ITEM[]>([]);
  const [showEdit, setEdit] = useState(false);

  useEffect(() => {
    let mainIndex = 0;
    const companyLocations = profileState.locations.map((location: any, index) => {
      const temp = {
        id: location._id,
        title: location.name,
        icon: location.isMainLocation ? BusinessIcon : undefined,
        selectable: true,
      };
      if (temp.id === selectedItem?.id) setSelectedItem(temp);
      if (location.isMainLocation) mainIndex = index;
      return temp;
    });
    companyLocations.unshift({id: '0', title: 'Add New Location', icon: AddIcon, selectable: false});
    setLocations(companyLocations);
    if (!selectedItem) {
      setSelectedItem(companyLocations[mainIndex + 1]);
    }
  }, [profileState.locations])

  useEffect(() => {
    const fullItem = profileState.locations.find((location) => location._id === selectedItem?.id);
    if (fullItem) setLocation(fullItem);
  }, [selectedItem])


  const handleUpdateCompanyProfile = async (values: any) => {
    const {
      companyName,
      companyEmail,
      phone,
      logoUrl,
      fax,
      city,
      state,
      zipCode,
      street,
      paymentTerm
    } = values


    const data: CompanyProfile = {
      companyName,
      companyEmail,
      phone,
      logoUrl,
      fax,
      city,
      state,
      zipCode,
      street,
      paymentTerm
    }

    await dispatch(updateCompanyProfileAction(data));
    let user: any = {};
    user = JSON.parse(localStorage.getItem('user') || "");
    dispatch(getCompanyProfileAction(user?.company as string));
  }

  const openAddContactModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'props': {
          avatar: {url: profileState.logoUrl},
          apply: (value: any) => handleUpdateCompanyProfile(value),
          fields: companyProfileFields(profileState),
          initialValues: profileState,
          schema: companyProfileSchema,
          userProfile: false
        },
        'modalTitle': 'Edit Company Profile',
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
              companyLocation: profileState.locations.length > 4 ? null : {
                contact: {phone: profileState?.phone || ''},
                info: {companyEmail: profileState?.companyEmail || ''},
              },
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
      <div className={classes.avatarArea}>
        <img src={profileState.logoUrl === '' ? NoCompanyLogo :profileState.logoUrl}/>
      </div>

      <div className={classes.namePane} >
        <span className={classes.labelText}>Company Name
          <IconButton onClick={() => openAddContactModal()}>
            <EditIcon className={classes.editProfileIcon}/>
          </IconButton>
        </span>
        <span className={classes.companyText}>{profileState.companyName}</span>
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
