#!/usr/bin/env python3
"""Scan a Vercel token's personal + team scopes for a domain holder."""
import json
import sys
import urllib.request

VT = sys.argv[1]
NEEDLE = sys.argv[2] if len(sys.argv) > 2 else "mendozer"


def api(path):
    req = urllib.request.Request(
        f"https://api.vercel.com{path}", headers={"Authorization": f"Bearer {VT}"}
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        return {"__error": e.code, "msg": e.read().decode()[:150]}


def scan(scope_label, team_id):
    projects, url = [], f"/v9/projects?limit=100" + (f"&teamId={team_id}" if team_id else "")
    while url:
        d = api(url)
        projects.extend(d.get("projects", []))
        pag = d.get("pagination")
        url = f"{url.split('?')[0]}?limit=100&until={pag['next']}" + (
            f"&teamId={team_id}" if team_id else ""
        ) if pag and pag.get("next") else None
    print(f"[{scope_label}] {len(projects)} projects")
    for p in projects:
        pid, name = p["id"], p["name"]
        d = api(f"/v9/projects/{pid}/domains?limit=100" + (f"&teamId={team_id}" if team_id else ""))
        doms = [x["name"] for x in d.get("domains", [])]
        if doms:
            print(f"  {name} ({pid}): {', '.join(doms)}")
        hits = [x for x in doms if NEEDLE in x]
        if hits:
            print(f"  *** HOLDER: {name} ({pid}) -> {hits}")
            latest = (p.get("latestDeployments") or [{}])[0]
            print(f"      latest deployment: url={latest.get('url')} createdAt={latest.get('createdAt')}")


scan("personal", None)
teams = api("/v2/teams?limit=20").get("teams", [])
for t in teams:
    scan(f"team:{t.get('slug')}", t["id"])
