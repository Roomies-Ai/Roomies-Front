import { api } from './api';
import type { Household, CreateHouseholdRequest, JoinHouseholdRequest } from '../types/household';

export const householdApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMyHouseholds: builder.query<Household[], boolean | void>({
            query: (full = false) => `/households/me${full ? '?full=true' : ''}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Household' as const, id })),
                          { type: 'Household', id: 'LIST' },
                      ]
                    : [{ type: 'Household', id: 'LIST' }],
        }),
        getHouseholdById: builder.query<Household, string>({
            query: (id) => `/households/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Household', id }],
        }),
        createHousehold: builder.mutation<Household, CreateHouseholdRequest>({
            query: (data) => ({
                url: '/households',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Household', id: 'LIST' }],
        }),
        joinHousehold: builder.mutation<Household, JoinHouseholdRequest>({
            query: (data) => ({
                url: '/households/join',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Household', id: 'LIST' }],
        }),
        generateInviteCode: builder.mutation<{ inviteCode: string }, string>({
            query: (id) => ({
                url: `/households/${id}/invites`,
                method: 'POST',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'Household', id }],
        }),
        addPet: builder.mutation<any, { id: string; name: string; kind: string }>({
            query: ({ id, ...data }) => ({
                url: `/households/${id}/pets`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Household', id }],
        }),
        addTaskType: builder.mutation<any, { id: string; name: string }>({
            query: ({ id, name }) => ({
                url: `/households/${id}/task-types`,
                method: 'POST',
                body: { name },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Household', id }],
        }),
        leaveHousehold: builder.mutation<void, { householdId: string; userId: string }>({
            query: ({ householdId, userId }) => ({
                url: `/households/${householdId}/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, { householdId }) => [
                { type: 'Household', id: householdId },
                { type: 'Household', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetMyHouseholdsQuery,
    useLazyGetMyHouseholdsQuery,
    useGetHouseholdByIdQuery,
    useLazyGetHouseholdByIdQuery,
    useCreateHouseholdMutation,
    useJoinHouseholdMutation,
    useGenerateInviteCodeMutation,
    useAddPetMutation,
    useAddTaskTypeMutation,
    useLeaveHouseholdMutation,
} = householdApi;