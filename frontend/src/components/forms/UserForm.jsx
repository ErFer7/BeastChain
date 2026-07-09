import PropTypes from 'prop-types'
import { useState } from 'react'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { registerUsername } from '../../service/storageContract'
import StatusTag from '../utils/StatusTag'

UserForm.propTypes = {
  address: PropTypes.string,
  username: PropTypes.string,
  setUsername: PropTypes.func,
}

export default function UserForm(props) {
  const { address, username, setUsername } = props
  const [formState, setFormState] = useState({ username: username })
  const [status, setStatus] = useState(null)

  function handleInputChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }

  function registerUsernameWrapper(event) {
    event.preventDefault()

    registerUsername(formState.username)
      .then((transaction) => {
        console.log(transaction)
        setStatus('success')
        setUsername(formState.username)
      })
      .catch((error) => {
        console.log(error)
        setStatus('failure')
      })
  }

  const successMessage = <>Address <b>{address}</b> registered</>
  const failureMessage = <>Could not register the address</>

  return (
    <>
      <form className="flex flex-col space-y-4 px-56 justify-center mb-8" onSubmit={registerUsernameWrapper}>
        <Input
          name="username"
          type="text"
          label="Username"
          value={formState.username}
          onChange={handleInputChange}
        />
        <Button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-zinc-950">
          Register new username
        </Button>
      </form>
      <StatusTag successMessage={successMessage} failureMessage={failureMessage} status={status}/>
    </>
  )
}
