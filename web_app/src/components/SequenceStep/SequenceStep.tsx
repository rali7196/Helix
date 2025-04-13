import React, { useState } from "react";
import styles from "./SequenceStep.module.css";

interface SequenceStepProps {
    initialContent: string;
    key: number;
}

const SequenceStep: React.FC<SequenceStepProps> = ({
    initialContent,
    key,
}: SequenceStepProps) => {
    const [sequenceStepContent, setSequenceStepContent] =
        useState<string>(initialContent);

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSequenceStepContent(event.target.value);
    }

    return (
        <div key={key} className={styles["sequenceStepContainer"]}>
            <textarea
                value={sequenceStepContent}
                onChange={(event) => onChange(event)}
                className={styles["sequenceStepInput"]}
                rows={4}
                cols={100}
            ></textarea>
        </div>
    );
};

export default SequenceStep;
