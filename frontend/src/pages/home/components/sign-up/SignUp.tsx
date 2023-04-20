import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Box,
  Text,
  CheckboxGroup,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import http from "../../../../utilities/http";
import { useSelector, useDispatch } from "react-redux";
import { signUp, update } from "../../../../slice/userSlice";
import { RootState } from "../../../../store/store";
import { signOut } from "../../../../slice/userSlice";
import { changeType } from "../../../../slice/feedSlice";

const SignUp = ({type}: {type: string}) => {
  const toast = useToast();
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch();
  const [sources, setSources] = useState<string[]>([])

  const formik = useFormik({
    initialValues: {
      email: user.email,
      password: "",
      name: user.name,
      sources: user.preferences?.sources
    },
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
        name: values.name,
        preferences: {
          sources: values.sources
        }
      }

      if (type === "signUp") {
        http.post("/auth/signUp", data).then((response) => {
          console.log(response)
          dispatch(signUp(response.data.data))
          toast({
            title: "Signed up successfully.",
            status: "success",
          });
        })
      } else if (type === "profile") {
        http
          .patch(`/users/${user.uuid}`, {
            name: data.name,
            preferences: data.preferences,
          })
          .then((response) => {
            dispatch(update(response.data.data));
            toast({
              title: "Updated successfully.",
              status: "success",
            });
          });
      }
    },
  })

  const handleSignOut = () => {
    http.post("/auth/signOut").then(() => {
      dispatch(signOut());
      dispatch(changeType("generic"))
      toast({
        title: "Signed out successfully.",
        status: "success",
      });
    });
  }

  useEffect(() => {
    http.get("/preferences").then((response) => {
      console.log(response)

      const data: { sources: string[] } = {
        sources: [],
      };

      response.data.data.sources.forEach((source: string) => {
        if (!data.sources.includes(source)) {
          data.sources.push(source)
        }
      })
      
      setSources(data.sources)
    })
  }, [])  

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>
        {type === "signUp" ? "Sign up" : "Profile"}
      </Text>
      <form onSubmit={formik.handleSubmit}>
        {type === "signUp" && (
          <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </FormControl>
        )}

        {type === "signUp" && (
          <FormControl marginTop={5}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </FormControl>
        )}

        <FormControl marginTop={5}>
          <FormLabel htmlFor="password">Name</FormLabel>
          <Input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </FormControl>

        <FormControl marginTop={5}>
          <FormLabel>Sources</FormLabel>
          <CheckboxGroup
            defaultValue={user.preferences?.sources}
            value={formik.values.sources}
            onChange={(value) => formik.setFieldValue("sources", value)}
          >
            <Flex width={"100%"} justifyContent={"space-between"} wrap={"wrap"}>
              {sources.map((source) => (
                <Checkbox key={source} id={source} value={source}>
                  {source}
                </Checkbox>
              ))}
            </Flex>
          </CheckboxGroup>
        </FormControl>

        <Flex marginTop={5} justifyContent={"space-between"}>
          {type !== "signUp" && (
            <Button size={"sm"} onClick={handleSignOut}>
              Sign out
            </Button>
          )}
          
          <Button size={"sm"} type="submit">
            {type === "signUp" ? "Sign up" : "Update"}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default SignUp;
