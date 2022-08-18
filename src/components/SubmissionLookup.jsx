import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  InputGroup,
} from "@chakra-ui/react";

function SubmissionLookup({ requests }) {
  const searchData = requests;
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setData(searchData);
    } else {
      const filterResult = searchData.filter(
        (request) =>
          request.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          request.id.toLowerCase().includes(e.target.value.toLowerCase()) ||
          request.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
          request.department
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          request.employmentStatus
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      );
      setData(filterResult);
    }
    setValue(e.target.value);
  };
  return (
    <>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Filter by the Submission Form fields"
          value={value}
          onInput={(e) => handleFilter(e)}
        />
      </InputGroup>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Id</Th>
              <Th>Department</Th>
              <Th>Employment Status</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((request) => {
              return (
                <Tr>
                  <Td>{request.name}</Td>
                  <Td>{request.id}</Td>
                  <Td>{request.department}</Td>
                  <Td>{request.employmentStatus}</Td>
                  <Td>{request.email}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SubmissionLookup;
