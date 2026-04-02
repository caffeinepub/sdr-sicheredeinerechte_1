import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Lock, Scale, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { AuthModal } from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";
import { AdminPage } from "./AdminPage";

const heroText1 =
  "F\u00fchlen Sie sich von Forderungen sogenannter Beh\u00f6rden oder \u00c4mter unter Druck gesetzt? Fragen Sie sich, ob diese Anspr\u00fcche \u00fcberhaupt rechtm\u00e4\u00dfig sind? Reagieren Sie noch \u2013 oder agieren Sie schon bewusst und informiert? Ist Ihnen klar, dass Sie durch gezieltes Agieren die Verantwortlichen hinter solchen Forderungen in die Haftung nehmen k\u00f6nnen? M\u00f6chten Sie wissen, wie Sie eine Zahlung leisten k\u00f6nnen, ohne dabei Ihre Rechte aufzugeben? Suchen Sie nach einer M\u00f6glichkeit, unter Vorbehalt zu handeln, ohne sich unwissentlich zu verpflichten? Und stellen Sie sich die entscheidende Frage: Gibt es einen sicheren Weg, mit solchen Forderungen umzugehen, ohne Nachteile zu riskieren?";

const heroText2 =
  "Stehen Sie vor genau diesen Fragen und suchen nach klaren, verst\u00e4ndlichen Antworten? M\u00f6chten Sie nicht l\u00e4nger im Ungewissen bleiben, sondern Ihre Situation souver\u00e4n einsch\u00e4tzen k\u00f6nnen? Fragen Sie sich, wie Sie strukturiert und rechtssicher mit solchen Forderungen umgehen k\u00f6nnen?";

const heroText3 =
  "SDR unterst\u00fctzt Sie dabei, komplexe Sachverhalte rund um sogenannte beh\u00f6rdliche Forderungen verst\u00e4ndlich aufzubereiten und zeigt Ihnen professionelle Wege auf, wie Sie informiert und \u00fcberlegt handeln k\u00f6nnen. Statt Unsicherheit erhalten Sie Orientierung \u2013 statt blo\u00dfer Reaktion eine klare Strategie.";

const heroText4 =
  "Sind Sie bereit, Ihre n\u00e4chsten Schritte nicht dem Zufall zu \u00fcberlassen, sondern auf fundiertes Wissen und durchdachte Vorgehensweisen zu setzen?";

const sansFont = "'Liberation Sans', Arial, Helvetica, sans-serif";
const z003Font = "'Z003', 'URW Chancery L', 'Palatino Linotype', cursive";
const oceanBlue = "#005B6E";

