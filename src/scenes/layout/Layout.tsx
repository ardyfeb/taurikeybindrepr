import { useCallback, useMemo, useRef } from 'react'
import { useSnapshot } from 'valtio'
import { Flex } from '@chakra-ui/react'
import { window,  } from '@tauri-apps/api'

import { Ribbon } from '@/components/ribbon'
import { Tabs } from '@/components/tabs'
import { LayoutController, LayoutManager } from '@/context/LayoutManager'

import { Surface, SurfaceHandle } from '../Surface'
import { addTab, removeTab, reorderTabs, tabs } from '@/states/tabs'

export const Layout: React.FunctionComponent = props => {
  const tabsSnap = useSnapshot(tabs)
  const surfaceHandle = useRef<SurfaceHandle>(null)

  const detachTab = useCallback(
    async (tabId: string): Promise<void> => {
      const child = tabsSnap.child.find(c => c.id == tabId)

      if (child) {
        const decodedState = btoa(JSON.stringify(child))
        const windowInstance = new window.WebviewWindow(
          `child:${child.id}`,
          {
            url: `/?init=${decodedState}`
          }
        )

        removeTab(tabId)
      }
    },
    [tabsSnap, surfaceHandle]
  )

  const layoutManager = useMemo(
    (): LayoutController => {
      return {
        dock: {
          addWidget: () => {
            surfaceHandle.current?.addWidget()
          },
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
      <Flex height="100vh" direction="column" bgColor="gray.900">
        <Ribbon onClickLayout={console.log} />
        <Tabs />
        <Surface ref={surfaceHandle} />
      </Flex>
    </LayoutManager.Provider>
    
  )
}
