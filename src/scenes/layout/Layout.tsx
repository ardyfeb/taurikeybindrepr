import { Flex } from "@chakra-ui/react";
import React from "react";

interface ILayoutProp {
  children: React.ReactElement[] | React.ReactElement;
}

export const Layout: React.FunctionComponent<ILayoutProp> = ({ children }) => {
  return (
    <Flex height="100vh" direction="column" bgColor="green.100">
      {children}
    </Flex>
  );
};
