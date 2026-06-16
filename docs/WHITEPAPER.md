# Whitepaper v1.0: AMARU KIDS

**Plataforma educativa inclusiva con IA adaptativa para ninos**

## 1. Resumen ejecutivo

AMARU KIDS es una plataforma educativa inclusiva que combina accesibilidad, inteligencia artificial adaptativa, gamificacion y acompanamiento familiar para mejorar el aprendizaje digital de ninos con discapacidad visual, discapacidad auditiva, dificultades de comunicacion, TDAH o necesidades educativas especificas.

El proyecto responde a una brecha clara: muchas herramientas educativas digitales siguen disenadas para un estudiante promedio que puede ver, escuchar, leer, escribir y concentrarse sin apoyos. AMARU KIDS propone lo contrario: una experiencia que se adapta al nino desde el primer uso.

El MVP actual presenta una historia interactiva llamada "El viaje de Amaru", perfiles de accesibilidad, lectura asistida, pictogramas, ajustes visuales, recompensas, panel familiar, integracion preparada con Firebase y adaptacion de contenido con Gemini AI.

## 2. Problema

En Ecuador existen mas de 900.000 personas con dificultades relacionadas con vision, audicion o comunicacion. Dentro de este grupo se reportan necesidades como dificultades visuales, auditivas y de comunicacion que impactan directamente la participacion en espacios educativos digitales.

El problema no es solo tecnologico. Tambien es pedagogico y social:

- Muchas plataformas educativas dependen de interfaces visuales cargadas.
- Las instrucciones suelen estar pensadas para usuarios que escuchan y leen sin apoyo.
- Los contenidos no siempre se adaptan al ritmo, nivel o necesidad de cada nino.
- Las familias tienen poca informacion clara sobre el avance del aprendizaje.
- Las escuelas y centros de apoyo necesitan soluciones accesibles, simples y sostenibles.

Como resultado, los ninos con necesidades educativas especificas pueden quedar fuera de experiencias digitales que deberian ampliar oportunidades.

## 3. Solucion propuesta

AMARU KIDS ofrece una plataforma educativa que adapta la experiencia de aprendizaje segun el perfil de accesibilidad del usuario. El sistema permite seleccionar apoyos visuales, auditivos, comunicativos y de atencion para que la actividad se ajuste a la forma en que cada nino aprende mejor.

La solucion se estructura en cuatro capas:

1. **Accesibilidad:** alto contraste, ajuste de texto, lectura por voz, pictogramas y flujo simple.
2. **Aprendizaje:** historias interactivas, actividades cortas, preguntas de comprension y recompensas.
3. **IA adaptativa:** Gemini AI genera o ajusta recomendaciones de contenido segun el perfil y el progreso.
4. **Acompanamiento familiar:** Firebase permite guardar progreso, estrellas, reportes y datos utiles para familia o docentes.

## 4. MVP funcional

El MVP valida el flujo principal de la plataforma:

- Pantalla principal con propuesta educativa clara.
- Seleccion de perfil de accesibilidad.
- Historia interactiva "El viaje de Amaru".
- Opciones de lectura, escucha, pictogramas y contraste.
- Actividad de comprension.
- Recompensas por avance.
- Panel familiar con progreso, tiempo y reportes.
- Preparacion tecnica para Firebase y Gemini AI.

La app esta publicada como demo web en GitHub Pages:

https://danielaamarukids.github.io/AMARU-KIDS-2/

## 5. Tecnologia y arquitectura

La arquitectura actual usa herramientas ligeras, gratuitas para prototipo y compatibles con despliegue publico.

| Capa | Tecnologia | Funcion |
| --- | --- | --- |
| Frontend | React + Vite | Interfaz del MVP |
| Publicacion | GitHub Pages | Demo publica |
| Datos | Firebase / Cloud Firestore | Usuarios, progreso y reportes familiares |
| IA | Gemini AI | Adaptacion inteligente de contenido |
| Accesibilidad | Web Speech API + CSS inclusivo | Lectura asistida, contraste y texto adaptable |
| Versionamiento | GitHub | Control del proyecto y entregables |

