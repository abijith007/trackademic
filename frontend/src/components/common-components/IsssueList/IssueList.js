import React, { useState, useMemo } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';
import {
  Box,
  Button,
  Typography,
  lighten,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import { data } from './makeData';

const Example = () => {
  const [isRowPopupOpen, setIsRowPopupOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const openRowPopup = (row) => {
    setSelectedRowData(row.original);
    setIsRowPopupOpen(true);
  };

  const closeRowPopup = () => {
    setSelectedRowData(null);
    setIsRowPopupOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        id: 'issueInfo',
        header: 'Issue Info',
        columns: [
          {
            accessorKey: 'issueId',
            header: 'Issue ID',
            size: 100,
          },
          {
            accessorKey: 'issueTitle',
            header: 'Issue Title',
            size: 200,
          },
          {
            accessorKey: 'createdBy',
            header: 'Created By',
            size: 150,
          },
          {
            accessorKey: 'assignedTo',
            header: 'Assigned To',
            size: 150,
          },
          {
            accessorFn: (row) => new Date(row.dateCreated),
            id: 'dateCreated',
            header: 'Date Created',
            filterVariant: 'date',
            filterFn: 'lessThan',
            sortingFn: 'datetime',
            Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
            Header: ({ column }) => <em>{column.columnDef.header}</em>,
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '250px',
              },
            },
          },
          {
            accessorKey: 'issueDescription',
            header: 'Issue Description',
            size: 300,
          },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowSelection: true,
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    onRowClick: (row) => {
      openRowPopup(row);
    },
    renderTopToolbar: ({ table }) => {
      return (
        <Box
          sx={(theme) => ({
            backgroundColor: lighten(theme.palette.background.default, 0.05),
            display: 'flex',
            gap: '0.5rem',
            p: '8px',
            justifyContent: 'space-between',
          })}
        >
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
        </Box>
      );
    },
  });

  return (
    <div>
      <MaterialReactTable table={table} />

      <Dialog open={isRowPopupOpen} onClose={closeRowPopup}>
        <DialogTitle>Row Details</DialogTitle>
        <DialogContent>
          {selectedRowData && (
            <div>
              <Typography variant="h6">Issue ID: {selectedRowData.issueId}</Typography>
              <Typography variant="body1">Issue Title: {selectedRowData.issueTitle}</Typography>
              <Typography variant="body1">Created By: {selectedRowData.createdBy}</Typography>
              <Typography variant="body1">Assigned To: {selectedRowData.assignedTo}</Typography>
              {/* Add more details as needed */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRowPopup}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const IssueList = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Example />
  </LocalizationProvider>
);

export default IssueList;
