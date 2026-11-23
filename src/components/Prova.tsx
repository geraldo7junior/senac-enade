import { useEffect, useMemo, useRef, useState } from 'react';
import type { ItemProva, RespostaItem } from '../types';
import type { Modo } from './Inicio';
import { LETRAS, formatarTempo, pontosQuestao } from '../lib/prova';
import { topicoPorId } from '../data/topicos';
import { Texto } from './Texto';

interface Props {
  itens: ItemProva[];
  modo: Modo;
  minutos: number;
  titulo: string;
  onFinalizar: (respostas: RespostaItem[], tempoTotal: number) => void;
  onSair: () => void;
}

interface Estado {
  escolhida: number;
  confirmada: boolean;
  segundos: number;
  texto: string;
  auto?: number;
  verPadrao: boolean;
}

export function calcularRespostas(itens: ItemProva[], estados: Estado[]): RespostaItem[] {
  let seq = 0;
  return itens.map((it, i) => {
    const e = estados[i];
    const q = it.questao;
    if (q.tipo === 'discursiva') {
      return {
        questaoId: q.id, escolhida: -1, correta: false, segundos: e.segundos,
        pontos: (e.auto ?? 0) * 10, textoDiscursivo: e.texto, autoavaliacao: e.auto,
      };
    }
    const correta = e.escolhida === q.correta;
    seq = correta ? seq + 1 : 0;
    return {
      questaoId: q.id, escolhida: e.escolhida, correta, segundos: e.segundos,
      pontos: correta ? pontosQuestao(q.dificuldade, seq - 1, e.segundos) : 0,
    };
  });
}

