import { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { changeType } from "../../../../slice/feedSlice";
import { RootState } from "../../../../store/store";
import Sign from "../sign/Sign";
import Search from "../search/Search";

import {FaSun, FaMoon} from "react-icons/fa"

export const NavItem = ({ navItem }: { navItem: string }): JSX.Element => {
  const feedType = useSelector((state: RootState) => state.feed.type);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState("signIn");
  const didMount = useRef(false);
  const { colorMode, toggleColorMode } = useColorMode();

  // handle on click functionility of nav items
  const navClickHandler = (nav: string) => {
    switch (nav) {
      case "home":
        dispatch(changeType("specific"));
        break;

      case "explore":
        dispatch(changeType("generic"));
        break;

      case "search":
        setType("search")
        onOpen();
        break;

      case "colorMode":
        toggleColorMode();
        break;

      case "profile":
        setType("profile")
        onOpen();
        break;

      case "sign in":
        setType("signIn")
        onOpen();
        break;

      default:
        break;
    }
  };
  // end handle on click functionility of nav items

  useEffect(() => {
    // console.log(feedType)
  }, [feedType]);

  useEffect(() => {
    if (!didMount.current && colorMode === "light") {
      didMount.current = true;
      toggleColorMode();
    }
  });

  return (
    <>
      <Button
        display={{ base: "none", md: "block" }}
        size={"sm"}
        width={"100%"}
        marginTop={5}
        backgroundColor={useColorModeValue("#e8e8e9", "#303641")}
        textTransform={"capitalize"}
        onClick={() => navClickHandler(navItem)}
      >
        {navItem !== "colorMode"
          ? navItem
          : colorMode === "light"
          ? "Dark"
          : "Light"}
      </Button>

      {/* for smaller devices */}
      <Button
        display={{ base: "block", md: "none" }}
        size={"sm"}
        backgroundColor={useColorModeValue("#e8e8e9", "#303641")}
        textTransform={"capitalize"}
        onClick={() => navClickHandler(navItem)}
      >
        {navItem !== "colorMode"
          ? navItem
          : colorMode === "light"
          ? <FaMoon/>
          : <FaSun />}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {type === "search" && (
              <Box padding={5}>
                <Search />
              </Box>
            )}
            {type !== "search" && <Sign type={type} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NavItem;
