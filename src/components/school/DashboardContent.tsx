import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import StudentsChart from "./StudentsChart";
import RevenueChart from "./RevenueChart";
import AttendanceCard from "./AttendanceCard";
import RecentActivities from "./RecentActivities";
import UpcomingEvents from "./UpcomingEvents";

interface DashboardContentProps {
    institution?: {
        name: string;
        logo_url: string | null;
    } | null;
}

export default function DashboardContent({ institution }: DashboardContentProps) {
    return (
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-6">
            <DashboardHeader institution={institution} />
            <DashboardStats />
            <div className="grid lg:grid-cols-2 gap-6">
                <StudentsChart />
                <RevenueChart />
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
                <AttendanceCard />
                <RecentActivities />
                <UpcomingEvents />
            </div>
        </main>
    );
}
