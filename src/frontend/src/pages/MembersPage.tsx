import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  LogOut,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";

const sansFont = "'Liberation Sans', Arial, Helvetica, sans-serif";
const oceanBlue = "#005B6E";
const nicknameYellow = "#FFD700";
const lightGrey7035 = "#D3D3D3";

const CRYPTO_LIST = [
  {
    symbol: "ICP",
    name: "Internet Computer",
    address: "3pno5-fmoey-3jsyu-6p5qb-6egd7-zg445-sfdtc-3cpzh-qn5sh-wcgx6-cae",
    color: "#3B00B9",
    logo: "\u221e",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    address: "bc1qzt9eeuh35jc9746z0jk73dmj77gd5sp6fuc9wd",
    color: "#F7931A",
    logo: "\u20bf",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    address: "0x3c2726B86B4BB25Eb39Cd58636b8f8f6a5286ae3",
    color: "#627EEA",
    logo: "\u039e",
  },
  {
    symbol: "XRP",
    name: "XRP",
    address: "rNxb49FgcRQVDjioZ6Jfk6vky5ViByNkW9",
    color: "#00AAE4",
    logo: "\u2715",
  },
  {
    symbol: "SOL",
    name: "Solana",
    address: "kjFvmwSexVSufg4wu859rY7SuiqeoThQzPamPef2QLR",
    color: "#9945FF",
    logo: "\u25ce",
  },
];

