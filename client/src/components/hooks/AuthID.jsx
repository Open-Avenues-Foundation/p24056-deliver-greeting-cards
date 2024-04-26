import { useAuth0 } from "@auth0/auth0-react";

export const useAuth0UserId = () => {
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated && user) {
    return user.sub;
  }

  return null;
};
