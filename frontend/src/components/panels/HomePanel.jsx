import Panel from './Panel'
import UserForm from '../forms/UserForm'
import { useEffect, useState } from 'react'
import { Tabs, Tab, Divider } from '@nextui-org/react'
import { getAccount, getUsername, isVeterinarian } from '../../service/storageContract'
import BunnyForm from '../forms/BunnyForm'
import BunnyListing from '../listing/BunnyListing'
import DiseaseForm from '../forms/DiseaseForm'
import TransferForm from '../forms/TransferForm'

export default function HomePanel() {
  const [address, setAddress] = useState('')
  const [username, setUsername] = useState('')
  const [isVet, setIsVet] = useState(false)
  const [updateTable, setUpdateTable] = useState(false)

  useEffect(() => {
    getAccount()
      .then((result) => {
        setAddress(result)
      })
      .catch(() => {
        setAddress('')
      })
  }, [address])

  useEffect(() => {
    getUsername()
      .then((result) => {
        setUsername(result)
      })
      .catch(() => {
        setUsername('')
      })
  }, [address])

  useEffect(() => {
    isVeterinarian()
      .then((result) => {
        setIsVet(result)
      })
      .catch(() => {
        setIsVet(false)
      })
  }, [isVet])

  let title = 'Something went wrong :('
  let description = 'Please, check your connection.'
  let disabledTabs = []
  let tabs = null

  if (address) {
    if (username !== '') {
      title = `Welcome back, ${username}!`
      description = ''
    } else {
      title = 'Welcome to Beastchain'
      description = 'Register your username to get started.'
      disabledTabs = ['bunny', 'transfer']
    }

    tabs = (
      <Tabs disabledKeys={disabledTabs} aria-label="Options" className="justify-start">
        <Tab key="user" title="User">
          <Divider className="mb-8" />
          <UserForm address={address} username={username} setUsername={setUsername} />
        </Tab>
        <Tab key="bunny" title="Bunnies">
          {isVet && (
            <>
              <Divider className="mb-8" />
              <BunnyForm setUpdateTable={setUpdateTable} />
              <Divider className="my-8" />
              <DiseaseForm />
            </>
          )}
          <Divider className="my-8" />
          <BunnyListing address={address} vetMode={false} updateTable={updateTable} setUpdateTable={setUpdateTable} />
        </Tab>
        <Tab key="transfer" title="Transfer">
          <Divider className="mb-8" />
          <TransferForm />
        </Tab>
      </Tabs>
    )
  }

  return (
    <Panel title={title} description={description}>
      {tabs}
    </Panel>
  )
}
