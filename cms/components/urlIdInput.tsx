import React, { forwardRef } from "react";
import { Flex, Text, Box, Card } from "@sanity/ui";
import { StringInputProps } from "sanity";

const UrlIdInput = forwardRef((props: StringInputProps, ref) => {
  return (
    <Flex>
      <Flex
        // @ts-ignore
        border
        borderRight={false}
        as={Card as any}
        paddingX={3}
        align="center"
      >
        <Text size={1} muted>
          {/* @ts-ignore */}
          {props.schemaType?.option?.prefix}
        </Text>
      </Flex>
      <Box flex={1}>{props.renderDefault(props)}</Box>
    </Flex>
  );
});

export default UrlIdInput;
