export function buildAccessibilityProfile(selectedNeeds) {
  const needs = new Set(selectedNeeds);

  return {
    profileName: getProfileName(needs),
    highContrast: needs.has('visual'),
    largeText: needs.has('visual'),
    audioFirst: needs.has('visual'),
    visualAlerts: needs.has('auditory'),
    captions: needs.has('auditory'),
    simplifiedLanguage: needs.has('auditory') || needs.has('attention'),
    reducedMotion: needs.has('attention'),
    calmFlow: needs.has('attention'),
    hapticFeedback: needs.has('visual') || needs.has('auditory'),
    pictogramSupport: needs.has('auditory') || needs.has('attention'),
  };
}

export function getAdaptationSummary(profile) {
  const active = [];

  if (profile.audioFirst) active.push('audio de apoyo');
  if (profile.highContrast) active.push('alto contraste');
  if (profile.largeText) active.push('texto ampliado');
  if (profile.visualAlerts) active.push('alertas visuales');
  if (profile.captions) active.push('subtitulos grandes');
  if (profile.simplifiedLanguage) active.push('lenguaje simplificado');
  if (profile.reducedMotion) active.push('actividades cortas');
  if (profile.pictogramSupport) active.push('pictogramas');
  if (profile.hapticFeedback) active.push('vibracion inteligente');

  return active.length
    ? `Interfaz adaptada con ${active.join(', ')}.`
    : 'Experiencia base con recursos inclusivos disponibles.';
}

function getProfileName(needs) {
  if (needs.has('visual')) return 'Perfil visual';
  if (needs.has('auditory')) return 'Perfil auditivo';
  if (needs.has('attention')) return 'Perfil cognitivo/TDAH';
  return 'Perfil inclusivo base';
}
