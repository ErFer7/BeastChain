import PropTypes from 'prop-types'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'

NavigationBar.propTypes = {
  currentPanel: PropTypes.string,
  setCurrentPanel: PropTypes.func,
  panels: PropTypes.object,
}

export default function NavigationBar(props) {
  const { currentPanel, setCurrentPanel, panels } = props

  function renderPanels() {
    return Object.keys(panels).map((panel) => {
      return (
        <NavbarItem key={panel} isActive={currentPanel === panel} onClick={() => setCurrentPanel(panel)}>
          <p className="cursor-pointer">{panel}</p>
        </NavbarItem>
      )
    })
  }

  return (
    <Navbar className="bg-zinc-900 border-b-zinc-600" isBordered={true}>
      <NavbarBrand className="text-cyan-500">
        <p className="font-bold text-inherit">Beastchain</p>
      </NavbarBrand>
      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {renderPanels()}
      </NavbarContent>
    </Navbar>
  )
}
