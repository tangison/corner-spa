#!/usr/bin/env python3
"""Scan all Vercel projects on a team for domains, find mendozer holder."""
import json
import sys
import urllib.request

VT = sys.argv[1]
TEAM = "team_nLqoCCjxE0cwPkgZNkP5ITX1"


def api(path):
    req = urllib.request.Request(
        f"https://api.vercel.com{path}",
        headers={"Authorization": f"Bearer {VT}"},
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:200]
        print(f"  !! HTTP {e.code} on {path}: {body}", file=sys.stderr)
        return {}


# paginate projects
projects = []
url = f"/v9/projects?teamId={TEAM}&limit=100"
while url:
    d = api(url)
    projects.extend(d.get("projects", []))
    pag = d.get("pagination")
    if pag and pag.get("next"):
        url = f"/v9/projects?teamId={TEAM}&limit=100&until={pag['next']}"
    else:
        url = None

print(f"total projects on team: {len(projects)}")
found = []
for p in projects:
    pid, name = p["id"], p["name"]
    d = api(f"/v9/projects/{pid}/domains?teamId={TEAM}")
    doms = [x["name"] for x in d.get("domains", [])]
    if doms:
        print(f"{name} ({pid}): {', '.join(doms)}")
    if any("mendozer" in x for x in doms):
        found.append((name, pid, doms))

print("---")
print("mendozer holders:", found or "NONE on this team")

# also check corner-spa details for production alias info
cs = api(f"/v9/projects/prj_H1Lw77dkr2QgMXYRe3KlnagpV5q3/domains?teamId={TEAM}")
print("corner-spa domains:", [x["name"] for x in cs.get("domains", [])])
print("corner-spa domain statuses:")
for x in cs.get("domains", []):
    print(" ", x["name"], "verified:", x.get("verified"), "prod:", x.get("production"), "redirect:", x.get("redirect"))
