import { useState } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react'
import { CloseIcon } from "@chakra-ui/icons";

import { TabsPane } from "../tabs/TabsPane";

interface IRibbon {
  onClickLayout: Function;
  draggableRef?: any;
}

const layoutType = [
  {
    title: "Home",
    type: "home"
  },
  {
    title: "Order",
    type: "order"
  },
  {
    title: "Risk Management",
    type: "riskManagement"
  }];


const SavedLayoutMenu = ({ onClickLayout }: any) => {
  const [selectedLayout, setSelectedLayout] = useState("home");

  const onClickLayoutMenu = (type: string) => {
    console.log("TEST")
    setSelectedLayout(type);
    onClickLayout(type);
  }

  return (
    <Flex
      px="2"
      borderTopColor="gray.600"
      borderTopWidth={1}
      bgColor="gray.700"
    >
      {
        layoutType.map((layout) => (
          <TabsPane
            active={selectedLayout === layout.type}
            title={layout.title}
            key={layout.type}
            onClick={() => onClickLayoutMenu(layout.type)}
            tabContainerStyle={{ width: "auto", cursor: "pointer" }}
            tabItemStyle={{ padding: "8px 20px", borderRadius: "2px 2px 0px 0px" }}
          />
        ))
      }
    </Flex>
  );
}


export const Ribbon: React.FunctionComponent<IRibbon> = props => {
  return (
    <>
      <SavedLayoutMenu onClickLayout={props.onClickLayout} />
      <Flex bgColor="gray.700" height="80px" padding={2}>
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
    </>
  )
}
