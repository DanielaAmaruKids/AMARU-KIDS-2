import { useMemo, useState } from 'react';
import { accessibilityNeeds, storyPages } from './data/story.js';
import {
  buildAccessibilityProfile,
  getAdaptationSummary,
} from './services/adaptiveEngine.js';

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

  const profile = useMemo(
    () => buildAccessibilityProfile(selectedNeeds),
    [selectedNeeds],
  );
  const page = storyPages[currentPage];
  const isCorrect = selectedAnswer === page.answer;

  function toggleNeed(id) {
    setSelectedNeeds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function completeActivity() {
    if (!isCorrect) return;

    setProgress((current) => ({
      ...current,
      completedPages: Math.max(current.completedPages, currentPage + 1),
      stars: current.stars + 1,
    }));

    if (currentPage < storyPages.length - 1) {
      setCurrentPage((value) => value + 1);
      setSelectedAnswer('');
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
        <div>
          <p className="eyebrow">Tecnologia inclusiva para transformar vidas</p>
          <h1 id="page-title">AMARU KIDS</h1>
          <p className="lead">
            Plataforma educativa inclusiva con inteligencia artificial
            adaptativa para ninos con discapacidad sensorial y necesidades
            educativas especificas.
          </p>
        </div>
        <div className="hero-panel" aria-label="Resumen de impacto">
          <strong>+900.000</strong>
          <span>
            personas en Ecuador presentan dificultades visuales, auditivas o de
            comunicacion.
          </span>
        </div>
      </section>

      <section className="workspace" aria-label="MVP interactivo">
        <aside className="sidebar" aria-label="Perfil de accesibilidad">
          <h2>Perfil de accesibilidad</h2>
          <p>{getAdaptationSummary(profile)}</p>

          <div className="need-list">
            {accessibilityNeeds.map((need) => (
              <label key={need.id} className="need-option">
                <input
                  type="checkbox"
                  checked={selectedNeeds.includes(need.id)}
                  onChange={() => toggleNeed(need.id)}
                />
                <span>
                  <strong>{need.label}</strong>
                  <small>{need.description}</small>
                </span>
              </label>
            ))}
          </div>

          <label className="range-control">
            Tamaño de letra
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

        <section className="story-panel" aria-labelledby="story-title">
          <div className="story-topline">
            <span>
              Pagina {currentPage + 1} de {storyPages.length}
            </span>
            {profile.visualAlerts && <span className="alert-pill">Alerta visual activa</span>}
          </div>

          <h2 id="story-title">{page.title}</h2>
          <p className="story-text">{page.text}</p>

          {profile.pictogramSupport && (
            <div className="pictograms" aria-label="Pictogramas de apoyo">
              {page.pictograms.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}

          <div className="actions">
            <button type="button" onClick={() => speak(`${page.title}. ${page.text}`)}>
              Escuchar historia
            </button>
            <button type="button" onClick={() => window.speechSynthesis?.cancel()}>
              Detener audio
            </button>
          </div>

          <fieldset className="question">
            <legend>{page.question}</legend>
            {page.options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(event) => setSelectedAnswer(event.target.value)}
                />
                {option}
              </label>
            ))}
          </fieldset>

          <button
            type="button"
            className="primary-action"
            disabled={!isCorrect}
            onClick={completeActivity}
          >
            Ganar estrella
          </button>
        </section>

        <aside className="family-panel" aria-label="Panel familiar">
          <h2>Panel familiar</h2>
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
              <dt>Estrellas obtenidas</dt>
              <dd>{progress.stars}</dd>
            </div>
          </dl>
          <p className="family-note">
            La version final guardara estos avances en Firebase y generara
            reportes para familias y docentes.
          </p>
        </aside>
      </section>
    </main>
  );
}

export default App;
