// Use static image URLs instead of Supabase storage
export function getPublicUrl(path: string): string {
  // Return static URL for images
  return `/images/${path}`;
}