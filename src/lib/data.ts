import type { RecentAlert, ThreatOverTime } from "./types";

export const kpiData = {
  alertsTriggered: 125,
  highRiskEvents: 12,
  systemsAffected: 3,
  meanTimeToDetection: "2.5h",
};

export const recentAlerts: RecentAlert[] = [
  { id: "1", threat: "Anomalous Login Activity", severity: "High", timestamp: "2024-07-29 14:30", system: "Auth-Server-01" },
  { id: "2", threat: "Unusual Data Egress", severity: "Medium", timestamp: "2024-07-29 14:25", system: "DB-Primary" },
  { id: "3", threat: "Malware Signature Detected", severity: "High", timestamp: "2024-07-29 13:50", system: "Workstation-1138" },
  { id: "4", threat: "Port Scan Detected", severity: "Low", timestamp: "2024-07-29 13:45", system: "Firewall-Main" },
  { id: "5", threat: "Privilege Escalation Attempt", severity: "High", timestamp: "2024-07-29 13:10", system: "Admin-Host" },
  { id: "6", threat: "Repeated Failed Logins", severity: "Medium", timestamp: "2024-07-29 12:20", system: "VPN-Gateway" },
];

export const threatsOverTime: ThreatOverTime[] = [
  { date: "Jul 23", High: 2, Medium: 5, Low: 10 },
  { date: "Jul 24", High: 3, Medium: 6, Low: 12 },
  { date: "Jul 25", High: 1, Medium: 4, Low: 8 },
  { date: "Jul 26", High: 4, Medium: 7, Low: 15 },
  { date: "Jul 27", High: 2, Medium: 5, Low: 11 },
  { date: "Jul 28", High: 5, Medium: 9, Low: 18 },
  { date: "Jul 29", High: 3, Medium: 8, Low: 14 },
];
