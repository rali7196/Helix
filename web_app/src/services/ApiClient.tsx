import statusResponse from "../types/responses";
import { addUserRequest } from "../types/requests";

class ApiClient {
    private static apiUrl = import.meta.env.VITE_API_URL;

    static async addUser(name: string, email: string): Promise<statusResponse | null> {
        if (name === null || email === null) {
            return null;
        }

        const request: addUserRequest = {
            name: name,
            email: email
        }

        const statusResponse: statusResponse = await fetch(
            `${ApiClient.apiUrl}/userManagement/addUser`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            }
        ).then((response) => response.json())
        return statusResponse
    }
}

export default ApiClient;
