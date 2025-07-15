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
  ],
  4: [
    { id: 'morfo3', nombre: 'Morfofisiología III' },
    { id: 'fisio', nombre: 'Fisiopatología' },
    { id: 'infecto', nombre: 'Infectología Básica' },
    { id: 'crecimiento', nombre: 'Desarrollo y Crecimiento' },
    { id: 'bioetica', nombre: 'Bioética' }
  ],
  5: [
    { id: 'morfo4', nombre: 'Morfofisiología IV' },
    { id: 'fisiopato', nombre: 'Fisiopatología II' },
    { id: 'bioestad', nombre: 'Bioestadística' },
    { id: 'fundamentos', nombre: 'Fundamentos de Medicina' },
    { id: 'intercultural', nombre: 'Interculturalidad' },
    { id: 'saludMental', nombre: 'Salud Mental' },
    { id: 'electivo5', nombre: 'Electivo' }
  ],
  6: [
    { id: 'anatomiaPat', nombre: 'Anatomía Patológica' },
    { id: 'apoyo', nombre: 'Apoyo al Diagnóstico' },
    { id: 'farmacologia', nombre: 'Farmacología' },
    { id: 'semiologia', nombre: 'Semiología' },
    { id: 'electivo6', nombre: 'Electivo' }
  ],
  7: [
    { id: 'nutricion', nombre: 'Nutrición y Prácticas Saludables' },
    { id: 'epidemio', nombre: 'Epidemiología' },
    { id: 'metodologia', nombre: 'Metodología de la Investigación' },
    { id: 'medicinaInt1', nombre: 'Medicina Interna I' },
    { id: 'calidad', nombre: 'Calidad de Atención Médica' }
  ],
  8: [
    { id: 'saludPublica', nombre: 'Salud Pública' },
    { id: 'evidencia', nombre: 'Medicina Basada en la Evidencia' },
    { id: 'medicinaInt2', nombre: 'Medicina Interna II' },
    { id: 'atencionPrimaria', nombre: 'Atención Primaria en Salud' },
    { id: 'electivo8', nombre: 'Electivo' }
  ],
  9: [
    { id: 'terapeutica', nombre: 'Terapéutica' },
    { id: 'tesis1', nombre: 'Tesis I' },
    { id: 'medicinaInt3', nombre: 'Medicina Interna III' },
    { id: 'legal', nombre: 'Medicina Legal' },
    { id: 'electivo9', nombre: 'Electivo' }
  ],
  10: [
    { id: 'cirugia', nombre: 'Cirugía' },
    { id: 'paliativos', nombre: 'Cuidados Paliativos y Rehabilitación Física' },
    { id: 'eco', nombre: 'Ecografía' },
    { id: 'casos1', nombre: 'Análisis de Casos I' }
  ],
  11: [
    { id: 'pediatria', nombre: 'Pediatría' },
    { id: 'gine', nombre: 'Ginecología y Obstetricia' },
    { id: 'tesis2', nombre: 'Tesis II' }
  ],
  12: [
    { id: 'infoBio', nombre: 'Informática Biomédica' },
    { id: 'gestion', nombre: 'Gerencia en Salud' },
    { id: 'preInternado', nombre: 'Pre-internado' },
    { id: 'casos2', nombre: 'Análisis de Casos II' }
  ],
  13: [
    { id: 'trabajo', nombre: 'Trabajo de Investigación' },
    { id: 'intCirugia', nombre: 'Internado en Cirugía' },
    { id: 'intGine', nombre: 'Internado en Ginecología y Obstetricia' }
  ],
  14: [
    { id: 'intMed', nombre: 'Internado en Medicina' },
    { id: 'intPedia', nombre: 'Internado en Pediatría' }
  ]
};

let aprobados = new Set();

function crearCurso(curso) {
  const div = document.createElement('div');
  div.className = 'curso';
  div.textContent = curso.nombre;
  div.id = curso.id;
  if (curso.prereq && !curso.prereq.every(p => aprobados.has(p))) {
    div.classList.add('bloqueado');
  }
  div.onclick = () => {
    if (div.classList.contains('bloqueado')) return;

    if (div.classList.contains('aprobado')) {
      div.classList.remove('aprobado');
      aprobados.delete(curso.id);
    } else {
      div.classList.add('aprobado');
      aprobados.add(curso.id);
    }
    actualizarBloqueos();
  };
  return div;
}

function actualizarBloqueos() {
  document.querySelectorAll('.curso').forEach(cursoDiv => {
    const curso = encontrarCursoPorId(cursoDiv.id);
    if (curso?.prereq) {
      const ready = curso.prereq.every(p => aprobados.has(p));
      if (ready) {
        cursoDiv.classList.remove('bloqueado');
      } else {
        cursoDiv.classList.remove('aprobado');
        cursoDiv.classList.add('bloqueado');
        aprobados.delete(curso.id);
      }
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
  const malla = document.getElementById('malla');
  for (const ciclo in cursos) {
    const contenedor = document.createElement('div');
    contenedor.className = 'semestre';

    const titulo = document.createElement('h2');
    titulo.textContent = `Ciclo ${ciclo}`;
    contenedor.appendChild(titulo);

    const fila = document.createElement('div');
    fila.className = 'contenedor';
    cursos[ciclo].forEach(curso => fila.appendChild(crearCurso(curso)));

    contenedor.appendChild(fila);
    malla.appendChild(contenedor);
  }
}

renderMalla();
