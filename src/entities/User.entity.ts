export default interface User {
    id: string;
    username: string;
    email: string;
    token: string;
}

export const initialUserState: User = {
    id: '',
    username: '',
    email: '',
    token: '',
}