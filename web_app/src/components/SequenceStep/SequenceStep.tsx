import React, { RefObject, useEffect, useRef, useState } from "react";
import styles from "./SequenceStep.module.css";
import ApiClient from "../../services/ApiClient";

interface SequenceStepProps {
    index: number;
    setSteps: React.Dispatch<string[]>;
    steps: string[];
    content: string;
    sessionId: RefObject<string>;
    conversation: string[];
    showAlert: React.Dispatch<boolean>
}

const SequenceStep: React.FC<SequenceStepProps> = ({
    index,
    setSteps,
    steps,
    content,
    sessionId,
    conversation,
    showAlert
}: SequenceStepProps) => {
    const [textAreaValue, setTextAreaValue] = useState<string>(content);
    const timeoutIdRef = useRef(undefined)

    function modifySequenceStep(key: number, newValue: string) {
        const temp: string[] = [...steps];
        temp[key] = newValue;
        setSteps(temp);
        setTextAreaValue(newValue);
        console.log(key)
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
            ApiClient.updateSequence(sessionId.current, temp, conversation)
            showAlert(true)
        }, 750);
    }

    useEffect(() => {
        setTextAreaValue(content);

    }, [content]);

    return (
        <div key={index} className={styles["sequenceStepContainer"]}>
            <textarea
                value={textAreaValue}
                onChange={(event) =>
                    modifySequenceStep(index, event.target.value)
                }
                className={styles["sequenceStepInput"]}
                rows={4}
                cols={100}
            ></textarea>
        </div>
    );
};

export default SequenceStep;
