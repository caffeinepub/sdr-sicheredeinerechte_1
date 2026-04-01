import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { LogOut, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const sansFont = "'Liberation Sans', Arial, Helvetica, sans-serif";
const oceanBlue = "#005B6E";
const nicknameYellow = "#FFD700";
const lightGrey7035 = "#D3D3D3";

function MusterschreibenPage({
  nickname,
}: { nickname: string; onBack: () => void }) {
  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      style={{ fontFamily: sansFont }}
    >
      <main
        className="flex-1 mx-auto py-12 w-full"
        style={{ paddingLeft: "5cm", paddingRight: "5cm" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="font-bold mb-8"
            style={{
              fontFamily: sansFont,
              fontSize: "1.025rem",
              lineHeight: 1.2,
            }}
          >
            Ihr persönlicher Bereich,{" "}
            <span style={{ color: nicknameYellow }}>{nickname}</span> bei
            SichereDeineRechte.
          </h1>

          <div
            className="space-y-5 leading-relaxed"
            style={{ fontFamily: sansFont, fontSize: "1.625rem" }}
          >
            <p className="font-semibold" style={{ fontSize: "3.5rem" }}>
              Musterschreiben / administrative Prozesse freischalten
            </p>
            <p style={{ color: lightGrey7035 }}>
              Erhalten Sie Zugang zu professionellen Musterschreiben und
              administrativen Prozessen für den Umgang mit sogenannten Behörden,
              Ämtern oder Gerichten. Unsere Vorlagen helfen Ihnen, Ihre Rechte
              zu wahren.
            </p>
            <ul
              className="space-y-3 list-none pl-4"
              style={{ color: lightGrey7035 }}
            >
              <li>
                ✓ Zurückweisung von mangelhaften Behörden-, Amts- oder
                Gerichtsschreiben (sogenannte Beschlüsse, Bescheide, Urteile,
                Zahlungsaufforderungen etc.)
              </li>
              <li>
                ✓ Annahme von behördlichen, amtlichen oder gerichtlichen
                Forderung (sogenannte Bußgelder, Steuern etc.) unter Vorbehalt
                der Rechtmäßigkeit.
              </li>
              <li>
                ✓ Annahme von behördlichen, amtlichen oder gerichtlichen
                Forderung (sogenannte Bußgelder, Steuern etc.) unter Vorbehalt
                der Rechtmäßigkeit in Verbindung mit einem Gegenangebot.
              </li>
            </ul>
            <p className="font-semibold" style={{ color: lightGrey7035 }}>
              Bezahlung sicher per Kryptowährung (ICP, BTC, ETH, XRP, SOL).
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export function MembersPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMusterschreiben, setShowMusterschreiben] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  if (showMusterschreiben) {
    return (
      <div
        className="min-h-screen flex flex-col bg-background"
        style={{ fontFamily: sansFont }}
      >
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 h-24 flex items-center justify-between">
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
              onClick={() => setShowMusterschreiben(false)}
              className="gap-3 rounded-2xl px-8 py-4 text-lg font-bold border-0 h-auto text-white"
              style={{
                backgroundColor: oceanBlue,
                fontFamily: sansFont,
              }}
            >
              Zurück
            </Button>
          </div>
        </header>
        <MusterschreibenPage
          nickname={user?.nickname ?? ""}
          onBack={() => setShowMusterschreiben(false)}
        />
        <footer className="border-t border-border py-6">
          <div
            className="container mx-auto px-4 text-center text-muted-foreground text-sm"
            style={{ fontFamily: sansFont }}
          >
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      style={{ fontFamily: sansFont }}
    >
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
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
            onClick={handleLogout}
            className="gap-3 rounded-2xl px-8 py-4 text-lg font-bold border-0 h-auto text-white"
            style={{
              backgroundColor: oceanBlue,
              fontFamily: sansFont,
            }}
            data-ocid="members.button"
          >
            <LogOut className="h-5 w-5" />
            Abmelden
          </Button>
        </div>
      </header>

      <main
        className="flex-1 mx-auto py-12 w-full"
        style={{ paddingLeft: "5cm", paddingRight: "5cm" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <Shield className="h-12 w-12 text-yellow-400" />
              <span
                className="font-bold text-yellow-400"
                style={{ fontFamily: sansFont, fontSize: "3rem" }}
              >
                SDR
              </span>
            </div>
            <div className="mt-1 ml-1">
              <span
                className="font-normal text-white/80"
                style={{ fontFamily: sansFont, fontSize: "1.5rem" }}
              >
                SichereDeineRechte
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h1
              className="font-bold"
              style={{
                fontFamily: sansFont,
                fontSize: "3.375rem",
                lineHeight: 1.2,
              }}
            >
              Willkommen,{" "}
              <span style={{ color: nicknameYellow }}>{user?.nickname}</span>{" "}
              bei SDR – SichereDeineRechte!
            </h1>
            <p
              className="text-muted-foreground mt-2"
              style={{ fontFamily: sansFont, fontSize: "1.25rem" }}
            >
              Ihr persönlicher Bereich bei SichereDeineRechte.
            </p>
          </div>

          <div
            className="mb-10 space-y-4 text-foreground/85 leading-relaxed"
            style={{ fontFamily: sansFont, fontSize: "1.625rem" }}
          >
            <p>
              Vielen Dank für Ihre Registrierung und Ihr Interesse an den
              Informationen von SDR! Hier informieren sich Menschen, die das
              bestehende System hinterfragen und nach praktischen Lösungen
              suchen, wie man selbstbestimmt mit mangelhaften sogenannten
              Behörden-, Amts- oder Gerichtsschreiben umgeht und seine Rechte
              wahrt.
            </p>
            <p>
              Auf unserer Plattform finden Sie hilfreiche Informationen,
              inspirierende Inhalte und bei Bedarf praktische Musterschreiben
              sowie administrative Prozesse, die Ihnen den Umgang mit
              sogenannten Behörden, Ämtern oder Gerichten erleichtern. Stöbern
              Sie, probieren Sie aus und nutzen Sie die Möglichkeiten, die Ihnen
              unsere Seite bietet.
            </p>
            <p className="font-semibold">
              Wir wünschen Ihnen viel Freude und wertvolle Erfahrungen!
            </p>
            <p className="font-semibold">Ihr SDR-Team</p>
          </div>

          <Button
            onClick={() => setShowMusterschreiben(true)}
            className="rounded-2xl px-10 py-5 text-xl font-bold border-0 h-auto text-white"
            style={{
              backgroundColor: oceanBlue,
              fontFamily: sansFont,
            }}
          >
            Musterschreiben freischalten
          </Button>
        </motion.div>
      </main>

      <footer className="border-t border-border py-6">
        <div
          className="container mx-auto px-4 text-center text-muted-foreground text-sm"
          style={{ fontFamily: sansFont }}
        >
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
