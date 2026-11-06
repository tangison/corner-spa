// Force the dark token set on a page from the first paint.
// A one-line inline script runs while the HTML is still parsing, before the
// header renders, so the page never flashes light. The dark palette itself
// already lives in globals.css under :root[data-theme="dark"]; this only
// turns the key. Without JavaScript the page simply stays in the light
// theme: same content, same order, nothing hidden.
export function DarkPage() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: "document.documentElement.setAttribute('data-theme','dark')",
      }}
    />
  );
}
