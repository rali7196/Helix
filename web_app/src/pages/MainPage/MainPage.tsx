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

    const [messages, setMessages] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>([]);

    const [sequenceSteps, setSequenceSteps] = useState<string[]>([
        "test",
        "123456",
        "hey! what's up",
    ]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
            <button>test endpoint</button>
            <LogoutButton />

            <div className={styles["mainContainer"]}>
                <ChatInterface
                    messages={messages}
                    steps={steps}
                    setMessages={setMessages}
                    setSteps={setSteps}
                />

                <div className={styles["workspaceContainer"]}>
                    {renderSequenceSteps()}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
