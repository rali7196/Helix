import React, { useEffect, useState } from "react";
import styles from "./SequenceStep.module.css";

interface SequenceStepProps {
    key: number;
    setSteps: React.Dispatch<string[]>;
    steps: string[];
    content: string;
}

const SequenceStep: React.FC<SequenceStepProps> = ({
    key,
    setSteps,
    steps,
    content,
}: SequenceStepProps) => {
    const [textAreaValue, setTextAreaValue] = useState<string>(content);

    function modifySequenceStep(key: number, newValue: string) {
        const temp: string[] = [...steps];
        temp[key] = newValue;
        setSteps(temp);
        setTextAreaValue(newValue);
    }

    useEffect(() => {
        setTextAreaValue(content);
    }, [content]);

    return (
        <div key={key} className={styles["sequenceStepContainer"]}>
            <textarea
                value={textAreaValue}
                onChange={(event) =>
                    modifySequenceStep(key, event.target.value)
                }
                className={styles["sequenceStepInput"]}
                rows={4}
                cols={100}
            ></textarea>
        </div>
    );
};

export default SequenceStep;
