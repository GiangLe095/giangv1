/* ------------------------------- Application constants ------------------------------- */
export const SITE_TITLE = "ITC ADMIN";
export const ACCESS_TOKEN_NAME = "accessToken";
export const REFRESH_TOKEN_NAME = "refreshToken";

/* ----------------------------------- API constants ----------------------------------- */
export const baseApiURL = process.env.NEXT_PUBLIC_API_URL;
export const baseApiUploadURL = process.env.NEXT_PUBLIC_API_UPLOAD_URL;
export const publicApiURL = process.env.NEXT_PUBLIC_BASE_PATH;
export const baseWebsocketURL = process.env.NEXT_PUBLIC_WEBSOCKET_HOST;

/* ---------------------------------- Other constants ---------------------------------- */
export const PAGE_SIZE_OPTION = ["5", "10", "20", "50", "100"];

/* --------------------------- Validate environment variables -------------------------- */
function __validateEnvVariable(variable: string | undefined, name: string): asserts variable is string {
  if (!variable) {
    throw new Error(`Environment variable ${name} is not defined.`);
  }
}
__validateEnvVariable(baseApiURL, "NEXT_PUBLIC_API_URL");
__validateEnvVariable(baseApiUploadURL, "NEXT_PUBLIC_API_UPLOAD_URL");

