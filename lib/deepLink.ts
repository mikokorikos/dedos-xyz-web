export function openWithFallback(opts: {
  appUrl: string
  webUrl: string
  timeoutMs?: number
}) {
  const { appUrl, webUrl, timeoutMs = 1200 } = opts
  const started = Date.now()
  const i = setTimeout(() => {
    const elapsed = Date.now() - started
    if (elapsed < timeoutMs + 50) window.location.href = webUrl
  }, timeoutMs)

  const a = document.createElement("a")
  a.href = appUrl
  document.body.appendChild(a)
  a.click()
  setTimeout(() => { clearTimeout(i); a.remove() }, timeoutMs + 2000)
}
