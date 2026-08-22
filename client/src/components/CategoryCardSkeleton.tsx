import type React from "react"
import { Skeleton } from "./Skeleton"

export const CategoryCardSkeleton: React.FC = () => (
    <div className="h-[300px] w-full overflow-hidden rounded-xl border border-white/10 bg-gray-900 sm:h-[350px] md:h-[400px]">
        <Skeleton className="h-full w-full rounded-none bg-gray-800" />
    </div>
)
