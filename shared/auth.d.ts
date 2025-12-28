/**
 * @see: https://github.com/atinux/nuxt-auth-utils?tab=readme-ov-file#session-management
 */
declare module "#auth-utils" {
  interface User {
    /**
     * Full user name
     */
    name: string;
    /**
     * Email address
     */
    email: string;
    /**
     * Full URL of user profile picture / avatar.
     */
    picture?: string;
  }

  // interface UserSession {}

  // interface SecureSessionData {}
}

export {};
