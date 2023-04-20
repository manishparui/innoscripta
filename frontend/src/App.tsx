import { useEffect } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "./slice/userSlice";
import { changeType } from "./slice/feedSlice";

const App = (): JSX.Element => {
  const toast = useToast();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const stringifiedUser = localStorage.getItem("user");
    if (stringifiedUser && stringifiedUser !== "undefined") {
      const user = JSON.parse(stringifiedUser);
      dispatch(signIn(user));
      dispatch(changeType("specific"))
      toast({
        title: `Welcome back ${user.name}`,
        status: "success",
      });
    }
  }, []);
  

  return (
    <ChakraProvider toastOptions={{ defaultOptions: { position: "bottom", duration: 5000, isClosable: true } }}>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ChakraProvider>
  );
}

export default App