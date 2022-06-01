import { ChakraProvider } from '@chakra-ui/react'

import { Surface } from '@/scenes/surface/Surface'


const App: React.FunctionComponent = props => {
  return (
    <ChakraProvider>
      <Surface />
    </ChakraProvider>
  )
}

export default App
