interface statusResponse {
    responseCode: number;
}

interface userResponse {
    id: number;
    company_name: string
    email: string
    name: string
}

export type {statusResponse, userResponse}