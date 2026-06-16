# Entregables Semana 3

## Enlaces principales

- Demo publica: https://danielaamarukids.github.io/AMARU-KIDS-2/
- Repositorio: https://github.com/DanielaAmaruKids/AMARU-KIDS-2
- Video demo: [docs/video/amaru-kids-demo-s2.mp4](video/amaru-kids-demo-s2.mp4)
- Pitch deck final: [docs/pitch/amaru-kids-pitch-final.pptx](pitch/amaru-kids-pitch-final.pptx)
- Infografia: [docs/infografia/amaru-kids-infografia.png](infografia/amaru-kids-infografia.png)
- Whitepaper v1.0: [docs/WHITEPAPER.md](WHITEPAPER.md)
- Preguntas del jurado: [docs/PREGUNTAS_JURADO.md](PREGUNTAS_JURADO.md)
- Tablero Kanban: [docs/KANBAN.md](KANBAN.md)

## Checklist final

- [x] MVP publicado en una URL publica.
- [x] README con enlaces principales.
- [x] Pitch deck final.
- [x] Whitepaper v1.0.
- [x] Infografia.
- [x] Video demo de 2 minutos.
- [x] Preguntas del jurado preparadas.
- [x] Firebase creado y preparado en codigo.
- [x] Gemini API probado localmente.
- [x] Confirmar que la pagina publica carga correctamente.
- [x] Confirmar que Firebase / Firestore aparece en el paquete publico.
- [ ] Confirmar llamada real de Gemini desde la pagina publica despues de configurar los secretos `VITE_*` en GitHub Actions y volver a ejecutar el despliegue.

## Nota sobre Firebase y Gemini en publico

La app ya esta preparada para usar Firebase y Gemini en GitHub Pages, pero la pagina publica solo puede usarlos si las variables `VITE_FIREBASE_*` y `VITE_GEMINI_API_KEY` estan agregadas como secretos del repositorio y el workflow de GitHub Pages se vuelve a ejecutar.

Nunca se deben pegar claves reales directamente en el README ni en archivos publicos del repositorio.
