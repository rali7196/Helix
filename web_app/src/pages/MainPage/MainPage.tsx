import styles from "./MainPage.module.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SequenceStep from "../../components/SequenceStep/SequenceStep";
import { useAuth0 } from "@auth0/auth0-react";
import statusResponse from "../../types/responses";
import ApiClient from "../../services/ApiClient";

const MainPage: React.FC = () => {
    const {user} = useAuth0();

    const [messages, setMessages] = useState<string[] | null>([
        "Hey there! How can I help you?",
    ]);
    const [sequenceSteps, setSequenceSteps] = useState<string[] | null>([
        "test",
        "123456",
        "hey! what's up",
    ]);
    const [currentMessage, setCurrentMessage] = useState<string | null>(null);

    function renderChat() {
        return (
            <div className={styles["textFieldContainer"]}>
                <TextField
                    variant="outlined"
                    className={styles["textField"]}
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            setMessages([...messages, currentMessage]);
                            setCurrentMessage("");
                        }
                    }}
                    value={currentMessage}
                />
            </div>
        );
    }

    function renderMessage(value: string, key: number) {
        return (
            <div
                className={styles["message"]}
                style={
                    key % 2 === 0
                        ? { marginRight: "auto", marginLeft: "10px" }
                        : { marginLeft: "auto", marginRight: "10px" }
                }
            >
                <p>{value}</p>
            </div>
        );
    }

    function renderSequenceSteps() {
        return (
            <>
                {sequenceSteps?.map((value: string, index: number) => (
                    <SequenceStep initialContent={value} key={index} />
                ))}
            </>
        );
    }

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
            <button onClick={putData}>test endpoint</button>

            <div className={styles["mainContainer"]}>
                <div className={styles["chatContainer"]}>
                    <div className={styles["messagesContainer"]}>
                        {messages?.map((value: string, index: number) =>
                            renderMessage(value, index)
                        )}
                    </div>
                    {renderChat()}
                </div>
                <div className={styles["workspaceContainer"]}>
                    {renderSequenceSteps()}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
