import { useMemo, useState } from 'react';
import {
  accessibilityNeeds,
  businessTiers,
  competitiveAdvantages,
  firebaseDemoUser,
  futureCapabilities,
  impactIndicators,
  mvpCapabilities,
  storyPages,
} from './data/story.js';
import {
  buildAccessibilityProfile,
} from './services/adaptiveEngine.js';
import { adaptContentWithGemini } from './services/gemini.js';
import { saveFamilyProgress } from './services/firebase.js';

const initialProgress = {
  completedPages: 0,
  stars: 0,
  minutes: 12,
};

const assetUrl = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`;

const flowSteps = [
  ['Inicio', 'IN'],
  ['Crear perfil', 'PF'],
  ['Seleccionar necesidad', 'SN'],
  ['IA adapta la interfaz', 'IA'],
  ['Historia interactiva', 'HI'],
  ['Actividad sencilla', 'AC'],
  ['Ganar estrella', 'GE'],
  ['Reporte de progreso', 'RP'],
];

function speak(text) {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-EC';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function vibrate(pattern = [80]) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

function App() {
  const [selectedNeeds, setSelectedNeeds] = useState(['visual']);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [progress, setProgress] = useState(initialProgress);
  const [fontScale, setFontScale] = useState(1);
  const [adaptedText, setAdaptedText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const profile = useMemo(
    () => buildAccessibilityProfile(selectedNeeds),
    [selectedNeeds],
  );
  const page = storyPages[currentPage];
  const storyText = adaptedText || page.text;
  const isCorrect = selectedAnswer === page.answer;
  const progressPercent = Math.round((progress.completedPages / storyPages.length) * 100);

  function toggleNeed(id) {
    setSelectedNeeds([id]);
  }

  function goToPage(index) {
    setCurrentPage(index);
    setSelectedAnswer('');
    setAdaptedText('');
    setStatusMessage('');
  }

  function completeActivity() {
    if (!isCorrect) return;

    const nextProgress = {
      ...progress,
      completedPages: Math.max(progress.completedPages, currentPage + 1),
      stars: progress.stars + 1,
      profileName: profile.profileName,
    };

    setProgress(nextProgress);
    vibrate([90, 40, 90]);
    saveFamilyProgress(nextProgress)
      .then((result) => {
        setStatusMessage(
          result.mode === 'firebase'
            ? 'Progreso guardado en Firebase.'
            : 'Progreso guardado localmente hasta conectar Firebase.',
        );
      })
      .catch(() => {
        setStatusMessage('No se pudo guardar el progreso en Firebase.');
      });

    if (currentPage < storyPages.length - 1) {
      goToPage(currentPage + 1);
    }
  }

  async function adaptStoryText() {
    setStatusMessage('Adaptando contenido...');
    try {
      const result = await adaptContentWithGemini({ profile, page });
      setAdaptedText(result.adaptedText);
      setStatusMessage(
        result.source === 'gemini'
          ? 'Contenido adaptado con Gemini AI.'
          : 'Modo demo: agrega una clave Gemini para activar IA real.',
      );
    } catch (error) {
      setStatusMessage(error.message);
    }
  }

  return (
    <main
      className={[
        'app-shell',
        'poster-shell',
        profile.highContrast ? 'is-high-contrast' : '',
        profile.reducedMotion ? 'is-calm' : '',
      ].join(' ')}
      style={{ '--font-scale': fontScale }}
    >
      <section className="poster-board" aria-labelledby="page-title">
        <article className="poster-panel hero-poster panel-hero" id="inicio">
          <img src={assetUrl('amaru-hero-panel.png')} alt="Pantalla de inicio ilustrada de AMARU KIDS" />
          <div className="hero-overlay">
            <h1 id="page-title">AMARU KIDS</h1>
            <p>Leer tambien es jugar</p>
            <a href="#mvp" className="poster-button primary">
              Iniciar
            </a>
            <a href="#mvp" className="poster-button secondary">
              Crear perfil
            </a>
            <div className="mini-badges">
              <span>Audio bienvenida</span>
              <span>Vibracion accesible</span>
            </div>
          </div>
        </article>

        <article className="poster-panel flow-panel panel-flow">
          <span className="panel-tag purple">1. Flujo del MVP</span>
          <div className="flow-diagram">
            {flowSteps.map(([label, code], index) => (
              <div className="flow-step" key={label}>
                <button
                  type="button"
                  className="flow-icon"
                  onClick={() => {
                    if (index === 0) document.getElementById('inicio')?.scrollIntoView();
                    if (index === 1 || index === 2) document.getElementById('mvp')?.scrollIntoView();
                    if (index === 7) document.getElementById('impacto')?.scrollIntoView();
                  }}
                  aria-label={label}
                >
                  {code}
                </button>
                <small>{label}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="poster-panel mascot-poster panel-mascot">
          <span className="panel-tag green">3. Mascota oficial</span>
          <img src={assetUrl('amaru-mascot-panel.png')} alt="Mascota AMARU ilustrada" />
        </article>

        <article className="poster-panel screens-panel">
          <span className="panel-tag purple">2. Pantallas del MVP</span>
          <img src={assetUrl('amaru-screens-panel.png')} alt="Pantallas ilustradas del MVP" />
        </article>

        <article className="poster-panel ai-panel">
          <span className="panel-tag blue">4. Inteligencia Artificial Gemini</span>
          <div className="ai-demo">
            <label>Texto original</label>
            <p>El colibri emprendio un largo viaje para encontrar una flor especial.</p>
            <label>Version adaptada</label>
            <p>{adaptedText || 'El colibri viajo para buscar una flor.'}</p>
            <label>Version pictografica</label>
            <div className="picture-row">
              <img src={assetUrl('amaru-ai-panel.png')} alt="" aria-hidden="true" />
            </div>
            <button type="button" className="poster-button gemini" onClick={adaptStoryText}>
              Adaptar con IA
            </button>
          </div>
        </article>

        <article className="poster-panel firebase-panel">
          <span className="panel-tag orange">5. Estructura en Firebase</span>
          <pre>{JSON.stringify(firebaseDemoUser, null, 2)}</pre>
          <img src={assetUrl('amaru-firebase-panel.png')} alt="" aria-hidden="true" />
        </article>

        <article className="poster-panel accessibility-panel" id="mvp">
          <span className="panel-tag green">3. Modos de accesibilidad</span>
          <div className="mode-grid">
            {accessibilityNeeds.map((need) => (
              <button
                key={need.id}
                type="button"
                className={`mode-card ${selectedNeeds.includes(need.id) ? 'is-selected' : ''}`}
                onClick={() => toggleNeed(need.id)}
              >
                <strong>{need.label.replace('Modo ', 'Modo ')}</strong>
                <span>{need.shortLabel}</span>
                <small>{need.description}</small>
              </button>
            ))}
          </div>
          <label className="range-control poster-range">
            Tamano de letra
            <input
              type="range"
              min="1"
              max="1.35"
              step="0.05"
              value={fontScale}
              onChange={(event) => setFontScale(event.target.value)}
            />
          </label>
        </article>

        <article className="poster-panel live-story-panel">
          <span className="panel-tag teal">Historia adaptada funcional</span>
          <div className="story-preview">
            <div className="story-card-art">
              <img src={assetUrl('amaru-accessibility-panel.png')} alt="" aria-hidden="true" />
            </div>
            <div>
              <p className="console-kicker">Pantalla {currentPage + 1}</p>
              <h2 id="story-title">{page.title}</h2>
              <p className="story-text">{storyText}</p>
            </div>
          </div>

          {profile.pictogramSupport && (
            <div className="pictograms" aria-label="Pictogramas de apoyo">
              {page.pictograms.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}

          <div className="page-dots story-tabs" aria-label="Paginas">
            {storyPages.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === currentPage ? 'is-active' : ''}
                aria-label={`Ir a pagina ${index + 1}`}
                onClick={() => goToPage(index)}
              />
            ))}
          </div>

          <div className="actions poster-actions">
            <button type="button" onClick={() => speak(`${page.title}. ${storyText}`)}>
              Audio
            </button>
            <button type="button" onClick={() => vibrate([120, 50, 120])}>
              Vibracion
            </button>
            <button type="button" onClick={() => window.speechSynthesis?.cancel()}>
              Pausa
            </button>
          </div>

          <div className="poster-progress">
            <span>Progreso {progressPercent}%</span>
            <span>{progress.stars} estrellas</span>
            <span>{progress.minutes} min</span>
          </div>

          <fieldset className="question">
            <legend>{page.question}</legend>
            <div className="answer-grid">
              {page.options.map((option) => (
                <label key={option} className={selectedAnswer === option ? 'is-picked' : ''}>
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={(event) => setSelectedAnswer(event.target.value)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            className="primary-action"
            disabled={!isCorrect}
            onClick={completeActivity}
          >
            Ganar estrella
          </button>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </article>

        <article className="poster-panel indicators-panel">
          <span className="panel-tag purple">6. Indicadores de impacto</span>
          <div className="mini-metrics">
            {impactIndicators.map((item) => (
              <div key={item.indicator}>
                <strong>{item.goal}</strong>
                <span>{item.indicator}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="poster-panel business-poster">
          <span className="panel-tag teal">7. Modelo de negocio</span>
          <div className="business-columns">
            {businessTiers.map((tier) => (
              <section key={tier.name}>
                <h3>{tier.name}</h3>
                <ul>
                  {tier.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </article>

        <article className="poster-panel advantage-panel" id="impacto">
          <span className="panel-tag pink">8. Ventaja competitiva</span>
          <div className="competitor-grid">
            <div>
              <h3>Competidores</h3>
              <p>Otsimo: educacion especial</p>
              <p>Lazarillo: accesibilidad visual</p>
              <p>Yo Tambien Leo: lectura</p>
              <p>Dia a Dia: organizacion</p>
            </div>
            <div className="amaru-advantage">
              <h3>AMARU KIDS</h3>
              {competitiveAdvantages.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="poster-reference">
        <p className="eyebrow">Referencia visual completa</p>
        <img src={assetUrl('amaru-infografia-final.png')} alt="Infografia final completa de AMARU KIDS" />
      </section>

      <section className="legacy-content" aria-label="Contenido complementario">
        <div className="sr-note">
          <p>Resumen complementario del proyecto AMARU KIDS.</p>
          <span>{mvpCapabilities.length + futureCapabilities.length} puntos de alcance definidos.</span>
        </div>
      </section>
    </main>
  );
}

export default App;
