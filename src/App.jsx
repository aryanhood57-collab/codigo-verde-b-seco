import { useState, useEffect, useRef } from "react";

// ============================================================
// OPERACIÓN: CÓDIGO VERDE — VERSIÓN B
// Técnico Superior en Servicios Empresariales + Construcción
// Grupo SE-2-1 / CO-2-1 | EDA1001 | II Cuatrimestre 2026
// Equipos: BETA · DELTA
// Palabra: VERTIMIENTO
// ============================================================

const VERSION = "B";
const EQUIPOS_VERSION = [
  { nombre: "BETA",  color: "#1565C0", icono: "🏢", integrantes: 4 },
  { nombre: "DELTA", color: "#6A1B9A", icono: "🔧", integrantes: 4 },
];
const TEAMS_URL = "https://teams.microsoft.com";
const DURACION_GLOBAL = 90 * 60;

// Letras de VERTIMIENTO
const LETRAS_PALABRA = ["V","E","R","T","I","M","I","E","N","T"];

const RETOS = [
  // ─────────────────────────────────────────────────────────
  // BLOQUE 1: CALENTAMIENTO (Retos 1–3, 10 min c/u)
  // ─────────────────────────────────────────────────────────
  {
    id: 1, bloque: "CALENTAMIENTO", bloqueColor: "#2E7D32", minutos: 10,
    titulo: "El mapa de impactos",
    letra: "V",
    narrativa: `Una empresa de servicios empresariales en el corregimiento de Bella Vista está siendo auditada por MiAMBIENTE.
El auditor le pide al gerente ambiental que clasifique 7 situaciones según el tipo de impacto. El gerente entró en pánico. Tu equipo tiene 10 minutos para rescatarlo.`,
    escenario: `Las 7 situaciones identificadas en la empresa "Servicios del Pacífico S.A.":
① Fotocopiadoras e impresoras encendidas 24/7 sin uso nocturno → consumo eléctrico innecesario.
② Plomería en mal estado: 3 grifos con goteo permanente en los baños.
③ Residuos de papel, cartuchos de tinta y plástico mezclados en un solo contenedor.
④ Empleados que viajan diariamente desde Chorrera en vehículo particular (sin carpooling).
⑤ Aire acondicionado central configurado a 18°C en oficinas con ventanas abiertas.
⑥ Proveedor de limpieza usa solventes clorados sin hoja de seguridad (SDS).
⑦ El piso 4 descarga agua de limpieza con residuos de jabón directo al drenaje sin trampa de sólidos.`,
    pregunta1: {
      texto: "Clasifica cada situación según el tipo de aspecto ambiental (energía, agua, residuos, emisiones, sustancias peligrosas) y determina cuál genera el impacto ambiental MÁS severo. Justifica tu elección con argumentos técnicos.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Cuál es la diferencia correcta entre ASPECTO AMBIENTAL e IMPACTO AMBIENTAL según ISO 14001?",
      opciones: [
        "A) El aspecto es el problema y el impacto es la solución propuesta",
        "B) El aspecto es el elemento de la actividad que interactúa con el ambiente; el impacto es el cambio en el ambiente resultante de ese aspecto",
        "C) El aspecto es el impacto económico; el impacto es el efecto social",
        "D) Ambos términos son sinónimos en el contexto de ISO 14001",
      ],
      correcta: "B",
      explicacion: "ISO 14001:2015 define aspecto ambiental como el elemento de las actividades, productos o servicios que puede interactuar con el ambiente (ej: uso de solventes), e impacto ambiental como el cambio en el ambiente resultante de ese aspecto (ej: contaminación del aire). La relación es causal: aspecto → impacto.",
    },
  },
  {
    id: 2, bloque: "CALENTAMIENTO", bloqueColor: "#2E7D32", minutos: 10,
    titulo: "La huella oculta de la construcción",
    letra: "E",
    narrativa: `Un proyecto de construcción de un edificio de 6 pisos en Panamá recibió su primer reporte de huellas ambientales.
Los números son alarmantes pero los ingenieros no saben interpretarlos. Tu equipo debe hacerlo.`,
    escenario: `Informe de Huellas — Proyecto "Residencial Los Cóbanos" — 8 meses de construcción:
▪ Huella de carbono acumulada: 312 tCO₂e
  (Desglose: maquinaria diesel 180 tCO₂e · electricidad de obra 67 tCO₂e · transporte de materiales 65 tCO₂e)
▪ Huella hídrica: 4,800 m³ (mezclado de concreto, curado, limpieza)
▪ Residuos de construcción (RCD): 38 toneladas (concreto 55%, madera 20%, acero 15%, plástico 10%)
▪ Biocapacidad de Panamá: 3.8 hag/persona/año
▪ Factor eléctrico: 0.264 kg CO₂eq/kWh`,
    pregunta1: {
      texto: "Identifica la fuente de emisión más importante y propón DOS estrategias técnicas para reducirla durante los próximos 4 meses de obra. Calcula la reducción en tCO₂e si se logra reducir el consumo de maquinaria diesel en un 25%.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Qué porcentaje del total de tCO₂e acumuladas corresponde al consumo eléctrico de la obra?",
      opciones: [
        "A) 21.5%",
        "B) 57.7%",
        "C) 12.6%",
        "D) 20.8%",
      ],
      correcta: "A",
      explicacion: "Electricidad: 67 tCO₂e / 312 tCO₂e total × 100 = 21.47% ≈ 21.5%. Es la segunda fuente de emisión después de la maquinaria diesel (57.7%), lo que la convierte en un objetivo prioritario de reducción mediante uso eficiente y horarios de operación optimizados.",
    },
  },
  {
    id: 3, bloque: "CALENTAMIENTO", bloqueColor: "#2E7D32", minutos: 10,
    titulo: "El EIA que nadie quiso leer",
    letra: "R",
    narrativa: `Una promotora constructora presentó su EIA a MiAMBIENTE para aprobación.
El técnico revisor encontró 4 deficiencias que pueden provocar rechazo del expediente.
Tu equipo actúa como asesores de último minuto.`,
    escenario: `Fragmento del EIA — Proyecto "Centro Comercial Verano Real":

"Sección 3. Descripción del entorno:
El área del proyecto colinda con el río La Villa. No se realizó estudio de caudal ni análisis de calidad del agua porque el proyecto no descargará efluentes al río.

Sección 4. Plan de manejo ambiental:
Los residuos de demolición serán manejados por el contratista según 'sus propios criterios técnicos'.
La reforestación compensatoria se realizará con 200 palmeras ornamentales en zonas verdes del proyecto.

Sección 5. Participación ciudadana:
No se realizó audiencia pública porque la empresa considera que el impacto del proyecto es mínimo.

Sección 6. Regente ambiental:
La empresa designará un regente ambiental dentro de los 90 días posteriores a la aprobación del EIA."`,
    pregunta1: {
      texto: "Identifica las 4 deficiencias técnicas o legales. Para cada una: (a) señala la norma o principio ambiental violado, y (b) propón cómo corregirla antes de la resubmisión.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿En qué categoría de EIA debe clasificarse un proyecto que colinda con un cuerpo de agua y tiene potencial de afectación hídrica, según el Decreto 57?",
      opciones: [
        "A) Categoría C (sin EIA formal, solo registro)",
        "B) Categoría B (EIA semi-detallado con audiencia restringida)",
        "C) Categoría A (EIA detallado con audiencia pública obligatoria)",
        "D) Depende exclusivamente del área de construcción en m²",
      ],
      correcta: "C",
      explicacion: "La proximidad a cuerpos de agua y el potencial de afectación hídrica elevan automáticamente la categoría de impacto. El Decreto 57 clasifica como Categoría A (máxima) los proyectos con potencial de impactos significativos e irreversibles sobre recursos hídricos, lo que activa la audiencia pública obligatoria.",
    },
  },

  // ─────────────────────────────────────────────────────────
  // BLOQUE 2: NÚCLEO TÉCNICO (Retos 4–7, 8 min c/u)
  // ─────────────────────────────────────────────────────────
  {
    id: 4, bloque: "NÚCLEO TÉCNICO", bloqueColor: "#E65100", minutos: 8,
    titulo: "El SGA desmantelado",
    letra: "T",
    narrativa: `Una empresa constructora tenía un SGA certificado ISO 14001. Tras el cambio de gerencia,
el sistema se desmoronó en 6 meses. Tu equipo debe diagnosticar qué cláusulas de ISO 14001 fueron abandonadas.`,
    escenario: `Evidencias recogidas durante la auditoría de rescate:
✗ La nueva gerencia declaró que "el medio ambiente no es prioridad comercial" en reunión de directivos.
✗ Se eliminaron los registros de consumo energético y de agua "para reducir carga administrativa".
✗ Los trabajadores no reciben capacitación ambiental desde hace 7 meses.
✗ El plan de respuesta ante emergencias ambientales (derrame de combustible) no fue actualizado al cambiar de proveedor de maquinaria.
✗ Las acciones correctivas pendientes de la última auditoría fueron archivadas sin implementar.
✗ Los objetivos ambientales del año fueron establecidos unilateralmente por el asistente contable, sin análisis de contexto.`,
    pregunta1: {
      texto: "Mapea cada evidencia contra la cláusula específica de ISO 14001:2015 que incumple (ej: Cláusula 5.1, 6.1, 7.2, 8.2, etc.). Luego, prioriza las 3 acciones de recuperación más urgentes con responsable y plazo.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Cuál de las siguientes evidencias representa el incumplimiento MÁS crítico para la supervivencia del SGA?",
      opciones: [
        "A) La falta de capacitación de trabajadores",
        "B) Los registros de consumo eliminados",
        "C) La declaración de la gerencia de que el ambiente no es prioridad comercial",
        "D) El plan de emergencias desactualizado",
      ],
      correcta: "C",
      explicacion: "La falta de liderazgo y compromiso de la alta dirección (Cláusula 5.1) es el incumplimiento más crítico porque invalida todo el sistema. Sin el compromiso explícito de la dirección, ningún elemento del SGA puede sostenerse: sin recursos, sin política, sin rendición de cuentas. Los demás son síntomas de este fallo central.",
    },
  },
  {
    id: 5, bloque: "NÚCLEO TÉCNICO", bloqueColor: "#E65100", minutos: 8,
    titulo: "El ODS equivocado",
    letra: "I",
    narrativa: `Un estudiante de último año presentó su proyecto de sostenibilidad empresarial y asignó ODS a 8 prácticas de una empresa constructora.
Cometió 3 errores de asignación. Tu equipo debe encontrarlos y corregirlos.`,
    escenario: `Prácticas de la empresa y ODS asignados por el estudiante:
① Instalación de captación de agua pluvial en campamentos de obra → ODS 6 ✓/?
② Gestión de residuos peligrosos (aceites usados, pinturas) con empresa certificada → ODS 3 ✓/?
③ Programa de empleo local para comunidades cercanas a la obra → ODS 1 ✓/?
④ Uso de concreto reciclado (RCD procesado) en cimentaciones → ODS 9 ✓/?
⑤ Capacitación de trabajadores en primeros auxilios y EPP → ODS 4 ✓/?
⑥ Reducción del 40% en consumo eléctrico mediante iluminación LED → ODS 7 ✓/?
⑦ Compra de madera certificada FSC para encofrados → ODS 15 ✓/?
⑧ Reporte de sostenibilidad publicado con datos de huella de carbono → ODS 17 ✓/?`,
    pregunta1: {
      texto: "Identifica los 3 errores de asignación de ODS. Para cada error: (a) explica por qué el ODS asignado es incorrecto o incompleto, y (b) indica cuál es el ODS más adecuado y uno secundario.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Cuál ODS es el más transversal para el sector construcción, es decir, el que aparece como secundario en mayor número de prácticas sostenibles del sector?",
      opciones: [
        "A) ODS 3 (Salud y bienestar)",
        "B) ODS 11 (Ciudades y comunidades sostenibles)",
        "C) ODS 13 (Acción por el clima)",
        "D) ODS 12 (Producción y consumo responsables)",
      ],
      correcta: "D",
      explicacion: "El ODS 12 aparece como ODS secundario en prácticamente todas las prácticas de construcción sostenible: gestión de RCD, compras responsables, uso eficiente de materiales, reducción de residuos. Es el hilo conductor de la sostenibilidad en el sector, complementando al ODS 11 que es el primario de ciudades y hábitat.",
    },
  },
  {
    id: 6, bloque: "NÚCLEO TÉCNICO", bloqueColor: "#E65100", minutos: 8,
    titulo: "La Leopold del desastre",
    letra: "M",
    narrativa: `Un técnico ambiental novato preparó una Matriz de Leopold para la fase de excavación de un proyecto de oficinas.
Tu equipo debe corregir los errores conceptuales antes de que el gerente la firme y la envíe a MiAMBIENTE.`,
    escenario: `Fragmento de la Matriz de Leopold — Actividad: Excavación y movimiento de tierras

→ Componente Suelo: Magnitud -8, Importancia 9 (correcto: impacto severo por remoción)
→ Componente Aire: Magnitud +2, Importancia 5 ✗ (técnico marcó impacto POSITIVO)
→ Componente Agua superficial: Magnitud -3, Importancia 2 ✗ (técnico le asignó importancia muy baja a sedimentación de quebradas)
→ Componente Flora/Fauna: Magnitud -6, Importancia 4 ✗ (técnico redujo importancia porque "es zona urbana")
→ Componente Social (empleos): Magnitud +4, Importancia 8 (correcto: generación de empleo temporal)
→ Componente Salud Ocupacional: [CELDA EN BLANCO]`,
    pregunta1: {
      texto: "Corrige los 3 errores de la matriz. Para cada corrección, explica el razonamiento técnico. Luego completa la celda en blanco [Excavación → Salud Ocupacional] con magnitud, importancia y justificación.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "En la Matriz de Leopold, ¿qué indica un valor de MAGNITUD negativo (-)?",
      opciones: [
        "A) Que el impacto es económicamente negativo para el proyecto",
        "B) Que el impacto tiene un efecto adverso o desfavorable sobre el componente ambiental",
        "C) Que el impacto es irreversible",
        "D) Que la probabilidad de ocurrencia es menor al 50%",
      ],
      correcta: "B",
      explicacion: "En la Matriz de Leopold, el signo de la magnitud indica la dirección del impacto: negativo (-) = efecto adverso o desfavorable sobre el componente ambiental; positivo (+) = efecto benéfico. El valor numérico (1 a 10) indica la intensidad del impacto, independientemente del signo.",
    },
  },
  {
    id: 7, bloque: "NÚCLEO TÉCNICO", bloqueColor: "#E65100", minutos: 8,
    titulo: "El PIGA urgente",
    letra: "I",
    narrativa: `Una empresa de servicios empresariales (call center + oficinas administrativas, 45 empleados)
acaba de recibir una observación de MiAMBIENTE: no tiene PIGA actualizado.
Tu equipo tiene 8 minutos para diseñar el núcleo del plan antes de la reunión con el inspector.`,
    escenario: `Datos de la empresa "Centrum Business Services":
• Oficinas: 3 pisos, edificio arrendado en Panamá Centro
• Residuos: papel (800 kg/mes), plásticos (120 kg/mes), cartuchos de tinta (15 kg/mes)
• Consumo eléctrico: 22,000 kWh/mes (principalmente AC y equipos de cómputo)
• Agua: 480 m³/mes (sanitarios + limpieza)
• Movilidad: 70% de empleados usa transporte individual
• Queja reciente: Quejas de vecinos por desechos de cartón en la acera durante días de recolección`,
    pregunta1: {
      texto: "Diseña los 3 programas prioritarios del PIGA para esta empresa: (1) Programa de gestión de residuos con segregación en origen, (2) Programa de eficiencia energética con meta cuantificable, (3) Programa de movilidad sostenible para empleados. Para cada programa: acciones concretas, responsable y KPI verde.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Cuál es el primer paso metodológico para elaborar un PIGA en una empresa de servicios?",
      opciones: [
        "A) Definir los KPI verdes y las metas ambientales del año",
        "B) Realizar el diagnóstico ambiental inicial para identificar aspectos e impactos significativos",
        "C) Solicitar la certificación ISO 14001 como punto de partida",
        "D) Contratar un regente ambiental certificado por MiAMBIENTE",
      ],
      correcta: "B",
      explicacion: "El diagnóstico ambiental inicial (auditoría de línea base) es siempre el primer paso: permite identificar los aspectos ambientales de la organización, valorar sus impactos, determinar los significativos y establecer la línea base a partir de la cual se definen metas y programas. Sin diagnóstico, el PIGA carece de fundamento.",
    },
  },

  // ─────────────────────────────────────────────────────────
  // BLOQUE 3: SPRINT FINAL (Retos 8–10, 5 min c/u)
  // ─────────────────────────────────────────────────────────
  {
    id: 8, bloque: "SPRINT FINAL", bloqueColor: "#1565C0", minutos: 5,
    titulo: "El indicador impostado",
    letra: "E",
    narrativa: `Un analista ambiental presentó 6 indicadores para el reporte de sostenibilidad de una constructora.
Tu equipo tiene 5 minutos para identificar cuáles son KPI verdes válidos y cuáles son datos sin valor de gestión.`,
    escenario: `Los 6 indicadores presentados:
① "Número de empleados que separaron basura en casa durante la campaña: 22"
② "Porcentaje de RCD valorizado (reciclado o reutilizado) sobre el total generado: 48%"
③ "Reducción en kWh/m² construido vs. proyecto anterior de igual tipología"
④ "Cantidad de publicaciones en LinkedIn sobre sostenibilidad: 36/año"
⑤ "Toneladas de CO₂e evitadas por sustitución de maquinaria diesel por eléctrica"
⑥ "Número de reuniones del comité ambiental realizadas durante el año: 12"`,
    pregunta1: {
      texto: "Clasifica los 6 indicadores en KPI verde válido (tiene línea base, es medible en impacto real, permite mejora) vs. indicador sin valor de gestión. Propón cómo mejorar UNO de los indicadores inválidos para convertirlo en KPI válido.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Cuál de los 6 indicadores tiene MAYOR validez como KPI ambiental de gestión?",
      opciones: [
        "A) Indicador ① (empleados que separaron basura en casa)",
        "B) Indicador ③ (kWh/m² construido vs. proyecto anterior)",
        "C) Indicador ④ (publicaciones en LinkedIn)",
        "D) Indicador ⑥ (reuniones del comité ambiental)",
      ],
      correcta: "B",
      explicacion: "El indicador ③ es el de mayor validez porque normaliza el consumo eléctrico por unidad de producción (m² construido), tiene una línea base comparativa (proyecto anterior), es medible en unidades físicas reales y permite evaluar la mejora de eficiencia de forma objetiva. Los demás miden actividades o comportamientos, no impactos ambientales.",
    },
  },
  {
    id: 9, bloque: "SPRINT FINAL", bloqueColor: "#1565C0", minutos: 5,
    titulo: "Verdad o trampa ambiental",
    letra: "N",
    narrativa: `En un foro empresarial en Panamá, 5 gerentes hicieron declaraciones sobre gestión ambiental.
Tu equipo tiene 5 minutos para validar o refutar cada afirmación con argumentos técnicos.`,
    escenario: `Las 5 declaraciones del foro:
① "Nuestra empresa de construcción solo genera impactos ambientales durante la fase de obra; una vez entregado el edificio, ya no somos responsables."
② "ISO 14001 no requiere que la empresa mejore su desempeño ambiental real; solo que tenga un sistema documentado."
③ "La huella hídrica de una empresa de servicios empresariales incluye tanto el agua que consume directamente como el agua embebida en los productos y servicios que adquiere."
④ "Un EIA aprobado por MiAMBIENTE garantiza que el proyecto no tendrá impactos ambientales negativos."
⑤ "Reducir el consumo de papel en una empresa de servicios es una acción de sostenibilidad que afecta simultáneamente la huella de carbono, la huella hídrica y la huella ecológica."`,
    pregunta1: {
      texto: "Clasifica cada declaración como VERDADERA o TRAMPA (falsa o engañosa). Corrige cada trampa con la información técnica correcta.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Cuál de las 5 declaraciones es COMPLETAMENTE VERDADERA sin matices?",
      opciones: [
        "A) Declaración ①",
        "B) Declaración ③",
        "C) Declaración ④",
        "D) Declaración ②",
      ],
      correcta: "B",
      explicacion: "La declaración ③ es completamente verdadera: la huella hídrica total (concepto de Hoekstra) incluye el agua directa (operativa) más el agua virtual embebida en los bienes y servicios adquiridos (huella indirecta). Las otras son trampas: ① ignora el ciclo de vida; ② es falsa (ISO 14001 requiere mejora continua); ④ es falsa (el EIA evalúa impactos pero no los elimina).",
    },
  },
  {
    id: 10, bloque: "SPRINT FINAL", bloqueColor: "#1565C0", minutos: 5,
    titulo: "El código final",
    letra: "T",
    narrativa: `Último reto. La misión está casi completa. 
Estas 5 afirmaciones resumen todo lo que aprendiste en EDA1001.
Solo los equipos con verdadero dominio técnico descifran el código final.`,
    escenario: `Afirmaciones integradoras — EDA1001 IIC2026:
① "El ciclo PHVA de ISO 14001 se detiene una vez que la empresa obtiene la certificación."
② "En una empresa de servicios, los aspectos ambientales significativos pueden ser tan relevantes como los de una industria manufacturera, si se considera la huella indirecta."
③ "El Decreto Ejecutivo 57 de 2000 y la Ley 41 de 1998 son instrumentos complementarios: la ley establece el marco, el decreto regula el procedimiento."
④ "Una empresa puede ser rentable económicamente e insostenible ambientalmente al mismo tiempo, sin contradicción interna."
⑤ "Implementar un PIGA en una PYME constructora es técnicamente imposible sin consultoría externa certificada."`,
    pregunta1: {
      texto: "Argumenta por qué la afirmación ④ es la más importante para un empresario del sector servicios o construcción que cree que sostenibilidad y rentabilidad son incompatibles. Usa al menos un ejemplo numérico o caso real del sector.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Cuáles de las 5 afirmaciones son VERDADERAS?",
      opciones: [
        "A) Solo ③ y ④",
        "B) Solo ②, ③ y ④",
        "C) Solo ①, ③ y ④",
        "D) Todas son verdaderas",
      ],
      correcta: "B",
      explicacion: "② es verdadera: la huella indirecta (Alcance 3) puede ser mayor en servicios que en industria. ③ es verdadera: Ley 41/1998 es el marco; Decreto 57/2000 es el reglamento procedimental de EIA. ④ es verdadera: rentabilidad y sostenibilidad son independientes en el corto plazo (aunque convergen a largo plazo). ① es falsa: ISO 14001 exige mejora continua post-certificación. ⑤ es falsa: existen guías públicas de MiAMBIENTE y metodologías accesibles para PYME.",
    },
  },
];

