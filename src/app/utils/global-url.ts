import { environment } from "src/environments/environment";

const baseURL = environment.apiUrl;
export class GlobalUrl {
    public static readonly loginUrl = `${baseURL}/login`;
    public static readonly signUpUrl = `${baseURL}/register`;
    public static readonly resendEmail = `${baseURL}/resend-email`;
    public static readonly verifyEmail = `${baseURL}/verify-email/{id}`;
    public static readonly getUserData = `${baseURL}/getalldata`;
}
