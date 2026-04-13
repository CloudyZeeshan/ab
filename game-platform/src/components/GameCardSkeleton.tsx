// Skeleton loading component for game cards
export default function GameCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="relative aspect-video bg-gray-700" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-700 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-2/3" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-700 rounded-full w-16" />
          <div className="h-6 bg-gray-700 rounded-full w-12" />
        </div>
      </div>
    </div>
  );
}
