import React, { useMemo, useState } from 'react'
import { MaterialReactTable,useMaterialReactTable } from 'material-react-table'


function ExampleTable() {
  const data = useState([
    // {
    //   id: 1,
    //   name: 'hello',
    //   type: 'Textfield',
    //   values: [],
    //   validations: ["R","E","F"],
    //   order: 1
    // }
  ]);
  const columns = useMemo(() => [
      {
        accessorKey: 'id',
        Header: 'id'
      },
      {
        accessorKey: 'name',
        Header: 'Name of Field'
      },
      {
        accessorKey: 'type',
        Header: 'Type of Field'
      },
      {
        accessorKey: 'values',
        Header: 'Dropdown Values'
      },
      {
        accessorKey: 'validations',
        Header: 'Validations'
      },
      {
        accessorKey: 'order',
        Header: 'order'
      },
  ], [])

  const table = useMaterialReactTable({
     columns,
     data
  })
  return (
     <MaterialReactTable table={table} />
  )
}

export default ExampleTable