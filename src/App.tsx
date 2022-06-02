import { ChakraProvider } from '@chakra-ui/react'

import { Layout } from '@/scenes/layout/Layout'
import { window } from '@tauri-apps/api'
import { useEffect } from 'react'
import { tabs } from './states/tabs'
import DockLayout from 'rc-dock'

function createDefaultMainLayout() {
  const childs = [
    {
      id: 'preset:trading',
      title: 'Trading',
      options: {
        closeable: false,
      }
    },
    {
      id: 'preset:position',
      title: 'Position',
      options: {
        closeable: false,
      }
    }
  ]

  tabs.active = 'preset:trading'
  tabs.child = childs
}

/**
 * This is temporary way to transfer tab state to new child window
 * TODO: use event to create new tab to child window
 */
function createLayoutFromParams(): void {
  const url = new URL(document.location.href)

  if (url.searchParams.has('init')) {
    const serializedState = url.searchParams.get('init')!
    const tabState = JSON.parse(atob(serializedState))


    tabs.active = tabState.id
    tabs.child = [tabState]


  }
}

const App: React.FunctionComponent = props => {
  useEffect(
    (): void => {
      if (window.appWindow.label == 'main') {
        createDefaultMainLayout()
      } else {
        createLayoutFromParams()
      }
    },
    []
  )

  return (
    <ChakraProvider>
      <Layout />
    </ChakraProvider>
  )
}

export default App
