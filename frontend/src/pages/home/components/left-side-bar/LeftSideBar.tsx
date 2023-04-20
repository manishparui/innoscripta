import { Fragment } from "react";
import { Flex,Text } from "@chakra-ui/react";
import NavItem from "../nav-item/NavItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

const LeftSideBar = (): JSX.Element => {
  const isSignedIn = useSelector((state: RootState) => state.user?.isSignedIn)
  const navItems: string[] = [
    "home",
    "explore",
    "search",
    "colorMode",
    "profile",
    "sign in",
  ];

  return (
    <Flex
      wrap={"wrap"}
      justifyContent={"space-between"}
      paddingX={{ base: 5, md: 0 }}
      paddingY={{ base: 5, md: 0 }}
      backgroundColor={{ base: "#1a202c", md: "transparent" }}
    >
      <Text
        width={"100%"}
        fontSize={"2rem"}
        display={{ base: "none", md: "block" }}
      >
        LOGO
      </Text>
      {navItems.map((navItem: string) => {
        switch (navItem) {
          case "profile":
            if (isSignedIn) {
              return <NavItem key={navItem} navItem={navItem} />;
            } else {
              return null;
            }

          case "sign in":
            if (!isSignedIn) {
              return <NavItem key={navItem} navItem={navItem} />;
            } else {
              return null;
            }

          default:
            return <NavItem key={navItem} navItem={navItem} />;
        }
      })}
    </Flex>
  );
};

export default LeftSideBar;
