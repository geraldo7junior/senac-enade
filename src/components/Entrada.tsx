import { useState } from 'react';
import type { Usuario } from '../types';
import { Logo } from './Logo';
import { QUESTOES } from '../data/questoes';
import { TOPICOS } from '../data/topicos';

export function Entrada({ onEntrar }: { onEntrar: (u: Usuario) => void }) {
  const [email, setEmail] = useState('');
  const [turma, setTurma] = useState('');
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const em = email.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return setErro('Informe um e-mail válido.');
    const tu = turma.trim().toUpperCase().replace(/\s+/g, ' ');
    if (!tu) return setErro('Informe sua turma.');
    onEntrar({ email: em, turma: tu.slice(0, 40), nome: nome.trim().slice(0, 80) });
  }

  return (
    <div className="entrada">
      <div className="entrada-hero">
        <Logo grande />
        <h1>Simulado ENADE de Computação</h1>
        <p>Treine com questões no estilo ENADE, aprenda com explicações de cada alternativa e dispute o ranking da sua turma.</p>
        <ul className="entrada-numeros">
          <li><strong>{QUESTOES.length}</strong> questões</li>
          <li><strong>{TOPICOS.length}</strong> assuntos</li>
          <li><strong>5</strong> cenários de prova</li>
        </ul>
      </div>
      <form className="cartao entrada-form" onSubmit={enviar}>
        <h2>Entrar</h2>
        <label>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu.nome@email.com" autoComplete="email" required />
        </label>
        <label>
          Turma
          <input value={turma} onChange={(e) => setTurma(e.target.value)} placeholder="Ex.: ADS 2026.1 NOITE" required />
        </label>
        <label>
          Nome no ranking <span className="opcional">(opcional)</span>
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como quer aparecer" autoComplete="nickname" />
        </label>
        {erro && <p className="erro">{erro}</p>}
        <button className="btn btn-primario btn-largo" type="submit">Começar</button>
        <p className="nota">Seu e-mail identifica seus resultados e aparece mascarado no ranking (ex.: ge•••@email.com).</p>
      </form>
    </div>
  );
}
