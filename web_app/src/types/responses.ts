interface statusResponse {
    responseCode: number;
}

interface userResponse {
    id: number;
    company_name: string
    email: string
    name: string
}

interface chatResponse {
    newMessage: string
    steps: string[]
}
export type {statusResponse, userResponse, chatResponse}