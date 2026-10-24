import { Target, Search, ClipboardCheck, MapPin } from "lucide-react";
import type { ServiceIconName } from "@/lib/services-data";

const icons = {
  target: Target,
  search: Search,
  clipboard: ClipboardCheck,
  "map-pin": MapPin,
} as const;

export default function ServiceIcon({
  name,
  className = "w-6 h-6",
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
