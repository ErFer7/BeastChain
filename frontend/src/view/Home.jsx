import { useState, useEffect } from 'react'
import NavigationBar from '../components/NavigationBar'
import HomePanel from '../components/panels/HomePanel'
import AdminPanel from '../components/panels/AdminPanel'
import { isAdmin, getUsersAddressesByUsername } from '../service/storageContract'

export default function Home() {
  const [currentPanel, setCurrentPanel] = useState('home')
  const [adminStatus, setAdminStatus] = useState(false)

  useEffect(() => {
    getUsersAddressesByUsername('Erfer').then((result) => {
      console.log(result)
    })
    isAdmin().then((result) => {
      setAdminStatus(result)
    })
  }, [])

  const panels = adminStatus
    ? {
        home: <HomePanel />,
        admin: <AdminPanel />,
      }
    : {
        home: <HomePanel />,
      }

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-r from-zinc-900 to-zinc-800">
        <NavigationBar currentPanel={currentPanel} setCurrentPanel={setCurrentPanel} panels={panels} />
        <div className="flex justify-center py-12">{panels[currentPanel]}</div>
      </div>
    </>
  )
}
