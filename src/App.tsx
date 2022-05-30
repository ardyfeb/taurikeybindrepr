import { ChakraProvider } from '@chakra-ui/react'

import { Layout } from '@/scenes/layout/Layout'


const App: React.FunctionComponent = props => {
  return (
    <ChakraProvider>
      <Layout />
    </ChakraProvider>
  )
}

export default App
