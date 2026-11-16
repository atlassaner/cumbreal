// Every browser-storage key lives here, so deleting a profile cannot miss one.
export const SESSION_KEY = 'cumbreal_v2_session';
export const ACCOUNTS_KEY = 'cumbreal_v2_accounts';
export const GUEST_DIAGNOSIS_KEY = 'cumbreal_diagnosis_guest_v1';
export const progressKey = (userId: string) => 'cumbreal_v2_progress:' + userId;
export const draftKey = (userId: string) => 'cumbreal_diagnosis_draft_v1:' + userId;

// Per-user keys all end with ":<userId>".
export function clearUserData(userId: string) {
  Object.keys(localStorage)
    .filter((k) => k.startsWith('cumbreal_') && k.endsWith(':' + userId))
    .forEach((k) => localStorage.removeItem(k));
}
