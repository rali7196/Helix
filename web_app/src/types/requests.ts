interface addUserRequest {
    name: string;
    email: string;
}

interface getUserRequest {
    email: string
}

export type {addUserRequest, getUserRequest}