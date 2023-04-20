import { Box, useColorModeValue} from '@chakra-ui/react'

export default function Card(props: any) {
  return (
    <Box
      padding={5}
      textAlign={"center"}
      shadow={"md"}
      width={"100%"}
      height={"100%"}
      borderWidth={"0.1px"}
      borderStyle={"solid"}
      borderRadius={"md"}
      borderColor={useColorModeValue("#d1d2d4", "#474c56")}
      backgroundColor={useColorModeValue("#e8e8e9", "#303641")}
      {...props}
    >
      {props.children}
    </Box>
  );
}
