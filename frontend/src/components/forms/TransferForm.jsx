import { useState } from 'react'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { transferBunny } from '../../service/storageContract'
import StatusTag from '../utils/StatusTag'

export default function TransferForm() {
  const [formState, setFormState] = useState({
    bunnyId: '',
    newOwnerAddress: '',
  })
  const [status, setStatus] = useState(null)

  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }

  function transferBunnyWrapper(event) {
    event.preventDefault()

    transferBunny(formState.bunnyId, formState.newOwnerAddress)
      .then((transaction) => {
        console.log(transaction)
        setStatus('success')
      })
      .catch((error) => {
        console.log(error)
        setStatus('failure')
      })
  }

  const successMessage = <>Bunny transferred</>
  const failureMessage = <>Could not transfer the bunny</>

  return (
    <form className="grid grid-cols-4 gap-4" onSubmit={transferBunnyWrapper}>
      <h3 className="col-span-4 text-2xl font-bold mb-4">Transfer your bunny</h3>
      <Input name="bunnyId" type="text" label="Bunny ID" className="col-span-2" onChange={handleInputChange} />
      <Input
        name="newOwnerAddress"
        type="text"
        label="New Owner Address"
        className="col-span-2"
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        className="col-start-2 col-span-2 mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-zinc-950"
      >
        Transfer
      </Button>
      <StatusTag successMessage={successMessage} failureMessage={failureMessage} status={status} />
    </form>
  )
}
