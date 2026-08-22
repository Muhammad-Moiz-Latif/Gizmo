import type React from "react"

interface SkeletonProps {
    className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => (
    <div className={`animate-pulse rounded bg-gray-200 ${className}`} aria-hidden="true" />
)
