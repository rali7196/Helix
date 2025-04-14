import styles from "./MainPage.module.css";
import React, { useEffect, useRef, useState } from "react";
import SequenceStep from "../../components/SequenceStep/SequenceStep";
import { useAuth0, User } from "@auth0/auth0-react";
import { statusResponse } from "../../types/responses";
import ApiClient from "../../services/ApiClient";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { Button, CircularProgress, Snackbar } from "@mui/material";
import ChatInterface from "../../components/ChatInterface/ChatInterface";

const MainPage: React.FC = () => {
    const { user, getIdTokenClaims, logout } = useAuth0();

    const [messages, setMessages] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>([]);
    const [showAlert, setShowAlert] = useState(false);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const sessionIdRef = useRef("");

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

                console.log(response);
                sessionIdRef.current = response.id;
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
                        index={index}
                        setSteps={setSteps}
                        steps={steps}
                        content={value}
                        conversation={messages}
                        sessionId={sessionIdRef}
                        showAlert={() => setShowAlert(true)}
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
            <Snackbar
                open={showAlert}
                message={"Changes Saved!"}
                autoHideDuration={1000}
                onClose={() => setShowAlert(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />

            <Button
                variant="contained"
                onClick={() =>
                    logout({
                        logoutParams: { returnTo: window.location.origin },
                    })
                }
                style={{
                    color:"white",
                    backgroundColor:"grey"
                }}
            >
                Log Out
            </Button>

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
