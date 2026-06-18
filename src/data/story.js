export const storyPages = [
  {
    id: 1,
    title: 'Luna y el colibri magico',
    text: 'Luna conoce a Amaru, un guia andino que convierte una historia en sonidos, imagenes grandes y senales para que cada nino pueda aprender.',
    pictograms: ['Luna', 'Amaru', 'Aprender'],
    question: 'Que hace Amaru para ayudar a Luna?',
    options: ['Adapta la historia', 'Esconde el cuento', 'Apaga las imagenes'],
    answer: 'Adapta la historia',
  },
  {
    id: 2,
    title: 'La puerta de los sentidos',
    text: 'La puerta se abre cuando Luna elige como aprender: letras grandes, apoyo visual o menos distracciones. La app cambia con un solo clic.',
    pictograms: ['Vista', 'Imagen', 'Calma'],
    question: 'Como cambia la app?',
    options: ['Segun la necesidad del nino', 'Siempre igual', 'Solo con juegos'],
    answer: 'Segun la necesidad del nino',
  },
  {
    id: 3,
    title: 'Leer tambien es jugar',
    text: 'Luna gana una estrella al responder. Su familia ve el avance y entiende que la tecnologia tambien debe sentirse, escucharse y comprenderse.',
    pictograms: ['Estrella', 'Familia', 'Progreso'],
    question: 'Que descubre Luna?',
    options: ['Leer tambien puede ser jugar', 'Aprender debe ser dificil', 'La familia no participa'],
    answer: 'Leer tambien puede ser jugar',
  },
];

export const accessibilityNeeds = [
  {
    id: 'visual',
    label: 'Modo visual',
    shortLabel: 'Letras grandes',
    description: 'Para baja vision: texto gigante, alto contraste y lectura por voz.',
  },
  {
    id: 'auditory',
    label: 'Modo auditivo',
    shortLabel: 'Apoyo visual',
    description: 'Para discapacidad auditiva: pictogramas, subtitulos y alertas visuales.',
  },
  {
    id: 'attention',
    label: 'Modo cognitivo/TDAH',
    shortLabel: 'Menos distracciones',
    description: 'Para atencion y aprendizaje: poco texto, pasos cortos y ritmo calmado.',
  },
];

export const mvpCapabilities = [
  '1 historia interactiva adaptada',
  'Audio y lectura por voz',
  'Imagenes grandes y pictogramas',
  'Recompensas con estrellas',
  'Accesibilidad basica y vibracion',
  'Reporte familiar de progreso',
];

export const futureCapabilities = [
  'Comunidad online',
  'Compras dentro de la app',
  'Chat avanzado de IA',
];

export const mascotProfile = {
  name: 'AMARU',
  role: 'Mascota oficial y guia de historias',
  phrase: 'Aprendamos juntos',
  traits: [
    'Serpiente amigable andina',
    'Colores vivos',
    'Sonriente y cercana',
    'Entrega recompensas',
    'Guia las historias',
  ],
};

export const firebaseDemoUser = {
  nombre: 'Mateo',
  edad: 7,
  perfil: 'auditivo',
  estrellas: 12,
  historias_completadas: 4,
  ultima_sesion: '2026-05-25',
};

export const impactIndicators = [
  {
    indicator: 'Ninos que usan la app',
    goal: '100',
  },
  {
    indicator: 'Historias completadas',
    goal: '500',
  },
  {
    indicator: 'Estrellas obtenidas',
    goal: '1000',
  },
  {
    indicator: 'Escuelas participantes',
    goal: '5',
  },
  {
    indicator: 'Tiempo promedio de lectura',
    goal: '10 min',
  },
];

export const businessTiers = [
  {
    name: 'Gratuito',
    audience: 'Familias que prueban el MVP',
    items: ['1 historia', '1 perfil', 'Recompensas basicas'],
  },
  {
    name: 'Premium familiar',
    audience: 'Familias que necesitan mas acompanamiento',
    items: ['Historias ilimitadas', 'Mas actividades', 'Reportes completos'],
  },
  {
    name: 'Institucional',
    audience: 'Escuelas, centros terapeuticos y fundaciones',
    items: ['Panel docente', 'Seguimiento grupal', 'Estadistica'],
  },
];

export const competitiveAdvantages = [
  'Lectura',
  'Inclusion',
  'Gamificacion',
  'Cultura latinoamericana',
  'IA adaptativa simple',
];
