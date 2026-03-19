export interface ContactMessageInput {
  from_name: string;
  from_email: string;
  message: string;
}

export interface ContactApiResponse {
  message: string;
}
