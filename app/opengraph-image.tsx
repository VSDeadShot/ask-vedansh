import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f3efe6",
          color: "#1b1a17",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#5f594e" }}>
          {site.intro.kicker}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, maxWidth: 900 }}>{site.intro.headline}</div>
          <div style={{ fontSize: 64, marginTop: 20, color: "#c23a17", fontStyle: "italic" }}>
            {site.intro.prompt}
          </div>
        </div>
        <div style={{ display: "flex", height: 6, background: "#1b1a17" }} />
      </div>
    ),
    size,
  );
}
