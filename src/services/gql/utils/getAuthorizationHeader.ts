export function getAuthorizationHeader(token?: string): { Authorization?: string } {
  return token ? { Authorization: `JWT ${token}` } : {};
}
