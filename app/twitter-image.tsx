import { ImageResponse } from "next/og";

import { siteConfig } from "@/src/server/site-config";

export const alt = "Mesut Tutsak Twitter preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "40px",
          background:
            "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 45%, #cbd5e1 100%)",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "48px",
            borderRadius: "32px",
            background: "rgba(255, 255, 255, 0.92)",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            boxShadow: "0 16px 48px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 700,
                color: "#334155",
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#64748b",
              }}
            >
              Portfolio
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxWidth: "780px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 72,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {siteConfig.role}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                lineHeight: 1.35,
                color: "#475569",
              }}
            >
              {siteConfig.description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 20,
              color: "#64748b",
            }}
          >
            <div style={{ display: "flex" }}>{siteConfig.domainLabel}</div>
            <div style={{ display: "flex" }}>Contact / Experience / Awards</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