export function Prova({ itens, modo, minutos, titulo, onFinalizar, onSair }: Props) {
  const [idx, setIdx] = useState(0);
  const [estados, setEstados] = useState<Estado[]>(() =>
    itens.map(() => ({ escolhida: -1, confirmada: false, segundos: 0, texto: '', verPadrao: false })),
  );
  const [decorrido, setDecorrido] = useState(0);
  const [confirmarSaida, setConfirmarSaida] = useState<null | 'finalizar' | 'sair'>(null);
  const finalizado = useRef(false);
  const limite = minutos * 60;
  const topoRef = useRef<HTMLDivElement>(null);

  const finalizar = () => {
    if (finalizado.current) return;
    finalizado.current = true;
    onFinalizar(calcularRespostas(itens, estados), Math.max(1, decorrido));
  };

  useEffect(() => {
    const t = setInterval(() => {
      setDecorrido((d) => d + 1);
      setEstados((es) => es.map((e, i) => (i === idx && !e.confirmada ? { ...e, segundos: e.segundos + 1 } : e)));
    }, 1000);
    return () => clearInterval(t);
  }, [idx]);

  useEffect(() => {
    if (decorrido >= limite) finalizar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decorrido]);

  useEffect(() => {
    topoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [idx]);

  const confirmadaAtual = estados[idx].confirmada;
  useEffect(() => {
    if (confirmadaAtual && modo === 'aprendizado')
      setTimeout(() => document.querySelector('.feedback')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }, [confirmadaAtual, modo]);

  const item = itens[idx];
  const q = item.questao;
  const est = estados[idx];
  const atualizar = (p: Partial<Estado>) => setEstados((es) => es.map((e, i) => (i === idx ? { ...e, ...p } : e)));

  const parcial = useMemo(() => calcularRespostas(itens, estados), [itens, estados]);
  const confirmadas = estados.filter((e) => e.confirmada);
  const acertosAteAqui = parcial.filter((r, i) => estados[i].confirmada && r.correta).length;
  const pontosAteAqui = parcial.reduce((s, r, i) => s + (estados[i].confirmada ? r.pontos : 0), 0);
  let sequenciaAtual = 0;
  for (let i = 0; i < itens.length; i++) {
    if (!estados[i].confirmada || itens[i].questao.tipo !== 'objetiva') continue;
    sequenciaAtual = parcial[i].correta ? sequenciaAtual + 1 : 0;
  }
  const respondidas = estados.filter((e, i) =>
    itens[i].questao.tipo === 'objetiva' ? e.escolhida >= 0 : e.texto.trim().length > 0,
  ).length;
  const restante = limite - decorrido;
  const ultimo = idx === itens.length - 1;
  const travada = modo === 'aprendizado' && est.confirmada;
  const topico = topicoPorId(q.topico);

  return (
    <div className="prova" ref={topoRef}>
      <div className="prova-barra">
        <div className="prova-titulo">
          <strong>{titulo}</strong>
          <span>{modo === 'aprendizado' ? 'Modo aprendizado' : 'Modo prova'}</span>
        </div>
        <div className={`cronometro ${restante < 300 ? 'alerta' : ''}`} title="Tempo restante">⏱ {formatarTempo(Math.max(0, restante))}</div>
        {modo === 'aprendizado' && (
          <div className="placar">
            <span title="Acertos">✅ {acertosAteAqui}/{confirmadas.length}</span>
            <span title="Sequência">🔥 {sequenciaAtual}</span>
            <span title="Pontos">⭐ {pontosAteAqui}</span>
          </div>
        )}
      </div>
      <div className="progresso"><div style={{ width: `${(respondidas / itens.length) * 100}%` }} /></div>

      <nav className="mapa" aria-label="Mapa de questões">
        {itens.map((it, i) => {
          const e = estados[i];
          let cls = '';
          if (modo === 'aprendizado' && e.confirmada && it.questao.tipo === 'objetiva') cls = parcial[i].correta ? 'certa' : 'errada';
          else if (it.questao.tipo === 'objetiva' ? e.escolhida >= 0 : e.texto.trim()) cls = 'respondida';
          return (
            <button key={i} className={`mapa-item ${cls} ${i === idx ? 'atual' : ''}`} onClick={() => setIdx(i)} aria-label={`Questão ${i + 1}`}>
              {i + 1}
            </button>
          );
        })}
      </nav>

      <article className="cartao questao">
        <header className="questao-cabecalho">
          <span className="questao-num">Questão {idx + 1} de {itens.length}</span>
          <span className="tag">{topico?.icone} {topico?.nome}</span>
          {q.area === 'CE' && <span className="tag tag-CE">Componente Específico</span>}
          {q.tipo === 'discursiva' && <span className="tag tag-disc">Discursiva</span>}
          <span className="tag tag-dif">{'●'.repeat(q.dificuldade)}{'○'.repeat(3 - q.dificuldade)}</span>
        </header>
        <Texto>{q.enunciado}</Texto>

        {q.tipo === 'objetiva' ? (
          <div className="alternativas" role="radiogroup">
            {item.ordem.map((orig, pos) => {
              const alt = q.alternativas[orig];
              const sel = est.escolhida === orig;
              let cls = sel ? 'selecionada' : '';
              if (travada) {
                if (orig === q.correta) cls = 'correta';
                else if (sel) cls = 'incorreta';
                else cls = 'apagada';
              }
              return (
                <button
                  key={orig}
                  className={`alternativa ${cls}`}
                  role="radio"
                  aria-checked={sel}
                  disabled={travada}
                  onClick={() => atualizar({ escolhida: orig })}
                >
                  <span className="letra">{LETRAS[pos]}</span>
                  <span className="alt-texto"><Texto>{alt.texto}</Texto></span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="discursiva">
            <textarea
              value={est.texto}
              onChange={(e) => atualizar({ texto: e.target.value })}
              placeholder="Escreva sua resposta aqui..."
              rows={10}
              disabled={travada}
            />
            <small>{est.texto.trim().split(/\s+/).filter(Boolean).length} palavras · as discursivas não entram no ranking, mas você ganha XP pela autoavaliação.</small>
          </div>
        )}

        {travada && q.tipo === 'objetiva' && (
          <Feedback certa={est.escolhida === q.correta}
            escolhida={est.escolhida >= 0 ? q.alternativas[est.escolhida].explicacao : null}
            correta={q.alternativas[q.correta].explicacao}
            letraCorreta={LETRAS[item.ordem.indexOf(q.correta)]}
            conceito={q.conceito}
            pontos={parcial[idx].pontos}
          />
        )}
        {travada && q.tipo === 'discursiva' && (
          <PadraoResposta padrao={q.padraoResposta} criterios={q.criterios} nota={est.auto} onNota={(n) => atualizar({ auto: n })} />
        )}

        <footer className="questao-acoes">
          <button className="btn btn-secundario" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>← Anterior</button>
          {modo === 'aprendizado' && !est.confirmada ? (
            <button
              className="btn btn-primario"
              disabled={q.tipo === 'objetiva' ? est.escolhida < 0 : !est.texto.trim()}
              onClick={() => atualizar({ confirmada: true })}
            >
              {q.tipo === 'objetiva' ? 'Confirmar resposta' : 'Ver padrão de resposta'}
            </button>
          ) : ultimo ? (
            <button className="btn btn-destaque" onClick={() => setConfirmarSaida('finalizar')}>Finalizar prova</button>
          ) : (
            <button className="btn btn-primario" onClick={() => setIdx(idx + 1)}>Próxima →</button>
          )}
        </footer>
      </article>

      <div className="prova-rodape">
        <button className="btn btn-link" onClick={() => setConfirmarSaida('sair')}>Abandonar</button>
        <button className="btn btn-secundario" onClick={() => setConfirmarSaida('finalizar')}>Finalizar e ver correção</button>
      </div>

      {confirmarSaida && (
        <div className="modal-fundo" role="dialog" aria-modal="true">
          <div className="cartao modal">
            {confirmarSaida === 'finalizar' ? (
              <>
                <h3>Finalizar a prova?</h3>
                <p>Você respondeu {respondidas} de {itens.length} questões.{respondidas < itens.length ? ' Questões em branco contam como erro.' : ''}</p>
              </>
            ) : (
              <>
                <h3>Abandonar o simulado?</h3>
                <p>Seu progresso será perdido e o resultado não vai para o ranking.</p>
              </>
            )}
            <div className="modal-acoes">
              <button className="btn btn-secundario" onClick={() => setConfirmarSaida(null)}>Voltar</button>
              <button className="btn btn-primario" onClick={() => (confirmarSaida === 'finalizar' ? finalizar() : onSair())}>
                {confirmarSaida === 'finalizar' ? 'Finalizar' : 'Abandonar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Feedback(p: {
  certa: boolean; escolhida: string | null; correta: string; letraCorreta: string; conceito?: string; pontos?: number;
}) {
  return (
    <div className={`feedback ${p.certa ? 'ok' : 'erro'}`} aria-live="polite">
      <h4>{p.certa ? `🎉 Você acertou!${p.pontos ? ` +${p.pontos} pontos` : ''}` : p.escolhida ? '❌ Resposta incorreta' : '⚪ Questão em branco'}</h4>
      {!p.certa && p.escolhida && (
        <p><strong>Por que sua resposta está errada:</strong> {p.escolhida.replace(/^Incorreta[.:]\s*/, '')}</p>
      )}
      <p><strong>{p.certa ? 'Por quê:' : `Resposta certa (${p.letraCorreta}):`}</strong> {p.correta.replace(/^Correta[.:]\s*/, '')}</p>
      {p.conceito && <p className="conceito">💡 <strong>Para lembrar:</strong> {p.conceito}</p>}
    </div>
  );
}

export function PadraoResposta(p: { padrao: string; criterios: string[]; nota?: number; onNota?: (n: number) => void }) {
  return (
    <div className="feedback padrao">
      <h4>📋 Padrão de resposta esperado</h4>
      <p>{p.padrao}</p>
      <h5>Critérios de correção</h5>
      <ul>{p.criterios.map((c) => <li key={c}>{c}</li>)}</ul>
      {p.onNota && (
        <div className="autoavaliacao">
          <label>
            Compare com sua resposta e dê sua nota (0 a 10): <strong>{p.nota ?? '—'}</strong>
            <input type="range" min={0} max={10} step={1} value={p.nota ?? 0} onChange={(e) => p.onNota!(Number(e.target.value))} />
          </label>
        </div>
      )}
    </div>
  );
}
