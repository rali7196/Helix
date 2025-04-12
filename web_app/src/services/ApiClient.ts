import { statusResponse, userResponse } from "../types/responses";
import { addUserRequest, getUserRequest } from "../types/requests";

class ApiClient {
    private static apiUrl = import.meta.env.VITE_API_URL;

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
        if (email === null || email === undefined) {
            return null;
        }

        const request: getUserRequest = {
            email: email,
        };

        const response: statusResponse = await fetch(
            `${ApiClient.apiUrl}/userManagement/getUser`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            }
        ).then((response) => response.json);

        return response;
    }
}

export default ApiClient;
