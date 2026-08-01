export interface HouseholdHeaderProps {
  currentUser: any;
  onBack: () => void;
}

export interface HouseholdInfoProps {
  name: string;
  inviteCode: string;
  onLeave?: () => void;
}

export interface LeaveHouseholdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  householdName: string;
}

export interface FairnessBalanceProps {
  members: any[];
  currentUser: any;
  getMemberStats: (memberId: string) => { taskCount: number; points: number };
}

export interface TaskFiltersProps {
  activeTab: "OPEN" | "IN_PROGRESS" | "DONE" | "OVERDUE";
  setActiveTab: (tab: "OPEN" | "IN_PROGRESS" | "DONE" | "OVERDUE") => void;
  counts: {
    open: number;
    inProgress: number;
    done: number;
    overdue: number;
  };
}

export interface TaskCardProps {
  task: any;
  currentUser: any;
  onUpdateStatus: (taskId: string, status: string) => void;
  onAssignClick: (taskId: string) => void;
  onPointsClick: (taskId: string, points: number) => void;
  onEdit?: (task: any) => void;
  formatRelativeDate: (date: string) => string;
  idx: number;
  isHighlighted?: boolean;
}

export interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  household: any;
  assigningTaskId: string | null;
  currentUser: any;
  handleAssignTask: (taskId: string, memberId: string | null) => void;
  handleGetSuggestion: () => void;
  isSuggesting: boolean;
  suggestion: any;
  isLoadingHousehold?: boolean;
}

export interface PointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskTitle: string;
  pointsValue: number;
  setPointsValue: (val: number | ((prev: number) => number)) => void;
  onSave: () => void;
}

export interface TaskIconProps {
  title: string;
  size?: number;
}

export interface MemberAvatarProps {
  username: string;
  profilePicture?: string;
  size?: string;
  border?: boolean;
}

export interface PointsBadgeProps {
  points: number;
  onClick?: (e: React.MouseEvent) => void;
  interactive?: boolean;
}

export interface AISuggestionCardProps {
  suggestion: {
    username: string;
    reason: string;
  };
}

export interface MemberAssignmentItemProps {
  member: any;
  isSuggested: boolean;
  isMe: boolean;
  onClick: () => void;
}
