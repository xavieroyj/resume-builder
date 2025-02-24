import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TemplateType, useResumeStore } from "@/lib/store/resume";

const templates: { value: TemplateType; label: string }[] = [
  { value: "minimal", label: "Minimal" },
  { value: "classic", label: "Classic" },
  { value: "modern", label: "Modern" },
];

export function TemplateSelector() {
  const { selectedTemplate, setTemplate } = useResumeStore();

  return (
    <div className="flex items-center gap-2">
      <Select
        value={selectedTemplate}
        onValueChange={(value) => setTemplate(value as TemplateType)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select template" />
        </SelectTrigger>
        <SelectContent>
          {templates.map((template) => (
            <SelectItem key={template.value} value={template.value}>
              {template.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 