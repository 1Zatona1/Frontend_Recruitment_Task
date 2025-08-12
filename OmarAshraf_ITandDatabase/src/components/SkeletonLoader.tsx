export const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center animate-pulse">
          <div className="w-48 h-48 bg-gray-200 mb-4 rounded-lg"></div>
          <div className="w-full h-6 bg-gray-200 mb-2 rounded"></div>
          <div className="w-1/2 h-6 bg-gray-200 mb-4 rounded"></div>
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};