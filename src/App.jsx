import { useMemo, useState } from 'react';
import { accessibilityNeeds, storyPages } from './data/story.js';
import { buildAccessibilityProfile } from './services/adaptiveEngine.js';
import { saveFamilyProgress } from './services/firebase.js';
import { adaptContentWithGemini } from './services/gemini.js';

const assetUrl = (fileName) => `${import.meta.env.BASE_URL}assets/${fileName}`;
const videoUrl = `${import.meta.env.BASE_URL}video/amaru-kids-demo.mp4`;

const initialProgress = {
  completedPages: 0,
  stars: 0,
  minutes: 0,
};

function speak(text) {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-EC';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  window.speechSynthesis?.cancel();
}

function vibrate(pattern = [90, 40, 90]) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

function App() {
  const [screen, setScreen] = useState('welcome');
  const [studentName, setStudentName] = useState('');
  const [selectedNeed, setSelectedNeed] = useState('visual');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [adaptedText, setAdaptedText] = useState('');
  const [progress, setProgress] = useState(initialProgress);
  const [statusMessage, setStatusMessage] = useState('');

  const selectedNeeds = [selectedNeed];
  const profile = useMemo(
    () => buildAccessibilityProfile(selectedNeeds),
    [selectedNeed],
  );
  const page = storyPages[currentPage];
  const storyText = adaptedText || page.text;
  const isCorrect = selectedAnswer === page.answer;

  function go(nextScreen) {
    stopSpeech();
    vibrate([30]);
    setStatusMessage('');
    setScreen(nextScreen);
  }

  function startExperience() {
    speak('Bienvenido a Amaru Kids. Leer tambien es jugar.');
    vibrate([60, 30, 60]);
    go(studentName ? 'menu' : 'profile');
  }

  function saveProfile() {
    const cleanName = studentName.trim() || 'Explorador';
    setStudentName(cleanName);
    speak(`Hola ${cleanName}. Tu perfil esta listo.`);
    vibrate([60, 30, 120]);
    setScreen('menu');
  }

  function completeActivity() {
    if (!isCorrect) return;

    const nextProgress = {
      completedPages: Math.max(progress.completedPages, currentPage + 1),
      stars: progress.stars + 1,
      minutes: progress.minutes + 3,
      profileName: profile.profileName,
      name: studentName || 'Explorador',
      age: 7,
    };

    setProgress(nextProgress);
    vibrate([90, 40, 90, 40, 120]);
    saveFamilyProgress(nextProgress)
      .then((result) => {
        setStatusMessage(
          result.mode === 'firebase'
            ? 'Progreso guardado en Firebase.'
            : 'Progreso guardado localmente.',
        );
      })
      .catch(() => {
        setStatusMessage('No se pudo guardar el progreso.');
      });

    if (currentPage < storyPages.length - 1) {
      setCurrentPage((pageIndex) => pageIndex + 1);
      setSelectedAnswer('');
      setAdaptedText('');
    }
  }

  async function adaptStoryText() {
    setStatusMessage('Adaptando la historia con IA...');

    try {
      const result = await adaptContentWithGemini({ profile, page });
      setAdaptedText(result.adaptedText);
      setStatusMessage(
        result.source === 'gemini'
          ? 'Historia adaptada con Gemini AI.'
          : 'Modo demo: IA adaptativa simulada hasta activar la clave Gemini.',
      );
      speak(result.adaptedText);
    } catch (error) {
      setStatusMessage(error.message);
    }
  }

  return (
    <main
      className={[
        'kid-app',
        profile.highContrast ? 'kid-visual-mode' : '',
        profile.reducedMotion ? 'kid-calm-mode' : '',
      ].join(' ')}
    >
      {screen === 'welcome' && (
        <section className="welcome-screen" aria-labelledby="welcome-title">
          <div className="welcome-card">
            <img
              src={assetUrl('amaru-hero-panel.png')}
              alt="AMARU KIDS, leer tambien es jugar, con la mascota Amaru"
              className="welcome-art"
            />
            <h1 id="welcome-title" className="sr-only">AMARU KIDS</h1>

            <button
              type="button"
              className="hotspot hotspot-start"
              aria-label="Iniciar"
              onClick={startExperience}
            />
            <button
              type="button"
              className="hotspot hotspot-profile"
              aria-label="Crear perfil"
              onClick={() => go('profile')}
            />
            <button
              type="button"
              className="hotspot hotspot-audio"
              aria-label="Escuchar audio de bienvenida"
              onClick={() => speak('Hola, soy Amaru. Bienvenido a Amaru Kids. Leer tambien es jugar.')}
            />
            <button
              type="button"
              className="hotspot hotspot-vibration"
              aria-label="Probar vibracion accesible"
              onClick={() => vibrate([80, 35, 80])}
            />
          </div>
        </section>
      )}

      {screen === 'profile' && (
        <section className="kid-screen profile-screen" aria-labelledby="profile-title">
          <button type="button" className="back-button" onClick={() => go('welcome')}>
            Volver
          </button>
          <div className="screen-card">
            <p className="screen-kicker">Crear perfil</p>
            <h2 id="profile-title">Como prefieres aprender?</h2>
            <label className="name-field">
              Nombre del estudiante
              <input
                value={studentName}
                onChange={(event) => setStudentName(event.target.value)}
                placeholder="Escribe tu nombre"
                maxLength={20}
              />
            </label>

            <div className="profile-options">
              {accessibilityNeeds.map((need) => (
                <button
                  key={need.id}
                  type="button"
                  className={selectedNeed === need.id ? 'profile-option selected' : 'profile-option'}
                  onClick={() => {
                    setSelectedNeed(need.id);
                    vibrate([35]);
                  }}
                >
                  <strong>{need.shortLabel}</strong>
                  <span>{need.description}</span>
                </button>
              ))}
            </div>

            <button type="button" className="main-action" onClick={saveProfile}>
              Guardar perfil
            </button>
          </div>
        </section>
      )}

      {screen === 'menu' && (
        <section className="kid-screen menu-screen" aria-labelledby="menu-title">
          <button type="button" className="back-button" onClick={() => go('welcome')}>
            Inicio
          </button>
          <div className="menu-header">
            <div>
              <p className="screen-kicker">Hola, {studentName || 'Explorador'}</p>
              <h2 id="menu-title">Elige una actividad</h2>
            </div>
            <div className="stars-badge">Estrellas: {progress.stars}</div>
          </div>

          <div className="activity-grid">
            <button type="button" onClick={() => go('story')} className="activity-card story">
              <strong>Cuento</strong>
              <span>Luna y el colibri magico</span>
            </button>
            <button type="button" onClick={() => speak('Muy pronto tendremos juegos.')} className="activity-card game">
              <strong>Juego</strong>
              <span>Actividad sencilla</span>
            </button>
            <button type="button" onClick={() => speak('Cantemos juntos con Amaru.')} className="activity-card song">
              <strong>Cancion</strong>
              <span>Audio y ritmo</span>
            </button>
            <button type="button" onClick={() => go('progress')} className="activity-card progress">
              <strong>Progreso</strong>
              <span>Estrellas y avances</span>
            </button>
            <button type="button" onClick={() => go('video')} className="activity-card video">
              <strong>Video demo</strong>
              <span>Conoce AMARU KIDS</span>
            </button>
          </div>
        </section>
      )}

      {screen === 'story' && (
        <section className="kid-screen story-screen" aria-labelledby="story-title">
          <button type="button" className="back-button" onClick={() => go('menu')}>
            Menu
          </button>
          <div className="screen-card story-card">
            <div className="story-top">
              <div>
                <p className="screen-kicker">Pagina {currentPage + 1} de {storyPages.length}</p>
                <h2 id="story-title">{page.title}</h2>
              </div>
              <button
                type="button"
                className="round-action"
                onClick={() => speak(`${page.title}. ${storyText}`)}
                aria-label="Escuchar cuento"
              >
                Audio
              </button>
            </div>

            <div className="story-content">
              <img
                src={assetUrl('amaru-accessibility-panel.png')}
                alt=""
                aria-hidden="true"
              />
              <p>{storyText}</p>
            </div>

            <button type="button" className="ai-action" onClick={adaptStoryText}>
              IA adapta la historia
            </button>

            {profile.pictogramSupport && (
              <div className="story-pictos" aria-label="Pictogramas">
                {page.pictograms.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            )}

            <fieldset className="kid-question">
              <legend>{page.question}</legend>
              {page.options.map((option) => (
                <label key={option} className={selectedAnswer === option ? 'picked' : ''}>
                  <input
                    type="radio"
                    name="story-answer"
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
              className="main-action"
              disabled={!isCorrect}
              onClick={completeActivity}
            >
              Ganar estrella
            </button>
            {statusMessage && <p className="kid-status">{statusMessage}</p>}
          </div>
        </section>
      )}

      {screen === 'progress' && (
        <section className="kid-screen progress-screen" aria-labelledby="progress-title">
          <button type="button" className="back-button" onClick={() => go('menu')}>
            Menu
          </button>
          <div className="screen-card">
            <p className="screen-kicker">Reporte familiar</p>
            <h2 id="progress-title">Tu progreso</h2>
            <div className="progress-grid">
              <article>
                <strong>{progress.stars}</strong>
                <span>Estrellas</span>
              </article>
              <article>
                <strong>{progress.completedPages}</strong>
                <span>Paginas leidas</span>
              </article>
              <article>
                <strong>{progress.minutes}</strong>
                <span>Minutos</span>
              </article>
            </div>
          </div>
        </section>
      )}

      {screen === 'video' && (
        <section className="kid-screen video-screen" aria-labelledby="video-title">
          <button type="button" className="back-button" onClick={() => go('menu')}>
            Menu
          </button>
          <div className="screen-card video-card">
            <p className="screen-kicker">Demo oficial</p>
            <h2 id="video-title">Video AMARU KIDS</h2>
            <video className="demo-video" controls playsInline preload="metadata">
              <source src={videoUrl} type="video/mp4" />
              Tu navegador no puede reproducir este video.
            </video>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
