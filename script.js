const cursos = {
  1: [
    { id: 'bio', nombre: 'Biología Celular' },
    { id: 'quim', nombre: 'Química General' }
  ],
  2: [
    { id: 'anatomia', nombre: 'Anatomía', prereq: ['bio'] },
    { id: 'bioquimica', nombre: 'Bioquímica', prereq: ['quim'] }
  ],
  3: [
    { id: 'genetica', nombre: 'Genética', prereq: ['bio'] }
  ],
  4: [
    { id: 'farmaco', nombre: 'Farmacología', prereq: ['bioquimica'] }
  ],
  5: [
    { id: 'fisiopato', nombre: 'Fisiopatología', prereq: ['farmaco'] }
  ],
  6: [],
  7: [],
  8: [],
  9: [],
  10: [],
  11: [],
  12: [],
  13: [],
  14: []
};

const aprobados = new Set();

function crearCurso(curso) {
  const div = document.createElement('div');
  div.className = 'curso';
  div.textContent = curso.nombre;
  div.id = curso.id;
  if (curso.prereq) div.classList.add('bloqueado');

  div.onclick = () => {
    if (!div.classList.contains('bloqueado')) {
      if (div.classList.contains('aprobado')) {
        div.classList.remove('aprobado');
        aprobados.delete(curso.id);
      } else {
        div.classList.add('aprobado');
        aprobados.add(curso.id);
      }
      actualizarBloqueos();
    }
  };
  return div;
}

function actualizarBloqueos() {
  document.querySelectorAll('.curso').forEach(cursoEl => {
    const info = encontrarCurso(cursoEl.id);
    if (info?.prereq) {
      const cumple = info.prereq.every(r => aprobados.has(r));
      if (cumple) {
        cursoEl.classList.remove('bloqueado');
      } else {
        cursoEl.classList.remove('aprobado');
        cursoEl.classList.add('bloqueado');
        aprobados.delete(info.id);
      }
    }
  });
}

function encontrarCurso(id) {
  for (const ciclo in cursos) {
    for (const curso of cursos[ciclo]) {
      if (curso.id === id) return curso;
    }
  }
  return null;
}

function renderMalla() {
  const malla = document.getElementById('malla');
  for (let ciclo = 1; ciclo <= 14; ciclo++) {
    const columna = document.createElement('div');
    columna.className = 'ciclo';
    const titulo = document.createElement('h2');
    titulo.textContent = `Ciclo ${ciclo}`;
    columna.appendChild(titulo);
    (cursos[ciclo] || []).forEach(curso => {
      const divCurso = crearCurso(curso);
      columna.appendChild(divCurso);
    });
    malla.appendChild(columna);
  }
}

renderMalla();

