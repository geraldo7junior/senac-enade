export function Logo({ grande = false }: { grande?: boolean }) {
  return (
    <div className={`logo ${grande ? 'logo-grande' : ''}`} aria-label="SENAC ENADE">
      <span className="logo-senac">SENAC</span>
      <span className="logo-enade">ENADE</span>
    </div>
  );
}
