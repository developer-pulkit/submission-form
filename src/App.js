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
    image: "",
  });

  const submitHandler = () => {
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

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          name: "",
          id: "",
          department: "",
          email: "",
          employmentStatus: "",
          accommodationRequests: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const requestRef = collection(db, "requests");
          addDoc(requestRef, {
            name: formData.name,
            id: formData.id,
            department: formData.department,
            email: formData.email,
            employmentStatus: formData.employmentStatus,
            accommodationRequests: formData.accommodationRequests,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
          })
            .then(() => {
              toast("Request added successfully", { type: "success" });
            })
            .catch((err) => {
              toast("Error adding request", { type: "error" });
            });
        });
      }
    );
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
      console.log(requests);
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
