// @ts-nocheck

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Box } from "@chakra-ui/react"
import { useSnapshot } from "valtio"
import { DockLayout, TabBase, TabData } from 'rc-dock'

import 'rc-dock/dist/rc-dock.css'

import { tabs } from "@/states/tabs"
import { listen } from "@tauri-apps/api/event"

export interface SurfaceProps {

}

export interface SurfaceHandle {
  addWidget: (panelId: string) => void
  getLayoutState: () => any
}

const tab = {
  title: 'Tab',
}

const box = {
  dockbox: {
    mode: 'horizonal',
    children: [
      {
        mode: 'vertical',
        children: [
          {
            tabs: [
              { ...tab, id: 't1' }, { ...tab, id: 't2' }, { ...tab, id: 't3' }
            ]
          },
          {
            tabs: [
              { ...tab, id: 't4' }, { ...tab, id: 't5' }, { ...tab, id: 't6' }
            ]
          }
        ]
      },
      {
        tabs: [
          { ...tab, id: 't4' }, { ...tab, id: 't5' }, { ...tab, id: 't6' }
        ]
      }
    ]
  }
}

let tabId = 0;

export const Surface = forwardRef<SurfaceHandle, SurfaceProps>(
  (props, ref) => {
    const [dockWidgets, setDockWidgets] = useState(box)
    const [activePanel, setActivePanel] = useState(null)

    const dockLayoutRef = useRef<DockLayout>(null)

    const addWidget = (panelId: string): void => {

    }

    const onLoadTab = (tab: TabBase): any => {
      const child = {
        title: tab.id,
        closeable: true,
        content: <div>{tab.id}</div>,
        group: 'closeAll'
      }

      return { ...tab, ...child }
    }

    const onPanelLoaded = (savedPanel, loadedPanel) => {
      setActivePanel(savedPanel.id)
    }

    const onLayoutChange = (newLayout) => {
      setDockWidgets(newLayout)
    }

    const getLayoutState = () => {
      return dockWidgets
    }

    useEffect(
      () => {
        listen('hello', event => {
          setDockWidgets(JSON.parse(event.payload))
        })
      }
    )

    useImperativeHandle(ref, () => ({ 
      addWidget,
      getLayoutState
    }))
      
    return (
      <Box h="100%" w="100%" position="relative">
        <DockLayout 
          ref={dockLayoutRef}
          loadTab={onLoadTab}
          layout={dockWidgets}
          onLayoutChange={onLayoutChange}
          afterPanelLoaded={onPanelLoaded}
          style={
            {
              position: 'absolute',
              top: 13,
              left: 14,
              right: 14,
              bottom: 15
            }
          }
        />
      </Box>
    )
  }
)
