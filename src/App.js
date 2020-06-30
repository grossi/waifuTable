import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles';

import { useTable } from 'react-table'

import waifuData from './waifus.json'
import styles from './AppStyle';


function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

function App(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Waifu Name',
        accessor: 'name',
      },
      {
        Header: 'Waifu Code',
        accessor: 'code',
      },
      {
        Header: 'Image',
        accessor: 'location',
      },
    ],
    []
  )

  const { classes } = props;
  const data = waifuData.map((waifu, k) => {
    let location = waifu.location;
    if( waifu.extension === 'gif' ) {
      location = <img 
          style={{ maxHeight:'150px' }}
          src={`${process.env.PUBLIC_URL}/${waifu.location}`} 
          alt={waifu.name}
        />;
    } else if( waifu.extension === 'mp4' ){
      location = 
        <video height="150" loop muted controls>
          <source src={`${process.env.PUBLIC_URL}/${waifu.location}`}
            type="video/mp4"
          />
        </video>;
    } 
    return { 
      location,
      code: waifu.code,
      extension: waifu.extension,
      name: waifu.name,
    };
  });

  return (
    <div className={classes.backDrop}>  
      <div className={classes.root}>
        <header className={classes.header}>
          <h1> Waifu List </h1>
        </header>
        <div className={classes.reviewsBlock} id={"reviewsBlock"}>
          <CssBaseline />
          <Table columns={columns} data={data} />
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(App);