// ══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════════
export default function CodigoVerdeB() {
  const [pantalla, setPantalla] = useState("bienvenida");
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [retoActual, setRetoActual] = useState(0);
  const [respuestasAbiertas, setRespuestasAbiertas] = useState({});
  const [respuestasMultiple, setRespuestasMultiple] = useState({});
  const [retroalimentacion, setRetroalimentacion] = useState({});
  const [letrasDesveladas, setLetrasDesveladas] = useState([]);
  const [tiempoGlobal, setTiempoGlobal] = useState(DURACION_GLOBAL);
  const [tiempoReto, setTiempoReto] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const [retoEnviado, setRetoEnviado] = useState(false);
  const [actividadCompleta, setActividadCompleta] = useState(false);

  const intervaloGlobal = useRef(null);
  const intervaloReto = useRef(null);

  useEffect(() => {
    if (corriendo && tiempoGlobal > 0) {
      intervaloGlobal.current = setInterval(() => setTiempoGlobal(t => t - 1), 1000);
    } else clearInterval(intervaloGlobal.current);
    return () => clearInterval(intervaloGlobal.current);
  }, [corriendo, tiempoGlobal]);

  useEffect(() => {
    if (corriendo && tiempoReto > 0) {
      intervaloReto.current = setInterval(() => setTiempoReto(t => t - 1), 1000);
    } else clearInterval(intervaloReto.current);
    return () => clearInterval(intervaloReto.current);
  }, [corriendo, tiempoReto]);

  const formatTiempo = (seg) => {
    const m = Math.floor(seg / 60).toString().padStart(2, "0");
    const s = (seg % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const iniciarReto = (idx) => {
    setTiempoReto(RETOS[idx].minutos * 60);
    setRetoEnviado(false);
    setPantalla("reto");
  };

  const confirmarRespuesta = () => {
    const r = RETOS[retoActual];
    const seleccion = respuestasMultiple[retoActual];
    const esCorrecta = seleccion === r.pregunta2.correcta;
    setRetroalimentacion(prev => ({ ...prev, [retoActual]: { correcta: esCorrecta, explicacion: r.pregunta2.explicacion } }));
    setLetrasDesveladas(prev => [...prev, r.letra]);
    setRetoEnviado(true);
    clearInterval(intervaloReto.current);
  };

  const siguienteReto = () => {
    if (retoActual + 1 >= RETOS.length) {
      setActividadCompleta(true);
      setCorriendo(false);
      setPantalla("resultado");
    } else {
      setRetoActual(retoActual + 1);
      iniciarReto(retoActual + 1);
    }
  };

  const colorTiempoReto = () => {
    const total = RETOS[retoActual]?.minutos * 60 || 1;
    const pct = tiempoReto / total;
    if (pct > 0.5) return "#1565C0";
    if (pct > 0.25) return "#F57C00";
    return "#C62828";
  };

  // ── BIENVENIDA ──
  if (pantalla === "bienvenida") {
    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#E3F2FD 0%,#EDE7F6 50%,#E8EAF6 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"Arial,sans-serif", padding:"24px" }}>
        <div style={{ maxWidth:"680px", width:"100%", background:"#fff", borderRadius:"20px", boxShadow:"0 8px 32px rgba(0,0,0,0.12)", overflow:"hidden" }}>
          <div style={{ background:"linear-gradient(135deg,#1565C0,#1976D2)", padding:"32px 24px", textAlign:"center" }}>
            <div style={{ fontSize:"48px", marginBottom:"8px" }}>🌿🔐</div>
            <h1 style={{ color:"#fff", margin:0, fontSize:"26px", fontWeight:"900", letterSpacing:"2px" }}>OPERACIÓN: CÓDIGO VERDE</h1>
            <p style={{ color:"#BBDEFB", margin:"8px 0 0", fontSize:"14px" }}>Versión B · EDA1001 · II Cuatrimestre 2026</p>
            <p style={{ color:"#90CAF9", margin:"4px 0 0", fontSize:"13px" }}>Técnico Superior en Servicios Empresariales + Construcción</p>
          </div>
          <div style={{ padding:"28px 28px 16px", background:"#EDE7F6", borderLeft:"4px solid #7B1FA2" }}>
            <p style={{ margin:0, fontStyle:"italic", color:"#4527A0", fontSize:"15px", lineHeight:"1.7" }}>
              "Los sistemas de gestión ambiental del complejo empresarial han sido bloqueados por un fallo crítico.
              Diez protocolos de seguridad están activos. Solo un equipo con conocimiento técnico real puede desactivarlos
              en orden y descifrar el <strong>código de vertimiento de emergencia</strong>.
              Tienen <strong>90 minutos</strong>. El ambiente no espera."
            </p>
          </div>
          <div style={{ padding:"24px 28px" }}>
            <h2 style={{ color:"#1A237E", fontSize:"16px", marginBottom:"16px", textAlign:"center" }}>🛡️ SELECCIONA TU EQUIPO — VERSIÓN B</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"12px" }}>
              {EQUIPOS_VERSION.map(eq => (
                <button key={eq.nombre} onClick={() => setEquipoSeleccionado(eq)}
                  style={{ padding:"16px 12px", borderRadius:"12px", border: equipoSeleccionado?.nombre === eq.nombre ? `3px solid ${eq.color}` : "2px solid #E0E0E0", background: equipoSeleccionado?.nombre === eq.nombre ? eq.color + "22" : "#fff", cursor:"pointer", transition:"all 0.2s", textAlign:"center" }}>
                  <div style={{ fontSize:"28px" }}>{eq.icono}</div>
                  <div style={{ fontWeight:"bold", color: eq.color, fontSize:"15px", marginTop:"6px" }}>EQUIPO {eq.nombre}</div>
                  <div style={{ color:"#888", fontSize:"12px" }}>{eq.integrantes} integrantes</div>
                </button>
              ))}
            </div>
            {equipoSeleccionado && (
              <button onClick={() => { setCorriendo(true); setPantalla("instrucciones"); }}
                style={{ marginTop:"24px", width:"100%", padding:"16px", background:"linear-gradient(135deg,#1565C0,#1976D2)", color:"#fff", border:"none", borderRadius:"12px", fontSize:"16px", fontWeight:"bold", cursor:"pointer", letterSpacing:"1px" }}>
                🚀 INICIAR MISIÓN — EQUIPO {equipoSeleccionado.nombre}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── INSTRUCCIONES ──
  if (pantalla === "instrucciones") {
    return (
      <div style={{ minHeight:"100vh", background:"#E8EAF6", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"Arial,sans-serif", padding:"24px" }}>
        <div style={{ maxWidth:"680px", width:"100%", background:"#fff", borderRadius:"20px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", padding:"32px" }}>
          <h2 style={{ color:"#1A237E", textAlign:"center", fontSize:"20px" }}>📋 PROTOCOLO DE OPERACIÓN</h2>
          <div style={{ background:"#E8EAF6", borderRadius:"12px", padding:"20px", marginBottom:"20px" }}>
            {["🕐 Tienes 90 minutos en total para completar los 10 retos.", "⏱️ Cada reto tiene su propio tiempo: 10 min (calentamiento), 8 min (núcleo) o 5 min (sprint).", "📝 Cada reto tiene DOS partes: análisis abierto y selección múltiple.", "🔤 Al superar cada reto, se revela una letra del CÓDIGO MAESTRO.", "📤 Al finalizar, envía tus respuestas directamente a Microsoft TEAMS.", "⚠️ No puedes retroceder a un reto ya enviado.", "🤝 Trabajen en equipo: todos participan, todos aprenden."].map((item, i) => (
              <p key={i} style={{ margin:"8px 0", color:"#283593", fontSize:"14px" }}>{item}</p>
            ))}
          </div>
          <div style={{ textAlign:"center", background:"#FFF9C4", borderRadius:"10px", padding:"16px", marginBottom:"20px" }}>
            <p style={{ margin:0, color:"#F57F17", fontWeight:"bold", fontSize:"15px" }}>⏰ Tiempo global en marcha: {formatTiempo(tiempoGlobal)}</p>
            <p style={{ margin:"4px 0 0", color:"#795548", fontSize:"13px" }}>Equipo: {equipoSeleccionado?.icono} {equipoSeleccionado?.nombre}</p>
          </div>
          <button onClick={() => iniciarReto(0)} style={{ width:"100%", padding:"16px", background:"linear-gradient(135deg,#1565C0,#1976D2)", color:"#fff", border:"none", borderRadius:"12px", fontSize:"16px", fontWeight:"bold", cursor:"pointer" }}>
            🔓 ACTIVAR RETO 1
          </button>
        </div>
      </div>
    );
  }

  // ── RETO ──
  if (pantalla === "reto") {
    const r = RETOS[retoActual];
    const retro = retroalimentacion[retoActual];
    return (
      <div style={{ minHeight:"100vh", background:"#FAFAFA", fontFamily:"Arial,sans-serif", padding:"16px" }}>
        <div style={{ maxWidth:"720px", margin:"0 auto 16px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"#fff", borderRadius:"12px", padding:"12px 20px", boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"11px", color:"#888", textTransform:"uppercase" }}>Tiempo Global</div>
            <div style={{ fontSize:"20px", fontWeight:"bold", color: tiempoGlobal < 300 ? "#C62828" : "#1565C0" }}>{formatTiempo(tiempoGlobal)}</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"12px", color:"#555", fontWeight:"bold" }}>{equipoSeleccionado?.icono} {equipoSeleccionado?.nombre}</div>
            <div style={{ fontSize:"12px", color:"#888" }}>Reto {retoActual + 1} de {RETOS.length}</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"11px", color:"#888", textTransform:"uppercase" }}>Tiempo Reto</div>
            <div style={{ fontSize:"20px", fontWeight:"bold", color: colorTiempoReto() }}>{formatTiempo(tiempoReto)}</div>
          </div>
        </div>
        <div style={{ maxWidth:"720px", margin:"0 auto" }}>
          <div style={{ background: r.bloqueColor, borderRadius:"12px 12px 0 0", padding:"16px 20px", color:"#fff" }}>
            <div style={{ fontSize:"12px", opacity:0.85, letterSpacing:"2px", marginBottom:"4px" }}>{r.bloque} · RETO {r.id} · {r.minutos} MIN</div>
            <h2 style={{ margin:0, fontSize:"20px", fontWeight:"bold" }}>{r.titulo}</h2>
          </div>
          <div style={{ background:"#EDE7F6", padding:"16px 20px", borderLeft:"4px solid #7B1FA2" }}>
            <p style={{ margin:0, fontStyle:"italic", color:"#4527A0", fontSize:"14px", lineHeight:"1.6" }}>{r.narrativa}</p>
          </div>
          <div style={{ background:"#fff", padding:"20px", borderLeft:"1px solid #E0E0E0", borderRight:"1px solid #E0E0E0" }}>
            <h3 style={{ color:"#1A237E", fontSize:"14px", marginTop:0 }}>📁 INFORMACIÓN DEL CASO</h3>
            <p style={{ color:"#333", fontSize:"14px", lineHeight:"1.7", whiteSpace:"pre-line", margin:0 }}>{r.escenario}</p>
          </div>
          <div style={{ background:"#E8EAF6", padding:"20px", borderLeft:"1px solid #E0E0E0", borderRight:"1px solid #E0E0E0", marginTop:"2px" }}>
            <h3 style={{ color:"#1A237E", fontSize:"14px", marginTop:0 }}>✏️ PARTE 1 — ANÁLISIS ABIERTO</h3>
            <p style={{ color:"#283593", fontSize:"14px", marginBottom:"12px", fontWeight:"bold" }}>{r.pregunta1.texto}</p>
            <textarea value={respuestasAbiertas[retoActual] || ""} onChange={e => setRespuestasAbiertas(prev => ({ ...prev, [retoActual]: e.target.value }))} disabled={retoEnviado} placeholder="Escribe aquí el análisis de tu equipo..." style={{ width:"100%", minHeight:"120px", padding:"12px", borderRadius:"8px", border:"1px solid #9FA8DA", fontSize:"14px", resize:"vertical", fontFamily:"Arial,sans-serif", boxSizing:"border-box" }} />
          </div>
          <div style={{ background:"#fff", padding:"20px", border:"1px solid #E0E0E0", borderTop:"none" }}>
            <h3 style={{ color:"#E65100", fontSize:"14px", marginTop:0 }}>🔘 PARTE 2 — SELECCIÓN MÚLTIPLE</h3>
            <p style={{ color:"#333", fontSize:"14px", marginBottom:"16px" }}>{r.pregunta2.texto}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {r.pregunta2.opciones.map(op => {
                const letra = op[0];
                const seleccionada = respuestasMultiple[retoActual] === letra;
                let bg = "#fff", border = "1px solid #E0E0E0", color = "#333";
                if (retoEnviado && retro) {
                  if (letra === r.pregunta2.correcta) { bg = "#E8EAF6"; border = "2px solid #1565C0"; color = "#1A237E"; }
                  else if (seleccionada) { bg = "#FFEBEE"; border = "2px solid #C62828"; color = "#B71C1C"; }
                } else if (seleccionada) { bg = "#E3F2FD"; border = "2px solid #1565C0"; color = "#0D47A1"; }
                return (
                  <button key={letra} onClick={() => !retoEnviado && setRespuestasMultiple(prev => ({ ...prev, [retoActual]: letra }))} style={{ padding:"12px 16px", borderRadius:"8px", border, background:bg, color, textAlign:"left", cursor: retoEnviado ? "default" : "pointer", fontSize:"14px" }}>
                    {op}
                  </button>
                );
              })}
            </div>
            {retoEnviado && retro && (
              <div style={{ marginTop:"16px", background: retro.correcta ? "#E8EAF6" : "#FFF3E0", border:`1px solid ${retro.correcta ? "#9FA8DA" : "#FFCC02"}`, borderRadius:"8px", padding:"14px" }}>
                <p style={{ margin:0, fontWeight:"bold", color: retro.correcta ? "#1A237E" : "#E65100", fontSize:"14px" }}>{retro.correcta ? "✅ ¡Correcto!" : `⚠️ Respuesta correcta: ${r.pregunta2.correcta}`}</p>
                <p style={{ margin:"8px 0 0", color:"#555", fontSize:"13px", lineHeight:"1.6" }}>{retro.explicacion}</p>
                <div style={{ marginTop:"12px", background:"#fff", borderRadius:"6px", padding:"10px", textAlign:"center" }}>
                  <p style={{ margin:0, fontSize:"13px", color:"#888" }}>Letra desbloqueada:</p>
                  <p style={{ margin:"4px 0 0", fontSize:"28px", fontWeight:"900", color: r.bloqueColor, letterSpacing:"4px" }}>{r.letra}</p>
                </div>
              </div>
            )}
          </div>
          {letrasDesveladas.length > 0 && (
            <div style={{ background:"#263238", borderRadius:"8px", padding:"14px", marginTop:"12px", textAlign:"center" }}>
              <p style={{ color:"#80CBC4", margin:"0 0 8px", fontSize:"12px", letterSpacing:"2px" }}>CÓDIGO PARCIAL</p>
              <div style={{ display:"flex", justifyContent:"center", gap:"8px", flexWrap:"wrap" }}>
                {RETOS.map((rt, i) => (
                  <div key={i} style={{ width:"36px", height:"36px", borderRadius:"6px", background: i < letrasDesveladas.length ? "#1565C0" : "#37474F", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", fontWeight:"bold", color: i < letrasDesveladas.length ? "#fff" : "#546E7A" }}>
                    {i < letrasDesveladas.length ? LETRAS_PALABRA[i] : "?"}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginTop:"16px", display:"flex", gap:"12px" }}>
            {!retoEnviado ? (
              <button onClick={confirmarRespuesta} disabled={!respuestasMultiple[retoActual]} style={{ flex:1, padding:"14px", background: respuestasMultiple[retoActual] ? "linear-gradient(135deg,#1565C0,#1976D2)" : "#E0E0E0", color: respuestasMultiple[retoActual] ? "#fff" : "#999", border:"none", borderRadius:"12px", fontSize:"15px", fontWeight:"bold", cursor: respuestasMultiple[retoActual] ? "pointer" : "not-allowed" }}>
                🔒 CONFIRMAR Y DESBLOQUEAR LETRA
              </button>
            ) : (
              <button onClick={siguienteReto} style={{ flex:1, padding:"14px", background:"linear-gradient(135deg,#E65100,#FF8F00)", color:"#fff", border:"none", borderRadius:"12px", fontSize:"15px", fontWeight:"bold", cursor:"pointer" }}>
                {retoActual + 1 >= RETOS.length ? "🏆 VER RESULTADO FINAL" : `➡️ RETO ${retoActual + 2}`}
              </button>
            )}
          </div>
          <div style={{ height:"32px" }} />
        </div>
      </div>
    );
  }

  // ── RESULTADO ──
  if (pantalla === "resultado") {
    const palabraCompleta = LETRAS_PALABRA.join("");
    const puntaje = Object.values(retroalimentacion).filter(r => r.correcta).length;
    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#1A237E,#1565C0)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"Arial,sans-serif", padding:"24px" }}>
        <div style={{ maxWidth:"600px", width:"100%", background:"#fff", borderRadius:"20px", boxShadow:"0 8px 32px rgba(0,0,0,0.3)", overflow:"hidden" }}>
          <div style={{ background:"linear-gradient(135deg,#1565C0,#1976D2)", padding:"32px", textAlign:"center" }}>
            <div style={{ fontSize:"56px" }}>🏆</div>
            <h1 style={{ color:"#fff", margin:"12px 0 4px", fontSize:"24px" }}>¡MISIÓN COMPLETADA!</h1>
            <p style={{ color:"#BBDEFB", margin:0 }}>Equipo {equipoSeleccionado?.icono} {equipoSeleccionado?.nombre}</p>
          </div>
          <div style={{ padding:"28px", textAlign:"center" }}>
            <p style={{ color:"#555", fontSize:"14px", marginBottom:"8px" }}>El código maestro descifrado es:</p>
            <div style={{ fontSize:"40px", fontWeight:"900", letterSpacing:"8px", color:"#1A237E", background:"#E8EAF6", padding:"16px 24px", borderRadius:"12px", margin:"0 0 20px" }}>{palabraCompleta}</div>
            <p style={{ color:"#888", fontSize:"13px", marginBottom:"20px" }}>Selección múltiple: <strong style={{ color: puntaje >= 8 ? "#1565C0" : "#E65100" }}>{puntaje}/10</strong> correctas</p>
            <a href={TEAMS_URL} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", padding:"14px 32px", background:"linear-gradient(135deg,#1565C0,#1976D2)", color:"#fff", textDecoration:"none", borderRadius:"12px", fontWeight:"bold", fontSize:"15px" }}>
              📤 ENVIAR RESPUESTAS EN TEAMS
            </a>
            <p style={{ color:"#999", fontSize:"12px", marginTop:"16px" }}>La palabra clave es: <strong>{palabraCompleta}</strong></p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
