import BCTableContainer from "../../../../components/bc-table-container/bc-table-container";
import styled from "styled-components";
import styles from "./../job-types.styles";
import { withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobTypesAPI } from "api/job.api";
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";
import {openModalAction, setModalDataAction} from "../../../../../actions/bc-modal/bc-modal.action";
import {modalTypes} from "../../../../../constants";
import {stringSortCaseInsensitive} from "../../../../../helpers/sort";

function JobTypesListing({ classes }: any) {
  const dispatch = useDispatch();
  const jobTypes = useSelector((state: any) => state.jobTypes);
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
      Header: "Job Types",
      accessor: "title",
      className: "font-bold",
      sortable: true,
    },
    {
      'Header': 'Description',
      'accessor': 'description',
      'sortable': false,
      'width': 100
    },
  ];

  useEffect(() => {
    dispatch(getAllJobTypesAPI());
  }, []);

  const handleRowClick = (event: any, row: any) => {
      dispatch(setModalDataAction({
        'data': {
          'modalTitle': 'Edit Job Type',
          'removeFooter': false,
          'jobType': row.original,
        },
        'type': modalTypes.ADD_JOB_TYPE
      }));
      setTimeout(() => {
        dispatch(openModalAction());
      }, 200);
  };

  return (
    <DataContainer id={"0"}>
      {jobTypes && jobTypes.isLoading ? (
        <BCCircularLoader heightValue={'200px'} />
      ) : (
        <BCTableContainer
          cellSize={"medium"}
          columns={columns}
          onRowClick={handleRowClick}
          search
          searchPlaceholder={"Search Job Types..."}
          tableData={stringSortCaseInsensitive(jobTypes.data, 'title')}
        />
      )}
    </DataContainer>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  overflow: hidden;
`;

export default withStyles(styles, { withTheme: true })(JobTypesListing);
