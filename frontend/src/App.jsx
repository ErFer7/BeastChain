import { NextUIProvider } from '@nextui-org/react'
import Home from './view/Home'

function App() {
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <Home />
      </main>
    </NextUIProvider>
  )
}

export default App
