import { Box, Flex, Button } from '@chakra-ui/react'
import { CloseIcon } from "@chakra-ui/icons";
interface IRibbon {
  onClickLayout: Function;
  draggableRef?: any;
}


export const Ribbon: React.FunctionComponent<IRibbon> = props => {
  return (
    <Flex bgColor="gray.700" height="80px" padding={2}>
      <Box bg="transparent">
        <div>
          <CloseIcon w={2} h={2} color="whiteAlpha.700" />
          <Button
            margin="0 2px"
            _focus={{ boxShadow: "none" }}
            _hover={{ background: "transparent" }}
            textColor="whiteAlpha.900"
            border={0}
            size="xs"
            bg="transparent"
            fontSize={10}
            onClick={() => props.onClickLayout("riskManagement")}
          >
            Risk Management
          </Button>
        </div>
        <div>
          <CloseIcon w={2} h={2} color="whiteAlpha.700" />
          <Button
            margin="0 2px"
            _focus={{ boxShadow: "none" }}
            _hover={{ background: "transparent" }}
            textColor="whiteAlpha.900"
            border={0}
            size="xs"
            bg="transparent"
            fontSize={10}
            onClick={() => props.onClickLayout("order")}
          >
            Order
          </Button>
        </div>
      </Box>
      <Box bg="transparent">
        <div>
          <Button
            margin="0 2px"
            _focus={{ boxShadow: "none" }}
            _hover={{ background: "transparent", color: "gray" }}
            textColor="gray.700"
            border={0}
            size="xs"
            bg="facebook.200"
            fontSize={10}
            onClick={() => props.draggableRef.current?.onClickNewWidget("watchList")}
          >
            Add Widget
          </Button>
        </div>
      </Box>
    </Flex>
  )
}
