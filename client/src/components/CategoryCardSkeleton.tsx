import type React from "react"
import { Skeleton } from "./Skeleton"

export const CategoryCardSkeleton: React.FC = () => (
    <div className="h-[300px] w-full overflow-hidden rounded-xl border border-white/10 bg-gray-900 sm:h-[350px] md:h-[400px]">
        <Skeleton className="h-full w-full rounded-none bg-gray-800" />
        <div className="-mt-32 relative space-y-3 px-6">
            <Skeleton className="h-6 w-2/3 bg-gray-700" />
            <Skeleton className="h-4 w-full bg-gray-700" />
            <Skeleton className="h-9 w-28 rounded-full bg-gray-700" />
        </div>
    </div>
)
