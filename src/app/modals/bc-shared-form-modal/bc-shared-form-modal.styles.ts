import * as CONSTANTS from '../../../constants';
import styled from 'styled-components';


export const BCSharedFormModalContainer = styled.div`

@media print {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    background: white;
    z-index: 999;
    p {
        font-size: 14px !important;
    }
}
    .form-actions-container {
        @media print {
            display: none;
        }
        display: flex;
        justify-content: space-between;
        margin: 20px 0;

        button {
            &.save-button {
                color: ${CONSTANTS.PRIMARY_WHITE};
            }
            border-radius: 30px;
        }
    }



padding: 40px;`;


export const FormContainer = styled.div`
    margin-top: 30px;
    border: 1px solid grey;
    padding: 40px;
    position: relative;
    ul {
        margin: 0;
        padding: 0;
        li {
            list-style: none;
        }
    }
    h3 {
        font-size: 24px;
        font-weight: 800;
        text-transform: uppercase;
        margin-bottom:23px;
    }
    .company-info {
        p {
            margin: 0;
        }
    }
    
    .image-container {
        height: 50px;
        width: 100px;
        margin-bottom: 10px;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .bill-details {
        margin: 20px 0; 
        @media print {
            margin-bottom: 30px;
        }
        p {
            margin-bottom: 0;
        }
        h4 {
            font-size: 1.25rem;
            font-weight: 500;
            margin: 6px 0 20px;
        }
        .customer-details {
            p {
                margin: 5px 0;
                font-size: 16px;
            }
            svg {
                top: 4px;
                height: 20px;
                position: relative;
                margin-right: 8px;
            }
        }
    }
    table {
        th {
            background:#E5E5E5
        };
        td {
            padding: 16px 24px 16px 16px;
        }
    }
    .total {
        margin: 31px 0 20px;
        padding: .5rem 2rem;
        border: 1px solid #777777;
        float: right;
        p {
            margin: 0;
        }
        h5 {
            margin: 0;
            font-size: 18px;
        }
    }
    .status {
        @media print {
            display: none;
        }
        position: absolute;
        top: 10px;
        right: 10px;
    }

   
`;

export const EmailContainer = styled.div``;

export const TotalContainer = styled.div`
display: flex;
justify-content: flex-end;
> div {
    display:flex;
    border-radius: 0;
}
>div > div{
    padding: 10px 0 0;
    border-right: 1px solid  rgba(224, 224, 224, 1);
    &:last-of-type {
        > div {
            min-width: 100px;
            text-align:right;
        }
    }
    >div {
        padding: 5px 20px 10px;
        &:last-of-type {
            background: #E5E5E5;
            padding: 15px 20px;
            font-weight: 800;
        }
    }
};`;

