const cursos = {
  1: [
    { id: 'biocel', nombre: 'Biología Celular y Molecular', desbloquea: ['morfo1'] },
    { id: 'introMed', nombre: 'Introducción a la Medicina', desbloquea: ['redInv1'] },
    { id: 'mate', nombre: 'Matemática' },
    { id: 'quimica', nombre: 'Química', desbloquea: ['bioquim'] },
    { id: 'lengua', nombre: 'Lengua y Oratoria' },
    { id: 'desemp', nombre: 'Desempeño Universitario' }
  ],
  2: [
    { id: 'morfo1', nombre: 'Morfofisiología I', prereq: ['biocel'] },
    { id: 'anatomia', nombre: 'Anatomía General' },
    { id: 'redInv1', nombre: 'Introducción a la Investigación', prereq: ['introMed'] },
    { id: 'bioquim', nombre: 'Bioquímica', prereq: ['quimica'] },
    { id: 'redaccion', nombre: 'Redacción General' },
    { id: 'realidad', nombre: 'Realidad Nacional' }
  ],
  3: [
    { id: 'morfo2', nombre: 'Morfofisiología II', prereq: ['morfo1'] },
    { id: 'inmuno', nombre: 'Inmunología' },
    { id: 'genetica', nombre: 'Genética Médica' },
    { id: 'estadistica', nombre: 'Estadística General' },
    { id: 'filosofia', nombre: 'Filosofía' },
    { id: 'ambiente', nombre: 'Educación Ambiental' }
  ]
  // Puedes seguir agregando más semestres aquí
};

const aprobados = new Set();

function crearCurso(curso) {
  const div = document.createElement('div');
  div.className = 'curso';
  div.textContent = curso.nombre;
  div.id = curso.id;
  if (curso.prereq) {
    div.classList.add('bloqueado');
  }
  div.onclick = () => {
    if (!div.classList.contains('bloqueado')) {
      div.classList.add('aprobado');
      aprobados.add(curso.id);
      desbloquearCursos();
    }
  };
  return div;
}

function desbloquearCursos() {
  document.querySelectorAll('.curso').forEach(curso => {
    const info = encontrarCursoPorId(curso.id);
    if (info?.prereq) {
      const ready = info.prereq.every(p => aprobados.has(p));
      if (ready) curso.classList.remove('bloqueado');
    }
  });
}

function encontrarCursoPorId(id) {
  for (const semestre in cursos) {
    for (const curso of cursos[semestre]) {
      if (curso.id === id) return curso;
    }
  }
  return null;
}

function renderMalla() {
  const mallaDiv = document.getElementById('malla');
  for (const semestre in cursos) {
    const container = document.createElement('div');
    container.className = 'semestre';
    const titulo = document.createElement('h2');
    titulo.textContent = `Semestre ${semestre}`;
    const fila = document.createElement('div');
    fila.className = 'contenedor';
    cursos[semestre].forEach(curso => {
      const cursoDiv = crearCurso(curso);
      fila.appendChild(cursoDiv);
    });
    container.appendChild(titulo);
    container.appendChild(fila);
    mallaDiv.appendChild(container);
  }
}

renderMalla();

