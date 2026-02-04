import { PageHeader } from "@/components/page-header";
import AnomalyAlertingForm from "./anomaly-alerting-form";

export default function AnomalyAlertingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Anomaly Alerting"
        description="Generate real-time alerts for anomalous activities indicative of persistent threats."
      />
      <AnomalyAlertingForm />
    </div>
  );
}
