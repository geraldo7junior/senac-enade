import { useState } from 'react';
import type { CenarioId, ItemProva, RespostaItem, Usuario } from './types';
import { Entrada } from './components/Entrada';
import { Inicio, type Modo } from './components/Inicio';
import { Prova } from './components/Prova';
import { Resultado } from './components/Resultado';
import { Ranking } from './components/Ranking';
import { Perfil } from './components/Perfil';
import { Logo } from './components/Logo';
import { montarProva } from './lib/prova';
import { cenarioPorId } from './lib/cenarios';
import { carregarPerfil, registrarResultado, type Medalha } from './lib/perfil';
import { salvarResultado, buscarRanking, rankingOnline } from './lib/ranking';
import { topicoPorId } from './data/topicos';
import { ler, gravar } from './lib/armazenamento';

type Tela = 'inicio' | 'prova' | 'resultado' | 'ranking' | 'perfil';

interface Sessao {
  cenario: CenarioId;
  topico?: string;
  modo: Modo;
  itens: ItemProva[];
  titulo: string;
  minutos: number;
}

interface Fim {
  respostas: RespostaItem[];
  tempo: number;
  medalhas: Medalha[];
  envio: { ok: boolean; online: boolean; erro?: string } | null;
  posicao: number | null;
}

const CHAVE_USUARIO = 'senac-enade:usuario';

export default function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(() => ler<Usuario | null>(CHAVE_USUARIO, null));
  const [tela, setTela] = useState<Tela>('inicio');
  const [sessao, setSessao] = useState<Sessao | null>(null);
  const [fim, setFim] = useState<Fim | null>(null);
  const [cenarioRanking, setCenarioRanking] = useState<string>('q10');

  if (!usuario) {
    return (
      <Moldura>
        <Entrada onEntrar={(u) => { gravar(CHAVE_USUARIO, u); setUsuario(u); }} />
      </Moldura>
    );
  }

  function iniciar(cenario: CenarioId, modo: Modo, topico?: string) {
    const vistas = new Set(carregarPerfil(usuario!.email).vistas);
    const itens = montarProva(cenario, vistas, topico);
    const c = cenarioPorId(cenario)!;
    const t = topico ? topicoPorId(topico) : null;
    setSessao({
      cenario, modo, topico, itens,
      titulo: t ? `Estudo: ${t.nome}` : c.id === 'enade' ? 'Prova completa ENADE' : `${c.nome} · ${c.total} questões`,
      minutos: t ? 30 : c.minutos,
    });
    setFim(null);
    setTela('prova');
  }

  async function finalizar(respostas: RespostaItem[], tempo: number) {
    const s = sessao!;
    const objetivas = respostas.filter((_, i) => s.itens[i].questao.tipo === 'objetiva');
    const acertos = objetivas.filter((r) => r.correta).length;
    const pontos = respostas.reduce((a, r) => a + r.pontos, 0);
    const chaveCenario = s.topico ? `topico:${s.topico}` : s.cenario;
    const medalhas = registrarResultado(usuario!.email, s.itens, respostas, {
      cenario: chaveCenario, acertos, totalObjetivas: objetivas.length, tempoSegundos: tempo, pontos, data: new Date().toISOString(),
    });
    setFim({ respostas, tempo, medalhas, envio: null, posicao: null });
    setTela('resultado');
    if (s.topico) return;
    const envio = await salvarResultado({
      usuario: usuario!, cenario: s.cenario, acertos, total: objetivas.length, tempoSegundos: tempo, pontos,
    });
    const rk = await buscarRanking(s.cenario, null, usuario!.email);
    const posicao = rk.linhas.find((l) => l.souEu)?.posicao ?? null;
    setFim((f) => (f ? { ...f, envio, posicao } : f));
  }

  const navegar = (t: Tela) => {
    if (tela === 'prova' && t !== 'prova') return;
    setTela(t);
  };

  return (
    <Moldura
      usuario={usuario}
      tela={tela}
      onNavegar={navegar}
      onSair={() => { gravar(CHAVE_USUARIO, null); setUsuario(null); setTela('inicio'); }}
    >
      {tela === 'inicio' && <Inicio usuario={usuario} onIniciar={iniciar} />}
      {tela === 'prova' && sessao && (
        <Prova
          key={sessao.titulo + sessao.itens.map((i) => i.questao.id).join()}
          itens={sessao.itens}
          modo={sessao.modo}
          minutos={sessao.minutos}
          titulo={sessao.titulo}
          onFinalizar={finalizar}
          onSair={() => setTela('inicio')}
        />
      )}
      {tela === 'resultado' && sessao && fim && (
        <Resultado
          itens={sessao.itens}
          respostas={fim.respostas}
          tempo={fim.tempo}
          titulo={sessao.titulo}
          ranqueado={!sessao.topico}
          medalhas={fim.medalhas}
          envio={fim.envio}
          posicao={fim.posicao}
          onRanking={() => { setCenarioRanking(sessao.cenario); setTela('ranking'); }}
          onNovo={() => setTela('inicio')}
          onTreinar={(t) => iniciar('q10', 'aprendizado', t)}
        />
      )}
      {tela === 'ranking' && <Ranking key={cenarioRanking} usuario={usuario} cenarioInicial={cenarioRanking} />}
      {tela === 'perfil' && <Perfil usuario={usuario} onTreinar={(t) => iniciar('q10', 'aprendizado', t)} />}
    </Moldura>
  );
}

function Moldura(p: {
  children: React.ReactNode;
  usuario?: Usuario;
  tela?: Tela;
  onNavegar?: (t: Tela) => void;
  onSair?: () => void;
}) {
  const emProva = p.tela === 'prova';
  return (
    <div className="app">
      <header className="topo">
        <div className="topo-conteudo">
          <button className="logo-botao" onClick={() => p.onNavegar?.('inicio')} disabled={emProva} aria-label="Início"><Logo /></button>
          {p.usuario && !emProva && (
            <nav className="menu">
              <button className={p.tela === 'inicio' ? 'ativo' : ''} onClick={() => p.onNavegar?.('inicio')}>Simulados</button>
              <button className={p.tela === 'ranking' ? 'ativo' : ''} onClick={() => p.onNavegar?.('ranking')}>Ranking</button>
              <button className={p.tela === 'perfil' ? 'ativo' : ''} onClick={() => p.onNavegar?.('perfil')}>Meu perfil</button>
              <button className="sair" onClick={p.onSair}>Sair</button>
            </nav>
          )}
        </div>
        <div className="faixa" />
      </header>
      <main className="conteudo">{p.children}</main>
      <footer className="rodape">
        SENAC ENADE · Simulado educacional de Computação · {rankingOnline() ? 'Ranking on-line' : 'Ranking local'}
      </footer>
    </div>
  );
}
