# Configuracion publica

Para que Firebase y Gemini funcionen en GitHub Pages, agrega estas variables como secretos del repositorio:

```text
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_GEMINI_API_KEY
```

Ruta en GitHub:

```text
Settings > Secrets and variables > Actions > New repository secret
```

Despues de agregar los secretos, vuelve a ejecutar:

```text
Actions > Deploy GitHub Pages > Run workflow
```

Nota: las variables `VITE_*` se integran en el JavaScript publico del navegador. Para un MVP de hackathon esta bien, pero la clave de Gemini debe restringirse por dominio en Google AI Studio cuando el proyecto sea publico.
