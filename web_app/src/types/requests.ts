interface addUserRequest {
    name: string;
    email: string;
}

interface getUserRequest {
    email: string
}

interface chatRequest {
    conversation: string[]
    steps: string[]
}

export type {addUserRequest, getUserRequest, chatRequest}