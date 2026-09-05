import type { NextConfig } from "next";

// Conservative, low-breakage security headers applied to every route.
// Intentionally no strict Content-Security-Policy yet — Next.js emits inline
// styles/JSON that a tight CSP would break; add a nonce-based CSP later with
// dedicated testing. These apply when served by a Node/Vercel runtime; if the
// site moves to a pure static-export CDN, replicate them at the CDN edge.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // LAN IP for testing the dev server from a phone on the same Wi-Fi, plus
  // Tailscale IPs for remote viewers off the LAN. Next.js 16 blocks
  // cross-origin dev requests (HMR, RSC) by default.
  allowedDevOrigins: ["192.168.1.87", "192.168.1.75", "100.91.124.122"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
