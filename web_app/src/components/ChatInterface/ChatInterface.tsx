import TextField from "@mui/material/TextField";
import React, { useState } from "react";

import styles from "./ChatInterface.module.css";

const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<string[] | null>([
        "Hey there! How can I help you?",
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

    return (
        <div className={styles["chatContainer"]}>
            <div className={styles["messagesContainer"]}>
                {messages?.map((value: string, index: number) =>
                    renderMessage(value, index)
                )}
            </div>
            {renderChat()}
        </div>
    );
};

export default ChatInterface;
