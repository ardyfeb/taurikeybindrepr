import { useRef, useState } from "react"

import { DraggableContainer } from "@/components/draggable-container"
import { Ribbon } from "@/components/ribbon"
import { Tabs } from "@/components/tabs"
import { Layout } from "../layout/Layout"

import "rc-dock/dist/rc-dock.css"
import { DraggableContext } from "@/context/draggableContext"


export const Surface: React.FunctionComponent = props => {
  //#region REF
  const draggableRef = useRef<{ onClickNewWidget: any }>();
  //#endregion

  //#region STATE
  const [selectedLayout, setLayoutType] = useState("");
  //#endregion

  //#region HANDLER
  const onClickLayout = (layoutType: string) => {
    setLayoutType(layoutType)
  };
  //#endregion

  return (
    // Array(6).fill('box').map(
    //   (val, index) => (
    //     <Flex 
    //       key={index}
    //       borderWidth={1}
    //       borderStyle="dashed"
    //       borderColor="gray.400"
    //       alignItems="center" 
    //       justifyContent="center" 
    //       bgColor='gray.500'
    //     >
    //       <Text>Box</Text>
    //     </Flex>
    //   )
    // )
    <Layout>
      <Ribbon
        onClickLayout={onClickLayout}
        draggableRef={draggableRef}
      />
      <Tabs />
      <div style={{ position: 'relative', width: "100%", height: "100%" }}>
        <DraggableContainer
          savedLayoutType={selectedLayout}
          draggableRef={draggableRef}
        />
      </div>
    </Layout>
  )
}
