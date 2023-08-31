import { CSButton, CSButtonSmall } from 'helpers/custom';
import styles from './bc-slae-tax.style';
import { useDispatch, useSelector } from 'react-redux';
import BcTableContainer from '../bc-table-container/bc-table-container';
import EditIcon from '@material-ui/icons/Edit';

import {
    Grid,
    WithStyles,
    withStyles
} from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { getAllSalesTaxAPI } from 'api/tax.api';
import { ability } from 'app/config/Can';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { modalTypes } from '../../../../src/constants';
import { TaxItem } from 'actions/tax/tax.types';
import { MainContainer, PageContainer } from '../bc-job-report/job-reports.styles';



interface BcSalesTaxProps extends WithStyles<typeof styles> { }

const BCSalesTax: FC<BcSalesTaxProps> = ({ classes }) => {
    const dispatch = useDispatch();
    const { 'data': taxes, isLoading, updating } = useSelector(({ tax }: any) => tax);

    const [columns, setColumns] = useState([]);

    useEffect(() => {
        dispatch(getAllSalesTaxAPI());
    }, []);

    function Toolbar() {
        return (
            <Grid
                container
                direction="row"
                justify='flex-end'
            >

                <CSButton
                    color={'primary'}
                    disableElevation
                    disabled={updating}
                    onClick={() => { EditAndAddSaleTax('Add Tax') }}
                    size={'small'}
                    style={{
                        color: 'white',
                    }}
                    variant={'contained'}
                >
                    {'Add'}
                </CSButton>
            </Grid>
        );
    }


    const EditAndAddSaleTax = async (title: string, taxItem?: TaxItem) => {
        dispatch(setModalDataAction({
            'data': {
                taxItem,
                'modalTitle': title
            },
            'type': modalTypes.ADD_AND_EDIT_SALES_TAX_MODAL
        }));
        setTimeout(() => {
            dispatch(openModalAction());
        }, 200);
    };

    useEffect(() => {
        const actions = [
            {
                Cell({ row }: any) {
                    return (
                        <div className={'flex items-center'}>
                            <CSButtonSmall
                                aria-label={'edit'}
                                color={'secondary'}
                                onClick={() => EditAndAddSaleTax('Edit Tax', row.original)}
                                size={'small'}
                                style={{
                                    marginRight: 10,
                                    minWidth: 35,
                                    padding: '5px 10px',
                                }}
                            >
                                <EditIcon />
                            </CSButtonSmall>
                        </div>
                    );
                },
                id: 'action',
                sortable: false,
                width: 60,
            },
        ];

        const columns: any = [
            {
                Header: 'State',
                accessor: 'state',
                sortable: true,
                width: 60,
            },
            {
                Header: 'Tax %',
                accessor: 'tax',
                sortable: true,
                width: 60,
            },
        
        ];
        let constructedColumns: any = [
            ...columns,
            ...ability.can('manage', 'Company')
                ? actions
                : [],
        ];

        setColumns(constructedColumns);
    }, []);

    return (
        <MainContainer>
            <PageContainer>
                <BcTableContainer
                    columns={columns}
                    isLoading={isLoading}
                    isPageSaveEnabled
                    search
                    searchPlaceholder={'Search tax'}
                    tableData={taxes}
                    toolbar={Toolbar()}
                />
            </PageContainer>
        </MainContainer>
    );
};

export default withStyles(
    styles,
    { 'withTheme': true }
)(BCSalesTax);

