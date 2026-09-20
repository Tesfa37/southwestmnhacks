import { describe, it, expect } from "vitest"
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  SOCIAL_LINKS,
  SCHWANS_INSTAGRAM_URL,
  SCHWANS_LINKEDIN_URL,
} from "../lib/config"

/**
 * These URLs are rendered in the footer and on /contact, and they go into the
 * Organization schema's `sameAs`, which nonprofit verifiers read. The realistic
 * regression is confusing them with the SCHWANS_* constants — a sponsor's posts
 * about the March event, which sit right above them in lib/config.ts and share
 * two of the three hostnames.
 */
describe("the nonprofit's own social profiles", () => {
  const CASES = [
    { name: "Facebook", url: FACEBOOK_URL, host: "www.facebook.com" },
    { name: "Instagram", url: INSTAGRAM_URL, host: "www.instagram.com" },
    { name: "LinkedIn", url: LINKEDIN_URL, host: "www.linkedin.com" },
  ]

  it.each(CASES)("$name is an absolute https URL on $host", ({ url, host }) => {
    const parsed = new URL(url)
    expect(parsed.protocol).toBe("https:")
    expect(parsed.hostname).toBe(host)
    // Tracking and locale params make a poor canonical identity signal.
    expect(parsed.search).toBe("")
  })

  it("does not point at a sponsor's posts instead of our own profiles", () => {
    expect(INSTAGRAM_URL).not.toBe(SCHWANS_INSTAGRAM_URL)
    expect(LINKEDIN_URL).not.toBe(SCHWANS_LINKEDIN_URL)
    // A sponsor's post lives under /p/ (Instagram) or /posts/ (LinkedIn); ours
    // are profile pages.
    expect(INSTAGRAM_URL).not.toContain("/p/")
    expect(LINKEDIN_URL).not.toContain("/posts/")
  })

  it("lists all three, in render order, with no gaps", () => {
    expect(SOCIAL_LINKS.map((s) => s.label)).toEqual(["Facebook", "Instagram", "LinkedIn"])
    expect(SOCIAL_LINKS.map((s) => s.href)).toEqual([FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL])
  })
})
