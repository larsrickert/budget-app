export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession();

  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn.value) return navigateTo("/login", { external: true });
});
