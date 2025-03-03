export function ResumePreview() {
  return (
    <div className="relative h-[400px] lg:h-[500px] rounded-lg shadow-xl overflow-hidden border">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[80%] h-[80%] bg-white rounded-lg shadow-lg overflow-hidden border">
          <div className="h-[10%] bg-primary/10 border-b flex items-center px-4">
            <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="h-[90%] flex">
            <div className="w-1/3 border-r p-4 bg-gray-50">
              <div className="h-4 w-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
            </div>
            <div className="w-2/3 p-4">
              <div className="h-6 w-40 bg-gray-200 rounded mb-6 mx-auto"></div>
              <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-3/4 bg-gray-200 rounded mb-6"></div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 