
export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        {children} {/* сюда будет рендериться твоя страница [id]/page.tsx */}
      </main>
    </div>
  );
}