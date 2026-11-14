/**
 * Tones
 * error is for failures, warning is for limits that need attention, and the default neutral is for explanations.
 */
import { Notice } from "@/components/eridanus/notice";

export default function NoticeTonesExample() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <Notice
        tone="error"
        title="Save failed"
        description="The service returned 409: the configuration was changed by someone else."
      />
      <Notice
        tone="warning"
        title="One project per environment"
        description="Create separate projects for staging, canary, and production."
      />
      <Notice description="You can view this project, but only admins can change its settings." />
    </div>
  );
}
