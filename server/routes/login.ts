export default defineEventHandler(async (event) => {
  // unified login route
  // currently it just supports GitHub but in the future support for multiple
  // providers can be added here
  await sendRedirect(event, "/auth/github");
});
