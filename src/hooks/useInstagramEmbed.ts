"use client";

import { useEffect, useMemo } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds?: { process: () => void } };
  }
}

function isInstagramEmbed(code: string): boolean {
  return (
    typeof code === "string" &&
    (code.includes("instagram-media") || code.includes("instagram.com/embed"))
  );
}

function isTiktokEmbed(code: string): boolean {
  return (
    typeof code === "string" &&
    (code.includes("tiktok-embed") || code.includes("tiktok.com/embed"))
  );
}

function stripScriptTags(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .trim();
}

function processEmbeds(): void {
  if (typeof window !== "undefined" && window.instgrm?.Embeds?.process) {
    window.instgrm.Embeds.process();
  }
}

function waitForInstgrmThenProcess(): () => void {
  if (typeof window !== "undefined" && window.instgrm?.Embeds?.process) {
    processEmbeds();
    return () => {};
  }
  const id = setInterval(() => {
    if (window.instgrm?.Embeds?.process) {
      clearInterval(id);
      processEmbeds();
    }
  }, 100);
  return () => clearInterval(id);
}

export interface UseThirdPartyEmbedResult {
  isInstagram: boolean;
  isTiktok: boolean;
  html: string;
}

export function useThirdPartyEmbed(
  rawCode: string | undefined,
): UseThirdPartyEmbedResult {
  const isInstagram = useMemo(
    () => Boolean(rawCode && isInstagramEmbed(rawCode)),
    [rawCode],
  );
  const isTiktok = useMemo(
    () => Boolean(rawCode && isTiktokEmbed(rawCode)),
    [rawCode],
  );

  const needsScriptStrip = isInstagram || isTiktok;
  const html = useMemo(
    () =>
      rawCode
        ? needsScriptStrip
          ? stripScriptTags(rawCode)
          : rawCode
        : "",
    [rawCode, needsScriptStrip],
  );

  useEffect(() => {
    if (!isInstagram || !html) return;
    return waitForInstgrmThenProcess();
  }, [isInstagram, html]);

  return { isInstagram, isTiktok, html };
}

/** @deprecated Use useThirdPartyEmbed for new code. */
export function useInstagramEmbed(rawCode: string | undefined): {
  isInstagram: boolean;
  html: string;
} {
  const { isInstagram, html } = useThirdPartyEmbed(rawCode);
  return { isInstagram, html };
}

export const INSTAGRAM_EMBED_SCRIPT_URL =
  "https://www.instagram.com/embed.js";

export const TIKTOK_EMBED_SCRIPT_URL = "https://www.tiktok.com/embed.js";
