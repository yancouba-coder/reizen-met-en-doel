import React, { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import Icon from '../../../components/atoms/Icon';
import Button from '../../../components/atoms/Button';

const DataTable = ({ data, columns, onAdd, onDelete, onBulkDelete, searchPlaceholder = "Search..." }) => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [rowSelection, setRowSelection] = useState({});

    // Add selection column if bulk delete is enabled
    const columnsWithSelection = useMemo(() => {
        if (!onBulkDelete) return columns;

        return [
            {
                id: 'select',
                header: ({ table }) => (
                    <input
                        type="checkbox"
                        checked={table.getIsAllRowsSelected()}
                        indeterminate={table.getIsSomeRowsSelected()}
                        onChange={table.getToggleAllRowsSelectedHandler()}
                        className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer w-4 h-4"
                    />
                ),
                cell: ({ row }) => (
                    <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer w-4 h-4"
                    />
                ),
                size: 40,
            },
            ...columns
        ];
    }, [columns, onBulkDelete]);

    const table = useReactTable({
        data,
        columns: columnsWithSelection,
        state: {
            globalFilter,
            sorting,
            rowSelection,
        },
        enableRowSelection: !!onBulkDelete,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleExport = () => {
        const headers = columns
            .filter(col => col.accessorKey && col.header !== 'Actions')
            .map(col => col.header)
            .join(',');

        const rows = table.getFilteredRowModel().rows.map(row => {
            return columns
                .filter(col => col.accessorKey && col.header !== 'Actions')
                .map(col => {
                    const value = row.getValue(col.accessorKey);
                    return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
                })
                .join(',');
        }).join('\n');

        const csvContent = `${headers}\n${rows}`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleBulkDelete = () => {
        const selectedRows = table.getSelectedRowModel().rows;
        const selectedIds = selectedRows.map(row => row.original.id);

        if (selectedIds.length === 0) {
            alert('Please select at least one item to delete');
            return;
        }

        if (window.confirm(`Are you sure you want to delete ${selectedIds.length} item(s)?`)) {
            onBulkDelete(selectedIds);
            setRowSelection({});
        }
    };

    const selectedCount = Object.keys(rowSelection).length;

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center bg-white p-4 rounded-editorial border-2 border-primary/5 shadow-sm">
                <div className="w-full sm:w-72 relative">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={globalFilter ?? ''}
                        onChange={e => setGlobalFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border-2 border-gray-100 rounded-lg focus:ring-0 focus:border-primary outline-none transition-all font-sans text-sm bg-background-subtle/30"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto justify-end">
                    {onBulkDelete && selectedCount > 0 && (
                        <Button variant="danger" size="sm" onClick={handleBulkDelete}>
                            <Icon name="Trash2" size={16} className="mr-2" />
                            Delete ({selectedCount})
                        </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={handleExport}>
                        <Icon name="Download" size={16} className="mr-2" />
                        Export
                    </Button>
                    {onAdd && (
                        <Button onClick={onAdd} variant="primary" size="sm">
                            <Icon name="Plus" size={16} className="mr-2" />
                            Add New
                        </Button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-editorial shadow-editorial border-2 border-primary/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-background-subtle border-b-2 border-primary/10">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-4 text-left text-sm font-serif font-bold text-primary uppercase tracking-wider cursor-pointer hover:bg-primary/5 transition-colors"
                                            onClick={header.column.id !== 'select' ? header.column.getToggleSortingHandler() : undefined}
                                        >
                                            <div className="flex items-center gap-2">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.id !== 'select' && (
                                                    header.column.getIsSorted() === 'asc' ? <Icon name="ChevronUp" size={14} /> :
                                                        header.column.getIsSorted() === 'desc' ? <Icon name="ChevronDown" size={14} /> : null
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className="hover:bg-background-subtle/50 transition-colors group">
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-text font-sans group-hover:text-primary transition-colors">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columnsWithSelection.length} className="px-6 py-16 text-center text-text-muted font-serif italic text-lg">
                                        No records found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="text-sm text-text-muted font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="bg-white"
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="bg-white"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
