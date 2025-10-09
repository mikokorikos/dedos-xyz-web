const MOBILE_RE = /Android|iPhone|iPad|iPod/i
const IOS_RE = /iPhone|iPad|iPod/i

function ensureBrowserEnvironment() {
  return typeof window !== "undefined" && typeof document !== "undefined"
}

export function openWithFallback(opts: {
  appUrl: string
  webUrl: string
  timeoutMs?: number
}) {
  if (!ensureBrowserEnvironment()) return

  const { appUrl, webUrl, timeoutMs = 1200 } = opts
  const started = Date.now()

  const timer = window.setTimeout(() => {
    const elapsed = Date.now() - started
    if (elapsed < timeoutMs + 80) {
      cancelFallback()
      window.location.href = webUrl
    }
  }, timeoutMs)

  const cancelFallback = () => {
    window.clearTimeout(timer)
    document.removeEventListener("visibilitychange", onVisibilityChange)
    window.removeEventListener("pagehide", cancelFallback)
  }

  const onVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      cancelFallback()
    }
  }

  document.addEventListener("visibilitychange", onVisibilityChange)
  window.addEventListener("pagehide", cancelFallback)

  try {
    // iOS prefers an iframe-based navigation, desktops can use location.href
    if (IOS_RE.test(navigator.userAgent)) {
      const iframe = document.createElement("iframe")
      iframe.style.display = "none"
      iframe.src = appUrl
      document.body.appendChild(iframe)
      window.setTimeout(() => iframe.remove(), timeoutMs + 200)
    } else {
      window.location.href = appUrl
    }
  } catch (error) {
    cancelFallback()
    window.location.href = webUrl
  }
}

export function openDiscordInvite(invite: string, timeoutMs?: number) {
  if (!ensureBrowserEnvironment()) return

  const code = invite.replace(/^https?:\/\/(?:www\.)?discord\.gg\//i, "").trim()
  const ua = navigator.userAgent
  const isAndroid = /Android/i.test(ua)
  const webUrl = `https://discord.gg/${code}`

  if (isAndroid) {
    const intent = `intent://discord.com/invite/${code}#Intent;package=com.discord;scheme=https;end;`
    openWithFallback({ appUrl: intent, webUrl, timeoutMs: timeoutMs ?? 900 })
    return
  }

  const appUrl = `discord://-/invite/${code}`
  openWithFallback({ appUrl, webUrl, timeoutMs: timeoutMs ?? (MOBILE_RE.test(ua) ? 900 : 1400) })
}

export function openRobloxDestination(webUrl: string, timeoutMs?: number) {
  if (!ensureBrowserEnvironment()) return

  const ua = navigator.userAgent
  const isAndroid = /Android/i.test(ua)
  const isMobile = MOBILE_RE.test(ua)

  if (isAndroid) {
    const fallback = encodeURIComponent(webUrl)
    const intent = `intent://roblox.com/#Intent;scheme=roblox;package=com.roblox.client;S.browser_fallback_url=${fallback};end;`
    openWithFallback({ appUrl: intent, webUrl, timeoutMs: timeoutMs ?? 900 })
    return
  }

  if (isMobile) {
    openWithFallback({
      appUrl: "roblox://navigation/app",
      webUrl,
      timeoutMs: timeoutMs ?? 900,
    })
    return
  }

  openWithFallback({
    appUrl: "roblox-player://",
    webUrl,
    timeoutMs: timeoutMs ?? 1500,
  })
}
