// src/utils/authGuard.ts
export function requireAuth() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    window.location.href = "/signin";
  }
}
