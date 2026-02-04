import { PageHeader } from "@/components/page-header";
import IncidentReportingForm from "./incident-reporting-form";

export default function IncidentReportingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Incident Reporting"
        description="Automate the generation of incident reports with detailed threat analysis."
      />
      <IncidentReportingForm />
    </div>
  );
}
