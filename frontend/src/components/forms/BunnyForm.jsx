import PropTypes from 'prop-types'
import { useState } from 'react'
import { Checkbox, Input } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { registerBunny } from '../../service/storageContract'
import StatusTag from '../utils/StatusTag'

BunnyForm.propTypes = {
  setUpdateTable: PropTypes.func,
}

export default function BunnyForm(props) {
  const { setUpdateTable } = props
  const today = new Date()
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const day = ('0' + today.getDate()).slice(-2)

  const todayString = `${year}-${month}-${day}`

  const [formState, setFormState] = useState({
    name: '',
    birthday: todayString,
    hasLopEars: true,
    color: '',
    fatherId: '',
    motherId: '',
    ownerId: '',
  })
  const [status, setStatus] = useState(null)

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

    setFormState({
      ...formState,
      [event.target.name]: value,
    })
  }

  function registerBunnyWrapper(event) {
    event.preventDefault()

    const bunny = {
      id: 0,
      name: formState.name,
      birthday: new Date(formState.birthday).getTime(),
      hasLopEars: formState.hasLopEars,
      color: formState.color,
      fatherId: parseInt(formState.fatherId),
      motherId: parseInt(formState.motherId),
      ownerId: formState.ownerId,
    }

    registerBunny(bunny)
      .then((transaction) => {
        console.log(transaction)
        setStatus('success')
      })
      .catch((error) => {
        console.log(error)
        setStatus('failure')
      })

    setUpdateTable(true)
  }

  const successMessage = <>Bunny <b>{formState.name}</b> registered</>
  const failureMessage = <>Could not register the bunny</>

  return (
    <form className="grid grid-cols-4 gap-4" onSubmit={registerBunnyWrapper}>
      <h3 className="col-span-4 text-2xl font-bold mb-4">Register a new bunny</h3>
      <Input name="name" type="text" label="Name" className="col-span-3" onChange={handleInputChange} />
      <Input
        name="birthday"
        type="date"
        label="Birthday"
        value={formState.birthday}
        className="col-span-1"
        onChange={handleInputChange}
      />
      <Input name="fatherId" type="text" label="Father ID" className="col-span-1" onChange={handleInputChange} />
      <Input name="motherId" type="text" label="Mother ID" className="col-span-1" onChange={handleInputChange} />
      <Input name="color" type="text" label="Color" className="col-span-1" onChange={handleInputChange} />
      <Checkbox name="hasLopEars" className="col-span-1" onChange={handleInputChange}>
        Has lop ears
      </Checkbox>
      <Input name="ownerId" type="text" label="Owner ID" className="col-span-4" onChange={handleInputChange} />
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
