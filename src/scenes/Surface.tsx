import { Flex, SimpleGrid, Text } from "@chakra-ui/react"

export const Surface: React.FunctionComponent = props => {
  return (
    <SimpleGrid columns={3} height="100%">
      {
        Array(6).fill('box').map(
          (val, index) => (
            <Flex 
              key={index}
              borderWidth={1}
              borderStyle="dashed"
              borderColor="gray.400"
              alignItems="center" 
              justifyContent="center" 
              bgColor='gray.500'
            >
              <Text>Box</Text>
            </Flex>
          )
        )
      }
    </SimpleGrid>
  )
}
