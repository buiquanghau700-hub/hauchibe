export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="grid h-64 place-items-center rounded-lg border border-dashed border-zinc-800 text-center">
      <div><p className="font-medium">{title}</p>{hint && <p className="mt-1 text-sm text-zinc-500">{hint}</p>}</div>
    </div>
  );
}
