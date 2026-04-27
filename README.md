# 🔐 React Auth Demo

> A React demo application featuring JWT-based login, role-based routing, and protected routes — built with Axios, React Router, and Tailwind CSS.

---

## 🇬🇧 English

### Overview

**React Auth Demo** is a client-side authentication and authorization demo built with React. It connects to the [DummyJSON](https://dummyjson.com/) public API to simulate a real login flow — users receive a JWT access token on login, which is then used to authenticate subsequent API requests and determine role-based access.

The project demonstrates two distinct user experiences: a regular **user** home page and a protected **admin** dashboard, with routing logic that prevents unauthorized access to either view.

---

### ✨ Features

- **JWT Authentication** — Login via POST request, token stored in `localStorage` and held in React state
- **Role-based routing** — Admin users are redirected to `/admin`, regular users land on `/`
- **Protected routes** — Unauthenticated users are redirected to `/login` via a reusable `ProtectedRoute` component
- **Already logged in redirect** — Visiting `/login` with an active token redirects back to home
- **Loading states** — Animated bouncing dots while API requests are in-flight
- **Error handling** — Graceful error UI for failed requests
- **Logout** — Clears token from both `localStorage` and React state, redirects to login

---

### 🧰 Tech Stack

| Technology                                  | Purpose                                |
| ------------------------------------------- | -------------------------------------- |
| [React](https://react.dev/)                 | UI component framework                 |
| [React Router v6](https://reactrouter.com/) | Client-side routing & navigation       |
| [Axios](https://axios-http.com/)            | HTTP client for API requests           |
| [Tailwind CSS](https://tailwindcss.com/)    | Utility-first CSS styling              |
| [DummyJSON](https://dummyjson.com/)         | Public fake REST API with auth support |

---

### 📁 Project Structure

```
src/
├── App.jsx                      # Root component — token state, route definitions
└── components/
    ├── Login.jsx                # Login form — handles auth POST, stores token
    ├── Dashboard.jsx            # Admin-only view — fetches user, redirects if not admin
    ├── UserHome.jsx             # Regular user view — fetches user, redirects if admin
    └── ProtectedRoute.jsx       # HOC — redirects to /login if no token present
```

---

### 🔍 How It Works

#### 1. Token State in App.jsx

```jsx
const [token, setToken] = useState(localStorage.getItem("token"));
```

On mount, the app checks `localStorage` for an existing token. This means users stay logged in across page refreshes. The `token` state and its setter (`setToken`) are passed down as props to child components that need to read or clear it.

#### 2. Login Flow

```jsx
axios.post("https://dummyjson.com/auth/login", form).then((res) => {
  localStorage.setItem("token", res.data.accessToken);
  setToken(res.data.accessToken);
  navigate("/");
});
```

On successful login, the JWT access token is saved to both `localStorage` (for persistence) and React state (for reactive UI updates). The user is then navigated to `/`, where role-based redirection takes over.

#### 3. Role-Based Redirection

Both `UserHome` and `Dashboard` fetch `/auth/me` on mount using the stored token. After the response, a role is derived from the username:

```js
const role = res.data.username === "emilys" ? "admin" : "user";
```

- If a **regular user** lands on `/admin` → they get redirected back to `/`
- If an **admin** lands on `/` → they get redirected to `/admin`

This ensures each user type always ends up on the correct page, regardless of which route they initially hit.

#### 4. Protected Routes

```jsx
// ProtectedRoute.jsx
export function ProtectedRoute({ token, children }) {
  return token ? children : <Navigate to="/login" />;
}

// App.jsx usage
<Route
  path="/"
  element={
    <ProtectedRoute token={token}>
      <UserHome setToken={setToken} />
    </ProtectedRoute>
  }
/>;
```

`ProtectedRoute` is a simple wrapper component. If a token exists, it renders the child component. If not, it redirects to `/login`. Both `/` and `/admin` are wrapped with this component, keeping route protection centralized and reusable.

#### 5. Logout

```js
function handleLogout() {
  localStorage.removeItem("token");
  setToken(null);
  navigate("/login");
}
```

Logout clears the token from `localStorage`, sets React state to `null` (which immediately triggers re-renders that hide protected content), and navigates the user to the login page.

---

### 🚀 Getting Started

#### Prerequisites

- Node.js `>= 18`
- npm or yarn

#### Installation

```bash
# Clone the repository
git clone https://github.com/mertkaya20/react-auth-demo.git
cd react-auth-demo

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (Vite default).

---

### 🔑 Demo Credentials

| Role  | Username   | Password       |
| ----- | ---------- | -------------- |
| Admin | `emilys`   | `emilyspass`   |
| User  | `michaelw` | `michaelwpass` |

Logging in as `emilys` will route you to the **Admin Dashboard** (`/admin`). Any other valid DummyJSON user will be routed to the **User Home** (`/`).

---

### 📌 Notes & Considerations

- **Role assignment is client-side** — In this demo, the role is derived from the username on the frontend. In a production application, the role should come directly from the backend/token payload and never be trusted from the client.
- **Token storage** — `localStorage` is used for simplicity. For higher-security applications, `httpOnly` cookies are preferred as they are not accessible via JavaScript and are safer against XSS attacks.
- **No token refresh** — DummyJSON access tokens expire. This demo does not implement a refresh token flow. In production, you would want to handle `401` responses and refresh the token silently.

---

---

## 🇹🇷 Türkçe

### Genel Bakış

**React Auth Demo**, React ile oluşturulmuş bir kimlik doğrulama ve yetkilendirme demo uygulamasıdır. Gerçek bir giriş akışını simüle etmek için [DummyJSON](https://dummyjson.com/) genel API'sine bağlanır — kullanıcılar giriş yaptıktan sonra bir JWT erişim token'ı alır; bu token sonraki API isteklerinde kimlik doğrulama ve rol bazlı erişim kontrolü için kullanılır.

Proje iki farklı kullanıcı deneyimini gösterir: normal **kullanıcı** ana sayfası ve korumalı **admin** paneli. Her iki görünüme yetkisiz erişimi engelleyen bir yönlendirme mantığı mevcuttur.

---

### ✨ Özellikler

- **JWT Kimlik Doğrulama** — POST isteğiyle giriş, token `localStorage`'a ve React state'e kaydedilir
- **Rol bazlı yönlendirme** — Admin kullanıcılar `/admin`'e, normal kullanıcılar `/`'a yönlendirilir
- **Korumalı route'lar** — Giriş yapmamış kullanıcılar, yeniden kullanılabilir `ProtectedRoute` bileşeni aracılığıyla `/login`'e yönlendirilir
- **Zaten giriş yapılmışsa yönlendirme** — Aktif token varken `/login`'e gitmek ana sayfaya geri yönlendirir
- **Yükleme durumları** — API istekleri sürerken animasyonlu nokta göstergesi
- **Hata yönetimi** — Başarısız istekler için şık hata arayüzü
- **Çıkış yapma** — Token'ı hem `localStorage`'dan hem React state'ten temizler, giriş sayfasına yönlendirir

---

### 🧰 Teknoloji Yığını

| Teknoloji                                   | Amaç                                      |
| ------------------------------------------- | ----------------------------------------- |
| [React](https://react.dev/)                 | Kullanıcı arayüzü bileşen altyapısı       |
| [React Router v6](https://reactrouter.com/) | İstemci taraflı yönlendirme ve navigasyon |
| [Axios](https://axios-http.com/)            | API istekleri için HTTP istemcisi         |
| [Tailwind CSS](https://tailwindcss.com/)    | Yardımcı sınıf tabanlı CSS stillemesi     |
| [DummyJSON](https://dummyjson.com/)         | Auth desteği olan genel sahte REST API    |

---

### 📁 Proje Yapısı

```
src/
├── App.jsx                      # Kök bileşen — token state'i, route tanımları
└── components/
    ├── Login.jsx                # Giriş formu — auth POST isteği, token kaydı
    ├── Dashboard.jsx            # Sadece admin görünümü — kullanıcı çeker, admin değilse yönlendirir
    ├── UserHome.jsx             # Normal kullanıcı görünümü — kullanıcı çeker, admin ise yönlendirir
    └── ProtectedRoute.jsx       # HOC — token yoksa /login'e yönlendirir
```

---

### 🔍 Nasıl Çalışır?

#### 1. App.jsx'te Token State'i

```jsx
const [token, setToken] = useState(localStorage.getItem("token"));
```

Uygulama mount edildiğinde `localStorage`'da mevcut bir token arar. Bu sayede kullanıcılar sayfa yenilemelerinde oturumda kalır. `token` state'i ve setter'ı (`setToken`), bunu okumak veya temizlemek isteyen alt bileşenlere prop olarak aktarılır.

#### 2. Giriş Akışı

```jsx
axios.post("https://dummyjson.com/auth/login", form).then((res) => {
  localStorage.setItem("token", res.data.accessToken);
  setToken(res.data.accessToken);
  navigate("/");
});
```

Başarılı girişte JWT erişim token'ı hem `localStorage`'a (kalıcılık için) hem de React state'e (reaktif UI güncellemeleri için) kaydedilir. Ardından kullanıcı `/`'a yönlendirilir; burada rol bazlı yönlendirme devreye girer.

#### 3. Rol Bazlı Yönlendirme

Hem `UserHome` hem de `Dashboard`, mount sırasında saklanan token ile `/auth/me`'yi çeker. Yanıttan sonra kullanıcı adına göre bir rol türetilir:

```js
const role = res.data.username === "emilys" ? "admin" : "user";
```

- **Normal kullanıcı** `/admin`'e gelirse → `/`'a geri yönlendirilir
- **Admin** `/`'a gelirse → `/admin`'e yönlendirilir

Bu sayede her kullanıcı tipi, hangi route'a ilk girdiğinden bağımsız olarak her zaman doğru sayfaya ulaşır.

#### 4. Korumalı Route'lar

```jsx
// ProtectedRoute.jsx
export function ProtectedRoute({ token, children }) {
  return token ? children : <Navigate to="/login" />;
}

// App.jsx kullanımı
<Route
  path="/"
  element={
    <ProtectedRoute token={token}>
      <UserHome setToken={setToken} />
    </ProtectedRoute>
  }
/>;
```

`ProtectedRoute` basit bir wrapper bileşenidir. Token varsa alt bileşeni render eder; yoksa `/login`'e yönlendirir. Hem `/` hem de `/admin`, bu bileşenle sarılmıştır — bu sayede route koruması merkezi ve yeniden kullanılabilir hale gelir.

#### 5. Çıkış Yapma

```js
function handleLogout() {
  localStorage.removeItem("token");
  setToken(null);
  navigate("/login");
}
```

Çıkış işlemi token'ı `localStorage`'dan siler, React state'i `null` yapar (bu, korumalı içeriği gizleyen yeniden render'ları anında tetikler) ve kullanıcıyı giriş sayfasına yönlendirir.

---

### 🚀 Başlarken

#### Ön Gereksinimler

- Node.js `>= 18`
- npm veya yarn

#### Kurulum

```bash
# Repoyu klonla
git clone https://github.com/mertkaya20/react-auth-demo.git
cd react-auth-demo

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır (Vite varsayılanı).

---

### 🔑 Demo Giriş Bilgileri

| Rol       | Kullanıcı Adı | Şifre          |
| --------- | ------------- | -------------- |
| Admin     | `emilys`      | `emilyspass`   |
| Kullanıcı | `michaelw`    | `michaelwpass` |

`emilys` olarak giriş yapmak sizi **Admin Paneli**'ne (`/admin`) yönlendirir. Diğer geçerli DummyJSON kullanıcıları **Kullanıcı Ana Sayfası**'na (`/`) yönlendirilir.

---

### 📌 Notlar ve Dikkat Edilmesi Gerekenler

- **Rol ataması client-side** — Bu demoda rol, frontend'de kullanıcı adından türetilmektedir. Gerçek bir uygulamada rol, backend'den veya token payload'ından gelmeli ve client'a asla güvenilmemelidir.
- **Token saklama** — Sadelik için `localStorage` kullanılmıştır. Daha yüksek güvenlik gerektiren uygulamalarda, JavaScript tarafından erişilemeyen ve XSS saldırılarına karşı daha güvenli olan `httpOnly` cookie'ler tercih edilmelidir.
- **Token yenileme yok** — DummyJSON erişim token'ları süresi dolar. Bu demo bir refresh token akışı içermez. Prodüksiyonda `401` yanıtlarını yakalayıp token'ı sessizce yenilemek gerekir.

---

## 👤 Author / Yazar

**Mert Kaya** — Frontend Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/merttkaya20/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/mertkaya20)

---

## License

MIT
