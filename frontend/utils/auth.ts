export function saveUser(user: { user_id: number; email: string }) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export function clearUser() {
    localStorage.removeItem('user');
}