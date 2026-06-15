// Punto de integracion futuro para Gemini AI.
// En produccion, llama esta API desde backend o Cloud Functions para proteger la clave.
export async function adaptContentWithGemini({ profile, page }) {
  return {
    adaptedText: page.text,
    profile,
  };
}
