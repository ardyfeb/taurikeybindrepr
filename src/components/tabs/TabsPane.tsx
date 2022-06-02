import { MouseEvent, useCallback, useMemo } from 'react'
import { Box, BoxProps, Flex, HStack, Icon, Text } from '@chakra-ui/react'
import { DraggableProvided } from 'react-beautiful-dnd'

import { ArrayType } from '@/types/ArrayType'
import { tabs } from '@/states/tabs'

export interface TabsPaneProps {
  tab: any
  draggable: DraggableProvided
  active: boolean
  onFocus: (tabId: string) => void
  onRemove: (tabId: string) => void
  onDetach: (tabId: string) => void
}

export const TabsPane: React.FunctionComponent<TabsPaneProps> = ({ draggable, tab, ...props }) => {
  const onInnerClick = useCallback(
    (event: MouseEvent<HTMLDivElement>): void => {
      props.onFocus(tab.id)
    },
    [props.onFocus]
  )

  const onRemoveClick = useCallback(
    (event: MouseEvent<HTMLOrSVGElement>): void => {
      event.stopPropagation()
      props.onRemove(tab.id)
    },
    [props.onRemove]
  )

  const onDetachClick = useCallback(
    (event: MouseEvent<HTMLOrSVGElement>): void => {
      event.stopPropagation()
      props.onDetach(tab.id)
    },
    [props.onDetach]
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
        bgColor: 'gray.800',
      }
    },
    [props.active]
  )

  return (
    <Box 
      ref={draggable.innerRef} 
      width="170px" 
      pt={2} 
      {...draggable.draggableProps}
      {...draggable.dragHandleProps}
      style={computedStyle}
    >
      <Flex 
        alignItems="center"
        justifyContent="space-between" 
        py={2} 
        px={3} 
        color="white" 
        onClick={onInnerClick}
        {...innerComputedProps} 
        cursor="auto"

      >
        <Text fontSize="sm">
          {tab.title}
        </Text>
        <HStack spacing={2}>
          <Icon onClick={onDetachClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" h={3.5} w={3.5} fill="currentColor">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"/>
          </Icon>
          <Icon 
            xmlns="http://www.w3.org/2000/svg" 
            h={3.5} 
            w={3.5} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2"
            onClick={onRemoveClick} 
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </Icon>
        </HStack>
      </Flex>
    </Box>
  )
}
