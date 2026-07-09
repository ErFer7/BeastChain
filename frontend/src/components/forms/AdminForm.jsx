import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { Divider } from '@nextui-org/react'
import { Chip } from '@nextui-org/react'
import { Input } from '@nextui-org/react'
import { registerVeterinarian, unregisterVeterinarian } from '../../service/storageContract'

export default function AdminForm() {
  const [isUserVeterinarian, setUserVeterinarian] = useState(null)
  const [formState, setFormState] = useState({ userAddress: '' })

  function handleInputChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }

  function registerVeterinarianWrapper() {
    registerVeterinarian(formState.userAddress)
      .then((transaction) => {
        console.log(transaction)
        setUserVeterinarian(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function removeVeterinarianWrapper() {
    unregisterVeterinarian(formState.userAddress)
      .then((transaction) => {
        console.log(transaction)
        setUserVeterinarian(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function renderStatusMessage() {
    let message = null

    if (isUserVeterinarian !== null) {
      if (isUserVeterinarian) {
        message = (
          <>
            <Divider className="my-4" />
            <Chip color="success" className="bg-gradient-to-r from-blue-500 to-cyan-500">
              <b>{formState.userAddress}</b> set as veterinarian
            </Chip>
          </>
        )
      } else {
        message = (
          <>
            <Divider className="my-4" />
            <Chip color="warning">{formState.userAddress} unset as veterinarian</Chip>
          </>
        )
      }
    } else {
      message = null
    }

    return <div className="col-span-2">{message}</div>
  }

  return (
    <form className="grid grid-cols-2 gap-4">
      <Input
        name="userAddress"
        type="text"
        label="User address"
        className="col-span-2"
        value={formState.userAddress}
        onChange={handleInputChange}
      />
      <Button className="col-span-1" color="primary" onClick={() => registerVeterinarianWrapper()}>
        Set this address as veterinarian
      </Button>
      <Button className="col-span-1" color="danger" onClick={() => removeVeterinarianWrapper()}>
        Unset this address as veterinarian
      </Button>
      {renderStatusMessage()}
    </form>
  )
}
