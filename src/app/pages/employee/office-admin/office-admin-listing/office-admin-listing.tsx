import BCTableContainer from "../../../../components/bc-table-container/bc-table-container";
import Fab from "@material-ui/core/Fab";
import styled from "styled-components";
import styles from "./../office-admin.styles";
import { withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getOfficeAdmin,
	loadingOfficeAdmin,
} from "actions/office-admin/office-admin.action";
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";

function OfficeAdminListing({ classes }: any) {
	const dispatch = useDispatch();
	const officeAdmin = useSelector((state: any) => state.officeAdmin);
	const columns: any = [
		{
			Cell({ row }: any) {
				return <div className={"flex items-center"}>{row.index + 1}</div>;
			},
			Header: "No#",
			sortable: true,
			width: 60,
		},
		{
			Header: "Name",
			accessor: "profile.displayName",
			className: "font-bold",
			sortable: true,
		},
		{
			Header: "Email",
			accessor: "auth.email",
			className: "font-bold",
			sortable: true,
		},
		{
			Header: "Phone Number",
			accessor: "contact.phone",
			className: "font-bold",
			sortable: true,
		}
	];

	useEffect(() => {
		dispatch(getOfficeAdmin());
		dispatch(loadingOfficeAdmin());
	}, []);

	const handleRowClick = (event: any, row: any) => {
		console.log(event, row);
	};

	return (
		<DataContainer id={"0"}>
			{officeAdmin.loading ? (
				<BCCircularLoader heightValue={'200px'} />
			) : (
					<BCTableContainer
						columns={columns}
						onRowClick={handleRowClick}
						search
						searchPlaceholder={"Search Office Admins..."}
						tableData={officeAdmin.data}
					/>
				)}
		</DataContainer>
	);
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export default withStyles(styles, { withTheme: true })(OfficeAdminListing);
