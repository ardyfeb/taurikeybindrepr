import { MouseEvent, useCallback, useMemo } from 'react'
import { Box, BoxProps, Text } from '@chakra-ui/react'
import { DraggableProvided } from 'react-beautiful-dnd'

import { ArrayType } from '@/types/ArrayType'
import { tabs } from '@/states/tabs'

export interface TabsPaneProps {
  tab: ArrayType<typeof tabs.tabs>
  draggable: DraggableProvided
  active: boolean
  onClick: (tabId: string) => void
}

export const TabsPane: React.FunctionComponent<TabsPaneProps> = ({ draggable, tab, ...props }) => {
  const onInnerClick = useCallback(
    (event: MouseEvent<HTMLDivElement>): void => {
      props.onClick(tab.id)
    },
    [props.onClick]
  )

  const computedStyle = useMemo(
    () => {
      const { draggableProps: { style: draggableStyle } } = draggable

      if (draggableStyle?.transform) {
        const lockAxisX = `${draggableStyle.transform.split(",").shift()}, 0px)`;

        return {
          ...draggableStyle,
          transform: lockAxisX,
        }
      }
      
      return draggableStyle
    },
    [draggable.draggableProps.style]
  )

  const innerComputedProps = useMemo(
    (): BoxProps => {
      if (props.active) {
        return {
          bgColor: 'gray.900',
          borderTopLeftRadius: '2xl',
          borderTopRightRadius: '2xl'
        }
      }

      return {
        bgColor: 'gray.700',
      }
    },
    [props.active]
  )

  return (
    <Box 
      ref={draggable.innerRef} 
      width="170px" 
      pt={2} 
      {...{...draggable.draggableProps, ...draggable.dragHandleProps}}
      style={computedStyle}
    >
      <Box py={2} px={3} {...innerComputedProps} onClick={onInnerClick}>
        <Text fontSize="sm" color="white">
          {tab.title}
        </Text>
      </Box>
    </Box>
  )
}
