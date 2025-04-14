import { HelixSession } from "./complex_types";

interface statusResponse {
    responseCode: number;
}

interface userResponse {
    id: number;
    company_name: string;
    email: string;
    name: string;
}

interface chatResponse {
    newMessage: string;
    steps: string[];
}

interface helixSessionResponse {
    id: string;
    conversation_history: string[];
    steps: string[];
}
export type {
    statusResponse,
    userResponse,
    chatResponse,
    helixSessionResponse,
};
