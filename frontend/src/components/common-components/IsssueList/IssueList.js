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
  lighten,
} from '@mui/material';
import { X } from 'lucide-react';
import { data } from './makeData';

const Example = () => {
  const [isRowPopupOpen, setIsRowPopupOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const openRowPopup = (row) => {
    debugger;
    setSelectedRowData(row.original);    
    setIsRowPopupOpen(true);
  };

  const closeRowPopup = () => {
    console.log(selectedRowData)
    setSelectedRowData(null);
    setIsRowPopupOpen(false);
    console.log(isRowPopupOpen)
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
            accessorFn: (row) => new Date(row.dueDate),
            id: 'dueDate',
            header: 'Due Date',
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
    enableRowSelection: false,
    initialState: { showColumnFilters: false, showGlobalFilter: false },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    onRowClick: (row) => {
      console.log(row)
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
      {isRowPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="flex h-full justify-center items-center">
            <div className="modal-box w-10/12 max-w-3xl relative">
              <form method="dialog">                
                <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5" onClick={() => closeRowPopup()}><X size={26} /></button>
              </form>
              <h2 className="text-3xl flex flex-1 ">{selectedRowData?.issueTitle}</h2>
              <p className="py-4 text-lg"></p>
              <div className="modal-action">
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const IssueList = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Example />
  </LocalizationProvider>
);

export default IssueList;
