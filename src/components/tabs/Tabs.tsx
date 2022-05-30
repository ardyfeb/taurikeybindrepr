import { Flex } from '@chakra-ui/react'

import { TabsPane } from './TabsPane'

export const Tabs: React.FunctionComponent = props => {
  return (
    <Flex 
      px="2" 
      borderTopColor="gray.600" 
      borderTopWidth={1}
      bgColor="gray.700" 
    >
      {
        [1,2,3].map(
          (val, index) => {
            return (
              <TabsPane active={index == 0} title={`Tabs ${val}`} key={index} />
            )
          }
        )
      }
    </Flex>
  )
}
