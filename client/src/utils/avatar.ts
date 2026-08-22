import type React from "react"
import defaultAvatar from "../assets/user.png"

export function getAvatarUrl(image?: string | null): string {
    return image?.trim() ? image : defaultAvatar
}

export function handleAvatarError(event: React.SyntheticEvent<HTMLImageElement>): void {
    event.currentTarget.onerror = null
    event.currentTarget.src = defaultAvatar
}
