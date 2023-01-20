import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { get, getDatabase, ref, remove, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHKEY,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app);

provider.setCustomParameters({
  prompt: "select_account",
});

export const login = () => {
  signInWithPopup(auth, provider).catch(console.error);
};

export const logout = () => {
  signOut(auth).catch(console.error);
};

export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user ? await adminUser(user) : null;
    callback(updateUser);
  });
};

const adminUser = async (user) => {
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
};

export const addProduct = async (product, img, size) => {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    img,
    size,
  });
};

export const getProducts = async () => {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
};

export const getCart = async (userid) => {
  return get(ref(database, `carts/${userid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return {};
  });
};

export const addOrUpdateCart = async (userid, product) => {
  return set(ref(database, `carts/${userid}/${product.id}`), product);
};

export const deleteCart = async (userid, productId) => {
  return remove(ref(database, `carts/${userid}/${productId}`));
};

export const deleteAllCart = async (userid) => {
  return remove(ref(database, `carts/${userid}`));
};

export const addOrder = async (userid, order) => {
  return set(ref(database, `orders/${userid}/${order.id}`), order);
};

export const getOrder = async (userid) => {
  return get(ref(database, `orders/${userid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return {};
  });
};
