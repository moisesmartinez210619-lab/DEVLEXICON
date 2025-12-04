// -------------------------
// DATOS DEL GLOSARIO
// -------------------------
const terms = [
  { id: 1, english: "Debug", pos: "verb", spanish: "Depurar", example: "I need to debug the code to find the error." },
  { id: 2, english: "Deploy", pos: "verb", spanish: "Desplegar", example: "We will deploy the new feature on Friday." },
  { id: 3, english: "Framework", pos: "noun", spanish: "Marco de trabajo", example: "React is a popular JavaScript framework." },
  { id: 4, english: "Frontend", pos: "noun", spanish: "Interfaz visible al usuario", example: "Frontend uses HTML, CSS and JS." },
  { id: 5, english: "Design", pos: "verb", spanish: "Diseñar", example: "I design interfaces using Figma." },
  { id: 6, english: "Backend", pos: "noun", spanish: "Lógica invisible al usuario", example: "The backend handles requests." },
  { id: 7, english: "Object", pos: "noun", spanish: "Objeto", example: "Each object has properties." },
  { id: 8, english: "Class", pos: "noun", spanish: "Clase", example: "He created a new class." },
  { id: 9, english: "Database", pos: "noun", spanish: "Base de datos", example: "The website uses a database." },
  { id: 10, english: "SQL", pos: "noun", spanish: "Lenguaje de consultas", example: "SQL manages data tables." },

  { id: 11, english: "Bugs", pos: "noun", spanish: "Errores", example: "Debugging removes bugs." },
  { id: 12, english: "Toggler", pos: "noun", spanish: "Interruptor", example: "A toggler activates a function." },
  { id: 13, english: "Badge", pos: "noun", spanish: "Insignia visual", example: "He added a badge component." },
  { id: 14, english: "UTF-8", pos: "noun", spanish: "Codificación Unicode", example: "UTF-8 avoids errors." },
  { id: 15, english: "Metadata", pos: "noun", spanish: "Datos sobre datos", example: "Images contain metadata." },
  { id: 16, english: "Git", pos: "noun", spanish: "Versionamiento", example: "Git tracks changes." },
  { id: 17, english: "API", pos: "noun", spanish: "Interfaz de comunicación", example: "The app consumes an API." },
  { id: 18, english: "DevLexicon", pos: "noun", spanish: "Glosario técnico", example: "They built DevLexicon." },
  { id: 19, english: "Commit", pos: "verb", spanish: "Confirmar", example: "They commit changes." },
  { id: 20, english: "Merge", pos: "verb", spanish: "Unir", example: "He merged branches." },

  { id: 21, english: "Code", pos: "verb", spanish: "Codificar", example: "Now you need to code it." },
  { id: 22, english: "Troubleshoot", pos: "verb", spanish: "Solucionar", example: "He troubleshoot the issue." },
  { id: 23, english: "Implement", pos: "verb", spanish: "Implementar", example: "Implement the new feature." },
  { id: 24, english: "Update", pos: "verb", spanish: "Actualizar", example: "You must update Windows." },
  { id: 25, english: "Refactor", pos: "verb", spanish: "Refactorizar", example: "They refactored the code." },

  { id: 26, english: "Repository", pos: "noun", spanish: "Repositorio", example: "Code is stored there." },
  { id: 27, english: "Scrum", pos: "noun", spanish: "Marco ágil", example: "We use Scrum." },
  { id: 28, english: "Sprint", pos: "noun", spanish: "Ciclo de trabajo", example: "Sprint finished." },
  { id: 29, english: "Backlog", pos: "noun", spanish: "Tareas pendientes", example: "Backlog contains tasks." },
  { id: 30, english: "Trigger", pos: "noun", spanish: "Disparador", example: "A trigger starts the event." },

  { id: 31, english: "Constraint", pos: "verb", spanish: "Limitar", example: "Memory constraints apply." },
  { id: 32, english: "JSON", pos: "noun", spanish: "Formato de datos", example: "API returns JSON." },
  { id: 33, english: "HTTP", pos: "noun", spanish: "Protocolo web", example: "HTTP connects clients." },
  { id: 34, english: "Swagger", pos: "noun", spanish: "Documentación API", example: "Swagger documents APIs." },
  { id: 35, english: "Async", pos: "noun", spanish: "Asíncrono", example: "Async code is faster." },
  { id: 36, english: "Primary Key", pos: "noun", spanish: "Llave primaria", example: "ID is a PK." },
  { id: 37, english: "Foreign Key", pos: "noun", spanish: "Llave foránea", example: "FK links tables." },
  { id: 38, english: "Nvarchar", pos: "noun", spanish: "Cadena variable", example: "Name is NVARCHAR." },
  { id: 39, english: "INT", pos: "noun", spanish: "Entero", example: "Age uses INT." },
  { id: 40, english: "Boolean", pos: "noun", spanish: "Verdadero/Falso", example: "Active uses boolean." }
];

// -------------------------
let filtered = [];
let selected = null;

// -------------------------
const input = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");
const detailCard = document.getElementById("detailCard");
const hearBtn = document.getElementById("hearBtn");

// -------------------------
function renderList() {
  resultsList.innerHTML = "<h3>Resultados</h3>";

  if (filtered.length === 0) {
    resultsList.innerHTML += `<p class="result-empty">Escribe para buscar un término…</p>`;
    return;
  }

  filtered.forEach(t => {
    const div = document.createElement("div");
    div.className = "term-item" + (selected && selected.id === t.id ? " active" : "");
    div.innerHTML = `<span>${t.english}</span> <small>${t.pos}</small>`;
    div.onclick = () => {
      selected = t;
      renderList();
      renderDetail();
    };
    resultsList.appendChild(div);
  });
}

// -------------------------
function renderDetail() {
  if (!selected) {
    detailCard.innerHTML = `<p class="result-empty">Busca un término para ver su definición.</p>`;
    return;
  }

  detailCard.innerHTML = `
    <div class="detail-header">
      <h2>${selected.english}</h2>
      <span class="pos">${selected.pos}</span>
    </div>

    <div class="detail-grid">
      <div class="info-box">
        <h4>Meaning in Spanish</h4>
        <p>${selected.spanish}</p>
      </div>

      <div class="info-box">
        <h4>Example sentence</h4>
        <p>${selected.example}</p>
      </div>
    </div>
  `;
}

// -------------------------
input.addEventListener("input", () => {
  const q = input.value.trim().toLowerCase();

  if (q === "") {
    filtered = [];
    selected = null;
    renderList();
    renderDetail();
    return;
  }

  filtered = terms.filter(t =>
    t.english.toLowerCase().includes(q) ||
    t.spanish.toLowerCase().includes(q) ||
    t.pos.toLowerCase().includes(q)
  );

  selected = null;
  renderList();
  renderDetail();
});

// -------------------------
hearBtn.addEventListener("click", () => {
  if (!selected) return;
  const speak = new SpeechSynthesisUtterance(
    `${selected.english}. ${selected.example}`
  );
  speak.lang = "en-US";
  speechSynthesis.speak(speak);
});

// -------------------------
renderList();
re
