import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  InputRightElement,
} from "@chakra-ui/react";

function SignUp({
  setName,
  setId,
  setDepartment,
  setEmploymentStatus,
  setAccommodationRequests,
  setEmail,
  submitHandler,
}) {
  const [show, setShow] = useState(false);
  const postDetails = () => {};

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="id" isRequired>
        <FormLabel>Id</FormLabel>
        <Input
          placeholder="Enter Your Id"
          onChange={(e) => setId(e.target.value)}
        />
      </FormControl>
      <FormControl id="department" isRequired>
        <FormLabel>Department</FormLabel>
        <Input
          placeholder="Enter Your department"
          onChange={(e) => setDepartment(e.target.value)}
        />
      </FormControl>
      <FormControl id="status" isRequired>
        <FormLabel>Employment Status</FormLabel>
        <Input
          placeholder="Enter Your Employment Status"
          onChange={(e) => setEmploymentStatus(e.target.value)}
        />
      </FormControl>
      <FormControl id="accommodation" isRequired>
        <FormLabel>Accommodation Requests</FormLabel>
        <Input
          placeholder="Enter Your Accommodation Requests"
          onChange={(e) => setAccommodationRequests(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="documents">
        <FormLabel>Upload your Documents</FormLabel>
        <Input
          type="file"
          p={1.5}
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Submit Form
      </Button>
    </VStack>
  );
}

export default SignUp;
