import "./App.css";
import LoginButton from "./components/LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import ApiClient from "./services/ApiClient";
import statusResponse from "./types/responses";

function App() {
    const {user} = useAuth0();

    async function putData(): Promise<null> {
        if (user === null || user === undefined) {
            return null
        }


        const payload: statusResponse | null = await ApiClient.addUser(user.name!, user.email!);
        console.log(payload)
        return null
    }


    return (
        <>
            <LoginButton />
            <LogoutButton />
            <button onClick={putData}>test endpoint</button>
            <p>hello</p>
            <p>{ user ? user.email : ""}</p>

        </>
    );
}

export default App;
