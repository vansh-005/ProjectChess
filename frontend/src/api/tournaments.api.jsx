import { apiClient } from './client';

export const getTournaments = ({ state, page, size, token }) => {
    const params = new URLSearchParams({
        state,
        page,
        size,
    });

    return apiClient(`/api/tournaments?${params}`, { token });
};
