import { Fragment } from 'react';

function inline(t: string, k: string) {
  return t.split(/(`[^`]+`)/g).map((p, i) =>
    p.startsWith('`') && p.endsWith('`') && p.length > 2 ? <code key={k + i}>{p.slice(1, -1)}</code> : <Fragment key={k + i}>{p}</Fragment>,
  );
}

/** Renderiza texto com parágrafos, blocos ```código``` e `código` inline. */
export function Texto({ children }: { children: string }) {
  const partes = children.split('```');
  return (
    <div className="texto">
      {partes.map((p, i) =>
        i % 2 === 1 ? (
          <pre key={i}><code>{p.replace(/^\n/, '').replace(/\n$/, '')}</code></pre>
        ) : (
          p.split(/\n\n+/).filter((s) => s.trim()).map((par, j) => (
            <p key={`${i}-${j}`}>
              {par.split('\n').map((linha, l, arr) => (
                <Fragment key={l}>{inline(linha, `${i}-${j}-${l}-`)}{l < arr.length - 1 && <br />}</Fragment>
              ))}
            </p>
          ))
        ),
      )}
    </div>
  );
}
