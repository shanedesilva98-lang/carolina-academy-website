/**
 * Accessible, lazy-loaded video embed placeholder. Pass a YouTube/Vimeo
 * embed URL once real video content is available; until then this renders a
 * labelled placeholder so the layout can be reviewed.
 */
export function VideoEmbed({ url, title }: { url?: string; title: string }) {
  if (!url) {
    return (
      <div
        role="img"
        aria-label={`Video placeholder: ${title}`}
        className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-border bg-surface-soft text-sm font-medium text-ink-muted"
      >
        Video placeholder — {title} (add embed URL when available)
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border">
      <iframe
        src={url}
        title={title}
        loading="lazy"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
