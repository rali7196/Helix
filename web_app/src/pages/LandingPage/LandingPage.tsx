import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import statusResponse from "../../types/responses";
import ApiClient from "../../services/ApiClient";
import LoginButton from "../../components/LoginButton/LoginButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import styles from "./LandingPage.module.css";

const LandingPage: React.FC = () => {
    const { user, loginWithRedirect } = useAuth0();

    async function putData(): Promise<null> {
        if (user === null || user === undefined) {
            return null;
        }

        const payload: statusResponse | null = await ApiClient.addUser(
            user.name!,
            user.email!
        );
        console.log(payload);
        return null;
    }

    return (
        <div className={styles["padding"]}>
            <div className={styles["titleContainer"]}>
                <h1>Welcome to Helix</h1>
                <div className={styles["buttonsContainer"]}>
                    <LoginButton />
                </div>
            </div>
            {/* <button onClick={putData}>test endpoint</button>
            <p>hello</p>
            <p>{user ? user.email : ""}</p> */}
        </div>
    );
};

export default LandingPage;
