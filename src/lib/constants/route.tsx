/**
 * Publicly accessible routes that do not require authentication.
 * @type {string[]}
 */
export const PUBLIC_ROUTES: string[] = [];

/**
 * The default route to redirect to after successful authentication.
 * @type {string}
 */
export const DEFAULT_REDIRECT_AFTER_AUTH: string = "/";

/**
 * The default route to redirect to if the user is not authenticated.
 * @type {string}
 */
export const DEFAULT_REDIRECT_IF_NOT_AUTH: string = "/auth/login";

/**
 * Routes related to authentication (login, register, etc.).
 * If a user is already logged in, navigating to these will redirect them to DEFAULT_REDIRECT_AFTER_AUTH.
 * @type {string[]}
 */
export const AUTH_ROUTES: string[] = ["/auth/login"];

/**
 * Prefix for API routes.
 * All routes starting with this prefix will be treated as API routes.
 * @type {string}
 */
export const API_PREFIX: string = "/api";
