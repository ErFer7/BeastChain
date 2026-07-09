import Panel from './Panel'
import AdminForm from '../forms/AdminForm'

export default function AdminPanel() {
  return (
    <Panel title="Admin" description="Here you can set users as veterinarians.">
      <AdminForm />
    </Panel>
  )
}
