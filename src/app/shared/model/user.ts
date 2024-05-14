export interface userDTO {
    fullName: string,
    userName : string,
    password : string,
    phone: string,
    city : string,
    district: string,
    ward : string,
    addressDetail :string,
    file : File,
    enabled : boolean,
}

export type userResponse = {
    accessToken : string,
    user: any
}