// Minimal, XSS-safe markdown renderer for assistant replies.
// Escapes all HTML first, then applies a small subset of markdown.
export function renderMarkdown(markdown: string): string {
  const escaped = markdown
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const lines = escaped.split(/\r?\n/);
  const html: string[] = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };

  for (const line of lines) {
    const inline = line
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");

    const heading = inline.match(/^#{1,4}\s+(.*)$/);
    const listItem = inline.match(/^\s*[-*]\s+(.*)$/);

    if (heading) {
      closeList();
      html.push(`<p class="md-heading">${heading[1]}</p>`);
    } else if (listItem) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${listItem[1]}</li>`);
    } else if (inline.trim() === "") {
      closeList();
    } else {
      closeList();
      html.push(`<p>${inline}</p>`);
    }
  }
  closeList();
  return html.join("");
}
