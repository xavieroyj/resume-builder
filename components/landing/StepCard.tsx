interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
        <span className="text-2xl font-bold text-primary">{number}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
} 