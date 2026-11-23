import { useEffect, useState } from 'react';
import type { ItemProva, RespostaItem } from '../types';
import type { Medalha } from '../lib/perfil';
import { LETRAS, formatarTempo } from '../lib/prova';
import { TOPICOS, topicoPorId } from '../data/topicos';
import { Texto } from './Texto';
import { Feedback, PadraoResposta } from './Prova';

interface Props {
  itens: ItemProva[];
  respostas: RespostaItem[];
  tempo: number;
  titulo: string;
  ranqueado: boolean;
  medalhas: Medalha[];
  envio: { ok: boolean; online: boolean; erro?: string } | null;
  posicao: number | null;
  onRanking: () => void;
  onNovo: () => void;
  onTreinar: (topico: string) => void;
}

export function Resultado(p: Props) {
  const [filtro, setFiltro] = useState<'erradas' | 'todas'>('erradas');
  const [mostrarMedalhas, setMostrarMedalhas] = useState(p.medalhas.length > 0);
  const objetivas = p.itens.map((it, i) => ({ it, r: p.respostas[i], i })).filter((x) => x.it.questao.tipo === 'objetiva');
  const acertos = objetivas.filter((x) => x.r.correta).length;
  const pct = objetivas.length ? Math.round((acertos / objetivas.length) * 100) : 0;
  const pontos = p.respostas.reduce((s, r) => s + r.pontos, 0);

  const porTopico = TOPICOS.map((t) => {
    const xs = objetivas.filter((x) => x.it.questao.topico === t.id);
    return { t, total: xs.length, acertos: xs.filter((x) => x.r.correta).length };
  }).filter((x) => x.total > 0).sort((a, b) => a.acertos / a.total - b.acertos / b.total);
  const fracos = porTopico.filter((x) => x.acertos / x.total < 0.6).slice(0, 3);

  const mensagem =
    pct >= 90 ? 'Excelente! Desempenho de destaque.' :
    pct >= 70 ? 'Muito bom! Você está bem preparado(a).' :
    pct >= 50 ? 'Bom caminho. Revise os assuntos indicados abaixo.' :
    'Continue treinando: leia as explicações e pratique por assunto.';

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const lista = p.itens.map((it, i) => ({ it, r: p.respostas[i], i }))
    .filter((x) => filtro === 'todas' || x.it.questao.tipo === 'discursiva' || !x.r.correta);

  return (
    <div className="resultado">
      <section className="cartao resultado-resumo">
        <p className="sobretitulo">{p.titulo}</p>
        <div className="placar-grande">
          <div className="anel" style={{ ['--pct' as string]: `${pct}` }}>
            <span>{pct}%</span>
          </div>
          <div className="numeros">
            <div><strong>{acertos}/{objetivas.length}</strong><span>acertos</span></div>
            <div><strong>{formatarTempo(p.tempo)}</strong><span>tempo</span></div>
            <div><strong>{pontos}</strong><span>pontos (XP)</span></div>
            {p.posicao && <div><strong>{p.posicao}º</strong><span>no ranking</span></div>}
          </div>
        </div>
        <p className="mensagem">{mensagem}</p>
        {p.ranqueado && p.envio && (
          <p className="nota">
            {p.envio.ok
              ? p.envio.online ? '✔ Resultado registrado no ranking.' : 'Ranking em modo local (somente neste dispositivo).'
              : `Não foi possível enviar ao ranking on-line: ${p.envio.erro}. O resultado ficou salvo neste dispositivo.`}
          </p>
        )}
        <div className="acoes">
          {p.ranqueado && <button className="btn btn-destaque" onClick={p.onRanking}>🏆 Ver ranking</button>}
          <button className="btn btn-primario" onClick={p.onNovo}>Novo simulado</button>
        </div>
      </section>

      {porTopico.length > 1 && (
        <section className="cartao">
          <h2>Desempenho por assunto</h2>
          <ul className="barras-topico">
            {porTopico.map(({ t, total, acertos: a }) => (
              <li key={t.id}>
                <span>{t.icone} {t.nome}</span>
                <div className="barra"><div className={a / total >= 0.6 ? 'boa' : 'ruim'} style={{ width: `${(a / total) * 100}%` }} /></div>
                <small>{a}/{total}</small>
              </li>
            ))}
          </ul>
          {fracos.length > 0 && (
            <div className="recomendacao">
              <strong>Recomendado para estudar:</strong>
              {fracos.map(({ t }) => (
                <button key={t.id} className="btn btn-secundario btn-pequeno" onClick={() => p.onTreinar(t.id)}>{t.icone} Praticar {t.nome}</button>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="revisao">
        <div className="revisao-cabecalho">
          <h2>Correção comentada</h2>
          <div className="segmentado">
            <button className={filtro === 'erradas' ? 'ativo' : ''} onClick={() => setFiltro('erradas')}>Só erros</button>
            <button className={filtro === 'todas' ? 'ativo' : ''} onClick={() => setFiltro('todas')}>Todas</button>
          </div>
        </div>
        {lista.length === 0 && <p className="cartao centro">Nenhum erro. Parabéns! 🎉</p>}
        {lista.map(({ it, r, i }) => {
          const q = it.questao;
          const topico = topicoPorId(q.topico);
          return (
            <details key={q.id} className={`cartao item-revisao ${q.tipo === 'discursiva' ? 'disc' : r.correta ? 'certa' : 'errada'}`} open={filtro === 'erradas' && lista.length <= 12}>
              <summary>
                <span className="status">{q.tipo === 'discursiva' ? '✍️' : r.correta ? '✅' : '❌'}</span>
                <span>Questão {i + 1} · {topico?.nome}</span>
                <small>{formatarTempo(r.segundos)}</small>
              </summary>
              <Texto>{q.enunciado}</Texto>
              {q.tipo === 'objetiva' ? (
                <>
                  <ol className="alternativas-revisao">
                    {it.ordem.map((orig, pos) => {
                      const alt = q.alternativas[orig];
                      const cls = orig === q.correta ? 'correta' : orig === r.escolhida ? 'incorreta' : '';
                      return (
                        <li key={orig} className={cls}>
                          <span className="letra">{LETRAS[pos]}</span>
                          <div>
                            <Texto>{alt.texto}</Texto>
                            <small className="explicacao-alt">{alt.explicacao}</small>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                  <Feedback
                    certa={r.correta}
                    escolhida={r.escolhida >= 0 ? q.alternativas[r.escolhida].explicacao : null}
                    correta={q.alternativas[q.correta].explicacao}
                    letraCorreta={LETRAS[it.ordem.indexOf(q.correta)]}
                    conceito={q.conceito}
                  />
                </>
              ) : (
                <>
                  <div className="sua-resposta"><strong>Sua resposta:</strong><p>{r.textoDiscursivo?.trim() || '(em branco)'}</p></div>
                  <PadraoResposta padrao={q.padraoResposta} criterios={q.criterios} />
                </>
              )}
              <p className="fonte">Fonte: {q.fonte}</p>
            </details>
          );
        })}
      </section>

      {mostrarMedalhas && (
        <div className="modal-fundo" role="dialog" aria-modal="true" onClick={() => setMostrarMedalhas(false)}>
          <div className="cartao modal medalhas-novas">
            <h3>Novas conquistas!</h3>
            <div className="medalhas">
              {p.medalhas.map((m) => (
                <div key={m.id} className="medalha ganha"><span>{m.icone}</span><strong>{m.nome}</strong><small>{m.descricao}</small></div>
              ))}
            </div>
            <button className="btn btn-primario" onClick={() => setMostrarMedalhas(false)}>Continuar</button>
          </div>
        </div>
      )}
    </div>
  );
}
