import testResponse from "../types/testResponse";

class ApiClient {
    static async hitEndpoint(): Promise<testResponse> {
        const testResponse: testResponse = await fetch(
            "http://127.0.0.1:5000/test"
        ).then((response) => response.json());
        return testResponse;
    }
}

export default ApiClient;
