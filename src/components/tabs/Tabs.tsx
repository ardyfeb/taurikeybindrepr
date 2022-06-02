import { useCallback, useMemo } from 'react'
import { useSnapshot } from 'valtio'
import { Box, Flex, Icon } from '@chakra-ui/react'
import { 
  DragDropContext, 
  Draggable, 
  Droppable, 
  DropResult, 
  ResponderProvided 
} from 'react-beautiful-dnd'
import { app, window } from '@tauri-apps/api'

import { tabs } from '@/states/tabs'
import { useLayoutManager } from '@/hooks/useLayoutManager'
import { ArrayType } from '@/types/ArrayType'

import { TabsPane } from './TabsPane'

export const Tabs: React.FunctionComponent = props => {
  const tabSnap = useSnapshot(tabs)
  const layoutManager = useLayoutManager()

  const onAddTab = () => layoutManager.tabs.add(window.appWindow.label)

  const onDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided): void => {
      const main = new window.WindowManager('main')

      // if (window.appWindow.label != 'main') {
        console.log('state')
        console.log(layoutManager.dock.getLayoutState())
      // }

      layoutManager.tabs.reorder(result.source.index,result.destination?.index!)
    },
    [layoutManager]
  )
  
  return (
    <Flex direction="row" alignItems="center" bgColor="gray.800" borderTopColor="gray.700" borderTopWidth={1}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tabs-track" direction="horizontal">
          {
            (provided, snapshot) => (
              <Flex px="2" ref={provided.innerRef} {...provided.droppableProps}>
                {
                  tabSnap.child.map(
                    (tab, index) => (
                      <Draggable key={tab.id} draggableId={tab.id} index={index}>
                        {
                          (provided, snapshot) => (
                            <TabsPane  
                              active={tabSnap.active == tab.id} 
                              tab={tab} 
                              draggable={provided}
                              onFocus={layoutManager.tabs.focus}
                              onRemove={layoutManager.tabs.remove}
                              onDetach={layoutManager.tabs.detach}
                            />
                          )
                        }
                      </Draggable>
                    )
                  )
                }
                {provided.placeholder}
              </Flex>
            )
          }
        </Droppable>
      </DragDropContext>
      <Box color="white" px={2} onClick={onAddTab}>
        <Icon xmlns="http://www.w3.org/2000/svg" h={4} w={4} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </Icon>
      </Box>
    </Flex>
  )
}
