import { Box, Flex, Text } from '@chakra-ui/react'

export const Ribbon: React.FunctionComponent = props => {
  return (
    <Flex alignItems="center" justifyContent="center" bgColor="gray.800" height="80px">
      <Text color="white">
        Menu
      </Text>
    </Flex>
  )
}
