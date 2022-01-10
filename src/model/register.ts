export interface RegisterModel {
    onCloseRegister: React.MouseEventHandler<any>;
}

export interface RegisterUserRequest {
    first_name: string;
    last_name: string;
    email_phone: string;
    password: string;
    day_birth?: string;
    month_birth?: string;
    year_birth?: string;
    birthday?: string;
}

export interface RegisterUserResponse {
    first_name: string;
    last_name: string;
    avatar: string;
    background_image: string;
    email_phone: string;
    password: string;
    birthday: string;
    background_color: string;
}