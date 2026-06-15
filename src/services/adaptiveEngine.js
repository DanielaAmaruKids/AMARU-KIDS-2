export function buildAccessibilityProfile(selectedNeeds) {
  const needs = new Set(selectedNeeds);

  return {
    highContrast: needs.has('visual'),
    largeText: needs.has('visual'),
    visualAlerts: needs.has('auditory'),
    simplifiedLanguage: needs.has('communication') || needs.has('attention'),
    reducedMotion: needs.has('attention'),
    pictogramSupport:
      needs.has('auditory') || needs.has('communication') || needs.has('standard'),
  };
}

export function getAdaptationSummary(profile) {
  const active = [];

  if (profile.highContrast) active.push('alto contraste');
  if (profile.largeText) active.push('texto ampliado');
  if (profile.visualAlerts) active.push('alertas visuales');
  if (profile.simplifiedLanguage) active.push('lenguaje simplificado');
  if (profile.reducedMotion) active.push('actividades cortas');
  if (profile.pictogramSupport) active.push('pictogramas');

  return active.length
    ? `Interfaz adaptada con ${active.join(', ')}.`
    : 'Experiencia base con recursos inclusivos disponibles.';
}
