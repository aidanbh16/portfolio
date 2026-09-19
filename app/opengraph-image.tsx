import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, siteUrl } from "./data";

// The link preview shown when the site is shared (LinkedIn, Slack, iMessage…).
// Same charcoal, cream, and blue as the site.

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [sans, sansBold] = await Promise.all([
    readFile(join(process.cwd(), "assets/IBMPlexSans-Regular.ttf")),
    readFile(join(process.cwd(), "assets/IBMPlexSans-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "88px 96px",
          background: "#161512",
          color: "#ece7dc",
          fontFamily: "Plex",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#a19a8d" }}>{`${profile.role} · ${profile.location}`}</div>
          <div style={{ fontWeight: 600, fontSize: 120, lineHeight: 1, marginTop: 26, letterSpacing: -3 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 36, lineHeight: 1.4, color: "#a19a8d", marginTop: 32, maxWidth: 900 }}>
            {profile.pitch}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #34312b",
            paddingTop: 28,
            fontSize: 28,
          }}
        >
          <span style={{ color: "#7aa7f5", fontWeight: 600 }}>{siteUrl.replace(/^https?:\/\//, "")}</span>
          <span style={{ color: "#a19a8d" }}>{profile.available ? "Open to new roles" : profile.role}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plex", data: sans, weight: 400, style: "normal" },
        { name: "Plex", data: sansBold, weight: 600, style: "normal" },
      ],
    },
  );
}
