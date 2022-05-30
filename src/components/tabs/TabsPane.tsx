import { Box, BoxProps, Text } from '@chakra-ui/react'
import { useMemo } from 'react'

export interface TabsPaneProps {
  title: string
  active: boolean
}

export const TabsPane: React.FunctionComponent<TabsPaneProps> = props => {
  const computedProps = useMemo(
    (): BoxProps => {
      if (!props.active) {
        return {
          bgColor: 'gray.900'
        }
      }

      return {}
    },
    [props.active]
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
        borderBottomLeftRadius: '2xl',
        borderBottomRightRadius: '2xl',
      }
    },
    [props.active]
  )

  return (
    <Box width="170px" pt={2}>
      <Box py={2} px={3} {...innerComputedProps}>
        <Text fontSize="sm" color="white">
          {props.title}
        </Text>
      </Box>
    </Box>
  )
}
