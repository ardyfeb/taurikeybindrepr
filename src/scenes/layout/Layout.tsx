import { Box, Flex } from "@chakra-ui/react"

import { Ribbon } from "@/components/ribbon"
import { Tabs } from "@/components/tabs"
import { Surface } from "../Surface"

export const Layout: React.FunctionComponent = props => {
  return (
    <Flex height="100vh" direction="column" bgColor="green.100">
      <Ribbon />
      <Tabs />
      <Surface />
    </Flex>
  )
}
