import { useEffect, useState } from 'react';
import type { LinhaRanking, Usuario } from '../types';
import { CENARIOS } from '../lib/cenarios';
import { buscarRanking, listarTurmas } from '../lib/ranking';
import { formatarTempo } from '../lib/prova';

export function Ranking({ usuario, cenarioInicial }: { usuario: Usuario; cenarioInicial?: string }) {
  const [cenario, setCenario] = useState(cenarioInicial ?? 'q10');
  const [turma, setTurma] = useState<string>('');
  const [turmas, setTurmas] = useState<string[]>([]);
  const [linhas, setLinhas] = useState<LinhaRanking[] | null>(null);
  const [online, setOnline] = useState(true);
  const [erro, setErro] = useState<string | undefined>();

  useEffect(() => { listarTurmas().then(setTurmas); }, []);
  useEffect(() => {
    setLinhas(null);
    buscarRanking(cenario, turma || null, usuario.email).then((r) => {
      setLinhas(r.linhas);
      setOnline(r.online);
      setErro(r.erro);
    });
  }, [cenario, turma, usuario.email]);

  const medalha = (n: number) => (n === 1 ? '🥇' : n === 2 ? '🥈' : n === 3 ? '🥉' : `${n}º`);

  return (
    <div className="ranking">
      <h1>🏆 Ranking</h1>
      <p className="nota">Melhor resultado de cada estudante por cenário. Ordem: mais acertos e, no empate, menor tempo.</p>
      <div className="abas" role="tablist">
        {CENARIOS.map((c) => (
          <button key={c.id} role="tab" aria-selected={cenario === c.id} className={cenario === c.id ? 'ativo' : ''} onClick={() => setCenario(c.id)}>
            {c.id === 'enade' ? 'ENADE completo' : `${c.total} questões`}
          </button>
        ))}
      </div>
      <div className="filtro-turma">
        <label>
          Turma:{' '}
          <select value={turma} onChange={(e) => setTurma(e.target.value)}>
            <option value="">Todas as turmas</option>
            {[...new Set([usuario.turma, ...turmas])].map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
      </div>
      {!online && <p className="aviso">{erro ? `Ranking on-line indisponível (${erro}). ` : ''}Mostrando ranking local deste dispositivo.</p>}
      {linhas === null ? (
        <p className="centro">Carregando…</p>
      ) : linhas.length === 0 ? (
        <p className="cartao centro">Ninguém fez este cenário ainda. Seja o primeiro!</p>
      ) : (
        <div className="tabela-wrap">
          <table className="tabela">
            <thead>
              <tr><th>#</th><th>Estudante</th><th>Turma</th><th>Acertos</th><th>Tempo</th></tr>
            </thead>
            <tbody>
              {linhas.map((l) => (
                <tr key={l.posicao} className={l.souEu ? 'eu' : ''}>
                  <td className="pos">{medalha(l.posicao)}</td>
                  <td>
                    <strong>{l.nome || l.emailMascarado}</strong>
                    {l.nome && <small>{l.emailMascarado}</small>}
                  </td>
                  <td>{l.turma}</td>
                  <td><strong>{l.acertos}</strong>/{l.total}</td>
                  <td>{formatarTempo(l.tempoSegundos)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
