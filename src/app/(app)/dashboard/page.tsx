import { PageHeader } from "@/components/page-header";
import { kpiData } from "@/lib/data";
import { KpiCard } from "./kpi-card";
import { AlertCircle, ShieldAlert, LineChart, Clock } from "lucide-react";
import { ThreatsOverTimeChart } from "./threats-over-time-chart";
import { RecentAlertsTable } from "./recent-alerts-table";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your enterprise security posture."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Alerts Triggered"
          value={kpiData.alertsTriggered}
          icon={AlertCircle}
        />
        <KpiCard
          title="High-Risk Events"
          value={kpiData.highRiskEvents}
          icon={ShieldAlert}
        />
        <KpiCard
          title="Systems Affected"
          value={kpiData.systemsAffected}
          icon={LineChart}
        />
        <KpiCard
          title="Mean Time to Detection"
          value={kpiData.meanTimeToDetection}
          icon={Clock}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ThreatsOverTimeChart />
        <RecentAlertsTable />
      </div>
    </div>
  );
}
