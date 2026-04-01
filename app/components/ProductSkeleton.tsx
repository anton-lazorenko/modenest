export default function ProductSkeleton() {
  return (
    <div className="bg-white max-h-[420px] rounded-2xl w-64 overflow-hidden shadow-md animate-pulse">
      {/* Картинка */}
      <div className="bg-gray-300 w-full h-64"></div>

      {/* Контент */}
      <div className="p-4 flex flex-col gap-2">
        <div className="bg-gray-300 h-6 w-3/4 rounded"></div> {/* название */}
        <div className="bg-gray-300 h-6 w-1/4 rounded"></div> {/* цена */}
        <div className="bg-gray-300 h-10 w-full rounded mt-2"></div> {/* кнопка */}
      </div>
    </div>
  );
}