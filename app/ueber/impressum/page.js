const imprintTextSize = "clamp(1rem, 1.8vw, 2rem)";
/** Wie „Schreibe alles auf, was dir einfällt.“ auf der Umfrage-Einstiegsseite */
const umfrageBodySize = "clamp(0.82rem, 1.2vw, 1.3rem)";
/** Gleicher Grauton wie Nav-Buttons */
const uiButtonGray = "#ebebeb";

const headingBlock = {
  margin: 0,
  color: uiButtonGray,
  fontSize: imprintTextSize,
  lineHeight: 1.35,
};

const bodyBlock = {
  margin: 0,
  color: uiButtonGray,
  fontSize: umfrageBodySize,
  lineHeight: 1.35,
};

export const metadata = {
  title: "Impressum",
  description: "Impressum von Maria Tafler.",
};

export default function ImpressumPage() {
  return (
    <div
      style={{
        minHeight: "100svh",
        backgroundColor: "#000000",
        color: uiButtonGray,
        paddingTop: "calc(var(--nav-height) + 8px)",
        paddingBottom: "20px",
        paddingLeft: "calc(var(--page-gutter) + 8px)",
        paddingRight: "calc(var(--page-gutter) + 8px)",
        boxSizing: "border-box",
        fontFamily:
          "var(--font-remix-a), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "20px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              lineHeight: 1.15,
              justifySelf: "start",
              maxWidth: "min(100%, 42rem)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: uiButtonGray,
                fontSize: imprintTextSize,
                lineHeight: 1.15,
              }}
            >
              Imprint
            </p>

            <div style={{ marginTop: "0.65em" }}>
              <p style={{ ...bodyBlock, marginTop: 0 }}>
                Information in accordance with Section 5 of the German Telemedia Act (TMG) and
                Section 55 of the Interstate Broadcasting Treaty (RStV)
              </p>

              <p style={{ ...bodyBlock, marginTop: "1em" }}>
                Maria Tafler
                <br />
                Calvinstraße 34
                <br />
                44143 Dortmund
                <br />
                Germany
              </p>

              <p style={{ ...headingBlock, marginTop: "1em", marginBottom: 0 }}>Contact</p>
              <p style={{ ...bodyBlock, marginTop: "0.35em" }}>
                Email:{" "}
                <a
                  href="mailto:info@mariatafler.de"
                  className="ueber-email-link ueber-email-link-on-dark"
                  style={{
                    color: uiButtonGray,
                    fontSize: umfrageBodySize,
                    textDecoration: "none",
                  }}
                >
                  info@mariatafler.de
                </a>
              </p>

              <p style={{ ...headingBlock, marginTop: "1em", marginBottom: 0 }}>
                EU Dispute Resolution
              </p>
              <p style={{ ...bodyBlock, marginTop: "0.35em" }}>
                The European Commission provides a platform for online dispute resolution (ODR):{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ueber-email-link ueber-email-link-on-dark"
                  style={{
                    color: uiButtonGray,
                    fontSize: umfrageBodySize,
                    textDecoration: "none",
                    wordBreak: "break-all",
                  }}
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                <br />
                Our email address can be found above in the imprint.
              </p>

              <p style={{ ...headingBlock, marginTop: "1em", marginBottom: 0 }}>
                Consumer Dispute Resolution / Universal Arbitration Board
              </p>
              <p style={{ ...bodyBlock, marginTop: "0.35em" }}>
                We are neither willing nor obliged to participate in dispute resolution proceedings
                before a consumer arbitration board.
              </p>

              <p style={{ ...headingBlock, marginTop: "1em", marginBottom: 0 }}>
                Liability for Content
              </p>
              <p style={{ ...bodyBlock, marginTop: "0.35em" }}>
                As a service provider, we are responsible for our own content on these pages in
                accordance with Section 7(1) TMG and general laws. However, pursuant to Sections 8
                to 10 TMG, we are not obligated to monitor transmitted or stored third-party
                information or to investigate circumstances that indicate illegal activity.
              </p>

              <p style={{ ...headingBlock, marginTop: "1em", marginBottom: 0 }}>Liability for Links</p>
              <p style={{ ...bodyBlock, marginTop: "0.35em" }}>
                Our website contains links to external third-party websites over whose content we
                have no control. Therefore, we cannot assume any liability for this external content.
                The respective provider or operator of the linked pages is always responsible for
                their content.
              </p>

              <p style={{ ...headingBlock, marginTop: "1em", marginBottom: 0 }}>Copyright</p>
              <p style={{ ...bodyBlock, marginTop: "0.35em" }}>
                The content and works created by the website operators on these pages are subject to
                German copyright law. Duplication, processing, distribution, and any form of use
                beyond the limits of copyright law require the written consent of the respective
                author or creator.
              </p>
            </div>
          </div>

          <div
            style={{
              lineHeight: 1.15,
              justifySelf: "start",
              maxWidth: "min(100%, 42rem)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: uiButtonGray,
                fontSize: imprintTextSize,
                lineHeight: 1.15,
              }}
            >
              Privacy Policy
            </p>

            <div style={{ marginTop: "0.65em" }}>
              <p style={{ ...bodyBlock, marginTop: 0 }}>
                The controller within the meaning of the General Data Protection Regulation (GDPR)
                is:
              </p>

              <p style={{ ...bodyBlock, marginTop: "1em" }}>
                Maria Tafler
                <br />
                Calvinstraße 34
                <br />
                44143 Dortmund
                <br />
                Germany
              </p>

              <p style={{ ...headingBlock, marginTop: "1em", marginBottom: 0 }}>Contact</p>
              <p style={{ ...bodyBlock, marginTop: "0.35em" }}>
                Email:{" "}
                <a
                  href="mailto:info@mariatafler.de"
                  className="ueber-email-link ueber-email-link-on-dark"
                  style={{
                    color: uiButtonGray,
                    fontSize: umfrageBodySize,
                    textDecoration: "none",
                  }}
                >
                  info@mariatafler.de
                </a>
              </p>

              <p style={{ ...headingBlock, marginTop: "1em", marginBottom: 0 }}>
                1. General Information
              </p>
              <p style={{ ...bodyBlock, marginTop: "0.35em" }}>
                This privacy policy informs you about the type, scope, and purpose of the processing
                of personal data on our website. Personal data is any information relating to an
                identified or identifiable natural person.
              </p>

              <p style={{ ...headingBlock, marginTop: "1em", marginBottom: 0 }}>
                2. Hosting &amp; Content Delivery
              </p>
              <p style={{ ...bodyBlock, marginTop: "0.35em" }}>
                Vercel (Hosting &amp; Deployment) Our website is hosted by the service provider
                Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA). Vercel processes data to
                technically deliver the website and defend against attacks. This includes: IP address
                (possibly anonymized), browser and device data, referrer URL, and time of access.
              </p>
              <p style={{ ...bodyBlock, marginTop: "0.65em" }}>
                Vercel uses a Content Delivery Network (CDN), through which content is loaded via
                servers distributed worldwide (including in the USA). The data transfer to the USA
                is based on the Standard Contractual Clauses (SCC) of the EU Commission as well as
                the Data Privacy Framework (DPF).
                <br />
                Legal basis: Art. 6 para. 1 lit. f GDPR (Legitimate interest).
              </p>

              <p style={{ ...headingBlock, marginTop: "1em", marginBottom: 0 }}>3. Your Rights</p>
              <p style={{ ...bodyBlock, marginTop: "0.35em", marginBottom: "0.35em" }}>
                You have the following rights under the GDPR:
              </p>
              <ul
                style={{
                  marginTop: 0,
                  marginBottom: 0,
                  paddingLeft: "1.25em",
                  listStyleType: "disc",
                  color: uiButtonGray,
                  fontSize: umfrageBodySize,
                  lineHeight: 1.35,
                }}
              >
                <li style={{ marginTop: "0.25em" }}>Right of access (Art. 15 GDPR)</li>
                <li style={{ marginTop: "0.25em" }}>Right to rectification (Art. 16 GDPR)</li>
                <li style={{ marginTop: "0.25em" }}>Right to erasure (Art. 17 GDPR)</li>
                <li style={{ marginTop: "0.25em" }}>
                  Right to restriction of processing (Art. 18 GDPR)
                </li>
                <li style={{ marginTop: "0.25em" }}>Right to data portability (Art. 20 GDPR)</li>
                <li style={{ marginTop: "0.25em" }}>Right to object (Art. 21 GDPR)</li>
              </ul>

              <p style={{ ...headingBlock, marginTop: "1em", marginBottom: 0 }}>4. Contact</p>
              <p style={{ ...bodyBlock, marginTop: "0.35em" }}>
                If you contact us by email, your details will be stored for the purpose of
                processing your inquiry and in case of follow-up questions. We will not pass on this
                data without your consent.
              </p>

              <p style={{ ...headingBlock, marginTop: "1em", marginBottom: 0 }}>
                5. Cookies and Tracking
              </p>
              <p style={{ ...bodyBlock, marginTop: "0.35em" }}>
                This website does not use cookies or tracking tools. No personal usage profiles are
                created.
              </p>

              <p style={{ ...headingBlock, marginTop: "1em", marginBottom: 0 }}>
                6. Changes to this Privacy Policy
              </p>
              <p style={{ ...bodyBlock, marginTop: "0.35em" }}>
                We reserve the right to amend this privacy policy so that it always complies with
                current legal requirements.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
