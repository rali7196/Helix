import styles from "./MainPage.module.css";
import React, { useEffect, useState } from "react";
import SequenceStep from "../../components/SequenceStep/SequenceStep";
import { useAuth0, User } from "@auth0/auth0-react";
import { statusResponse } from "../../types/responses";
import ApiClient from "../../services/ApiClient";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { CircularProgress } from "@mui/material";
import ChatInterface from "../../components/ChatInterface/ChatInterface";

const MainPage: React.FC = () => {
    const { user, getIdTokenClaims } = useAuth0();

    const [messages, setMessages] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (user === null || user === undefined) {
            return;
        }

        const fetchSession: (user: User) => Promise<void> = async (user) => {
            ApiClient.getHelixSession(user).then((response) => {
                if (response == null) {
                    console.log("Error fetching session");
                    return;
                }

                console.log(response)
                setMessages(response.conversation_history);
                setSteps(response.steps);
                setIsLoading(false);

                return true;
            });
        };

        const checkIfUserInDb: () => Promise<void> = async () => {
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

            fetchSession(user);
        };

        checkIfUserInDb();
    }, [getIdTokenClaims, user]);

    function renderSequenceSteps() {
        return (
            <>
                {steps.map((value: string, index: number) => (
                    <SequenceStep
                        key={index}
                        setSteps={setSteps}
                        steps={steps}
                        content={value}
                    />
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
                    user={user}
                />

                <div className={styles["workspaceContainer"]}>
                    {renderSequenceSteps()}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
