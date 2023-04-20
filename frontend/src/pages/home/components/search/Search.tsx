import {
  Button,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { changeType } from '../../../../slice/feedSlice';

const Search = (): JSX.Element => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      keyword: ""
    },
    onSubmit: (values) => {
      dispatch(changeType(values.keyword))
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputGroup marginTop={5}>
        <Input
          type={"text"}
          id={"keyword"}
          placeholder="Search"
          value={formik.values.keyword}
          onChange={formik.handleChange}
        />
        <InputRightElement
          children={
            <Button size={"sm"} type="submit">
              Go
            </Button>
          }
        />
      </InputGroup>
    </form>
  );
}

export default Search;