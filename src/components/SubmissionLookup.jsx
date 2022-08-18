import React, { useEffect, useState } from "react";
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
  const [data, setData] = useState(requests);
  const [value, setValue] = useState("");
  console.log(data);

  const handleFilter = () => {
    if (!value) {
      const filterResult = requests.filter(
        (request) =>
          request.name.toLowerCase().includes(value.toLowerCase()) ||
          request.id.toLowerCase().includes(value.toLowerCase()) ||
          request.email.toLowerCase().includes(value.toLowerCase()) ||
          request.department.toLowerCase().includes(value.toLowerCase()) ||
          request.employmentStatus.toLowerCase().includes(value.toLowerCase())
      );
      setData(filterResult);
    }
  };

  return (
    <>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Filter by the Submission Form fields"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onInput={handleFilter}
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
                <Tr key={request.id}>
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
