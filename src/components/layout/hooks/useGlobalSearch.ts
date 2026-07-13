import { useMemo } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { useGetMyHouseholdsQuery } from '../../../api/household.api';
import type {
    GlobalSearchResults,
    SearchResultTask,
    SearchResultHousehold,
    SearchResultMember,
} from '../types/search.types';

const MAX_RESULTS_PER_GROUP = 5;

export const useGlobalSearch = (query: string, { enabled }: { enabled: boolean }): GlobalSearchResults => {
    const user = useAppSelector((state) => state.auth.user);
    const { data: households = [], isFetching } = useGetMyHouseholdsQuery(true, { skip: !user || !enabled });

    return useMemo(() => {
        const trimmed = query.trim().toLowerCase();
        if (!trimmed) {
            return { tasks: [], households: [], members: [], isLoading: false };
        }

        const matchedHouseholds: SearchResultHousehold[] = [];
        const matchedTasks: SearchResultTask[] = [];
        const matchedMembers: SearchResultMember[] = [];
        const seenMemberIds = new Set<string>();

        for (const household of households as any[]) {
            if (household.name?.toLowerCase().includes(trimmed)) {
                matchedHouseholds.push({
                    id: household.id,
                    name: household.name,
                    memberCount: household.members?.length ?? 0,
                });
            }

            for (const task of household.tasks ?? []) {
                if (task.title?.toLowerCase().includes(trimmed)) {
                    matchedTasks.push({
                        id: task.id,
                        title: task.title,
                        status: task.status,
                        dueDate: task.dueDate,
                        householdId: household.id,
                        householdName: household.name,
                    });
                }
            }

            for (const member of household.members ?? []) {
                if (seenMemberIds.has(member.id)) continue;
                if (member.username?.toLowerCase().includes(trimmed)) {
                    seenMemberIds.add(member.id);
                    matchedMembers.push({
                        id: member.id,
                        username: member.username,
                        profilePicture: member.profilePicture,
                        householdId: household.id,
                        householdName: household.name,
                    });
                }
            }
        }

        return {
            tasks: matchedTasks.slice(0, MAX_RESULTS_PER_GROUP),
            households: matchedHouseholds.slice(0, MAX_RESULTS_PER_GROUP),
            members: matchedMembers.slice(0, MAX_RESULTS_PER_GROUP),
            isLoading: isFetching,
        };
    }, [households, query, isFetching]);
};
