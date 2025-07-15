// Cursos por ciclo (1 al 14) con IDs únicos y prerrequisitos (simples)
const cursos = {
  1: [
    { id: 'biocel', nombre: 'Biología Celular y Molecular' },
    { id: 'introMed', nombre: 'Introducción a la Medicina' },
    { id: 'mate', nombre: 'Matemática' },
    { id: 'quimica', nombre: 'Química' },
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
  ],
  4: [
    { id: 'morfo3', nombre: 'Morfofisiología III', prereq: ['morfo2'] },
    { id: 'fisiopato', nombre: 'Fisiopatología' },
    { id: 'infecto', nombre: 'Infectología Básica' },
    { id: 'desarrollo', nombre: 'Desarrollo y Crecimiento' },
    { id: 'bioetica', nombre: 'Bioética' }
  ],
  5: [
    { id: 'morfo4', nombre: 'Morfofisiología IV', prereq: ['morfo3'] },
    { id: 'fisio1', nombre: 'Fisiopatología II' },
    { id: 'bioestad', nombre: 'Bioestadística' },
    { id: 'fundamed', nombre: 'Fundamentos de Medicina Interna' },
    { id: 'saludmental', nombre: 'Salud Mental' },
    { id: 'electivo5', nombre: 'Electivo' }
  ],
  6: [
    { id: 'anatoPat', nombre: 'Anatomía Patológica' },
    { id: 'apoyoDx', nombre: 'Apoyo al Diagnóstico' },
    { id: 'farmaco', nombre: 'Farmacología' },
    { id: 'semiologia', nombre: 'Semiología' },
    { id: 'electivo6', nombre: 'Electivo' }
  ],
  7: [
    { id: 'nutricion', nombre: 'Nutrición y Prácticas Saludables' },
    { id: 'epi', nombre: 'Epidemiología' },
    { id: 'metodoinv', nombre: 'Metodología de Investigación' },
    { id: 'medint1', nombre: 'Medicina Interna I' },
    { id: 'calidad', nombre: 'Seguridad del Paciente y Calidad' }
  ],
  8: [
    { id: 'saludpublica', nombre: 'Salud Pública' },
    { id: 'medev', nombre: 'Medicina Basada en Evidencia' },
    { id: 'medint2', nombre: 'Medicina Interna II' },
    { id: 'atencPrim', nombre: 'Atención Primaria en Salud' },
    { id: 'electivo8', nombre: 'Electivo' }
  ],
  9: [
    { id: 'terapeutica', nombre: 'Terapéutica' },
    { id: 'tesis1', nombre: 'Tesis I' },
    { id: 'medint3', nombre: 'Medicina Interna III' },
    { id: 'legal', nombre: 'Medicina Legal' },
    { id: 'electivo9', nombre: 'Electivo' }
  ],
  10: [
    { id: 'cirugia', nombre: 'Cirugía' },
    { id: 'paliativos', nombre: 'Cuidados Paliativos y Rehabilitación' },
    { id: 'eco', nombre: 'Ecografía' },
    { id: 'analisis1', nombre: 'Análisis de Casos I' }
  ],
  11: [
    { id: 'pedia', nombre: 'Pediatría' },
    { id: 'gineco', nombre: 'Ginecología y Obstetricia' },
    { id: 'tesis2', nombre: 'Tesis II' }
  ],
  12: [
    { id: 'bioinfo', nombre: 'Informática Biomédica' },
    { id: 'gestion', nombre: 'Gerencia en Salud' },
    { id: 'preinternado', nombre: 'Pre-internado' },
    { id: 'analisis2', nombre: 'Análisis de Casos II' }
  ],
  13: [
    { id: 'investigacion', nombre: 'Trabajo de Investigación' },
    { id: 'internado1', nombre: 'Internado en Cirugía' },
    { id: 'internado2', nombre: 'Internado en Gineco-Obstetricia' },
    { id: 'internado3', nombre: 'Internado en Medicina' },
    { id: 'internado4', nombre: 'Internado en Pediatría' }
  ],
  14: [
    { id: 'internado5', nombre: 'Internado en Emergencias' },
    { id: 'internado6', nombre: 'Internado en Salud Pública' },
    { id: 'internado7', nombre: 'Internado en Familia y Comunidad' },
    { id: 'internado8', nombre: 'Internado en Electivo' }
  ]
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
    cursos[ciclo].forEach(curso => {
      const divCurso = crearCurso(curso);
      columna.appendChild(divCurso);
    });
    malla.appendChild(columna);
  }
}

renderMalla();

