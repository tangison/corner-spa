# Showing Corner Spa at oryxinstitute.org/corner-spa

Deploy `index.html` in this folder at `oryxinstitute.org/corner-spa/`. It is a full-screen iframe of `https://spa.mendozer.com/`, so visitors see only the spa site.

## Back button
The embedded site must not add history entries inside the iframe, otherwise Back would step through the spa page instead of returning to the Oryx website. reference-design.html already does this: when it runs inside a frame, its in-page links scroll without changing the URL hash. Keep that behaviour in the final build, and avoid pushState, hash routing and extra pages while embedded.

## Allow framing on spa.mendozer.com (required)
Send this header from spa.mendozer.com, and do not send X-Frame-Options DENY or SAMEORIGIN:

    Content-Security-Policy: frame-ancestors 'self' https://oryxinstitute.org https://www.oryxinstitute.org

Vercel example (vercel.json):

    { "headers": [ { "source": "/(.*)", "headers": [ { "key": "Content-Security-Policy", "value": "frame-ancestors 'self' https://oryxinstitute.org https://www.oryxinstitute.org" } ] } ] }

## Search
The embed page points its canonical link to spa.mendozer.com so the two addresses do not compete in search.

## Footer on both addresses
"First project of Oryx Institute. A concept by Mendozer Investments." Both addresses are shown: spa.mendozer.com and oryxinstitute.org/corner-spa.
