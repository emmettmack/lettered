# Lettered

Read this file, then `docs/product.md` and `docs/brand.md`, before changing anything. Where they disagree with this file, this file wins and the doc should be fixed.

## What it is

A members-only dating app for athletes. It sits between Surf Dating and Raya, with Raya-level prestige and a strong sense of lore. Emmett's partner (based in Colorado) founded it. It is being formed as a Colorado LLC. Emmett (USC sprinter, PR major) runs the build and can reach many D1 athletes through USC.

Tone: if I don't want you, you want me.

## Who gets in

- **The Roster.** Olympians, pros and top D1 athletes. Invited directly, approved fast after a roster check.
- **Everyone else applies and waits blind.** Gym workers, fitness influencers, surfers, skaters, other collegiate athletes. Nobody sees a waitlist position. Approval arrives as a surprise acceptance email, and then they pay.
- Growth is word of mouth only. No ads, no press.

## Locked decisions

- Nobody uses it free. Entry is a credit card or a personal code Emmett gives to friends.
- $7.99/month. The paywall comes before any access. No free trial.
- Acceptance never expires.
- Friends mode stays.
- Waitlist UI and networking/career features are cut for now.
- Discretion is mandatory. No public member counts, no tenure badges, nothing that publicly marks someone as being on a dating app.
- The prototype is rebuilt from scratch. Do not patch the old one.

## Priorities

1. An extremely refined look. Goal #1. Every screen premium and minimal, never template-like.
2. Retention. Give people a reason to keep opening the app after they match.
3. Launch in LA first (pro and D1 athletes), then expand to all collegiate.

## Timeline

Off the ground within 30 days of 2026-11-23. Must be out before Christmas break.

## Open issue

An interest survey promised early-access signups (email/phone) their first month free at launch. That conflicts with "no free trial". The proposed fix is in the plan and needs Emmett's sign-off before anything is built on it. Until then, add no free-month logic anywhere.

## Repo state

- `prototype/index.html`: the old single-file clickable prototype (plain HTML/CSS/JS, no build). Reference for flow and copy only. It is being replaced.
- `index.html`: redirects the GitHub Pages root to the prototype.
- `docs/product.md`, `docs/brand.md`: still accurate. Keep. Brand colors, fonts and approved copy lines are binding.
- No backend, no app code, no tests, no CI.

## How to work with Emmett

- Don't repeat his requests back. Do the work, then say what changed in a line or two.
- Ask before big rebuilds. Small fixes, just make them.
- Short, direct sentences. Opinion first.
- He wants work that looks extremely refined and doesn't read as AI-made.

## Rules

- Follow the brand colors and fonts exactly (`docs/brand.md`). Copy follows its voice rules.
- Never add a free trial, waitlist numbers, member numbers, tenure badges or public counts. See "Ruled out" in `docs/product.md`.
- Never tell a rejected applicant anything. No status updates, no timelines.
- No analytics, logs or emails that expose who is a member.
- Verify UI changes in a real browser or simulator before committing.
- Do not start building until Emmett has approved the plan.
