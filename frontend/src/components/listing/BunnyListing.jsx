import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react'
import { getUserBunnies } from '../../service/storageContract'
import BunnyModal from '../modals/BunnyModal'

BunnyListing.propTypes = {
  updateTable: PropTypes.bool,
  setUpdateTable: PropTypes.func,
}

export default function BunnyListing(props) {
  const { updateTable, setUpdateTable } = props
  const [rows, setRows] = useState([])

  const columns = [
    {
      key: 'name',
      label: 'NAME',
    },
  ]

  useEffect(() => {
    getUserBunnies()
      .then((bunnies) => {
        let loadedBunnies = {}
        setRows(buildRows(bunnies))

        bunnies.forEach((bunny) => {
          loadedBunnies[bunny.id] = bunny
        })

        console.log(loadedBunnies)
      })
      .catch((error) => {
        console.log(error)
      })
    setUpdateTable(false)
  }, [updateTable, setUpdateTable])

  function buildRows(bunnies) {
    if (!bunnies) {
      return []
    }

    return bunnies.map((bunny) => {
      return {
        key: bunny.id,
        name: <BunnyModal bunny={bunny} />,
      }
    })
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <h3 className="col-span-4 text-2xl font-bold mb-4">Your bunnies</h3>
        <Table hideHeader className="col-span-4 border rounded-xl border-zinc-800">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={rows} emptyContent={"You don't have any bunnies"}>
            {(item) => (
              <TableRow key={item.key}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
