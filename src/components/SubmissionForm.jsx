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

function SignUp({ formData, setFormData, submitHandler }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => handleChange(e)}
          name="name"
          value={formData.name}
        />
      </FormControl>
      <FormControl id="id" isRequired>
        <FormLabel>Id</FormLabel>
        <Input
          placeholder="Enter Your Id"
          onChange={(e) => handleChange(e)}
          name="id"
          value={FormData.id}
        />
      </FormControl>
      <FormControl id="department" isRequired>
        <FormLabel>Department</FormLabel>
        <Input
          placeholder="Enter Your department"
          onChange={(e) => handleChange(e)}
          name="department"
          value={formData.department}
        />
      </FormControl>
      <FormControl id="status" isRequired>
        <FormLabel>Employment Status</FormLabel>
        <Input
          placeholder="Enter Your Employment Status"
          onChange={(e) => handleChange(e)}
          name="employmentStatus"
          value={formData.employmentStatus}
        />
      </FormControl>
      <FormControl id="accommodation" isRequired>
        <FormLabel>Accommodation Requests</FormLabel>
        <Input
          placeholder="Enter Your Accommodation Requests"
          onChange={(e) => handleChange(e)}
          name="accommodationRequests"
          value={formData.accommodationRequests}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => handleChange(e)}
          name="email"
          value={formData.email}
        />
      </FormControl>

      <FormControl id="documents">
        <FormLabel>Upload your Documents</FormLabel>
        <Input
          type="file"
          name="image"
          accept="image/*"
          p={1.5}
          onChange={(e) => handleFileChange(e)}
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
