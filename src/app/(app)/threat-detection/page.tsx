import { PageHeader } from "@/components/page-header";
import ThreatDetectionForm from "./threat-detection-form";

export default function ThreatDetectionPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Threat Pattern Detection"
        description="Identify persistent attack patterns by analyzing network traffic and system logs."
      />
      <ThreatDetectionForm />
    </div>
  );
}
