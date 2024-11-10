// src/firestoreService.ts
import { firestore } from "./firebase_service";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Firestore collection reference
const dataCollection = collection(firestore, "redpockets");

// CREATE: Add a new document
export const addData = async (data: any) => {
  try {
    const docRef = await addDoc(dataCollection, data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// READ: Fetch all documents
export const getAllData = async () => {
  try {
    const querySnapshot = await getDocs(dataCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

// UPDATE: Update an existing document
export const updateData = async (id: string, updatedData: any) => {
  try {
    const docRef = doc(dataCollection, id);
    await updateDoc(docRef, updatedData);
    console.log("Document updated with ID: ", id);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// DELETE: Delete a document
export const deleteData = async (id: string) => {
  try {
    const docRef = doc(dataCollection, id);
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", id);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
