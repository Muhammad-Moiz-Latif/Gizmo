import type React from "react"
import { Skeleton } from "./Skeleton"

export const ProductCardSkeleton: React.FC = () => (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-md">
        <Skeleton className="h-48 w-full rounded-none bg-gray-800" />
        <div className="space-y-3 p-6">
            <Skeleton className="mx-auto h-6 w-3/4 bg-gray-700" />
            <Skeleton className="mx-auto h-4 w-1/2 bg-gray-700" />
            <Skeleton className="mx-auto h-7 w-1/3 bg-gray-700" />
            <Skeleton className="h-11 w-full rounded-xl bg-gray-700" />
        </div>
    </div>
)
