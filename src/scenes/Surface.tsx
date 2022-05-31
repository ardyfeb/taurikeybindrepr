import { tabs } from "@/states/tabs"
import { select } from "@/utils/select"
import { Flex, SimpleGrid, Text } from "@chakra-ui/react"
import { m } from "framer-motion"
import React, { useMemo } from "react"
import { useSnapshot } from "valtio"

export const Surface: React.FunctionComponent = props => {
  const tabsSnap = useSnapshot(tabs)

  const tabContentRenderer = useMemo(
    (): React.ReactNode => {
      const renderer = select(
        tabsSnap.active,
        {
          'preset:trading': (
            <>
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
                      <Text>Trading Grid</Text>
                    </Flex>
                  )
                )
              }
            </>
          ),
          'preset:position': (
            <>
              {
                Array(6).fill('box').map(
                  (val, index) => (
                    <Flex 
                      key={index}
                      borderWidth={1}
                      borderStyle="dashed"
                      borderColor="gray.300"
                      alignItems="center" 
                      justifyContent="center" 
                      bgColor='gray.400'
                      draggable={true}
                      onDrag={console.log}
                    >
                      <Text>Position Grid</Text>
                    </Flex>
                  )
                )
              }
            </>
          )
        }
      )

      return renderer
    },
    [tabsSnap]
  )

  return (
    <SimpleGrid columns={3} height="100%">
      {tabContentRenderer}
    </SimpleGrid>
  )
}
