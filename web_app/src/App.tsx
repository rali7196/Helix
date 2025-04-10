import "./App.css";
import LoginButton from "./components/LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import ApiClient from "./services/ApiClient";
import testResponse from "./types/testResponse";

function App() {
    const {user} = useAuth0();

    async function fetchData(): Promise<null> {
        const payload: testResponse = await ApiClient.hitEndpoint();
        console.log(payload)
        return null
    }

    return (
        <>
            <LoginButton />
            <LogoutButton />
            <button onClick={fetchData}>test endpoint</button>
            <p>hello</p>
            <p>{ user ? user.email : ""}</p>

        </>
    );
}

export default App;
