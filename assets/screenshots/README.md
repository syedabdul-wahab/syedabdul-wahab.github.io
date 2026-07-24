# Screenshots — how to add them

Each project has its **own folder** here, named after the project's slug.
To add screenshots for a project, just drop image files into its folder named
`1.png`, `2.png`, `3.png`, … in the order you want them shown.

**That's it — no code changes needed.** The site auto-detects them:

- `1.png` becomes the **card thumbnail** in the projects grid.
- All images (`1.png`, `2.png`, …) open in a **swipeable lightbox gallery**
  when the card is clicked (with a 📷 count badge shown on the card).
- A project with no images just shows its colored placeholder, as before.

## Folders (slug → project)

| Folder | Project |
|---|---|
| `moneda/` | Moneda — Scan & Pay |
| `iptv-smarter/` | IPTV Smarter Player |
| `candy-box/` | Candy Box ✅ (4 screenshots added) |
| `bhpic/` | BHPic |
| `epson-smart-printer/` | Epson Smart Printer |
| `notebook/` | NoteBook |
| `kultara/` | Kultara — Music App |
| `galamons/` | Galamons Companion |
| `design-studio/` | Design Studio |
| `ad-blocker/` | Ad Blocker |
| `snapshot/` | Snapshot |
| `meetings/` | Meetings |
| `label-maker/` | Label Maker |
| `tutorai/` | TutorAI |
| `luxe/` | LUXE |
| `nfc-tag/` | NFC Tag |
| `driver-buddy/` | Driver Buddy |
| `habitzu/` | Habitzu |

## Rules & tips

- **File names must be** `1.png`, `2.png`, `3.png` … (consecutive, starting at 1).
  The gallery stops at the first missing number — e.g. if `3.png` is absent,
  only `1.png` and `2.png` show.
- **PNG only** (the auto-detector looks for `.png`). If you have JPGs, convert
  or rename them to `.png`.
- Any aspect ratio works. Full phone-mockup screenshots (portrait, on a dark
  background) look great — the card crops to center, the lightbox shows the
  whole image.
- After adding files: `git add . && git commit -m "Add <project> screenshots" && git push`
  and they go live in ~1 minute.

## Optional: nice captions

Screenshots get an automatic caption (`Project — 2 / 4`). To write custom
captions, edit the `CAPTIONS` object near the top of [`../../js/main.js`](../../js/main.js)
— see the Candy Box entry as an example. (Just send them to me and I'll add them.)

## The hero iPhone

`hero.png` (in **this** top-level folder, not a subfolder) fills the iPhone in
the hero section. Use a **portrait** iPhone screenshot (~9:19).
