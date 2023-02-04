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

## 페이지 이동
페이지의 이동은 react-router-dom을 사용
usenavigate or Link를 사용해 페이지 이동
상단바를 계속 유지해야 했기에 'outlet'을 사용

## 로그인
로그인은 firebase의 Authentication을 사용
그 중 Google 계정을 통한 로그인을 채택했다.
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
- 로그인과 로그아웃은 firebase에서 제공하는 signInWithPopup, signOut을 사용한다. 
- firebase의 onAuthStateChanged를 통해 user 정보를 받는다.
- database에 관리자 권한이 있는 uid에 user의 uid가 있는지 확인하여 관리자 구분을 한다.

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

## 관리자 권한 관리
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


