import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getMargin = (width: number, height: number, r = 0.15) => {
    const min = Math.min(width, height);
    return Math.round(min * r);
};

export function toDownloadFile(data: string, filename: string) {
  const link = document.createElement('a');
  link.href = data;
  link.download = filename;
  link.click();
}