"use client";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container inner">
        <div>
          © {new Date().getFullYear()} dedos store. Todos los derechos reservados.
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="/tos">Términos</a>
          <a href="https://discord.gg/dedos" target="_blank" rel="noopener">
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
}
