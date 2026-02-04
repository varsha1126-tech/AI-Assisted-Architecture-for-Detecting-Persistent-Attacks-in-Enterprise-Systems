export type RecentAlert = {
  id: string;
  threat: string;
  severity: "Low" | "Medium" | "High";
  timestamp: string;
  system: string;
};

export type ThreatOverTime = {
  date: string;
  High: number;
  Medium: number;
  Low: number;
};
