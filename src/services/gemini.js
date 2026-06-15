const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export function isGeminiReady() {
  return Boolean(import.meta.env.VITE_GEMINI_API_KEY);
}

export async function adaptContentWithGemini({ profile, page }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return {
      adaptedText: page.text,
      source: 'local',
    };
  }

  const prompt = `
Adapta este texto educativo para un nino usando este perfil de accesibilidad.
Responde solo con el texto adaptado, claro y breve.

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
