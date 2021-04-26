import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useFilters, useBlockLayout } from 'react-table'
import { getColumns, tableStyle, buttonStyle, inputStyle } from '../utils/utilHelper'
import { FixedSizeList as List } from 'react-window';

const TableStyle = tableStyle();
const InputStyle = inputStyle();
const ButtonStyle = buttonStyle();

const NflTable = ({ rushingData, onClick }) => {
  const [filterInput, setFilterInput] = useState("");

  const data = useMemo(() => rushingData, []);
  const columns = useMemo(() => getColumns(), [])

  const handleFilterChange = e => {
    const value = e.target.value;
    setFilter("Player", value)
    setFilterInput(value);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    totalColumnsWidth,
    } = useTable({
        columns,
        data,
    }, useFilters, useSortBy, useBlockLayout)


    const RenderRow = React.useCallback(
        ({ index, style }) => {
          const row = rows[index]
          prepareRow(row)
          return (
            <div
              {...row.getRowProps({
                style,
              })}
              className="tr"
            >
              {row.cells.map(cell => {
                return (
                  <div {...cell.getCellProps()} className="td">
                    {cell.render('Cell')}
                  </div>
                )
              })}
            </div>
          )
        },
        [prepareRow, rows]
      )

  return (
    <TableStyle>

        <div style={{marginBottom: '2rem'}}>
            <InputStyle>
                <input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder={"Search name"}
                />

            <ButtonStyle>
                <button onClick={() => onClick(rows)}>Download Data</button>
            </ButtonStyle>

            </InputStyle>

        </div>

        <div {...getTableProps()} className="table">
            <div>
                {headerGroups.map(headerGroup => (
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                    {headerGroup.headers.map(column => (
                    <div {...column.getHeaderProps(column.getSortByToggleProps())} className="th">
                        {column.render('Header')}
                        <span>
                            { column.isSorted ? 
                                column.isSortedDesc ?  ' 🔽' : ' 🔼'
                            : '' }
                        </span>
                    </div>
                    ))}
                </div>
                ))}
            </div>

            <div {...getTableBodyProps()}>
                <List
                    height={window.innerHeight}
                    itemCount={rows.length}
                    itemSize={35}
                    width={totalColumnsWidth}
                >
                    {RenderRow}
                </List>
            </div>
        </div>
    </TableStyle>
  );
};

export default NflTable
