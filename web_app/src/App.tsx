import "./App.css";
import LoginButton from "./components/LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./components/LogoutButton/LogoutButton";

function App() {
    const {user} = useAuth0();
    return (
        <>
            <LoginButton />
            <LogoutButton />
            <p>hello</p>
            <p>{ user ? user.email : ""}</p>
        </>
    );
}

export default App;
