import type React from "react"
import { Skeleton } from "./Skeleton"

export const ProductDetailSkeleton: React.FC = () => (
    <div className="min-h-screen bg-white px-4 pt-24 text-black sm:px-6 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 py-8 lg:grid-cols-2">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-5 py-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    </div>
)
