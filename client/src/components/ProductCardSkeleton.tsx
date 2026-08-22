import type React from "react"
import { Skeleton } from "./Skeleton"

export const ProductCardSkeleton: React.FC = () => (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
        <Skeleton className="h-64 w-full rounded-none" />
        <div className="space-y-3 p-6">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
    </div>
)
