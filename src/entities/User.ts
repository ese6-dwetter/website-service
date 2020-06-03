export default interface User {
    IsAuthenticated: boolean;
    Id: string;
    Username: string;
    Email: string;
    Token: string;
}

export const initialUserState: User = {
    IsAuthenticated: false,
    Id: '',
    Username: '',
    Email: '',
    Token: '',
}