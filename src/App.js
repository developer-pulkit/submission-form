import { useEffect, useState } from "react";
import { Container, Box, Center, Heading } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

import SubmissionForm from "./components/SubmissionForm.jsx";
import SubmissionLookup from "./components/SubmissionLookup.jsx";

function App() {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    department: "",
    email: "",
    employmentStatus: "",
    accommodationRequests: "",
  });

  const submitHandler = async () => {
    if (
      !formData.name ||
      !formData.id ||
      !formData.department ||
      !formData.email ||
      !formData.employmentStatus ||
      !formData.accommodationRequests
    ) {
      alert("Please fill all the fields");
      return;
    }

    const name = new Date().getTime() + formData.name;
    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, formData.image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            toast("Error adding request", { type: "error" });
            break;
          case "running":
            toast("Request added successfully", { type: "success" });
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      // () => {
      setFormData({
        name: "",
        id: "",
        department: "",
        email: "",
        employmentStatus: "",
        accommodationRequests: "",
        image: "",
      })
    );

    await addDoc(collection(db, "requests"), {
      name: formData.name,
      id: formData.id,
      department: formData.department,
      email: formData.email,
      employmentStatus: formData.employmentStatus,
      accommodationRequests: formData.accommodationRequests,
      createdAt: Timestamp.now().toDate(),
    });
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "requests"));
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
                formData={formData}
                setFormData={setFormData}
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
