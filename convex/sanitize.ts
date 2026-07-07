/**
 * Input Sanitization Utilities
 * Used in both Convex mutations and frontend components to prevent XSS and injection.
 */

/**
 * Strips all HTML tags and removes executable javascript/vbscript/data URL protocols
 */
export function sanitizeText(str: string): string {
  if (typeof str !== "string") return "";
  
  // 1. Remove HTML tags completely
  let cleaned = str.replace(/<[^>]*>/g, "");
  
  // 2. Strip potential dangerous javascript: or data: prefixes
  cleaned = cleaned.replace(/^\s*(javascript|data|vbscript|file):/gi, "");
  
  return cleaned.trim();
}

/**
 * Ensures URLs only use safe protocols (http, https) or valid relative paths
 */
export function sanitizeUrl(str: string): string {
  if (typeof str !== "string") return "";
  const trimmed = str.trim();
  if (!trimmed) return "";

  // Allow relative paths starting with /
  if (trimmed.startsWith("/")) return trimmed;

  // Validate absolute URL protocols
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return trimmed;
    }
  } catch {
    // If URL parsing fails, check if it looks like a clean relative path/identifier
    if (/^[a-zA-Z0-9_\-\/\.\?\&=\+:%]+$/.test(trimmed)) {
      return trimmed;
    }
  }
  return "";
}

/**
 * Validates and extracts Instagram shortcode to generate a clean, safe, standardized Instagram embed
 */
export function sanitizeInstagramEmbed(str: string): string {
  if (typeof str !== "string") return "";
  
  // Extract the unique shortcode (reel or post) from the Instagram URL/block
  const match = str.match(/instagram\.com\/(?:reel|p|tv)\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    const shortcode = match[1];
    // Reconstruct a static, safe embed markup using the validated shortcode
    return `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${shortcode}/" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"><a href="https://www.instagram.com/p/${shortcode}/" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"></a></div></blockquote><script async src="//www.instagram.com/embed.js"></script>`;
  }
  
  return "";
}

/**
 * Standardizes and sanitizes emails
 */
export function sanitizeEmail(str: string): string {
  if (typeof str !== "string") return "";
  // Strip spaces, HTML tags, and keep valid email characters, converting to lowercase
  const cleanedText = sanitizeText(str);
  return cleanedText
    .replace(/[^a-zA-Z0-9@\.\-\_\+\*]/g, "")
    .toLowerCase()
    .trim();
}
