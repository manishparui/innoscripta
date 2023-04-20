import { 
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Box,
  Text,
  Link,
  CheckboxGroup,
  Checkbox,
  useToast
} from "@chakra-ui/react";
import { useFormik } from "formik";
import http from "../../../../utilities/http";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../../../slice/userSlice";
import { changeType } from "../../../../slice/feedSlice";

const SignIn = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  // const handleSubmit = (event: any) => {
  //   event.preventDefault();
  //   // perform login logic here
  //   toast({
  //     title: "Logged in!",
  //     status: "success",
  //     duration: 9000,
  //     isClosable: true
  //   });
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values)
      http.post("/auth/signIn", {
        email: values.email,
        password: values.password,
      }).then((response) => {
        console.log(response)
        dispatch(signIn(response.data.data))
        dispatch(changeType("specific"))
        toast({
          title: "Signed in successfully.",
          status: "success",
        });
      })
    },
  })

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>
        Sign in
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </FormControl>

        <FormControl marginTop={5}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </FormControl>

        <Box marginTop={5} textAlign={"right"}>
          <Button size={"sm"} type="submit">
            Sign in
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SignIn;
