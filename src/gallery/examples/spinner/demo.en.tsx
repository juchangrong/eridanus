import { Spinner } from "@/components/ui/spinner";

export default function SpinnerDemo() {
  return (
    <div
      role="status"
      className="flex items-center gap-2 text-sm text-muted-foreground"
    >
      <Spinner aria-hidden />
      Loading runs…
    </div>
  );
}
