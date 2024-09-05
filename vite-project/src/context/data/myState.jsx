import React, { useEffect, useState } from 'react';
import MyContext from './myContexr';
import { toast } from 'react-toastify';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { initializeFirebase } from '../../firebase/FirebaseConfig';

function myState(props) {
  const [firedb, setFiredb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });


  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  };


  /// Add Product Section
  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('All fields are required');
    }
    const productRef = collection(firedb, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product added successfully");
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 800);
      getProductData(firedb);
      closeModal();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts("");
  };

  // Get Product
  const getProductData = async (firedb) => {
    setLoading(true);
    try {
      const q = query(
        collection(firedb, "products"),
        orderBy("time"),
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setproduct(productsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Update product
  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(firedb, "products", products.id), products);
      toast.success("Product updated successfully");
      getProductData(firedb);
      setLoading(false);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 800);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setProducts("");
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(firedb, "products", item.id));
      toast.success('Product deleted successfully');
      getProductData(firedb);
      setLoading(false);
    } catch (error) {
      toast.error('Product deletion failed');
      setLoading(false);
    }
  };

  // Get Orders
  const getOrderData = async (firedb) => {
    setLoading(true);
    try {
      const result = await getDocs(collection(firedb, "order"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
      });
      setOrder(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Get Users
  const getUserData = async (firedb) => {
    setLoading(true);
    try {
      const result = await getDocs(collection(firedb, "users"));
      const usersArray = [];
      result.forEach((doc) => {const data = doc.data();
        // Check if 'time' and 'seconds' exist, otherwise default to "N/A"
        const timestamp = data.time && data.time.seconds ? new Date(data.time.seconds * 1000).toLocaleString() : "N/A";
      
        usersArray.push({
          ...data,
          time: timestamp, // Convert Firestore timestamp to readable format
          password: data.password || "N/A", // Default to "N/A" if password is missing
        });
      });
      setUser(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const initialize = async () => {
      const { firedb } = await initializeFirebase();
      setFiredb(firedb);
      getProductData(firedb);
      getOrderData(firedb);
      getUserData(firedb);
    };
    initialize();
  }, []);
  const [mode, setMode] = useState('light');
  const [product, setproduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);
  const [searchkey, setSearchkey] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  return (
    <MyContext.Provider value={{
      mode, toggleMode, loading, setLoading, 
      products, setProducts, addProduct, product,user,
      edithandle: setProducts, updateProduct, deleteProduct, order,
      filterPrice, filterType, searchkey, setSearchkey, setFilterType, setFilterPrice,getUserData
    }}>
      {props.children}
    </MyContext.Provider>
  );
}

export default myState;
