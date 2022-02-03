import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { useTable, useGroupBy, useExpanded, useSortBy } from 'react-table'
import axios from "axios";
import BTable from 'react-bootstrap/Table';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
// import makeData from './makeData'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {styledInvList} from './styled/inventory-table';


const Styles = styledInvList;

function useControlledState(state, { instance }) {
  return React.useMemo(() => {
    if (state.groupBy.length) {
      return {
        ...state,
        hiddenColumns: [...state.hiddenColumns, ...state.groupBy].filter(
          (d, i, all) => all.indexOf(d) === i
        ),
      }
    }
    return state
  }, [state])
}

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    useGroupBy,
    useSortBy,
    useExpanded,
    // Our custom plugin to add the expander column
    hooks => {
      hooks.useControlledState.push(useControlledState)
      hooks.visibleColumns.push((columns, { instance }) => {
        if (!instance.state.groupBy.length) {
          return columns
        }

        return [
          {
            id: 'expander', // Make sure it has an ID
            // Build our expander column
            Header: ({ allColumns, state: { groupBy } }) => {
              return groupBy.map(columnId => {
                const column = allColumns.find(d => d.id === columnId)

                return (
                  <span {...column.getHeaderProps()}>
                    {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <span {...column.getGroupByToggleProps()}>
                        {column.isGrouped ? <ArrowRightIcon fontSize="5"/> : <ArrowDropDownIcon fontSize="5"/>}
                      </span>
                    ) : null}
                    {column.render('Header')}{' '}
                  </span>

                )
              })
            },
            Cell: ({ row }) => {
              if (row.canExpand) {
                const groupedCell = row.allCells.find(d => d.isGrouped)

                return (
                  <span
                    {...row.getToggleRowExpandedProps({
                      style: {
                        // We can even use the row.depth property
                        // and paddingLeft to indicate the depth
                        // of the row
                        paddingLeft: `${row.depth * 2}rem`,
                      },
                    })}
                  >
                    {row.isExpanded ? <ArrowDropDownIcon fontSize="5"/>:<ArrowRightIcon fontSize="5"/>} {groupedCell.render('Cell')}{' '}
                    ({row.subRows.length})
                  </span>
                )
              }

              return null
            },
          },
          ...columns,
        ]
      })
    }
  )

  const firstPageRows = rows.slice(0, 10)

  return (
    <>

      {/* <Legend /> */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className={column.className ? column.className : "" }>
                  
                  {column.canGroupBy ? (
                    // If the column can be grouped, let's add a toggle
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ?  <ArrowRightIcon fontSize="5"/> :  <ArrowDropDownIcon fontSize="5"/> }
                    </span>
                  ) : null}
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      // For educational purposes, let's color the
                      // cell depending on what type it is given
                      // from the useGroupBy hook
                      {...cell.getCellProps()}
                      style={{
                        background: cell.isGrouped
                          ? '#0aff0082'
                          : cell.isAggregated
                          ? 'rgb(224 255 255)'
                          : cell.isPlaceholder
                          ? '#ff000042'
                          : 'white',
                      }}
                    >

                      {cell.isAggregated
                        ? // If the cell is aggregated, use the Aggregated
                          // renderer for cell
                          cell.render('Aggregated')
                        : cell.isPlaceholder
                        ? null // For cells with repeated values, render null
                        : 
                          // Otherwise, just render the regular cell
                          cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  )
}



function roundedMedian(leafValues) {
  let min = leafValues[0] || 0
  let max = leafValues[0] || 0

  leafValues.forEach(value => {
    min = Math.min(min, value)
    max = Math.max(max, value)
  })

  return Math.round((min + max) / 2)
}

function ProductsList({setOrderState, orderState}) {




  function handleAddItem(row) {
    let index = orderState.findIndex(element => element.prod_id ==row.original.id);
    console.log(row.original.id);
    if (index >=0){
      let temp_state = [...orderState];
      temp_state[index].qty ++;
      setOrderState(temp_state);
    } else{
      setOrderState(prevOrders => 
        [...prevOrders, 
          {prod_id: row.original.id, 
            product: row.original.product_code,
            qty: 1,
            supplier: row.original.supplier,
            manufacturer: row.original.manufacturer,
            description: row.original.description,
          }
          ])
    }

  }
  console.log(orderState);

  function handleDeleteItem(row) {
    console.log(row.original.product_code);
    setOrderState(prevOrders => [...prevOrders, {product:row.original.product_code}])
  }
    

  const columns = React.useMemo(
    () => [

      {
        Header: 'Supplier',
        accessor: 'supplier',
        aggregate: 'uniqueCount',
        Aggregated: ({ value }) => `${value} Unique Names`,
        maxWidth: 400,
        width: 200,
        sortType: 'basic'
      },
      {
        Header: 'Product Type',
        accessor: 'category',
        aggregate: 'uniqueCount',
        Aggregated: ({ value }) => `${value} Unique Products`,
      },
      {
        Header: 'Description',
        accessor: 'description',
        aggregate: 'count',
        Aggregated: ({ value }) => `${value} Names`,
        className: 'desc'
      },
      {
        Header: 'Qty. In Stock',
        accessor: 'qty_avail',
        aggregate: 'sum',
        Aggregated: ({ value }) => `${value} total`,
      },
      {
        Header: 'Action',
        accessor: 'action',
        // aggregate: 'count',
        Aggregated: '',
        Cell: ({ cell }) => (
          <div>
            <AddCircleIcon onClick={() => handleAddItem(cell.row)} color="success" /> 
            <RemoveCircleIcon onClick={() => handleDeleteItem(cell.row)} color="error" />
          </div>

        )
      }
    ],
    []
  )


  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios
        .post("/getProducts")
        .then((response) => {
          setData(response.data);
          setLoadingData(false);
        });
    }
    if (loadingData) {
      getData();
    }
  }, []);
  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default ProductsList