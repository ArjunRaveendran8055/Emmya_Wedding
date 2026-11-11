# Emmya & Manu — Betrothal Invitation

A React + Vite invitation for 14 November 2026, 11:30 AM onwards, at Christ The King Church, Krishnankotta.

## Run locally

```sh
nvm install
nvm use
npm install
npm run dev
```

Node 22 is selected by `.nvmrc`. Run `nvm use` in each new terminal before starting Vite; Node 20.9.0 is unsupported.

```sh
npm run build
npm run preview
```

## Deploy on Vercel

Import `ArjunRaveendran8055/Emmya_Wedding` at https://vercel.com/new. Use the repository root (`./`), the Vite framework preset, `npm run build` for the build command, and `dist` for the output directory. `package.json` pins Node 22 and `vercel.json` supplies the build settings. No environment variables are required.

Use `master` as the production branch. Once the GitHub repository is connected, pushes to that branch trigger production deployments. After deployment, verify the photos, music, PDF download, directions, and RSVP from the public URL. FormSubmit recipient activation is still required for RSVP email delivery.

## Fill in the missing details

Edit `src/data/weddingContent.js`. The visible “Still to add” checklist is derived from this configuration:

- `storyMoments`: add `{ year, title, description }` entries.
- `photoSlots`: put new images in `public/images/`, then fill in each slot’s `src` (for example `/images/couple.jpg`) and descriptive `alt`. Add or remove slots as needed. The six supplied photos are already configured; the PDF portrait is the fallback when no photos are supplied.
- `dressDetails`: add confirmed attire preferences or guest notes as strings.
- `weddingInfo.contact`: fill in `phone` and/or `email` for family enquiries. These also provide RSVP contact links if there is no response-form URL.
- `rsvpDetails`: the embedded form posts to FormSubmit and emails `sunnyebin48@gmail.com`. Set `url` to use a different external response form instead.

Completed items disappear from the checklist. Incomplete sections remain visibly labelled; no couple story, dress requirement, RSVP deadline, or reception is assumed.

## RSVP email setup

The RSVP form collects a guest’s name, email, attendance, guest count, and optional message. It submits directly to FormSubmit over HTTPS, which handles verification and confirmation and emails the response to `sunnyebin48@gmail.com`. No email password or API key is needed in this repository. Guest responses pass through FormSubmit; this app does not store a copy.

Before sharing the site, submit the form once from the running website, then open FormSubmit’s activation email in the recipient inbox (check spam too) and confirm the address. Resubmit after activation and verify receipt. Do not assume the initial activation submission was delivered as an RSVP. Normal submissions retain FormSubmit’s CAPTCHA protection. The website does not display its own success message before the provider processes a submission.

See [FormSubmit’s setup instructions](https://formsubmit.co/). No real test email was sent during implementation, so recipient activation and inbox delivery still need to be verified.

## Invitation and directions

The original PDF is in `public/invitations/emmya-manu-betrothal.pdf`. A fallback portrait is rendered from its first page. The gallery uses optimized copies of the six supplied photos, leaving the originals untouched. Directions currently use a labelled Google Maps search for the church because the PDF QR code could not be decoded in the development environment. Replace the venue URLs with a confirmed map location when available.

## Music

“A Quiet Promise” is an original, calm, wordless piano-style instrumental made without third-party samples. Its composition and synthesized recording are dedicated to CC0 1.0; see `public/audio/LICENSE.txt`. The site attempts playback on load at a soft volume. If the browser blocks audible autoplay, playback is retried on a click/tap or key press. The music button always allows visitors to pause or resume; pausing disables further automatic starts for that visit.

To regenerate the recording, run `python3 scripts/create-piano.py` from this directory. To replace it, update `music` in the content configuration and include the new recording’s license and attribution.