La aplicacion esta preparada para funcionar en dos modos:

- **Modo prototipo:** usa almacenamiento local del navegador si no existen claves reales.
- **Modo real:** usa Firebase y Gemini cuando las variables de entorno estan configuradas en local o en GitHub Actions.

## 6. Inteligencia artificial

Gemini AI se usa como motor de adaptacion educativa. Su rol no es reemplazar a docentes o terapeutas, sino apoyar la personalizacion del contenido.

Ejemplos de uso:

- Ajustar la dificultad de una actividad.
- Sugerir apoyos segun perfil de accesibilidad.
- Proponer recomendaciones para familia o docente.
- Crear variantes de contenido mas visuales, auditivas o comunicativas.

La IA se presenta de forma visible en el MVP mediante recomendaciones adaptativas y mensajes de apoyo educativo.

## 7. Impacto ODS

AMARU KIDS se alinea principalmente con:

- **ODS 4: Educacion de calidad.** Busca ampliar el acceso a experiencias educativas digitales inclusivas.
- **ODS 10: Reduccion de desigualdades.** Disminuye barreras de participacion para ninos con necesidades especificas.

Impacto esperado:

- Mayor autonomia en actividades educativas digitales.
- Mas participacion de ninos con discapacidad o necesidades de apoyo.
- Informacion simple para familias y docentes.
- Herramienta escalable para escuelas, fundaciones y centros terapeuticos.

## 8. Usuarios beneficiarios

Los usuarios principales son ninos de educacion inicial y basica con necesidades educativas especificas. Tambien se benefician:

- Familias que necesitan acompanamiento claro.
- Docentes que buscan actividades adaptadas.
- Fundaciones y centros terapeuticos.
- Instituciones educativas con programas de inclusion.

## 9. Modelo de sostenibilidad

El proyecto puede crecer mediante un modelo hibrido:

- Licencias institucionales para escuelas y centros terapeuticos.
- Convenios con fundaciones y programas de inclusion.
- Version familiar gratuita con funciones basicas.
- Plan premium para reportes avanzados y contenido adicional.
- Alianzas con programas de responsabilidad social e innovacion educativa.

## 10. Privacidad y seguridad

AMARU KIDS trabaja con datos sensibles porque involucra ninos, aprendizaje y accesibilidad. Por eso el producto debe priorizar:

- Minimizacion de datos personales.
- Reglas seguras en Firebase.
- Consentimiento familiar.
- No publicar claves privadas en el repositorio.
- Reportes educativos sin exponer informacion innecesaria.

El repositorio incluye `.env.example` para documentar las variables necesarias sin compartir claves reales.

## 11. Estado actual

Estado del MVP al 16 de junio de 2026:

- Demo publica creada.
- Repositorio publico en GitHub.
- Interfaz interactiva mejorada.
- Video demo de 2 minutos generado.
- Firebase creado y preparado.
- Firestore creado.
- Gemini API probado localmente.
- Workflow de GitHub Pages preparado para recibir variables seguras.
- Tablero Kanban creado.
- Entregables finales preparados para presentacion.

## 12. Roadmap

| Fase | Objetivo |
| --- | --- |
| Semana 2 | MVP funcional, video demo, README, Kanban y despliegue |
| Semana 3 | Pitch deck final, whitepaper v1.0, infografia y preparacion para jurado |
| Piloto | Pruebas con familias, docentes y centros de apoyo |
| Version beta | Autenticacion, rutas de aprendizaje y reportes robustos |
| Escalamiento | Alianzas institucionales y expansion regional |

## 13. Equipo

- Abigail Flores: liderazgo del proyecto.
- Marthina Correa: investigacion y diseno UX/UI.
- Luciana Penaherrera: innovacion y tecnologia.
- Daniela: mentoria pedagogica y desarrollo del repositorio.

## 14. Conclusion

AMARU KIDS demuestra que una plataforma educativa puede ser accesible, emocionalmente cercana y tecnicamente viable desde un MVP. La propuesta combina inclusion, IA y acompanamiento familiar para convertir la tecnologia en una herramienta que se adapta al nino, y no al reves.
