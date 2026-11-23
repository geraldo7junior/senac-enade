import { useState } from 'react';
import type { CenarioId, Usuario } from '../types';
import { CENARIOS } from '../lib/cenarios';
import { carregarPerfil, nivel } from '../lib/perfil';
import { TOPICOS } from '../data/topicos';
import { QUESTOES } from '../data/questoes';

export type Modo = 'aprendizado' | 'prova';

interface Props {
  usuario: Usuario;
  onIniciar: (c: CenarioId, modo: Modo, topico?: string) => void;
}

export function Inicio({ usuario, onIniciar }: Props) {
  const [modo, setModo] = useState<Modo>('aprendizado');
  const [cenario, setCenario] = useState<CenarioId>('q10');
  const perfil = carregarPerfil(usuario.email);
  const nv = nivel(perfil.xp);
  const contagem = (t: string) => QUESTOES.filter((q) => q.topico === t && q.tipo === 'objetiva').length;

  return (
    <div className="inicio">
      <section className="cartao boas-vindas">
        <div>
          <p className="sobretitulo">Olá{usuario.nome ? `, ${usuario.nome}` : ''}! Turma {usuario.turma}</p>
          <h1>Escolha seu desafio</h1>
        </div>
        <div className="nivel-mini">
          <span className="nivel-badge">Nível {nv.indice}</span>
          <strong>{nv.titulo}</strong>
          <div className="barra"><div style={{ width: `${nv.progresso * 100}%` }} /></div>
          <small>{perfil.xp} XP · {perfil.medalhas.length} medalhas</small>
        </div>
      </section>

      <h2 className="secao-titulo">1. Cenário de prova</h2>
      <div className="cenarios">
        {CENARIOS.map((c) => (
          <button
            key={c.id}
            className={`cenario ${cenario === c.id ? 'ativo' : ''} ${c.id === 'enade' ? 'cenario-enade' : ''}`}
            onClick={() => setCenario(c.id)}
            aria-pressed={cenario === c.id}
          >
            <span className="cenario-num">{c.id === 'enade' ? 'ENADE' : c.total}</span>
            <strong>{c.nome}</strong>
            <span>{c.descricao}</span>
            <small>⏱ {c.minutos >= 60 ? `${c.minutos / 60}h` : `${c.minutos} min`}</small>
          </button>
        ))}
      </div>

      <h2 className="secao-titulo">2. Modo de correção</h2>
      <div className="modos">
        <button className={`modo ${modo === 'aprendizado' ? 'ativo' : ''}`} onClick={() => setModo('aprendizado')} aria-pressed={modo === 'aprendizado'}>
          <strong>📖 Aprendizado</strong>
          <span>Correção imediata: ao errar, você vê por que errou e qual é a resposta certa.</span>
        </button>
        <button className={`modo ${modo === 'prova' ? 'ativo' : ''}`} onClick={() => setModo('prova')} aria-pressed={modo === 'prova'}>
          <strong>📝 Prova</strong>
          <span>Como no ENADE: navegue livremente e veja a correção comentada só ao final.</span>
        </button>
      </div>

      <button className="btn btn-primario btn-largo btn-iniciar" onClick={() => onIniciar(cenario, modo)}>
        Iniciar simulado
      </button>
      <p className="nota centro">As questões são sorteadas e distribuídas entre os assuntos da ementa. O ranking é separado por cenário e ordena por acertos e, no empate, pelo menor tempo.</p>

      <h2 className="secao-titulo">Estudar por assunto <small>(não conta no ranking)</small></h2>
      <div className="topicos">
        {TOPICOS.map((t) => {
          const s = perfil.porTopico[t.id];
          const pct = s?.total ? Math.round((s.acertos / s.total) * 100) : null;
          return (
            <button key={t.id} className="topico" onClick={() => onIniciar('q10', 'aprendizado', t.id)}>
              <span className="topico-icone">{t.icone}</span>
              <span className="topico-nome">{t.nome}</span>
              <small>{contagem(t.id)} questões{pct !== null ? ` · você acerta ${pct}%` : ''}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
}
