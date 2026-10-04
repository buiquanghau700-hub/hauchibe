import { EmptyState } from "@/components/ui/EmptyState";
export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="p-6"><h1 className="mb-4 text-xl font-semibold">{title}</h1>
      <EmptyState title="Màn hình này chưa được dựng" hint="Types, mock và services cho màn này đã sẵn sàng trong /types, /mock, /services." /></div>
  );
}
