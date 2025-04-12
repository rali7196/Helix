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
    conversation: string
    steps: string[]
}
export type {statusResponse, userResponse, chatResponse}