import {
    Button,
    Checkbox,
    Chip,
    DialogActions,
    DialogContent,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
    withStyles
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {
    closeModalAction,
    setModalDataAction,
} from 'actions/bc-modal/bc-modal.action';
import styled from 'styled-components';
import styles from './bc-email-modal.styles';
import { useDispatch, useSelector } from 'react-redux';
import * as CONSTANTS from '../../../constants';
import { useFormik } from 'formik';
import BCCircularLoader from '../../components/bc-circular-loader/bc-circular-loader';
import { error } from 'actions/snackbar/snackbar.action';
import BCSent from "../../components/bc-sent";
import { ISelectedDivision } from 'actions/filter-division/fiter-division.types';
import { generatePORequestEmailTemplate, getAllPORequestsAPI, sendPORequestEmail } from 'api/po-requests.api';
import { Autocomplete } from '@material-ui/lab';
import { stringSortCaseInsensitive } from 'helpers/sort';
import { error as SnackBarError } from 'actions/snackbar/snackbar.action';
import { getCustomersContact } from 'api/customer.api';
import { setCurrentPageIndex, setCurrentPageSize } from 'actions/po-request/po-request.action';

interface formEmail {
    subject: string
    message: string
    from: string
    to: any[]
    sendToMe: boolean
}

function EmailPORequestModal({ classes, data, type }: any) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [sent, setSent] = useState(false);
    const [emailTemplate, setEmailTemplate] = useState({subject: '', message: '', from: ''})
    const currentDivision: ISelectedDivision = useSelector((state: any) => state.currentDivision);
    const { user } = useSelector((state: any) => state.auth);
    const [emailList, setEmailList] = useState([]);
    const [customerContacts, setCustomerContacts] = useState<any[]>([]);

    const closeModal = () => {
        dispatch(closeModalAction());
        setTimeout(() => {
            dispatch(
                setModalDataAction({
                    data: {},
                    type: '',
                })
            );
        }, 200);
    };

    const refresh = () => {
        // Dispatch your action here
        dispatch(getAllPORequestsAPI(undefined, undefined, undefined, undefined, undefined, currentDivision.params));
        dispatch(setCurrentPageIndex(0));
        dispatch(setCurrentPageSize(10));
    };

    const getEmailTemplate = async () => {
        const params: any = {
            ticketId: data._id
        };
        try {
            const { status, message, emailTemplate: data } = await generatePORequestEmailTemplate(params);
            if (status === 0) {
                dispatch(error(message));
                closeModal();
            } else {
                setEmailTemplate(data);
                setEmailList(data.emailList);
                setTimeout(() => {
                    form.validateForm()
                }, 100)
            }
        } catch (e) {
            dispatch(error(e.message));
            closeModal();
        } finally {
            setLoading(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        getEmailTemplate();
        if (data?.customer?._id !== '') {
            getCustomersContact(data?.customer?._id)
            .then((res: any) => {
                if (res.status === 1) {
                    const custContacts = res.contacts
                        .filter((contact: { email: string }) => !!contact.email)
                        .filter(
                            (
                                contact: { email: string },
                                index: number,
                                self: { email: string }[]
                            ) => index === self.findIndex((t) => t.email === contact.email)
                        );
                    setCustomerContacts(custContacts);
                    if (custContacts.length) {
                            const initialContact = custContacts.filter(
                            (contact: any) => data.customerContactId?.email === contact.email || data.customerContactId?.name === contact.name
                        );

                        // Set a timeout to ensure Formik is ready to accept changes to the value.
                        setTimeout(()=> {
                            FormikSetFieldValue('to', initialContact);
                        },200)
                    }
                }
            })
            .catch(() => {
                dispatch(
                    SnackBarError(
                        "Something went wrong when fetching Customer's contacts. Please try again."
                    )
                );
            });
        }
    }, []);

    const form = useFormik({
        enableReinitialize: true,
        initialValues: {
            ...emailTemplate,
            to: [{ email: data.customerContactId?.email || "" }],
            sendToMe: false
        } as formEmail,
        onSubmit: async (values: any, { setSubmitting }: any) => {
            if (!values.to.length) {
                dispatch(SnackBarError('Please Add Recipient(s)'));
                return;
            }

            const recipients = values.to.map((recipient: any) => recipient.email);
            if (values.cc) {
                recipients.push(values.cc);
            }

            const params = {
                ticketId: data._id,
                sender: values.from?.email || values.from,
                recipients: JSON.stringify(recipients),
                subject: values.subject,
                message: values.message,
                copyToMyself: values.sendToMe,
                workType: currentDivision.data?.workTypeId ? JSON.stringify([currentDivision.data?.workTypeId]) : null,
                companyLocation: currentDivision.data?.locationId ? JSON.stringify([currentDivision.data?.locationId]) : null,
            }
            try {
                setLoading(true);
                const { status, message } = await sendPORequestEmail(params);
                if (status === 1) {
                    setSubmitting(false);
                    setSent(true);
                } else {
                    dispatch(error(message));
                }
            } catch (e) {
                dispatch(error(e.message));
                closeModal();
            } finally {
                setLoading(false);
            }
        },
    });

    const {
        errors: FormikErrors,
        values: FormikValues,
        handleChange: formikChange,
        handleSubmit: FormikSubmit,
        setFieldValue: FormikSetFieldValue,
    } = form;

    const handleSenderChange = (fieldName: string, data: any) => {
        FormikSetFieldValue(
            fieldName,
            data
        );
    };

    const handleRecipientChange = (fieldName: string, data: any) => {
        if (typeof data[data.length - 1] === 'string') {
            const trimmedInput = data[data.length - 1].trim();
            const test = trimmedInput
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            if (!test) {
                return;
            }
        }
        FormikSetFieldValue(
            fieldName,
            data.map((datum: any) => {
                if (typeof datum === 'string') {
                    return { email: datum.trim() };
                } else {
                    return datum;
                }
            })
        );
    };


    return (
        <DataContainer>
            <hr
                style={{ height: '1px', background: '#D0D3DC', borderWidth: '0px' }}
            />

            <form onSubmit={FormikSubmit}>
                <DialogContent classes={{ root: classes.dialogContent }}>
                    {loading ? (
                        <BCCircularLoader heightValue={'20vh'} />
                    ) : sent ? (
                        <BCSent title={`${type} was sent successfully`} showLine={false} />
                    ) : (
                        <Grid container direction={'column'} spacing={1}>
                            <Grid item xs={12}>
                                <Grid container direction={'row'} spacing={1}>
                                    <Grid
                                        container
                                        item
                                        justify={'flex-end'}
                                        alignItems={'center'}
                                        xs={2}
                                    >
                                        <Typography variant={'button'}>FROM</Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Autocomplete
                                            classes={{
                                                inputRoot: classes.inputRootSingle
                                            }}
                                            id="email-from"
                                            freeSolo
                                            clearOnBlur
                                            fullWidth
                                            autoSelect
                                            options={emailList}
                                            getOptionLabel={(option: any) => option.email || option}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                            value={FormikValues.from}
                                            onChange={(ev: any, newValue: any) =>
                                                handleSenderChange('from', newValue)
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container direction={'row'} spacing={1}>
                                    <Grid
                                        container
                                        item
                                        justify={'flex-end'}
                                        alignItems={'center'}
                                        xs={2}
                                    >
                                        <Typography variant={'button'}>TO</Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        {!customerContacts.length ? (
                                            <TextField
                                                disabled
                                                autoComplete={'off'}
                                                className={classes.fullWidth}
                                                id={'to'}
                                                name={'to'}
                                                onChange={(e: any) => formikChange(e)}
                                                value={FormikValues.to[0].email}
                                                variant={'outlined'}
                                                placeholder="getting contact, please wait..."
                                            />
                                        ) : (
                                            <Autocomplete
                                                classes={{
                                                    inputRoot:
                                                        FormikValues.to.length > 1
                                                            ? classes.inputRoot
                                                            : classes.inputRootSingle,
                                                }}
                                                freeSolo
                                                clearOnBlur
                                                fullWidth
                                                autoSelect
                                                getOptionLabel={(option) => {
                                                    const { name, email } = option;
                                                    return `${name}, ${email}`;
                                                }}
                                                multiple
                                                onInputChange={(ev: any, newValue: any) => {
                                                    if (
                                                        newValue.endsWith(',') ||
                                                        newValue.endsWith(';') ||
                                                        newValue.endsWith(' ')
                                                    ) {
                                                        ev?.target.blur();
                                                        ev?.target.focus();
                                                    }
                                                }}
                                                onChange={(ev: any, newValue: any) =>
                                                    handleRecipientChange('to', newValue)
                                                }
                                                options={
                                                    customerContacts && customerContacts.length !== 0
                                                        ? stringSortCaseInsensitive(
                                                            customerContacts,
                                                            'name'
                                                        )
                                                        : []
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant={'outlined'}
                                                        required={!customerContacts.length}
                                                    />
                                                )}
                                                renderTags={(tagValue, getTagProps) =>
                                                    tagValue.map((option, index) => {
                                                        return (
                                                            <Chip
                                                                key={index}
                                                                label={`${option.email}`}
                                                                {...getTagProps({ index })}
                                                            />
                                                        );
                                                    })
                                                }
                                                value={FormikValues.to}
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction={'row'} spacing={1}>
                                    <Grid
                                        container
                                        item
                                        justify={'flex-end'}
                                        alignItems={'center'}
                                        xs={2}
                                    >
                                        <Typography variant={'button'}>SUBJECT</Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            autoFocus
                                            autoComplete={'off'}
                                            className={classes.fullWidth}
                                            id={'outlined-textarea'}
                                            name={'subject'}
                                            onChange={formikChange}
                                            type={'text'}
                                            value={FormikValues.subject}
                                            variant={'outlined'}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container direction={'row'} spacing={1}>
                                    <Grid
                                        container
                                        item
                                        justify={'flex-end'}
                                        alignItems={'flex-start'}
                                        xs={2}
                                    >
                                        <Typography
                                            variant={'button'}
                                            style={{ marginTop: '10px' }}
                                        >
                                            MESSAGE
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            autoComplete={'off'}
                                            className={classes.fullWidth}
                                            id={'outlined-textarea'}
                                            name={'message'}
                                            multiline={true}
                                            rows={7}
                                            onChange={(e: any) => formikChange(e)}
                                            type={'text'}
                                            value={FormikValues.message}
                                            variant={'outlined'}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container direction={'row'} spacing={1}>
                                    <Grid
                                        container
                                        item
                                        justify={'flex-end'}
                                        alignItems={'flex-start'}
                                        xs={2}
                                    ></Grid>
                                    <Grid item xs={10}>
                                        <FormControlLabel
                                            classes={{ label: classes.checkboxLabel }}
                                            control={
                                                <Checkbox
                                                    color={'primary'}
                                                    checked={FormikValues.sendToMe}
                                                    onChange={formikChange}
                                                    name="sendToMe"
                                                    classes={{ root: classes.checkboxInput }}
                                                />
                                            }
                                            label={`Send copy to myself at ${user.auth?.email}`}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>

                <hr
                    style={{ height: '1px', background: '#D0D3DC', borderWidth: '0px' }}
                />
                <DialogActions
                    classes={{
                        root: classes.dialogActions,
                    }}
                >
                    <Grid container justify={'space-between'}>
                        <Grid item>
                            {!loading && !sent && (
                                <Button
                                    disabled={form.isSubmitting}
                                    aria-label={'record-payment'}
                                    classes={{
                                        root: classes.closeButton,
                                    }}
                                    onClick={() => closeModal()}
                                    variant={'outlined'}
                                >
                                    Cancel
                                </Button>
                            )}
                        </Grid>
                        <Grid item>
                            {!loading && !sent ? (
                                <>
                                    <Button
                                        aria-label={'create-job'}
                                        classes={{
                                            root: classes.submitButton,
                                            disabled: classes.submitButtonDisabled,
                                        }}
                                        color="primary"
                                        type={'submit'}
                                        variant={'contained'}
                                    >
                                        Submit
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    aria-label={'record-payment'}
                                    classes={{
                                        root: classes.closeButton,
                                    }}
                                        onClick={() => {
                                            refresh();
                                            closeModal(); } }
                                    variant={'outlined'}
                                >
                                    Close
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </DialogActions>
            </form>
        </DataContainer>
    );
}

const DataContainer = styled.div`
  margin: auto 0;

  .MuiFormLabel-root {
    font-style: normal;
    font-weight: normal;
    width: 800px;
    font-size: 20px;
    color: ${CONSTANTS.PRIMARY_DARK};
    /* margin-bottom: 6px; */
  }
  .MuiFormControl-marginNormal {
    margin-top: 0.5rem !important;
    margin-bottom: 1rem !important;
    /* height: 20px !important; */
  }
  .MuiInputBase-input {
    color: #383838;
    font-size: 16px;
    padding: 12px 14px;
  }
  .MuiInputBase-root {
    fieldset {
      border-radius: 8px;
      border 1px solid #E0E0E0;
    }
  }

  .MuiInputAdornment-positionStart {
    margin-right: 0;
  }
  .MuiInputAdornment-root + .MuiInputBase-input {
    padding: 12px 14px 12px 0;
  }
  .MuiOutlinedInput-multiline {
    padding: 5px 14px;
    align-items: flex-start;
  }
  .required > label:after {
    margin-left: 3px;
    content: '*';
    color: red;
  }
  .save-customer-button {
    color: ${CONSTANTS.PRIMARY_WHITE};
  }
`;

export default withStyles(styles, { withTheme: true })(EmailPORequestModal);
