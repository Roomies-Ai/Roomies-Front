export interface HouseholdMember {
    id: string;
    username: string;
    avatarUrl?: string;
}

export interface StatusCounts {
    [key: string]: number;
}

export interface StatGroup {
    points: number;
    totalTasks: number;
    statusCounts: StatusCounts;
}

export interface AggregatedStats {
    totalPoints: number;
    totalTasks: number;
    statusCounts: StatusCounts;
    byTaskType: { [typeName: string]: StatGroup };
    byMember: { [memberId: string]: StatGroup };
    tasks: any[];
}

export interface SelectedEntity {
    type: 'MEMBER' | 'TASK_TYPE';
    id: string;
    name: string;
    stats: StatGroup;
}

// Component Prop Interfaces
export interface StatsSummaryCardsProps {
    stats: AggregatedStats;
}

export interface StatsVisualInsightsProps {
    statusData: any[];
    memberDistributionData: any[];
}

export interface MemberPerformanceProps {
    activeHousehold: any;
    stats: AggregatedStats;
    onSelectEntity: (entity: SelectedEntity) => void;
}

export interface TaskCategoryBreakdownProps {
    stats: AggregatedStats;
    onSelectEntity: (entity: SelectedEntity) => void;
}

export interface StatsDetailModalProps {
    selectedEntity: SelectedEntity;
    onClose: () => void;
    modalCharts: { statusData: any[], distributionData: any[] };
    selectedStatus: string | null;
    onSelectStatus: (status: string | null) => void;
    filteredTasks: any[];
    onTakeTask: (taskId: string) => void;
}

export interface ModalHeaderProps {
    selectedEntity: SelectedEntity;
}

export interface ModalVisualsProps {
    selectedEntity: SelectedEntity;
    modalCharts: { statusData: any[], distributionData: any[] };
}

export interface StatusTaskListProps {
    status: { label: string, id: string, color: string };
    selectedEntity: SelectedEntity;
    selectedStatus: string | null;
    onSelectStatus: (status: string | null) => void;
    filteredTasks: any[];
    onTakeTask: (taskId: string) => void;
}

export interface MemberCardProps {
    user: any;
    idx: number;
    memberStats: StatGroup;
    onSelectEntity: (entity: SelectedEntity) => void;
}

export interface UnassignedBannerProps {
    unassignedStats: StatGroup;
    onSelectEntity: (entity: SelectedEntity) => void;
}
