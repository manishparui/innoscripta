import { useEffect, useRef } from "react";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import Articles from "./components/articles/Articles";
import LeftSideBar from "./components/left-side-bar/LeftSideBar";
import RightSideBar from "./components/right-side-bar/RightSideBar";

const HomePage = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current && colorMode === "light") {
      didMount.current = true;
      toggleColorMode();
    }
  });

  return (
    <Flex width={"100%"}>
      <Box
        display={{ base: "none", md: "block" }}
        position={"fixed"}
        left={0}
        width={"20%"}
        paddingLeft={5}
        paddingRight={2.5}
        paddingY={5}
      >
        <LeftSideBar />
      </Box>
      <Box
        marginLeft={{ base: "0", md: "20%" }}
        width={{ base: "100%", md: "80%" }}
        paddingLeft={2.5}
        paddingRight={2.5}
        paddingTop={2.5}
        paddingBottom={{base: "16%", md: 2.5}}
      >
        <Articles />
      </Box>

      <Box
        display={{ base: "block", md: "none" }}
        position={"fixed"}
        bottom={0}
        width={"100vw"}
      >
        <LeftSideBar />
      </Box>
    </Flex>
  );
}

export default HomePage;