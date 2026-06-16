# AMARU KIDS

AMARU KIDS es una plataforma educativa inclusiva impulsada por inteligencia artificial adaptativa. Su objetivo es que ninos con discapacidad visual, auditiva, dificultades de comunicacion, TDAH o necesidades educativas especificas puedan acceder al aprendizaje digital de forma autonoma, motivadora y segura.

> "La tecnologia tambien debe sentirse, escucharse y comprenderse."

![Vista previa del MVP](docs/screenshots/amaru-kids-mvp.png)

## Estado del MVP

El MVP esta en fase de prototipo funcional para hackathon. Actualmente permite probar la experiencia educativa principal en navegador y deja preparada la conexion con Firebase y Gemini AI mediante variables de entorno.

Estado actual:

- Interfaz React + Vite creada.
- Perfil de accesibilidad funcional.
- Historia interactiva funcional.
- Lectura asistida por voz funcional en navegadores compatibles.
- Modo visual inclusivo y ajuste de texto funcionales.
- Recompensas y panel familiar basico funcionales.
- Firebase preparado para guardar progreso cuando se agreguen claves reales.
- Gemini AI preparado para adaptar contenido cuando se agregue una clave real.

## Problema

En Ecuador, mas de 900.000 personas presentan dificultades relacionadas con la vision, la audicion o la comunicacion. Muchas aplicaciones educativas siguen dependiendo de interfaces visuales complejas, instrucciones habladas, costos altos o contenidos que no responden al contexto latinoamericano.

AMARU KIDS nace para reducir esa brecha desde la infancia: no busca que los ninos se adapten a la tecnologia, sino que la tecnologia se adapte a cada nino.

## MVP

La primera version valida una experiencia educativa inclusiva con:

- Registro y perfil de accesibilidad.
- Historia interactiva accesible: "El viaje de Amaru".
- Lectura asistida por voz mediante Text-to-Speech del navegador.
- Modo visual inclusivo con alto contraste y ajuste de texto.
- Pictogramas de apoyo para comunicacion y comprension.
- Sistema inicial de recompensas.
- Panel familiar basico con avance, tiempo de uso y estrellas.

## Tecnologias

- Frontend: React + Vite.
- Backend propuesto: Firebase.
- Inteligencia artificial propuesta: Gemini AI.
- Diseno: Figma.
- Control de versiones: GitHub.

## Estructura

```text
amaru-kids/
  src/
    data/
      story.js
    services/
      adaptiveEngine.js
      firebase.js
      gemini.js
    App.jsx
    main.jsx
    styles.css
  docs/
    screenshots/
      amaru-kids-mvp.png
    PROYECTO.md
  .env.example
  index.html
  package.json
```

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

Luego abre la URL local que muestre Vite.

## Variables de entorno

Copia `.env.example` como `.env` y completa las claves reales:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_GEMINI_API_KEY=
```

Sin estas claves, la app funciona como prototipo local y guarda el progreso en el navegador.

## Despliegue

Opciones recomendadas para publicar la demo:

- GitHub Pages: este repositorio incluye `.github/workflows/deploy-pages.yml`.
- Vercel: importar el repositorio, elegir Vite y publicar.
- Netlify: conectar el repositorio y usar `npm run build` con carpeta `dist`.

Para GitHub Pages, activa **Settings > Pages > Source > GitHub Actions** y vuelve a ejecutar el workflow si hace falta.

## Roadmap

- Fase 1: investigacion, diseno de wireframes y arquitectura.
- Fase 2: desarrollo del MVP con accesibilidad e IA.
- Fase 3: piloto con escuelas y familias.
- Fase 4: escalamiento nacional.
- Fase 5: expansion latinoamericana.

## Equipo

- Abigail Flores: lider del proyecto.
- Marthina Correa: diseno e investigacion UX/UI.
- Luciana Penaherrera: innovacion y tecnologia.
- Daniela: mentora pedagogica.
