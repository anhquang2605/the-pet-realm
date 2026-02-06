export type StatusType = 'idle' | 'uploading' | 'error' | 'success';

export type ErrorMessageType = {
    message: string;
    valid: boolean;
} // Define the type for error messages
export type ErrorMessages = Record<string, ErrorMessageType>; // Define a type for the error messages object

