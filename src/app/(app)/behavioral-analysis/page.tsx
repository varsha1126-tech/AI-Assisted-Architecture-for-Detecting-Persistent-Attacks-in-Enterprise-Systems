import { PageHeader } from "@/components/page-header";
import BehavioralAnalysisForm from "./behavioral-analysis-form";

export default function BehavioralAnalysisPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Behavioral Analysis"
        description="Detect deviations from established baselines by analyzing user and entity behavior."
      />
      <BehavioralAnalysisForm />
    </div>
  );
}
