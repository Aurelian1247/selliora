type UsageCardProps = {
  label: string;
  value: string;
  description: string;
};

export function UsageCard({ label, value, description }: UsageCardProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <p className="text-sm text-white/50">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-white/60">{description}</p>
    </div>
  );
}