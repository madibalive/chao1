import SocketProvider from "./context/socket";
import MessageProvider from "./context/message";
import UsersProvider from "./context/users";
import { HomePage } from "./pages/home";
import AuthWrapper from "./components/authWrapper";

function App() {
  return (
    <AuthWrapper>
      <SocketProvider>
        <UsersProvider>
          <MessageProvider>
            <HomePage />
          </MessageProvider>
        </UsersProvider>
      </SocketProvider>
    </AuthWrapper>
  );
}

export default App;
