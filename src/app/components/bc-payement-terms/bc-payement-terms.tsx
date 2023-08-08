import React, { useEffect } from "react";
import { Paper, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { connect, useDispatch, useSelector } from "react-redux";
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";
import { getAllPaymentTermsAPI } from "api/payment-terms.api";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { updatePaymentTermsAction } from "actions/payment-terms/payment.terms.action";
import { CompanyProfileStateType } from "actions/user/user.types";
import { success } from "actions/snackbar/snackbar.action";
import { closeModalAction } from "actions/bc-modal/bc-modal.action";


const BCPaymentTermsContainer = styled(Paper)`
padding: 30px;
.actions-container {
    width: 100%;
    padding: 30px
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}
.MuiFab-primary {
    color: white;
    width: 200px;
    border-radius: 30px;
    margin-top: 20px;
}
`;

interface BCSidebarProps {
    user: any;
}

function BCPaymentTerms({ user }: BCSidebarProps) {
    const dispatch = useDispatch();
    const { 'data': paymentTerms, isLoading, done, updating, error } = useSelector(({ paymentTerms }: any) => paymentTerms);
    const companyProfile: CompanyProfileStateType = useSelector((state: any) => state.profile);
    const [value, setValue] = React.useState<any>();


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updatePaymentTermsAction((event.target as HTMLInputElement).value, user?.company as string));
        setValue((event.target as HTMLInputElement).value);
        dispatch(success('Default payment type successfully updated'));
        setTimeout(() => dispatch(closeModalAction()), 500);
    };

    useEffect(() => {
        setValue(companyProfile?.paymentTerm?._id);
    }, [companyProfile?.paymentTerm?._id]);

    useEffect(() => {
        dispatch(getAllPaymentTermsAPI());
    }, []);

    if (isLoading) {
        return <BCCircularLoader heightValue={'100px'} />;
    }

    return <BCPaymentTermsContainer>
        <FormControl component="fieldset">
            <FormLabel component="legend">Select payment terms to set as default</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                {
                    paymentTerms.map((pitem: any, pindex: number) => {
                        return (
                            <FormControlLabel key={pitem._id} value={pitem._id} control={<Radio />} label={pitem.name} />
                        )
                    })
                }
            </RadioGroup>
        </FormControl>
    </BCPaymentTermsContainer>;
}


const mapStateToProps = (state: {
    auth: {
        token: string;
        user: any;
    };
}) => ({
    'user': state.auth.user
});


export default withStyles(
    {},
    { 'withTheme': true }
)(connect(mapStateToProps)(BCPaymentTerms));
