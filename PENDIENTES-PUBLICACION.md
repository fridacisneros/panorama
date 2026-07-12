# Pendientes para publicar — Panorama

Lista de lo que falta para publicar **esta versión sin base de datos Postgres**.
Excluye tareas de GitHub / repositorio.

> **Contexto:** en esta versión no se usará Postgres. Al quitar la base de datos,
> **casi todo el sitio funciona tal cual** (inicio, especies + fichas, vedas +
> calendario, normativas + descargas, buzón). Lo único que depende de la BD de
> verdad es el **dashboard**; el resto solo requiere dejar limpios los endpoints
> de datos. El build de producción ya pasa (23/23 páginas).

Prioridad: 🔴 Bloqueante · 🟡 Importante · 🟢 Pulido · ✅ Cierre

---

## 🔴 Bloqueantes (sin esto quedan partes rotas en vivo)

- [ ] **1. Neutralizar el dashboard**
  `app/dashboard/page.tsx` hace fetch a `/api/stats`; sin BD queda roto (500).
  Ocultarlo o reemplazarlo por un placeholder “Próximamente”, y verificar que no
  haya enlaces hacia él. Alternativa: quitar la ruta del build.

- [ ] **2. Retirar / inhabilitar los endpoints que dependen de la BD**
  Sin Postgres, `/api/datos`, `/api/stats` y `/api/especies/[especie]/indicadores`
  devuelven 500. Eliminarlos en esta versión (junto con `lib/db.ts` y la config de
  Drizzle) o dejarlos inertes, para que no queden endpoints rotos accesibles.
  *Nota:* las fichas de especie estáticas **no** usan la BD, así que siguen
  funcionando.

## 🟡 Importantes (experiencia y aspectos legales)

- [ ] **3. Conectar el buzón de sugerencias a un correo**
  Como no habrá BD para guardarlas, `/api/sugerencias` hoy solo valida y hace
  `console.log` (las sugerencias se pierden). Conectarlo a un servicio de correo
  (ej. Resend) para recibirlas por email, o dejar explícito que solo confirma.

- [ ] **4. Agregar aviso de privacidad**
  El buzón recoge **nombre y correo** (datos personales). En México (LFPDPPP) se
  debe incluir un aviso de privacidad y, de preferencia, términos de uso
  (ej. enlace en el footer).

- [ ] **5. Subir las fotos de las especies**
  No existe `public/images/especies/`, por lo que todas las fichas muestran el
  ícono de respaldo en vez de fotos. Subir `public/images/especies/{id}.jpg`
  (`pulpo.jpg`, `almejas.jpg`, `caracoles.jpg`, …) para que aparezcan solas.

## 🟢 Pulido

- [ ] **6. Corregir los conteos hardcodeados**
  El inicio dice “10 Pesquerías” pero hay **11** en `lib/especies-data.ts`; los
  números “147” (vedas) y “114” (normativas) están fijos en el código. Corregir
  10→11 y, de preferencia, derivar los conteos de los datos reales.

- [ ] **7. Limpiar carpetas API vacías**
  `app/api/vedas/` y `app/api/normativas/` no tienen `route.ts` (basura
  inofensiva). Eliminarlas. Revisar también las carpetas de endpoints de BD si se
  retiran (tarea 2).

- [ ] **8. Agregar favicon y metadata para compartir**
  No hay favicon propio (falta `app/icon.png`). Agregar favicon y etiquetas
  OpenGraph/Twitter (título, descripción, imagen) para que el enlace se vea bien
  al compartirse en redes / WhatsApp.

- [ ] **9. Endurecer el build (opcional)**
  `next.config.mjs` tiene `ignoreBuildErrors` e `ignoreDuringBuilds` en `true`, así
  que el build pasa aunque haya errores de tipo reales (`chart.tsx`, `schema.ts`).
  Recomendable: corregirlos y desactivar esos flags. Si se retira Drizzle (tarea 2),
  varios errores de `schema.ts` desaparecen.

## ✅ Cierre

- [ ] **10. Verificación final sin base de datos**
  Correr `pnpm build` y recorrer todas las páginas (inicio, especies + fichas,
  vedas + calendario, normativas + descargas, buzón) sin Postgres para confirmar
  que nada quede roto ni haya rutas que devuelvan 500. Verificar que descargas
  (`/api/download`) y buzón (`/api/sugerencias`) respondan bien.

---

### Resumen rápido
- **Imprescindible para no dejar nada roto:** 1 y 2 (dashboard + endpoints de BD).
- **Para publicar con calidad:** 3, 4 y 5 (buzón real, privacidad, fotos).
- **Pulido:** 6–9.
- **Cierre:** 10 (verificación).
