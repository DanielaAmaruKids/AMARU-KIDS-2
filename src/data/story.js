export const storyPages = [
  {
    id: 1,
    title: 'El viaje de Amaru',
    text: 'Amaru despierta en una montana brillante. Quiere encontrar una escuela donde todos los ninos puedan aprender a su manera.',
    pictograms: ['Montana', 'Escuela', 'Amistad'],
    question: 'Que busca Amaru?',
    options: ['Una escuela inclusiva', 'Un tesoro escondido', 'Una ciudad lejana'],
    answer: 'Una escuela inclusiva',
  },
  {
    id: 2,
    title: 'La puerta de los sentidos',
    text: 'En el camino, Amaru descubre una puerta que se abre con sonidos, luces y senales. Cada nino puede elegir como recibir la informacion.',
    pictograms: ['Sonido', 'Luz', 'Senal'],
    question: 'Como se abre la puerta?',
    options: ['Con accesibilidad', 'Con una llave comun', 'Con silencio total'],
    answer: 'Con accesibilidad',
  },
  {
    id: 3,
    title: 'Aprender juntos',
    text: 'Al final, Amaru entiende que la tecnologia es mejor cuando se adapta a cada persona y ayuda a aprender con alegria.',
    pictograms: ['Tecnologia', 'Alegria', 'Aprendizaje'],
    question: 'Que aprende Amaru?',
    options: ['La tecnologia debe adaptarse a los ninos', 'Todos aprenden igual', 'Solo importan los juegos'],
    answer: 'La tecnologia debe adaptarse a los ninos',
  },
];

export const accessibilityNeeds = [
  {
    id: 'visual',
    label: 'Discapacidad visual',
    description: 'Activa alto contraste, textos grandes y lectura asistida.',
  },
  {
    id: 'auditory',
    label: 'Discapacidad auditiva',
    description: 'Refuerza instrucciones visuales, pictogramas y alertas de color.',
  },
  {
    id: 'communication',
    label: 'Dificultades de comunicacion',
    description: 'Simplifica el lenguaje y muestra apoyos con pictogramas.',
  },
  {
    id: 'attention',
    label: 'TDAH',
    description: 'Reduce distracciones y divide las actividades en pasos cortos.',
  },
  {
    id: 'standard',
    label: 'Sin necesidades especificas',
    description: 'Mantiene la experiencia base con opciones inclusivas disponibles.',
  },
];