export function HomePage() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLoginButton = () => {
    if (isLoggedIn) {
      navigate({ to: "/members" });
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleRegisterButton = () => {
    if (isLoggedIn) {
      navigate({ to: "/members" });
    } else {
      setRegisterModalOpen(true);
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === "WotanClan44!") {
      setAdminModalOpen(false);
      setAdminPassword("");
      setAdminError("");
      setAdminAuthenticated(true);
    } else {
      setAdminError("Falsches Passwort. Bitte erneut versuchen.");
    }
  };

  const closeAdminModal = () => {
    setAdminModalOpen(false);
    setAdminPassword("");
    setAdminError("");
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      style={{ fontFamily: sansFont }}
    >
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div
          className="w-full h-24 flex items-center justify-between"
          style={{ paddingLeft: "4cm", paddingRight: "4cm" }}
        >
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <Shield className="h-12 w-12 text-yellow-400" />
              <span
                className="font-bold text-3xl text-yellow-400"
                style={{ fontFamily: sansFont }}
              >
                SDR
              </span>
            </div>
            <span
              className="text-white/80 text-base ml-1"
              style={{ fontFamily: sansFont }}
            >
              SichereDeineRechte
            </span>
          </div>
          <Button
            onClick={handleLoginButton}
            className="text-white hover:opacity-90 rounded-2xl px-8 py-4 text-lg font-bold border-0 h-auto"
            style={{ fontFamily: sansFont, backgroundColor: oceanBlue }}
            data-ocid="nav.open_modal_button"
          >
            Anmelden / Mein privater Bereich
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

          <div
            className="relative w-full py-20"
            style={{ paddingLeft: "7cm", paddingRight: "7cm" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px flex-1 bg-primary/40" />
                <span
                  className="text-primary text-sm tracking-widest uppercase font-semibold"
                  style={{ fontFamily: sansFont }}
                >
                  Ihre Rechte. Ihre St\u00e4rke.
                </span>
                <div className="h-px flex-1 bg-primary/40" />
              </div>
              <div className="mb-10">
                <div className="flex items-center gap-3">
                  <Shield className="h-16 w-16 text-yellow-400" />
                  <span
                    className="text-6xl md:text-7xl font-bold text-yellow-400"
                    style={{ fontFamily: sansFont }}
                  >
                    SDR
                  </span>
                </div>
                <div className="mt-1 ml-1">
                  <span
                    className="text-3xl md:text-4xl font-normal text-white/80"
                    style={{ fontFamily: sansFont }}
                  >
                    SichereDeineRechte
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="space-y-6 text-foreground/85 leading-relaxed"
              style={{ fontFamily: sansFont, fontSize: "1.625rem" }}
            >
              <p>{heroText1}</p>
              <p>{heroText2}</p>
              <div className="flex items-center gap-3 py-4 my-8">
                <p
                  className="text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: sansFont }}
                >
                  <span className="text-white/80">Genau hier setzt </span>
                  <Shield
                    className="inline h-10 w-10 text-yellow-400 align-middle"
                    style={{
                      strokeWidth: 2.5,
                      marginRight: "0.25rem",
                      marginBottom: "0.1rem",
                    }}
                  />
                  <span className="text-yellow-400">SDR</span>
                  <span className="text-white/80 font-normal">
                    {" "}
                    \u2013 SichereDeineRechte{" "}
                  </span>
                  <span className="text-white/80 font-bold">an.</span>
                </p>
              </div>
              <p>{heroText3}</p>
              <p className="font-semibold text-foreground">{heroText4}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="mt-12 flex justify-center"
            >
              <Button
                onClick={handleRegisterButton}
                className="text-white hover:opacity-90 rounded-2xl px-10 py-6 text-xl font-bold border-0 h-auto"
                style={{ fontFamily: sansFont, backgroundColor: oceanBlue }}
                data-ocid="home.primary_button"
              >
                Jetzt registrieren
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="mt-8 text-center"
            >
              <p
                className="italic"
                style={{
                  fontFamily: z003Font,
                  fontSize: "2.678rem",
                  color: "#FFD700",
                }}
              >
                \u201eMann kann den Wind nicht \u00e4ndern, aber die Segel
                anders setzen.\u201c
              </p>
              <p
                className="mt-2"
                style={{
                  fontFamily: z003Font,
                  fontSize: "1.4875rem",
                  color: "#FFD700",
                }}
              >
                \u2013 Autor unbekannt
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-border bg-card">
          <div className="container mx-auto px-4 py-16 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: <Scale className="inline h-10 w-10 text-yellow-400" />,
                  title: "Rechtssicherheit",
                  desc: "Verstehen Sie Ihre Rechte und handeln Sie auf fundierter Basis.",
                },
                {
                  icon: <Shield className="inline h-10 w-10 text-yellow-400" />,
                  title: "Klare Strategie",
                  desc: "Strukturierte Vorgehensweisen statt Unsicherheit",
                },
                {
                  icon: <Lock className="inline h-10 w-10 text-primary" />,
                  title: "Dezentral & Sicher",
                  desc: "Ihr Daten auf dem Internet Computer \u2013 zensurresistent und dezentral",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3
                    className="font-semibold text-foreground mb-2"
                    style={{ fontFamily: sansFont }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-muted-foreground text-sm"
                    style={{ fontFamily: sansFont }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
            style={{ fontFamily: sansFont }}
          >
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-400 font-bold">SDR</span>
              </div>
              <span className="text-white/70 text-xs">SichereDeineRechte</span>
            </div>
            <div className="text-center text-xs">
              \u00a9 2026 SichereDeineRechte. Alle Rechte vorbehalten.
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span>
                Built with love using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  caffeine.ai
                </a>
              </span>
              <button
                type="button"
                onClick={() => setAdminModalOpen(true)}
                className="text-muted-foreground/30 hover:text-muted-foreground/50 text-xs transition-colors"
                data-ocid="footer.admin_button"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        defaultTab="login"
      />
      <AuthModal
        open={registerModalOpen}
        onOpenChange={setRegisterModalOpen}
        defaultTab="register"
      />

      {adminAuthenticated && (
        <AdminPage onClose={() => setAdminAuthenticated(false)} />
      )}

      {adminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <button
            type="button"
            aria-label="Schlie\u00dfen"
            className="absolute inset-0 w-full h-full cursor-default"
            onClick={closeAdminModal}
          />
          <div className="relative bg-card border border-border rounded-lg p-9 w-[480px] shadow-xl">
            <h2
              className="font-bold text-2xl text-foreground mb-4"
              style={{ fontFamily: sansFont }}
            >
              Admin-Zugang
            </h2>
            <input
              type="password"
              placeholder="Passwort eingeben"
              value={adminPassword}
              onChange={(e) => {
                setAdminPassword(e.target.value);
                setAdminError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdminLogin();
              }}
              className="w-full border border-border rounded px-4 py-3 text-base bg-background text-foreground mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
              data-ocid="admin.input"
            />
            {adminError && (
              <p
                className="text-red-400 text-sm mb-2"
                data-ocid="admin.error_state"
              >
                {adminError}
              </p>
            )}
            <div className="flex gap-3 mt-3">
              <Button
                size="lg"
                onClick={handleAdminLogin}
                className="flex-1"
                data-ocid="admin.confirm_button"
              >
                Anmelden
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={closeAdminModal}
                className="flex-1"
                data-ocid="admin.cancel_button"
              >
                Abbrechen
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
