// import Cookies from 'js-cookie';

export function setToken(token) {
    // Cookies.set('auth_token', token);
    localStorage.setItem('auth_token', token);
}

export function getToken() {
    // return Cookies.get('auth_token');
    return localStorage.getItem('auth_token');
}

export function removeToken() {
    // Cookies.remove('auth_token');
}

export function hasToken() {
    const token = localStorage.getItem('auth_token');
    return !!token;
}
