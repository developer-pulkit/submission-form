import react, { useEffect, useState } from "react";
import { Container, Box, Text, Center, Heading } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { addDoc, collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase";
import { async } from "@firebase/util";
import SubmissionForm from "./components/SubmissionForm.jsx";
import SubmissionLookup from "./components/SubmissionLookup.jsx";

function App() {
  const [requests, setRequests] = useState([]);
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [department, setDepartment] = useState();
  const [email, setEmail] = useState();
  const [employmentStatus, setEmploymentStatus] = useState();
  const [accommodationRequests, setAccommodationRequests] = useState();

  // Create todo
  const submitHandler = async (e) => {
    e.preventDefault();
    // if (
    //   name &&
    //   id &&
    //   department &&
    //   // email &&
    //   // employmentStatus &&
    //   // accommodationRequests
    // ) {
    //   alert("Please enter a valid input");
    //   return;
    // }
    await addDoc(collection(db, "requests"), {
      name: name,
      id: id,
      department: department,
      email: email,
      employmentStatus: employmentStatus,
      accommodationRequests: accommodationRequests,
    });
    setName("");
    setId("");
    setAccommodationRequests("");
    setEmail("");
    setDepartment("");
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "requets"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let requestArr = [];
      querySnapshot.forEach((doc) => {
        requestArr.push({ ...doc.data(), id: doc.id });
      });
      setRequests(requestArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Container maxW="5xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={2}
        bg={"white"}
        w="100%"
        m="50px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Center
          bg="rgb(106, 90, 205)"
          fontSize="4xl"
          fontFamily="Work sans"
          color="white"
        >
          <Heading mb={4}>Submission App</Heading>
        </Center>
      </Box>

      <Box
        bg="white"
        w="100%"
        p="5"
        color="black"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Submission Form</Tab>
            <Tab width="50%">Submission Lookup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SubmissionForm
                setName={setName}
                setId={setId}
                setDepartment={setDepartment}
                setAccommodationRequests={setAccommodationRequests}
                setEmail={setEmail}
                setEmploymentStatus={setEmploymentStatus}
                submitHandler={submitHandler}
              />
            </TabPanel>
            <TabPanel>
              <SubmissionLookup requests={requests} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default App;
