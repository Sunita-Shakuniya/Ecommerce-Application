import { collection, getDocs } from "firebase/firestore";
import { initializeFirebase } from "../../../firebase/FirebaseConfig";

export const getUserCount = async () => {
  const { firedb } = await initializeFirebase();
  if (firedb) {
    const usersCollection = collection(firedb, "users");
    const usersSnapshot = await getDocs(usersCollection);
    return usersSnapshot.size; // Returns the count of documents
  } else {
    console.error("Failed to initialize Firestore");
    return 0; // Return a default value or handle the error as needed
  }
};

export const getProductCount = async () => {
  const { firedb } = await initializeFirebase();
  if (firedb) {
    const productsCollection = collection(firedb, "products");
    const productsSnapshot = await getDocs(productsCollection);
    return productsSnapshot.size;
  } else {
    console.error("Failed to initialize Firestore");
    return 0;
  }
};

export const getOrderCount = async () => {
  const { firedb } = await initializeFirebase();
  if (firedb) {
    const ordersCollection = collection(firedb, "order");
    const ordersSnapshot = await getDocs(ordersCollection);
    return ordersSnapshot.size;
  } else {
    console.error("Failed to initialize Firestore");
    return 0;
  }
};
