// Dominios aceptados para Turnstile (punto 12). Ejecutar: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { allowedHostnames, isTurnstileTestSecret } from "../src/lib/security/hostnames.ts";

test("acepta el dominio configurado y el dominio real de la petición", () => {
  assert.deepEqual(
    allowedHostnames("https://brillo-sur.vercel.app", "brillo-sur-kohl.vercel.app").sort(),
    ["brillo-sur-kohl.vercel.app", "brillo-sur.vercel.app"],
  );
  assert.deepEqual(allowedHostnames("https://brillosur.pe", "BrilloSur.pe:443"), ["brillosur.pe"]);
  assert.deepEqual(allowedHostnames("https://brillosur.pe", null), ["brillosur.pe"]);
});

test("reconoce las claves de prueba de Cloudflare", () => {
  assert.equal(isTurnstileTestSecret("1x0000000000000000000000000000000AA"), true);
  assert.equal(isTurnstileTestSecret("2x0000000000000000000000000000000AA"), true);
  assert.equal(isTurnstileTestSecret("0x4AAAAAAAxxxxxxxxxxxxxxxxxxxxxxxxx"), false);
});
