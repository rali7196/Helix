import styles from "./MainPage.module.css";
import React, { useEffect, useState } from "react";
import SequenceStep from "../../components/SequenceStep/SequenceStep";
import { useAuth0 } from "@auth0/auth0-react";
import { statusResponse } from "../../types/responses";
import ApiClient from "../../services/ApiClient";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { CircularProgress } from "@mui/material";
import ChatInterface from "../../components/ChatInterface/ChatInterface";

const MainPage: React.FC = () => {
    const { user, getIdTokenClaims } = useAuth0();

    const [sequenceSteps, setSequenceSteps] = useState<string[] | null>([
        "test",
        "123456",
        "hey! what's up",
    ]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function putData(): Promise<null> {
        if (user === null || user === undefined) {
            return null;
        }

        const payload: statusResponse | null = await ApiClient.getUser(
            user.email!
        );

        console.log(payload);
        return null;
    }

    useEffect(() => {
        if (user === null || user === undefined) {
            return;
        }

        const addNewUserToDB: () => Promise<void> = async () => {
            const claims = await getIdTokenClaims();
            console.log("claims:", claims);
            console.log(
                "login count: ",
                claims?.["https://helix.dev/logins_count"]
            );
            const loginCount: number =
                claims?.["https://helix.dev/logins_count"];

            if (loginCount === 1) {
                const payload: statusResponse | null = await ApiClient.addUser(
                    user.name!,
                    user.email!
                );
                console.log(payload);
            }
            setIsLoading(false);
        };

        addNewUserToDB();
    }, [getIdTokenClaims, user]);

    function renderSequenceSteps() {
        return (
            <>
                {sequenceSteps?.map((value: string, index: number) => (
                    <SequenceStep initialContent={value} key={index} />
                ))}
            </>
        );
    }

    if (isLoading) {
        return (
            <CircularProgress style={{ color: "grey", margin: "25% 50%" }} />
        );
    }

    return (
        <div className={styles["padding"]}>
            <button onClick={putData}>test endpoint</button>
            <LogoutButton />

            <div className={styles["mainContainer"]}>
                <ChatInterface />

                <div className={styles["workspaceContainer"]}>
                    {renderSequenceSteps()}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
