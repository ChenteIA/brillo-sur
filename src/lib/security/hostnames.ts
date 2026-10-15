// Dominios desde los que aceptamos un token de Turnstile: el configurado en
// NEXT_PUBLIC_SITE_URL y el dominio real de la petición (en Vercel, el header
// Host lo fija la plataforma). Así el sitio funciona igual en *.vercel.app y en el dominio .pe.
export function allowedHostnames(siteUrl: string, requestHost: string | null): string[] {
  const hosts = new Set<string>([new URL(siteUrl).hostname]);
  if (requestHost) hosts.add(requestHost.split(":")[0].toLowerCase());
  return [...hosts];
}

// Claves de prueba públicas de Cloudflare (siempre aprueban y reportan "example.com").
export function isTurnstileTestSecret(secret: string): boolean {
  return /^[123]x0{31}AA$/.test(secret);
}
