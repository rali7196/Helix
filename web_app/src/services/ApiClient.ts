import {
    chatResponse,
    helixSessionResponse,
    statusResponse,
    userResponse,
} from "../types/responses";
import {
    addUserRequest,
    chatRequest,
    getUserRequest,
    helixSessionRequest,
} from "../types/requests";
import { User } from "@auth0/auth0-react";

class ApiClient {
    // set this to true to use the docker container IP address
    private static apiUrl = false ? import.meta.env.VITE_API_URL : "http://127.0.0.1:5000";

    static async addUser(
        name: string,
        email: string
    ): Promise<statusResponse | null> {
        if (name === null || email === null) {
            return null;
        }

        const request: addUserRequest = {
            name: name,
            email: email,
        };

        const statusResponse: statusResponse = await fetch(
            `${ApiClient.apiUrl}/userManagement/addUser`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            }
        ).then((response) => response.json());

        return statusResponse;
    }

    static async getUser(email: string) {
        if (email == null) {
            return null;
        }

        const request: getUserRequest = {
            email: email,
        };

        const response: userResponse = await fetch(
            `${ApiClient.apiUrl}/userManagement/getUser`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            }
        ).then((response) => response.json());

        return response;
    }

    static async chat(
        conversation: string[],
        steps: string[],
        user: User | undefined
    ): Promise<chatResponse | null> {
        if (conversation == null || user == null) {
            return null;
        }

        const request: chatRequest = {
            conversation: conversation,
            steps: steps,
            email: user.email!,
        };

        const response: chatResponse = await fetch(
            `${ApiClient.apiUrl}/llmManagement/chat`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            }
        ).then((response) => response.json());

        return response;
    }

    static async getHelixSession(user: User) {
        if (user == null || user.email == null) {
            return null;
        }

        const request: helixSessionRequest = {
            email: user.email,
        };

        const response: helixSessionResponse = await fetch(
            `${ApiClient.apiUrl}/userManagement/getHelixSession`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            }
        ).then((response) => response.json());

        return response;
    }
}

export default ApiClient;
