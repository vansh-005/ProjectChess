import { apiClient } from './client';

export const loginApi = (username, password) => {
    return apiClient('/auth/login', {
        method: 'POST',
        body: { username, password },
    });
};
