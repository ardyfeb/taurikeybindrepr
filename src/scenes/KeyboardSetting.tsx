import React from "react";
import { Flex, Table, Thead, Tr, Td, Th, Tbody } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const KeyboardSetting = () => {
  return (
    <Flex height="100vh" direction="column" bgColor="white">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Action</Th>
            <Th>Shortcut</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Show Alert</Td>
            <Td>Cmd+Q</Td>
            <Td>
              <EditIcon />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Flex>
  );
};

export default KeyboardSetting;
