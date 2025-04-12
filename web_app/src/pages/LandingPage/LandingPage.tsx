import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef, useState } from "react";
import styles from "./LandingPage.module.css";
import HALO from "vanta/dist/vanta.halo.min.js";
import * as THREE from "three";

const LandingPage: React.FC = () => {
    const { user, loginWithRedirect } = useAuth0();

    const [vantaEffect, setVantaEffect] = useState(null);
    const myRef = useRef(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                HALO({
                    el: myRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                })
            );
        }
    }, [vantaEffect]);



    return (
        <>
            <div className={styles["padding"]} ref={myRef}>
                <div
                    className={`${styles["titleContainer"]} ${styles["card"]}`}
                >
                    <h1>Welcome to Helix</h1>
                    <p>An agent to help you reach unreachable talent</p>
                    <div className={styles["buttonsContainer"]}>
                        <button
                            onClick={() => loginWithRedirect()}
                            className={styles["btn"]}
                        >
                            Get Started
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default LandingPage;
