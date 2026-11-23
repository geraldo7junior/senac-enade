import { QUESTOES } from '../src/data/questoes';
import { TOPICOS } from '../src/data/topicos';

let erros = 0;
const ids = new Set<string>();
for (const q of QUESTOES) {
  if (ids.has(q.id)) { console.error('ID duplicado', q.id); erros++; }
  ids.add(q.id);
  if (!TOPICOS.some((t) => t.id === q.topico)) { console.error('Tópico inválido', q.id); erros++; }
  if (q.tipo === 'objetiva') {
    if (q.alternativas.length !== 5) { console.error('Não tem 5 alternativas', q.id); erros++; }
    if (q.correta < 0 || q.correta >= q.alternativas.length) { console.error('Correta inválida', q.id); erros++; }
    if (new Set(q.alternativas.map((a) => a.texto)).size !== q.alternativas.length) { console.error('Alternativas repetidas', q.id); erros++; }
    if (!q.alternativas[q.correta].explicacao.startsWith('Correta')) { console.error('Explicação da correta', q.id); erros++; }
  }
}
const tab = TOPICOS.map((t) => ({
  topico: t.nome,
  objetivas: QUESTOES.filter((q) => q.topico === t.id && q.tipo === 'objetiva').length,
  discursivas: QUESTOES.filter((q) => q.topico === t.id && q.tipo === 'discursiva').length,
}));
console.table(tab);
console.log('Total:', QUESTOES.length, 'Erros:', erros);
process.exit(erros ? 1 : 0);
