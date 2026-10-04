"use client";

import NextError from "next/error";

// Unknown paths fall through to this page; it sits outside app/[locale] so it
// needs its own <html> shell.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  );
}
