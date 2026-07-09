import { useState } from 'react'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { registerDisease } from '../../service/storageContract'
import StatusTag from '../utils/StatusTag'

export default function DiseaseForm() {
  const [formState, setFormState] = useState({
    bunnyId: '',
    diseaseName: '',
  })
  const [status, setStatus] = useState(null)

  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }

  function registerDiseaseWrapper(event) {
    event.preventDefault()

    registerDisease(formState.bunnyId, formState.diseaseName)
      .then((transaction) => {
        console.log(transaction)
        setStatus('success')
      })
      .catch((error) => {
        console.log(error)
        setStatus('failure')
      })
  }

  const successMessage = <>Disease registered</>
  const failureMessage = <>Could not register the disease</>

  return (
    <form className="grid grid-cols-4 gap-4" onSubmit={registerDiseaseWrapper}>
      <h3 className="col-span-4 text-2xl font-bold mb-4">Register a disease</h3>
      <Input name="bunnyId" type="text" label="Bunny ID" className="col-span-2" onChange={handleInputChange} />
      <Input name="diseaseName" type="text" label="Disease" className="col-span-2" onChange={handleInputChange} />
      <Button
        type="submit"
        className="col-start-2 col-span-2 mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-zinc-950"
      >
        Register
      </Button>
      <StatusTag successMessage={successMessage} failureMessage={failureMessage} status={status}/>
    </form>
  )
}
