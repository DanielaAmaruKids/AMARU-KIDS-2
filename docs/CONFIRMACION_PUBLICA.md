# Confirmacion publica: AMARU KIDS

Fecha de verificacion: 16 de junio de 2026.

## URL publica

https://danielaamarukids.github.io/AMARU-KIDS-2/

Resultado:

- La pagina publica carga correctamente.
- El paquete publico contiene integracion de Firebase / Firestore.
- El codigo fuente contiene el flujo de Gemini AI para adaptar contenido.

## Estado de Firebase

Firebase esta integrado en `src/services/firebase.js`.

La app puede guardar progreso en:

- Modo local: navegador del usuario, si no hay variables reales.
- Modo Firebase: Cloud Firestore, si las variables `VITE_FIREBASE_*` estan disponibles.

## Estado de Gemini

Gemini esta integrado en `src/services/gemini.js`.

La app puede adaptar contenido con Gemini si existe `VITE_GEMINI_API_KEY`.

## Pendiente critico

Para confirmar una llamada real de Gemini desde la pagina publica, se debe verificar que el repositorio tenga configurados los secretos de GitHub Actions:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_GEMINI_API_KEY`

Despues de guardar esos secretos, se debe volver a ejecutar el workflow de GitHub Pages y probar el boton de adaptacion con IA desde la URL publica.
