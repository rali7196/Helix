import TextField from "@mui/material/TextField";
import React, { useState } from "react";

import styles from "./ChatInterface.module.css";
import { chatResponse } from "../../types/responses";
import ApiClient from "../../services/ApiClient";
import { CircularProgress } from "@mui/material";
interface ChatInterfaceProps {
    messages: string[];
    steps: string[];
    setMessages: React.Dispatch<string[]>;
    setSteps: React.Dispatch<string[]>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
    messages,
    steps,
    setMessages,
    setSteps,
}: ChatInterfaceProps) => {
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const [waitingForResponse, setWaitingForResponse] =
        useState<boolean>(false);

    function renderChat() {
        return (
            <div className={styles["textFieldContainer"]}>
                <TextField
                    variant="outlined"
                    className={styles["textField"]}
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    placeholder={
                        waitingForResponse
                            ? "Please wait..."
                            : "Enter your message here..."
                    }
                    disabled={waitingForResponse}
                    onKeyDown={(event) => {
                        if (
                            event.key === "Enter" &&
                            currentMessage.length > 0
                        ) {
                            console.log(currentMessage);
                            const mostRecentConversation: string[] = [
                                ...messages,
                                currentMessage,
                            ];

                            setMessages(mostRecentConversation);
                            setWaitingForResponse(true);
                            setCurrentMessage("");

                            ApiClient.chat(mostRecentConversation, steps).then(
                                (response: chatResponse | null) => {
                                    if (response == null) {
                                        // TODO: Show alert saying that chat request failed
                                        console.log("request failed");
                                        return;
                                    }

                                    console.log(response.steps);
                                    setMessages([
                                        ...mostRecentConversation,
                                        response.newMessage,
                                    ]);
                                    setSteps(response.steps);
                                    setWaitingForResponse(false);
                                }
                            );
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

    return (
        <div className={styles["chatContainer"]}>
            <div className={styles["messagesContainer"]}>
                {messages?.map((value: string, index: number) =>
                    renderMessage(value, index)
                )}
                <div
                    className={`${styles["message"]} ${styles["loadingMessage"]}`}
                    style={
                        waitingForResponse
                            ? { display: "flex" }
                            : { display: "none" }
                    }
                >
                    <CircularProgress style={{ color: "gray" }} size="20px" />
                </div>
            </div>
            {renderChat()}
        </div>
    );
};

export default ChatInterface;
