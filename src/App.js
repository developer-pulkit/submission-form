import react, { useEffect, useState } from "react";
import { Container, Box, Text, Center, Heading } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "./firebase";
import { async } from "@firebase/util";
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
    image: "",
    accommodationRequests: "",
    createdAt: Timestamp.now().toDate(),
  });

  const submitHandler = () => {
    if (
      !formData.name ||
      !formData.id ||
      !formData.department ||
      !formData.employmentStatus ||
      !formData.employmentStatus ||
      !formData.accommodationRequests ||
      !formData.email
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
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            name: formData.name,
            id: formData.id,
            department: formData.department,
            email: formData.email,
            employmentStatus: formData.employmentStatus,
            accommodationRequests: formData.accommodationRequests,
            document: "",
            createdAt: Timestamp.now().toDate(),
          })
            .then(() => {
              toast("Article added successfully", { type: "success" });
            })
            .catch((err) => {
              toast("Error adding article", { type: "error" });
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
              <SubmissionForm formData={formData} setFormData={setFormData} />
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
