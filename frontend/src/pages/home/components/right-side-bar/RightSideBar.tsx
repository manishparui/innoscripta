import { useEffect, useRef, Fragment } from "react";
import {
  Flex,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Card from "../../../../components/card/Card";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import { signOut } from "../../../../slice/userSlice";
import Sign from "../sign/Sign";
import http from "../../../../utilities/http";
import Search from "../search/Search";

const RightSideBar = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  const didMount = useRef(false);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn)
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

  const handleSign = () => {
    if (isSignedIn) {
      http.post("/auth/signOut").then(() => {
        dispatch(signOut())
        toast({
          title: "Signed out successfully.",
          status: "success",
          duration: 5000,
          isClosable: true
        });
      })
    } else {
      onOpen();
    }
  }

  useEffect(() => {
    if (!didMount.current && colorMode === "light") {
      didMount.current = true;
      toggleColorMode();
    }
  });

  return (
    <Fragment>
      <Flex justifyContent={"space-between"}>
        <Button
          size={"sm"}
          width={"calc(50% - 10px)"}
          backgroundColor={useColorModeValue("#e8e8e9", "#303641")}
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? "Dark" : "Light"}
        </Button>

        <Button
          size={"sm"}
          width={"calc(50% - 10px)"}
          backgroundColor={useColorModeValue("#e8e8e9", "#303641")}
          onClick={handleSign}
        >
          {isSignedIn ? "Sign out" : "Sign in"}
        </Button>
      </Flex>

      <Search />

      <Card marginTop={5}>
        <Text>Source to follow</Text>
        <Button size={"sm"} marginTop={5}>
          Add to preferences
        </Button>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Sign type={"signIn"} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default RightSideBar;
