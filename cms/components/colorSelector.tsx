import React, { useCallback } from "react";
import type { StringInputProps } from "sanity";
import { set, unset } from "sanity";
import { Flex, Text, Avatar, Card } from "@sanity/ui";

type ColorList = {
  title: string;
  value: string;
};

type SchemaTypeOption = { list: ColorList[] } | undefined;

const ColorSelector = ({ schemaType, onChange, value: inputValue = "" }: StringInputProps) => {
  const schemeTypeOptions = schemaType.options as SchemaTypeOption;

  const handleSelect = useCallback(
    (hex: string) => {
      if (hex === "") return;
      if (inputValue === hex) {
        onChange(unset());
      } else {
        onChange(set(hex));
      }
    },
    [onChange, inputValue]
  );

  return (
    <Card paddingTop={3}>
      <Flex direction={"row"} wrap={"wrap"} style={{ columnGap: "20px" }}>
        {schemeTypeOptions?.list.map(({ title, value }) => {
          return (
            <ColorCircle
              key={value}
              colorName={title}
              hex={value}
              onClickHandler={handleSelect}
              inputValue={inputValue}
            />
          );
        })}
      </Flex>
      {inputValue && (
        <Text size={2} style={{ marginTop: "2em" }}>
          HEX: {inputValue}
        </Text>
      )}
    </Card>
  );
};

export default ColorSelector;

type ColorCircleProps = {
  colorName: string;
  hex: string;
  onClickHandler: (hex: string) => void;
  inputValue: string;
};

const ColorCircle = ({ colorName, hex, onClickHandler, inputValue }: ColorCircleProps) => {
  const selected = inputValue === hex;

  return (
    <Flex direction="column" align="center">
      <Avatar
        size={2}
        style={{
          backgroundColor: hex,
          cursor: "pointer",
          border: selected ? "4px solid green" : "1px solid black",
        }}
        onClick={() => onClickHandler(hex)}
      />
      <Text
        size={1}
        align={"center"}
        style={{ marginTop: "1em", fontWeight: selected ? "bold" : "normal" }}
      >
        {colorName}
      </Text>
    </Flex>
  );
};
