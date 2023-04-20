import React, {useState, Fragment} from 'react'
import SignIn from '../sign-in/SignIn'
import SignUp from '../sign-up/SignUp'
import { Box, Flex, Text, Button } from '@chakra-ui/react'

const Sign = ({type}: {type: string}) => {

  const [active, setActive] = useState<string>(type)

  return (
    <Box padding={5}>
      {active === "signIn" && (
        <Fragment>
          <SignIn />
          <Flex width={"100%"} marginTop={5}>
            <Text>Don't have an account?</Text>
            <Text
              marginLeft={3}
              fontWeight={"bold"}
              _hover={{ cursor: "pointer" }}
              onClick={() => setActive("signUp")}
            >
              Sign up
            </Text>
          </Flex>
        </Fragment>
      )}
      {(active === "signUp" || active === "profile") && (
        <Fragment>
          <SignUp type={active} />
          {active === "signUp" && (
            <Flex width={"100%"} marginTop={5}>
              <Text>Already have an account?</Text>
              <Text
                marginLeft={3}
                fontWeight={"bold"}
                _hover={{ cursor: "pointer" }}
                onClick={() => setActive("signIn")}
              >
                Sign In
              </Text>
            </Flex>
          )}
        </Fragment>
      )}
    </Box>
  );
}

export default Sign
