import { useMemo, useState } from 'react';
import { accessibilityNeeds, storyPages } from './data/story.js';
import {
  buildAccessibilityProfile,
  getAdaptationSummary,
} from './services/adaptiveEngine.js';
import { adaptContentWithGemini, isGeminiReady } from './services/gemini.js';
import { isFirebaseReady, saveFamilyProgress } from './services/firebase.js';

const initialProgress = {
  completedPages: 0,
  stars: 0,
  minutes: 12,
};

function speak(text) {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-EC';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
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
    setSelectedNeeds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
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
    };

    setProgress(nextProgress);
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
        profile.highContrast ? 'is-high-contrast' : '',
        profile.reducedMotion ? 'is-calm' : '',
      ].join(' ')}
      style={{ '--font-scale': fontScale }}
    >
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">MVP educativo inclusivo</p>
          <h1 id="page-title">AMARU KIDS</h1>
          <p className="lead">
            Una aventura de aprendizaje que adapta voz, color, pictogramas y
            ritmo segun cada nino.
          </p>
          <div className="hero-actions">
            <a href="#mvp" className="hero-button">
              Explorar demo
            </a>
            <a href="#impacto" className="hero-link">
              Ver impacto
            </a>
          </div>
        </div>

        <div className="hero-dashboard" aria-label="Resumen del proyecto">
          <div className="mascot-card">
            <div className="mascot-face" aria-hidden="true">
              AK
            </div>
            <div>
              <strong>Modo aprendizaje adaptativo</strong>
              <span>{getAdaptationSummary(profile)}</span>
            </div>
          </div>
          <div className="service-status" aria-label="Estado de servicios">
            <span>{isFirebaseReady() ? 'Firebase activo' : 'Firebase listo'}</span>
            <span>{isGeminiReady() ? 'Gemini activo' : 'Gemini listo'}</span>
          </div>
          <div className="impact-number">
            <strong>+900.000</strong>
            <span>personas con barreras visuales, auditivas o comunicacionales</span>
          </div>
        </div>
      </section>

      <section className="mvp-grid" id="mvp" aria-label="MVP interactivo">
        <aside className="control-panel" aria-label="Perfil de accesibilidad">
          <div className="panel-heading">
            <p>Perfil</p>
            <h2>Accesibilidad viva</h2>
          </div>

          <div className="need-list">
            {accessibilityNeeds.map((need) => (
              <button
                key={need.id}
                type="button"
                className={`need-card ${selectedNeeds.includes(need.id) ? 'is-selected' : ''}`}
                aria-pressed={selectedNeeds.includes(need.id)}
                onClick={() => toggleNeed(need.id)}
              >
                <span className="need-initial">{need.label.slice(0, 1)}</span>
                <span>
                  <strong>{need.label}</strong>
                  <small>{need.description}</small>
                </span>
              </button>
            ))}
          </div>

          <label className="range-control">
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
        </aside>

        <section className="learning-console" aria-labelledby="story-title">
          <div className="console-top">
            <div>
              <p>Historia interactiva</p>
              <h2 id="story-title">{page.title}</h2>
            </div>
            <div className="page-dots" aria-label="Paginas">
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
          </div>

          <div className="story-stage">
            <div className="story-art" aria-hidden="true">
              <span>{currentPage + 1}</span>
              <div className="story-path" />
            </div>
            <p className="story-text">{storyText}</p>
          </div>

          {profile.pictogramSupport && (
            <div className="pictograms" aria-label="Pictogramas de apoyo">
              {page.pictograms.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}

          <div className="actions">
            <button type="button" onClick={() => speak(`${page.title}. ${storyText}`)}>
              Escuchar
            </button>
            <button type="button" className="ai-button" onClick={adaptStoryText}>
              Adaptar con IA
            </button>
            <button type="button" onClick={() => window.speechSynthesis?.cancel()}>
              Pausar
            </button>
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
        </section>

        <aside className="family-panel" aria-label="Panel familiar">
          <div className="panel-heading">
            <p>Familia</p>
            <h2>Progreso claro</h2>
          </div>
          <div className="progress-ring" aria-label={`Progreso ${progressPercent}%`}>
            <div>{progressPercent}%</div>
          </div>
          <dl>
            <div>
              <dt>Historia completada</dt>
              <dd>
                {progress.completedPages}/{storyPages.length}
              </dd>
            </div>
            <div>
              <dt>Tiempo de uso</dt>
              <dd>{progress.minutes} min</dd>
            </div>
            <div>
              <dt>Estrellas</dt>
              <dd>{progress.stars}</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="impact-section" id="impacto" aria-label="Impacto">
        <div>
          <p className="eyebrow">Impacto y ODS</p>
          <h2>Inclusiva desde el primer toque</h2>
          <p>
            AMARU KIDS aporta a ODS 4 y ODS 10 con una experiencia accesible,
            medible y preparada para crecer hacia escuelas y familias.
          </p>
        </div>
        <div className="impact-cards">
          <article>
            <strong>ODS 4</strong>
            <span>Educacion de calidad</span>
          </article>
          <article>
            <strong>ODS 10</strong>
            <span>Reduccion de desigualdades</span>
          </article>
          <article>
            <strong>MVP</strong>
            <span>Demo web publica</span>
          </article>
        </div>
      </section>
    </main>
  );
}

export default App;
