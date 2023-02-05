# shopping app
react 간단한 쇼핑앱

## 프로젝트 소개
react와 firebase를 이용하여 만든 간단한 쇼핑앱입니다.

### 개발환경
- visual studio code
- 프론트 : react
- 백엔드 : firebase
- DataBase : CLOUDYNARY, firebase realtime database
- css : tailwind

## 주요 기능
- 페이지 이동
- 로그인
- 관리자 권한 관리
- 파이어베이스 realtime database CRUD
- 이미지 및 데이터 업로드
- 제품 구분
- 

### 페이지 이동
페이지의 이동은 react-router-dom을 사용
usenavigate or Link를 사용해 페이지 이동
상단바를 계속 유지해야 했기에 'outlet'을 사용

### 로그인
로그인은 firebase의 Authentication을 사용
그 중 Google 계정을 통한 로그인을 채택했다.

- firebase.js
``` JavaScript
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

```
로그인과 로그아웃은 firebase에서 제공하는 signInWithPopup, signOut을 사용한다.  
firebase의 onAuthStateChanged를 통해 user 정보를 받는다.  
database에 관리자 권한이 있는 uid에 user의 uid가 있는지 확인하여 관리자 구분을 한다.  



``` JavaScript
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
```
- 로그인, 로그아웃, 유저 상태변화에 따라 유저정보를 갱신하거나 지운다.
- useContext를 사용하여 user의 상태를 가장 상위에서 하나만 관리하게 해준다.
- user, uid, login, logout를 제공하게 해준다.

### 관리자 권한 관리
앞서 로그인을 통해 관리자 유무를 판별 후 세부적인 권한 판단 부분은 user정보의 isAdmin을 통하여 구현하였고 페이지 권한의 경우 ProtectedRoute로 페이지를 감싸서 판별하게 해준다.
``` JavaScript
export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();
  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
```
- 로그인을 하지 않았다면 홈 화면으로 가게 해주었다.
- 만약 requireAdmin이 있다면 관리자화면이란 뜻으로 관리자권한이 있는지 판별후 페이지를 이동한다.

### 파이어베이스 realtime database CRUD
제품, 장바구니, 주문내역에 대한 CRUD를 구현하였다.
- 제품
``` JavaScript
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
```
제품을 등록하고 받을 수 있게 하였다.

- 장바구니
``` JavaScript
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
```
장바구니는 장바구니를 등록하고 장바구니의 개별 제품을 추가하거나 삭제, 혹은 모든 제품을 삭제할 수 있게 하였다.

- 주문내역
``` JavaScript
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
```
주문내역을 등록하고 받을 수 있게 하였다.

### 이미지 및 데이터 업로드
제품은 반드시 이미지를 가지고 있어야 한다. 따라서 이미지를 따로 저장하고 주소를 database에 넣어준다.
``` JavaScript
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpLoading(true);
    imageUpload(file)
      .then((url) => {
        addProduct.mutate(
          { product, url, size },
          {
            onSuccess: () => {
              setSuccess("성공적 제품등록 완료");
              setTimeout(() => {
                setSuccess(null);
              }, 4000);
            },
          }
        );
      })
      .finally(() => setIsUpLoading(false));
  };
```
업로드 버튼을 누르면 imageUpload를 통해 사진을 CLOUDYNARY에 저장후 해당 사진 url과 제품정보, size를 업로드 함수에 넣어 보내준다. size를 따로 보내는 이유는 나중에 product에 추가할 정보가 있는데 그때 같이 하기위해서다.

## 구현 페이지
- 상단바
- 홈
- 업로드 
- 제품 
- 장바구니 
- 주문내역 

## 구현 페이지 상세 내용
- 상단바
![navbar](https://user-images.githubusercontent.com/64870973/216774256-a7000c99-fb48-4554-b393-c9562ebee583.JPG)


