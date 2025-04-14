interface addUserRequest {
    name: string;
    email: string;
}

interface getUserRequest {
    email: string;
}

interface chatRequest {
    conversation: string[];
    steps: string[];
    email: string;
    id?: string
}

interface helixSessionRequest {
    email: string;
}

export type {
    addUserRequest,
    getUserRequest,
    chatRequest,
    helixSessionRequest,
};
