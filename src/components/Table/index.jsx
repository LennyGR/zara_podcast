import { usePagination, useTable } from 'react-table';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

const Table = ({ columns, data, overrideCell }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize }
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 }
		},
		usePagination
	);

	const renderCell = useCallback((cell) => {
		if (overrideCell) {
			return overrideCell(cell);
		}
		return cell.render('Cell');
	}, []);

	return (
		<div className='react-table'>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup, index) => (
						<tr
							key={`thead_tr_${index}`}
							{...headerGroup.getHeaderGroupProps()}
						>
							{headerGroup.headers.map((column, i) => (
								<th key={`thead_th_${index}_${i}`} {...column.getHeaderProps()}>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, index) => {
						prepareRow(row);
						return (
							<tr key={`tbody_tr_${index}`} {...row.getRowProps()}>
								{row.cells.map((cell, i) => {
									return (
										<td key={`tbody_td_${index}_${i}`} {...cell.getCellProps()}>
											{renderCell(cell)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className='pagination'>
				<div>
					<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
						{'<<'}
					</button>{' '}
					<button onClick={() => previousPage()} disabled={!canPreviousPage}>
						{'<'}
					</button>{' '}
					<button onClick={() => nextPage()} disabled={!canNextPage}>
						{'>'}
					</button>{' '}
					<button
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
					>
						{'>>'}
					</button>{' '}
					<span>
						Page{' '}
						<strong>
							{pageIndex + 1} of {pageOptions.length}
						</strong>{' '}
					</span>
					<span>
						| Go to page:{' '}
						<input
							type='number'
							defaultValue={pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								gotoPage(page);
							}}
							style={{ width: '100px' }}
						/>
					</span>{' '}
					<select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

Table.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	overrideCell: PropTypes.func
};

export default Table;
