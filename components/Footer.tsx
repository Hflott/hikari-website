import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-band">
      <div className="footer-stripes" />
      <div className="footer-grid">
        <div>
          <Link className="brand" href="/" style={{ marginBottom: 12, display: "flex" }}>
            <Image className="kanji" src="/assets/kanji_hikari.png" alt="光" width={22} height={22} />
            <span className="wordmark" style={{ marginLeft: 10 }}>Hikari</span>
          </Link>
          <p style={{ fontSize: 13, color: "var(--mute)", marginTop: 12, lineHeight: 1.6, maxWidth: 280 }}>
            A TV-first anime streaming shell for Android TV. Pulls metadata from AniList, resolves streams via debrid-supported addons. Open-source, Apache 2.0.
          </p>
        </div>

        <div>
          <h6>Product</h6>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/install">Install</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h6>Project</h6>
          <ul>
            <li><a href="https://github.com/Hflott/hikari_app" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="/install#releases">Releases</a></li>
            <li><a href="https://github.com/Hflott/hikari_app/issues" target="_blank" rel="noopener">Issues</a></li>
            <li><a href="https://github.com/Hflott/hikari_app/discussions" target="_blank" rel="noopener">Discussions</a></li>
          </ul>
        </div>

        <div>
          <h6>Built on</h6>
          <ul>
            <li><a href="https://anilist.co" target="_blank" rel="noopener">AniList API</a></li>
            <li><span style={{ color: "var(--mute)", fontSize: 13 }}>Debrid addons</span></li>
            <li><a href="https://developer.android.com/jetpack/compose" target="_blank" rel="noopener">Compose for TV</a></li>
            <li><span style={{ color: "var(--mute)", fontSize: 13 }}>Kotlin · ExoPlayer</span></li>
          </ul>
        </div>

        <div>
          <h6>Legal</h6>
          <ul>
            <li><Link href="/terms">Terms of use</Link></li>
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><span style={{ color: "var(--mute)", fontSize: 13 }}>License (Apache 2.0)</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© Hikari contributors. Hikari does not host video content.</span>
        <span>v1.4.0 · Built with Compose for TV</span>
      </div>
    </footer>
  );
}
