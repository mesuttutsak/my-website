import { ImageResponse } from "next/og";

import { siteConfig } from "@/src/server/site-config";

export const alt = "Mesut Tutsak portfolio preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background: "#f6f8fa",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "999px",
            background: "rgba(59, 130, 246, 0.14)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-180px",
            left: "-20px",
            width: "460px",
            height: "460px",
            borderRadius: "999px",
            background: "rgba(15, 23, 42, 0.08)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "48px",
            padding: "48px",
            width: "100%",
            borderRadius: "32px",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#475569",
            }}
          >
            Portfolio
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              maxWidth: "820px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 78,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 34,
                fontWeight: 600,
                color: "#334155",
              }}
            >
              {siteConfig.role}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                lineHeight: 1.4,
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
              fontSize: 22,
              color: "#64748b",
            }}
          >
            <div style={{ display: "flex" }}>{siteConfig.domainLabel}</div>
            <div style={{ display: "flex" }}>React / Next.js / TypeScript</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
