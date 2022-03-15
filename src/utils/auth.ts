export const getLocalJWTToken = () => {
    return window.localStorage.getItem('token');
};