function CryptoCard({ crypto }: { crypto: (typeof CRYPTO_LIST)[0] }) {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(crypto.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(crypto.address)}`;

  return (
    <div
      className="border border-border rounded-xl p-5 mb-4"
      style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full"
          style={{ backgroundColor: crypto.color, color: "#fff" }}
        >
          {crypto.logo}
        </span>
        <div>
          <span
            className="font-bold text-foreground"
            style={{ fontSize: "1.6875rem" }}
          >
            {crypto.name}
          </span>
          <span
            className="ml-2 text-muted-foreground"
            style={{ fontSize: "1.3125rem" }}
          >
            ({crypto.symbol})
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span
          className="break-all text-foreground/80 flex-1 font-mono"
          style={{ fontSize: "1.3125rem" }}
        >
          {crypto.address}
        </span>
        <button
          type="button"
          onClick={copyAddress}
          className="flex-shrink-0 p-2 rounded-lg border border-border hover:bg-white/10 transition-colors"
          title="Adresse kopieren"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>
      <button
        type="button"
        onClick={() => setQrOpen(!qrOpen)}
        className="flex items-center gap-2 text-primary hover:underline"
        style={{ fontSize: "1.3125rem" }}
      >
        {qrOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
        QR-Code {qrOpen ? "ausblenden" : "anzeigen"}
      </button>
      {qrOpen && (
        <div className="mt-3 flex justify-center">
          <img
            src={qrUrl}
            alt={`QR-Code f\u00fcr ${crypto.name}`}
            width={200}
            height={200}
            className="rounded-lg border border-border"
          />
        </div>
      )}
    </div>
  );
}

function PageHeader({
  onAction,
  actionLabel,
}: { onAction: () => void; actionLabel: string }) {
  return (
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
          onClick={onAction}
          className="gap-3 rounded-2xl px-8 py-4 text-lg font-bold border-0 h-auto text-white"
          style={{ backgroundColor: oceanBlue, fontFamily: sansFont }}
        >
          {actionLabel}
        </Button>
      </div>
    </header>
  );
}

function PageFooter() {
  return (
    <footer className="border-t border-border py-6">
      <div
        className="container mx-auto px-4 text-center text-muted-foreground text-sm"
        style={{ fontFamily: sansFont }}
      >
        \u00a9 {new Date().getFullYear()}. Built with love using{" "}
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
  );
}

function ZahlungPage({
  nickname,
  onBack,
}: { nickname: string; onBack: () => void }) {
  const { actor } = useActor();
  const [txHash, setTxHash] = useState("");
  const [submittedNickname, setSubmittedNickname] = useState(nickname);
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txHash.trim() || !submittedNickname.trim()) {
      toast.error("Bitte f\u00fcllen Sie alle Felder aus.");
      return;
    }
    if (!selectedCrypto) {
      toast.error(
        "Bitte w\u00e4hlen Sie Ihre verwendete Kryptow\u00e4hrung aus.",
      );
      return;
    }
    setIsSubmitting(true);
    try {
      if (actor) {
        await actor.submitPaymentConfirmation(
          submittedNickname,
          txHash,
          selectedCrypto,
        );
      }
      setSubmitted(true);
      toast.success(
        "Ihre Best\u00e4tigung wurde erfolgreich \u00fcbermittelt.",
      );
    } catch {
      toast.error(
        "\u00dcbermittlung fehlgeschlagen. Bitte versuchen Sie es erneut.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      style={{ fontFamily: sansFont }}
    >
      <PageHeader onAction={onBack} actionLabel="Zur\u00fcck" />
      <main
        className="flex-1 w-full py-12"
        style={{ paddingLeft: "7cm", paddingRight: "7cm" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="font-bold mb-6"
            style={{ fontFamily: sansFont, fontSize: "3rem", lineHeight: 1.15 }}
          >
            Musterschreiben freischalten
          </h1>
          <p
            className="mb-8 text-foreground/85 leading-relaxed"
            style={{ fontFamily: sansFont, fontSize: "1.625rem" }}
          >
            \u00dcberweisen Sie den geforderten Ausgleich in einer der
            unterst\u00fctzten Kryptow\u00e4hrungen an die unten angegebene
            Adresse. Geben Sie anschlie\u00dfend Ihren Transaktions-Hash ein,
            damit wir Ihren Ausgleich best\u00e4tigen k\u00f6nnen.
          </p>
          <div className="mb-10">
            {CRYPTO_LIST.map((crypto) => (
              <CryptoCard key={crypto.symbol} crypto={crypto} />
            ))}
          </div>
          <div
            className="border border-border rounded-xl p-6 mb-6"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <h2
              className="font-bold mb-4"
              style={{ fontFamily: sansFont, fontSize: "2.4375rem" }}
            >
              Ausgleich best\u00e4tigen
            </h2>
            {submitted ? (
              <div className="flex items-center gap-3 text-green-400">
                <Check className="h-6 w-6" />
                <p style={{ fontFamily: sansFont, fontSize: "1.25rem" }}>
                  Ihre Best\u00e4tigung wurde erfolgreich \u00fcbermittelt.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p
                  className="text-foreground/85 leading-relaxed"
                  style={{ fontFamily: sansFont, fontSize: "1.65rem" }}
                >
                  Nach der \u00dcberweisung w\u00e4hlen Sie bitte Ihre
                  verwendete Kryptow\u00e4hrung aus und geben Ihren
                  Transaktions-Hash ein.
                </p>
                <div>
                  <p
                    className="block font-semibold text-foreground mb-2"
                    style={{ fontFamily: sansFont, fontSize: "1.65rem" }}
                  >
                    Kryptow\u00e4hrung
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {CRYPTO_LIST.map((crypto) => (
                      <button
                        key={crypto.symbol}
                        type="button"
                        onClick={() => setSelectedCrypto(crypto.symbol)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all font-semibold"
                        style={{
                          fontFamily: sansFont,
                          fontSize: "1.5rem",
                          borderColor:
                            selectedCrypto === crypto.symbol
                              ? crypto.color
                              : "rgba(255,255,255,0.15)",
                          backgroundColor:
                            selectedCrypto === crypto.symbol
                              ? `${crypto.color}22`
                              : "rgba(255,255,255,0.04)",
                          color:
                            selectedCrypto === crypto.symbol
                              ? crypto.color
                              : "#ccc",
                        }}
                      >
                        <span
                          className="flex items-center justify-center rounded-full text-base font-bold"
                          style={{
                            backgroundColor: crypto.color,
                            color: "#fff",
                            width: "2.625rem",
                            height: "2.625rem",
                          }}
                        >
                          {crypto.logo}
                        </span>
                        {crypto.symbol}
                        {selectedCrypto === crypto.symbol && (
                          <Check className="h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="nickname-field"
                    className="block font-semibold text-foreground/80 mb-1"
                    style={{ fontFamily: sansFont, fontSize: "1.3125rem" }}
                  >
                    Ihr Nickname
                  </label>
                  <input
                    id="nickname-field"
                    type="text"
                    value={submittedNickname}
                    onChange={(e) => setSubmittedNickname(e.target.value)}
                    className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ fontFamily: sansFont, fontSize: "1.5rem" }}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="txhash-field"
                    className="block font-semibold text-foreground/80 mb-1"
                    style={{ fontFamily: sansFont, fontSize: "1.3125rem" }}
                  >
                    Transaktions-Hash
                  </label>
                  <input
                    id="txhash-field"
                    type="text"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    placeholder="Ihren Transaktions-Hash hier eingeben..."
                    className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                    style={{ fontFamily: sansFont, fontSize: "1.5rem" }}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-2xl px-8 py-4 text-lg font-bold border-0 h-auto text-white"
                  style={{ backgroundColor: oceanBlue, fontFamily: sansFont }}
                >
                  {isSubmitting
                    ? "Wird \u00fcbermittelt..."
                    : "Ausgleich best\u00e4tigen"}
                </Button>
              </form>
            )}
          </div>
          <p
            className="text-center"
            style={{
              fontFamily: sansFont,
              fontSize: "1.25rem",
              color: lightGrey7035,
            }}
          >
            Nach Best\u00e4tigung Ihres Ausgleichs erhalten Sie innerhalb von 24
            Stunden Zugang zu den Musterschreiben.
          </p>
        </motion.div>
      </main>
      <PageFooter />
    </div>
  );
}

function MusterschreibenPage({
  nickname,
  onBack,
  onGoToZahlung,
}: { nickname: string; onBack: () => void; onGoToZahlung: () => void }) {
  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      style={{ fontFamily: sansFont }}
    >
      <PageHeader onAction={onBack} actionLabel="Zur\u00fcck" />
      <main
        className="flex-1 w-full py-12"
        style={{ paddingLeft: "7cm", paddingRight: "7cm" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <h1
            className="font-bold mb-8"
            style={{
              fontFamily: sansFont,
              fontSize: "1.7425rem",
              lineHeight: 1.2,
            }}
          >
            Ihr pers\u00f6nlicher Bereich,{" "}
            <span style={{ color: nicknameYellow }}>{nickname}</span> bei
            SichereDeineRechte.
          </h1>
          <div
            className="space-y-5 leading-relaxed"
            style={{ fontFamily: sansFont, fontSize: "1.625rem" }}
          >
            <p className="font-semibold" style={{ fontSize: "3.5rem" }}>
              Musterschreiben
            </p>
            <p style={{ color: lightGrey7035 }}>
              Erhalten Sie Zugang zu professionellen Musterschreiben und
              administrativen Prozessen f\u00fcr den Umgang mit sogenannten
              Beh\u00f6rden, \u00c4mtern oder Gerichten. Unsere Vorlagen helfen
              Ihnen, Ihre Rechte zu wahren.
            </p>
            <ul
              className="space-y-3 list-none pl-4"
              style={{ color: lightGrey7035 }}
            >
              <li>
                \u2713 Zur\u00fcckweisung von mangelhaften Beh\u00f6rden-, Amts-
                oder Gerichtsschreiben (sogenannte Beschl\u00fcsse, Bescheide,
                Urteile, Zahlungsaufforderungen etc.)
              </li>
              <li>
                \u2713 Annahme von beh\u00f6rdlichen, amtlichen oder
                gerichtlichen Forderung (sogenannte Bu\u00dfgelder, Steuern
                etc.) unter Vorbehalt der Rechtm\u00e4\u00dfigkeit.
              </li>
              <li>
                \u2713 Annahme von beh\u00f6rdlichen, amtlichen oder
                gerichtlichen Forderung (sogenannte Bu\u00dfgelder, Steuern
                etc.) unter Vorbehalt der Rechtm\u00e4\u00dfigkeit in Verbindung
                mit einem Gegenangebot.
              </li>
            </ul>
            <p className="font-semibold" style={{ color: lightGrey7035 }}>
              Bezahlung sicher per Kryptow\u00e4hrung (ICP, BTC, ETH, XRP, SOL).
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            <Button
              onClick={onGoToZahlung}
              className="rounded-2xl px-10 py-6 text-xl font-bold border-0 h-auto text-white"
              style={{ backgroundColor: "#CC0000", fontFamily: sansFont }}
            >
              Jetzt Zugang zu professionellen Musterschreiben freischalten
            </Button>
          </div>
        </motion.div>
      </main>
      <PageFooter />
    </div>
  );
}

type PageView = "members" | "musterschreiben" | "zahlung";

export function MembersPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pageView, setPageView] = useState<PageView>("members");

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  if (pageView === "zahlung") {
    return (
      <ZahlungPage
        nickname={user?.nickname ?? ""}
        onBack={() => setPageView("musterschreiben")}
      />
    );
  }

  if (pageView === "musterschreiben") {
    return (
      <MusterschreibenPage
        nickname={user?.nickname ?? ""}
        onBack={() => setPageView("members")}
        onGoToZahlung={() => setPageView("zahlung")}
      />
    );
  }

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
            onClick={handleLogout}
            className="gap-3 rounded-2xl px-8 py-4 text-lg font-bold border-0 h-auto text-white"
            style={{ backgroundColor: oceanBlue, fontFamily: sansFont }}
            data-ocid="members.button"
          >
            <LogOut className="h-5 w-5" />
            Abmelden
          </Button>
        </div>
      </header>
      <main
        className="flex-1 w-full py-12"
        style={{ paddingLeft: "7cm", paddingRight: "7cm" }}
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
              bei SDR \u2013 SichereDeineRechte!
            </h1>
            <p
              className="text-muted-foreground mt-2"
              style={{ fontFamily: sansFont, fontSize: "1.25rem" }}
            >
              Ihr pers\u00f6nlicher Bereich bei SichereDeineRechte.
            </p>
          </div>
          <div
            className="mb-10 space-y-4 text-foreground/85 leading-relaxed"
            style={{ fontFamily: sansFont, fontSize: "1.625rem" }}
          >
            <p>
              Vielen Dank f\u00fcr Ihre Registrierung und Ihr Interesse an den
              Informationen von SDR! Hier informieren sich Menschen, die das
              bestehende System hinterfragen und nach praktischen L\u00f6sungen
              suchen, wie man selbstbestimmt mit mangelhaften sogenannten
              Beh\u00f6rden-, Amts- oder Gerichtsschreiben umgeht und seine
              Rechte wahrt.
            </p>
            <p>
              Auf unserer Plattform finden Sie hilfreiche Informationen,
              inspirierende Inhalte und bei Bedarf praktische Musterschreiben
              sowie administrative Prozesse, die Ihnen den Umgang mit
              sogenannten Beh\u00f6rden, \u00c4mtern oder Gerichten erleichtern.
              St\u00f6bern Sie, probieren Sie aus und nutzen Sie die
              M\u00f6glichkeiten, die Ihnen unsere Seite bietet.
            </p>
            <p className="font-semibold">
              Wir w\u00fcnschen Ihnen viel Freude und wertvolle Erfahrungen!
            </p>
            <p className="font-semibold">Ihr SDR-Team</p>
          </div>
          <Button
            onClick={() => setPageView("musterschreiben")}
            className="rounded-2xl px-10 py-5 text-xl font-bold border-0 h-auto text-white"
            style={{ backgroundColor: oceanBlue, fontFamily: sansFont }}
          >
            Musterschreiben
          </Button>
        </motion.div>
      </main>
      <PageFooter />
    </div>
  );
}
