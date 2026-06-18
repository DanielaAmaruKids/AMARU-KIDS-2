const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export function isGeminiReady() {
  return Boolean(import.meta.env.VITE_GEMINI_API_KEY);
}

function buildLocalAdaptation({ profile, page }) {
  const baseText = page.text.split('.')[0] || page.text;
  const pictograms = page.pictograms.join(', ');

  if (profile.highContrast) {
    return `${baseText}. Mira las palabras grandes y escucha el audio. Pictogramas: ${pictograms}.`;
  }

  if (profile.pictogramSupport) {
    return `${baseText}. Apoyos visuales: ${pictograms}.`;
  }

  return `${baseText}. Un paso a la vez. Respira, observa y responde cuando estes listo.`;
}

export async function adaptContentWithGemini({ profile, page }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return {
      adaptedText: buildLocalAdaptation({ profile, page }),
      source: 'local',
    };
  }

  const prompt = `
Adapta este texto educativo para un nino usando este perfil de accesibilidad de AMARU KIDS.
No actues como chat avanzado. Genera solo una variante simple del texto de la historia.
Usa frases cortas, lenguaje claro y, si el perfil requiere apoyo visual, menciona pictogramas asociados.
Responde solo con el texto adaptado.

Perfil: ${JSON.stringify(profile)}
Texto: ${page.text}
`;

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('No se pudo adaptar el contenido con Gemini.');
  }

  const data = await response.json();
  const adaptedText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || page.text;

  return {
    adaptedText,
    source: 'gemini',
  };
}
