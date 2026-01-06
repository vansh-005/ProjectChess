import { apiClient } from './client';

export const getUserSubscriptions = ({ username, token, page = 0, size = 100 }) => {
    return apiClient(
        `/api/users/${username}/subscriptions?page=${page}&size=${size}`,
        { token }
    );
};

export const subscribeToTournament = ({ username, targetId, token }) => {
    return apiClient(
        `/api/users/${username}/subscriptions`,
        {
            method: 'POST',
            body: {
                targetType: 'TOURNAMENT',
                targetId,
            },
            token,
        }
    );
};

export const unsubscribe = ({ username, subscriptionId, token }) => {
    return apiClient(
        `/api/users/${username}/subscriptions/${subscriptionId}`,
        {
            method: 'DELETE',
            token,
        }
    );
};
