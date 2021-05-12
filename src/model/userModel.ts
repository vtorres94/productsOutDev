export interface IUser {
    id?: number
    email?: string,
    password?: string
}

export const defaultValue: Readonly<IUser> = {};
