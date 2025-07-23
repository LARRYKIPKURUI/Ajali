import { jwtDecode } from "jwt-decode";

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const isAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    return decoded.is_admin === true;
  } catch (err) {
    console.error("Failed to decode JWT:", err);
    return false;
  }
};
