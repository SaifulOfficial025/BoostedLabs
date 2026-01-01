import { BASE_URL } from "../Redux/baseUrl";

/**
 * Refresh the access token using the refresh token
 */
async function refreshAccessToken() {
  const authData = localStorage.getItem("auth");
  if (!authData) {
    throw new Error("No refresh token found");
  }

  const { refresh } = JSON.parse(authData);
  if (!refresh) {
    throw new Error("No refresh token found");
  }

  const response = await fetch(`${BASE_URL}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    // Clear auth data and throw error
    localStorage.removeItem("auth");
    localStorage.removeItem("auth_verify");
    localStorage.removeItem("otpEmail");
    throw new Error("Session expired. Please login again.");
  }

  const data = await response.json();
  
  // Update localStorage with new access token
  const updatedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
  updatedAuth.access = data.access;
  localStorage.setItem("auth", JSON.stringify(updatedAuth));

  return data.access;
}

/**
 * Authenticated fetch wrapper that automatically handles token refresh
 * @param {string} url - API endpoint (can be relative or absolute)
 * @param {object} options - Fetch options
 * @returns {Promise<Response>}
 */
export async function authFetch(url, options = {}) {
  // Get access token from localStorage
  const authData = localStorage.getItem("auth");
  let token = authData ? JSON.parse(authData).access : null;

  if (!token) {
    throw new Error("No access token found");
  }

  // Make the full URL if it's relative
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  // Add Authorization header
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  // Make the first request
  let response = await fetch(fullUrl, { ...options, headers });

  // If unauthorized (401), try to refresh the token
  if (response.status === 401) {
    try {
      // Refresh the token
      const newToken = await refreshAccessToken();

      // Retry the original request with new token
      headers.Authorization = `Bearer ${newToken}`;
      response = await fetch(fullUrl, { ...options, headers });
    } catch (error) {
      // Redirect to login page or throw error
      throw error;
    }
  }

  return response;
}

/**
 * Convenience wrapper that returns parsed JSON
 */
export async function authFetchJson(url, options = {}) {
  const response = await authFetch(url, options);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || error.detail || "Request failed");
  }

  return response.json();
}
