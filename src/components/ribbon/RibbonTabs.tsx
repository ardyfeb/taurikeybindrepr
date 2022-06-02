import { Box, Flex, Text } from '@chakra-ui/react'

export interface RibbonTabs {
  title: string
  active: boolean
  onClick: () => void
}

export const RibbonTabs: React.FunctionComponent<RibbonTabs> = (props) => {
  return (
    <Box width="auto" cursor="pointer" onClick={props.onClick}>
      <Flex 
        alignItems="center"
        justifyContent="space-between" 
        py={2} 
        px={3} 
        color="white" 
        padding="8px 20px"
        borderRadius="2px 2px 0px 0px" 
        bgColor={props.active ? 'gray.900' : undefined}
      >
        <Text fontSize="sm">
          {props.title}
        </Text>
      </Flex>
    </Box>
  )
}
