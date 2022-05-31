import { Flex } from '@chakra-ui/react'
import { 
  DragDropContext, 
  Draggable, 
  Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd'

import { reorderTabs, tabs } from '@/states/tabs'

import { TabsPane } from './TabsPane'
import { snapshot, useSnapshot } from 'valtio'
import { useCallback } from 'react'

export const Tabs: React.FunctionComponent = props => {
  const tabSnap = useSnapshot(tabs)

  const switchTabToId = useCallback(
    (id: string) => {
      tabs.active = id
    },
    [tabSnap]
  )

  const onDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided): void => {
      reorderTabs(result.source.index, result.destination?.index!)
    },
    [tabSnap]
  )
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tabs-track" direction="horizontal">
        {
          (provided, snapshot) => (
            <Flex 
              px="2" 
              borderTopColor="gray.600" 
              borderTopWidth={1}
              bgColor="gray.700" 
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {
                tabSnap.tabs.map(
                  (tab, index) => (
                    <Draggable key={tab.id} draggableId={tab.id} index={index}>
                      {
                        (provided, snapshot) => (
                          <TabsPane  
                            active={tabSnap.active == tab.id} 
                            tab={tab} 
                            draggable={provided}
                            onClick={switchTabToId}
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
  )
}
