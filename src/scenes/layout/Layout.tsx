import { Flex } from '@chakra-ui/react'

import { Ribbon } from '@/components/ribbon'
import { Tabs } from '@/components/tabs'
import { LayoutController, LayoutManager } from '@/context/LayoutManager'

import { Surface, SurfaceHandle } from '../Surface'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { window,  } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'
import { addTab, removeTab, reorderTabs, tabs } from '@/states/tabs'
import { useSnapshot } from 'valtio'

export const Layout: React.FunctionComponent = props => {
  const tabsSnap = useSnapshot(tabs)
  const surfaceHandle = useRef<SurfaceHandle>(null)

  const detachTab = useCallback(
    async (tabId: string): Promise<void> => {
      const child = tabsSnap.child.find(c => c.id == tabId)

      if (child) {
        // const decodedState = btoa(JSON.stringify(child))
        // console.log(JSON.stringify(surfaceHandle.current?.getLayoutState()))
        const windowInstance = new window.WebviewWindow(
          `child:${child.id}`,
          {
            // url: `/?init=${decodedState}`
            url: '/'
          }
        )

        await windowInstance.emit('hello', surfaceHandle.current?.getLayoutState())
        removeTab(tabId)
      }
    },
    [tabsSnap, surfaceHandle]
  )

  useEffect(
    (): void => {
      (
        async () => {
          await listen('hello', console.log)
        }
      )()
    },
    []
  )

  const layoutManager = useMemo(
    (): LayoutController => {
      return {
        dock: {
          addWidget: (panelId) => {
            surfaceHandle.current?.addWidget(panelId)
          },
          getLayoutState: () => surfaceHandle.current?.getLayoutState()
        },
        tabs: {
          add: addTab,
          remove: removeTab,
          reorder: reorderTabs,
          detach: detachTab,
          focus: (id: string) => {
            tabs.active = id
          },
        },
      }
    },
    [tabsSnap]
  )

  return (
    <LayoutManager.Provider value={layoutManager}>
      <Flex height="100vh" direction="column" bgColor="green.100">
        <Ribbon />
        <Tabs />
        <Surface ref={surfaceHandle} />
      </Flex>
    </LayoutManager.Provider>
    
  )
}
