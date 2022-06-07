import { useCallback, useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { window } from '@tauri-apps/api'

import { RibbonTabs } from "./RibbonTabs";
import { useLayoutManager } from "@/hooks/useLayoutManager";

interface IRibbon {
  onClickLayout: Function;
  draggableRef?: any;
}

const layoutType = [
  {
    title: "Home",
    type: "home",
  },
  {
    title: "Order",
    type: "order",
  },
  {
    title: "Risk Management",
    type: "riskManagement",
  },
];

const SavedLayoutMenu = ({ onClickLayout }: any) => {
  const [selectedLayout, setSelectedLayout] = useState("home");

  const onClickLayoutMenu = (type: string) => {
    console.log("TEST");
    setSelectedLayout(type);
    onClickLayout(type);
  };

  return (
    <Flex
      px="2"
      borderBottomColor="gray.600"
      borderBottomWidth={1}
      bgColor="gray.700"
    >
      {layoutType.map((layout) => (
        <RibbonTabs
          active={selectedLayout === layout.type}
          title={layout.title}
          key={layout.type}
          onClick={() => onClickLayoutMenu(layout.type)}
        />
      ))}
    </Flex>
  );
};

export const Ribbon: React.FunctionComponent<IRibbon> = (props) => {
  const layoutManager = useLayoutManager();

  const addNewWidget = useCallback((): void => {
    layoutManager.dock.addWidget();
  }, [layoutManager]);

  const openKeyboardShortcut = () =>
    layoutManager.tabs.add();

  return (
    <>
      <SavedLayoutMenu onClickLayout={props.onClickLayout} />
      <Flex bgColor="gray.800" height="80px" padding={2}>
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
              // onClick={() => props.draggableRef.current?.onClickNewWidget("watchList")}
              onClick={addNewWidget}
            >
              Add Widget
            </Button>
            <Button
              margin="0 2px"
              _focus={{ boxShadow: "none" }}
              _hover={{ background: "transparent", color: "gray" }}
              textColor="gray.700"
              border={0}
              size="xs"
              bg="facebook.200"
              fontSize={10}
              onClick={openKeyboardShortcut}
            >
              Keyboard Shortcuts
            </Button>
          </div>
        </Box>
      </Flex>
    </>
  );
};
