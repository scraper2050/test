import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

interface SortableTableHeaderProps {
  orderBy: any;
  headCells: any[];
  onClickSort: Function;
}

export default function SortableTableHeader({
  orderBy,
  headCells,
  onClickSort
}: SortableTableHeaderProps): JSX.Element {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, idx) => {
          const style: { [k: string]: any } = {};
          if (headCell.width) {
            style.width = headCell.width;
          }

          if (headCell.sortable) {
            return (
              <TableCell
                key={idx}
                sortDirection={
                  orderBy.id === headCell.id
                    ? orderBy.id
                    : false}
                style={style}>
                <TableSortLabel
                  active={orderBy.id === headCell.id}
                  direction={
                    orderBy.id === headCell.id
                      ? orderBy.direction
                      : 'asc'}
                  onClick={() => onClickSort(headCell.id)}>
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            );
          }

          return (
            <TableCell
              key={idx}
              style={style}>
              {headCell.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}
