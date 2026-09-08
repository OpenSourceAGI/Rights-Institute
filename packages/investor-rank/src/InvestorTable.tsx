'use client';

import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Investor } from './types';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface InvestorTableProps {
  investors: Investor[];
}

export const InvestorTable: React.FC<InvestorTableProps> = ({ investors }) => {
  const columnDefs: ColDef<Investor>[] = useMemo(() => [
    {
      field: 'id',
      headerName: 'Rank',
      width: 90,
      sortable: true,
      filter: false,
      cellStyle: { fontWeight: 'bold' }
    },
    {
      field: 'name',
      headerName: 'Fund Name',
      width: 250,
      sortable: true,
      filter: 'agTextColumnFilter',
      cellRenderer: (params: any) => {
        const investor = params.data;
        return (
          <div className="flex items-center gap-2">
            <div className="font-semibold text-blue-600">{investor.name}</div>
          </div>
        );
      }
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 180,
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'investments',
      headerName: 'Investments',
      width: 130,
      sortable: true,
      filter: 'agNumberColumnFilter',
      comparator: (valueA: string, valueB: string) => {
        return parseInt(valueA) - parseInt(valueB);
      }
    },
    {
      field: 'exits',
      headerName: 'Exits',
      width: 110,
      sortable: true,
      filter: 'agNumberColumnFilter',
      comparator: (valueA: string, valueB: string) => {
        return parseInt(valueA) - parseInt(valueB);
      }
    },
    {
      field: 'exitRate',
      headerName: 'Exit Rate',
      width: 120,
      sortable: true,
      filter: 'agNumberColumnFilter',
      comparator: (valueA: string, valueB: string) => {
        const numA = parseFloat(valueA.replace('%', ''));
        const numB = parseFloat(valueB.replace('%', ''));
        return numA - numB;
      },
      cellRenderer: (params: any) => {
        const exitRate = params.value;
        const rate = parseFloat(exitRate.replace('%', ''));
        let colorClass = 'text-gray-600';
        if (rate >= 50) colorClass = 'text-green-600 font-semibold';
        else if (rate >= 30) colorClass = 'text-blue-600 font-semibold';
        else if (rate >= 10) colorClass = 'text-orange-600';

        return <span className={colorClass}>{exitRate}</span>;
      }
    },
    {
      field: 'founded',
      headerName: 'Founded',
      width: 120,
      sortable: true,
      filter: 'agNumberColumnFilter',
      comparator: (valueA: string, valueB: string) => {
        return parseInt(valueA) - parseInt(valueB);
      }
    },
    {
      field: 'contactPerson',
      headerName: 'Contact Person',
      width: 200,
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
      sortable: true,
      filter: 'agTextColumnFilter',
      cellRenderer: (params: any) => {
        const email = params.value;
        if (email === 'Not Available') {
          return <span className="text-gray-400">{email}</span>;
        }
        return (
          <a
            href={`mailto:${email}`}
            className="text-blue-600 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {email}
          </a>
        );
      }
    },
    {
      field: 'homepage',
      headerName: 'Website',
      width: 120,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => {
        const homepage = params.value;
        if (homepage === 'Not Available') {
          return <span className="text-gray-400">N/A</span>;
        }
        return (
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Visit
          </a>
        );
      }
    },
    {
      field: 'focuses',
      headerName: 'Focus Areas',
      width: 250,
      sortable: false,
      filter: 'agTextColumnFilter',
      cellRenderer: (params: any) => {
        const focuses = params.value || [];
        return (
          <div className="flex flex-wrap gap-1 py-1">
            {focuses.slice(0, 3).map((focus: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs"
              >
                {focus}
              </span>
            ))}
            {focuses.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{focuses.length - 3} more
              </span>
            )}
          </div>
        );
      }
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      sortable: false,
      filter: 'agTextColumnFilter',
      cellRenderer: (params: any) => {
        const description = params.value;
        const truncated = description.length > 100
          ? description.substring(0, 100) + '...'
          : description;
        return <span className="text-sm text-gray-600">{truncated}</span>;
      }
    }
  ], []);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
  }), []);

  return (
    <div className="ag-theme-alpine" style={{ height: '700px', width: '100%' }}>
      <AgGridReact
        rowData={investors}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={50}
        paginationPageSizeSelector={[25, 50, 100, 200]}
        animateRows={true}
        rowHeight={60}
        headerHeight={50}
        domLayout="normal"
      />
    </div>
  );
};
