export type DashboardAgenda = {
    id: number;
    time: string;
    title: string;
    desc: string;
};

export type DashboardAnnouncement = {
    id: number;
    title: string;
    date: string;
};

export type DashboardAchievement = {
    id: number;
    title: string;
    level: string;
    year: number;
};

export type DashboardReportSummary = {
    status: string;
    label: string;
    count: number;
    color: string;
};
