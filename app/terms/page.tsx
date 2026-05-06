import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of use · Hikari",
  description: "Hikari is open-source software distributed under Apache 2.0. Terms of use.",
};

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav active="legal" />
      <main style={{ flex: 1 }}>
        <section className="subhero" style={{ paddingBottom: 40 }}>
          <div className="glow" />
          <div className="subhero-inner">
            <div className="eyebrow">Legal</div>
            <h1>Terms of use</h1>
            <p className="lede">
              Hikari is open-source software distributed under Apache 2.0. By installing or using it,
              you accept the terms below.
            </p>
            <p className="updated" style={{ marginTop: 14 }}>Last updated · April 22, 2026</p>
          </div>
        </section>

        <div className="legal-body">
          <nav className="legal-toc">
            <div className="h">On this page</div>
            <a href="#scope">1 · Scope</a>
            <a href="#license">2 · License</a>
            <a href="#content">3 · Content &amp; addons</a>
            <a href="#use">4 · Acceptable use</a>
            <a href="#trademarks">5 · Trademarks</a>
            <a href="#warranty">6 · Disclaimer of warranty</a>
            <a href="#liability">7 · Limitation of liability</a>
            <a href="#changes">8 · Changes to these terms</a>
            <a href="#contact">9 · Contact</a>
          </nav>

          <h2 id="scope">1 · Scope</h2>
          <p>These terms apply to the Hikari Android TV application (&ldquo;the App&rdquo;), the source code published in the Hikari GitHub repository, and this marketing website. They do not apply to third-party addons you choose to configure inside the App, nor to any video content those addons make available.</p>

          <h2 id="license">2 · License</h2>
          <p>Hikari&apos;s source code is licensed under the <a className="inline" href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer">Apache License 2.0</a>. You may use, modify, and redistribute it in accordance with that license. The full license text ships in the repository as <span className="kbd">LICENSE</span>.</p>
          <p>The Hikari name, kanji wordmark, and pastel gradient logo are trademarks of the Hikari project (see §5). The Apache 2.0 grant covers the code, not the brand.</p>

          <h2 id="content">3 · Content &amp; addons</h2>
          <p>Hikari is a streaming <strong style={{ color: "var(--on-dark)", fontWeight: 500 }}>shell</strong>. It does not host, distribute, or curate any video content. The App&apos;s catalogue metadata is fetched from the public AniList API; playback streams are resolved by addons that you, the user, configure.</p>
          <p>You are solely responsible for:</p>
          <ul>
            <li>Which addons you install in the App.</li>
            <li>The legality of the streams those addons return in your jurisdiction.</li>
            <li>Compliance with any third-party terms of service that govern those addons or content.</li>
          </ul>
          <p>The Hikari project is not affiliated with AniList or the authors of any addon, and does not endorse any particular addon or source.</p>

          <h2 id="use">4 · Acceptable use</h2>
          <p>You agree not to use Hikari to:</p>
          <ul>
            <li>Distribute malware, phishing payloads, or surveillance code through forks or modifications.</li>
            <li>Misrepresent forks as the official Hikari project.</li>
            <li>Impersonate the Hikari maintainers in issue trackers, support channels, or communication with users.</li>
            <li>Engage in activity that violates applicable law in the jurisdiction where the App is run.</li>
          </ul>

          <h2 id="trademarks">5 · Trademarks</h2>
          <p>&ldquo;Hikari&rdquo;, the kanji 光 wordmark, and the pastel cream–sky–pink gradient lockup are trademarks of the Hikari project. You may reference them in good-faith editorial, journalistic, or interoperability contexts without permission. You may not use them to imply endorsement, on derivative apps or services, or in a way that could mislead a reasonable user about the origin of software.</p>
          <p>Forks of the source code must be released under a different name and lockup.</p>

          <h2 id="warranty">6 · Disclaimer of warranty</h2>
          <p>The App is provided &ldquo;as is&rdquo;, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. The full Apache 2.0 disclaimer applies and is reproduced in the LICENSE file.</p>

          <h2 id="liability">7 · Limitation of liability</h2>
          <p>In no event will the Hikari project, its contributors, or its maintainers be liable for any damages — direct, indirect, incidental, special, or consequential — arising out of the use of, or inability to use, the App, including any damages relating to third-party addons, third-party content, or the unavailability thereof.</p>

          <h2 id="changes">8 · Changes to these terms</h2>
          <p>These terms may be revised. The current version always lives at this URL, with the &ldquo;Last updated&rdquo; date at the top of the page reflecting the most recent change. Material changes are also called out in the project CHANGELOG and announced on the GitHub releases page.</p>

          <h2 id="contact">9 · Contact</h2>
          <p>Legal questions, trademark inquiries, and DMCA-style notices can be sent through the channels listed on the <a className="inline" href="/contact">Contact</a> page. Bug reports and feature requests should go to GitHub Issues — they&apos;re not handled at the legal address.</p>
        </div>

        <hr className="hairline" />
      </main>
      <Footer />
    </div>
  );
}
