import { Box, Flex, Text, SimpleGrid, Button } from '@chakra-ui/react'
import { CloseIcon } from "@chakra-ui/icons";

export const Ribbon: React.FunctionComponent = props => {
  return (
    <Flex bgColor="gray.700" height="80px" padding={2}>
      <Box bg="transparent">
        <div>
          <CloseIcon w={2} h={2} color="whiteAlpha.700" />
          <Button margin="0 2px" _focus={{ boxShadow: "none" }} _hover={{ background: "transparent" }} textColor="whiteAlpha.900" border={0} size="xs" bg="transparent" fontSize={10}>Watch List</Button>
        </div>
        <div>
          <CloseIcon w={2} h={2} color="whiteAlpha.700" />
          <Button margin="0 2px" _focus={{ boxShadow: "none" }} _hover={{ background: "transparent" }} textColor="whiteAlpha.900" border={0} size="xs" bg="transparent"
            fontSize={10}>Market Depth</Button>
        </div>
      </Box>
    </Flex>
  )
}
