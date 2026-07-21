"""Verify every image path referenced in projects.ts exists on disk, and that
no portfolio photo is orphaned.

`npm run build` does NOT catch broken /public paths — a deleted photo still
referenced in projects.ts silently 404s in the browser while the build reports
success. This closes that gap.

Run from website/:  python scripts/check-images.py
Exits non-zero on any mismatch so it can gate a build.
"""

import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.dirname(HERE)
PROJECTS = os.path.join(WEB, "src", "lib", "data", "projects.ts")
PUBLIC = os.path.join(WEB, "public")
PORTFOLIO = os.path.join(PUBLIC, "images", "portfolio")

with open(PROJECTS, encoding="utf-8") as fh:
    referenced = set(re.findall(r'"(/images/portfolio/[^"]+)"', fh.read()))

on_disk = set()
for slug in sorted(os.listdir(PORTFOLIO)):
    d = os.path.join(PORTFOLIO, slug)
    if os.path.isdir(d):
        for f in os.listdir(d):
            on_disk.add(f"/images/portfolio/{slug}/{f}")

missing = sorted(referenced - on_disk)   # referenced but deleted -> 404 in browser
orphaned = sorted(on_disk - referenced)  # on disk but unused -> dead weight

for p in missing:
    print(f"BROKEN   {p}  (referenced in projects.ts, not on disk)")
for p in orphaned:
    print(f"ORPHAN   {p}  (on disk, not referenced in projects.ts)")

print(f"\n{len(referenced)} referenced | {len(on_disk)} on disk | "
      f"{len(missing)} broken | {len(orphaned)} orphaned")

if missing:
    print("\nFAIL: broken image references would 404 in the browser.")
    sys.exit(1)
print("OK: every referenced image exists.")
