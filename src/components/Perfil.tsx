import type { Usuario } from '../types';
import { MEDALHAS, carregarPerfil, nivel } from '../lib/perfil';
import { TOPICOS } from '../data/topicos';
import { cenarioPorId } from '../lib/cenarios';
import { formatarTempo } from '../lib/prova';

export function Perfil({ usuario, onTreinar }: { usuario: Usuario; onTreinar: (t: string) => void }) {
  const p = carregarPerfil(usuario.email);
  const nv = nivel(p.xp);
  return (
    <div className="perfil">
      <section className="cartao perfil-topo">
        <div className="avatar">{(usuario.nome || usuario.email)[0].toUpperCase()}</div>
        <div className="perfil-info">
          <h1>{usuario.nome || usuario.email}</h1>
          <p>{usuario.email} · Turma {usuario.turma}</p>
          <p><span className="nivel-badge">Nível {nv.indice}</span> <strong>{nv.titulo}</strong> · {p.xp} XP</p>
          <div className="barra"><div style={{ width: `${nv.progresso * 100}%` }} /></div>
          <small>{nv.proximo - p.xp} XP para o próximo nível · {p.provas} simulados · melhor sequência {p.melhorSequencia}</small>
        </div>
      </section>

      <h2 className="secao-titulo">Medalhas ({p.medalhas.length}/{MEDALHAS.length})</h2>
      <div className="medalhas">
        {MEDALHAS.map((m) => {
          const ganha = p.medalhas.includes(m.id);
          return (
            <div key={m.id} className={`medalha ${ganha ? 'ganha' : 'bloqueada'}`} title={m.descricao}>
              <span>{ganha ? m.icone : '🔒'}</span><strong>{m.nome}</strong><small>{m.descricao}</small>
            </div>
          );
        })}
      </div>

      <h2 className="secao-titulo">Domínio por assunto</h2>
      <div className="cartao">
        <ul className="barras-topico">
          {TOPICOS.map((t) => {
            const s = p.porTopico[t.id];
            const pct = s?.total ? s.acertos / s.total : 0;
            return (
              <li key={t.id}>
                <span>{t.icone} {t.nome}</span>
                <div className="barra"><div className={pct >= 0.6 ? 'boa' : 'ruim'} style={{ width: `${pct * 100}%` }} /></div>
                <small>{s?.total ? `${s.acertos}/${s.total}` : '—'}</small>
                <button className="btn btn-link btn-pequeno" onClick={() => onTreinar(t.id)}>Praticar</button>
              </li>
            );
          })}
        </ul>
      </div>

      {p.historico.length > 0 && (
        <>
          <h2 className="secao-titulo">Histórico</h2>
          <div className="tabela-wrap">
            <table className="tabela">
              <thead><tr><th>Data</th><th>Cenário</th><th>Acertos</th><th>Tempo</th><th>XP</th></tr></thead>
              <tbody>
                {p.historico.map((h, i) => (
                  <tr key={i}>
                    <td>{new Date(h.data).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</td>
                    <td>{cenarioPorId(h.cenario)?.nome ?? `Estudo: ${TOPICOS.find((t) => `topico:${t.id}` === h.cenario)?.nome ?? h.cenario}`}</td>
                    <td>{h.acertos}/{h.totalObjetivas}</td>
                    <td>{formatarTempo(h.tempoSegundos)}</td>
                    <td>+{h.pontos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
