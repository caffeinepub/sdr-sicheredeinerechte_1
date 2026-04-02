import { Check, Copy, Shield, Unlock } from "lucide-react";
import { useEffect, useState } from "react";
import { useActor } from "../hooks/useActor";

const sansFont = "'Liberation Sans', Arial, Helvetica, sans-serif";
const oceanBlue = "#005B6E";

const CRYPTO_COLORS: Record<string, string> = {
  ICP: "#3B00B9",
  BTC: "#F7931A",
  ETH: "#627EEA",
  XRP: "#00AAE4",
  SOL: "#9945FF",
};

interface PaymentConfirmation {
  nickname: string;
  transactionHash: string;
  cryptocurrency: string;
  submittedAt: bigint;
  approved: boolean;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Kopieren"
      style={{
        fontFamily: sansFont,
        backgroundColor: copied ? "#22c55e" : oceanBlue,
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "6px 14px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.95rem",
        flexShrink: 0,
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Kopiert" : "Kopieren"}
    </button>
  );
}

export function AdminPage({ onClose }: { onClose: () => void }) {
  const { actor } = useActor();
  const [registrationCount, setRegistrationCount] = useState<number | null>(
    null,
  );
  const [confirmations, setConfirmations] = useState<PaymentConfirmation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmations, setShowConfirmations] = useState(false);
  const [unlockedHashes, setUnlockedHashes] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchData() {
      if (!actor) return;
      try {
        const [count, confs] = await Promise.all([
          actor.getRegistrationCount(),
          actor.getPaymentConfirmations(),
        ]);
        setRegistrationCount(Number(count));
        // Sort newest first
        const sorted = (confs as PaymentConfirmation[])
          .slice()
          .sort((a, b) => Number(b.submittedAt) - Number(a.submittedAt));
        setConfirmations(sorted);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [actor]);

  const formatDate = (ns: bigint) => {
    const ms = Number(ns) / 1_000_000;
    return new Date(ms).toLocaleString("de-DE");
  };

  const handleUnlock = (hash: string, nickname: string) => {
    setUnlockedHashes((prev) => new Set(prev).add(hash));
    alert(`Musterschreiben für "${nickname}" wurde freigeschaltet.`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 overflow-y-auto py-8"
      style={{ fontFamily: sansFont }}
    >
      <div
        className="relative bg-card border border-border rounded-xl shadow-2xl"
        style={{
          width: "100%",
          maxWidth: "calc(100% - 14cm)",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl leading-none"
        >
          ✕
        </button>
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-yellow-400" />
          <h2
            className="font-bold text-2xl text-foreground"
            style={{ fontFamily: sansFont }}
          >
            Admin-Bereich
          </h2>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Daten werden geladen...</p>
        ) : (
          <>
            {/* Registration counter */}
            <div
              className="border border-border rounded-xl p-5 mb-6"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <p
                className="text-muted-foreground text-sm mb-1"
                style={{ fontFamily: sansFont }}
              >
                Registrierungen gesamt
              </p>
              <p
                className="font-bold"
                style={{
                  fontFamily: sansFont,
                  fontSize: "3rem",
                  color: "#FFD700",
                }}
              >
                {registrationCount ?? 0}
              </p>
            </div>

            {/* Zahlungsbestätigungen toggle button */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowConfirmations((v) => !v)}
                style={{
                  fontFamily: sansFont,
                  backgroundColor: oceanBlue,
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px 32px",
                  fontSize: "1.15rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                Zahlungsbestätigungen
                {confirmations.length > 0 && (
                  <span
                    style={{
                      backgroundColor: "#FFD700",
                      color: "#000",
                      borderRadius: "999px",
                      padding: "2px 10px",
                      fontSize: "0.95rem",
                      fontWeight: "bold",
                    }}
                  >
                    {confirmations.length}
                  </span>
                )}
                <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                  {showConfirmations ? "▲" : "▼"}
                </span>
              </button>
            </div>

            {/* Payment confirmations panel */}
            {showConfirmations && (
              <div
                style={{
                  width: "100%",
                  maxWidth: "calc(100% - 14cm)",
                  margin: "0 auto",
                }}
              >
                {confirmations.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    Noch keine Bestätigungen eingegangen.
                  </p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.2rem",
                    }}
                  >
                    {confirmations.map((c) => (
                      <div
                        key={c.transactionHash}
                        className="border border-border rounded-xl"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                          padding: "1.5rem 1.8rem",
                        }}
                      >
                        {/* Header row: crypto badge, nickname, date */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.8rem",
                            marginBottom: "1rem",
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              backgroundColor:
                                CRYPTO_COLORS[c.cryptocurrency] ?? oceanBlue,
                              color: "#fff",
                              borderRadius: "6px",
                              padding: "4px 14px",
                              fontSize: "1.1rem",
                              fontWeight: "bold",
                            }}
                          >
                            {c.cryptocurrency}
                          </span>
                          <span
                            style={{
                              fontFamily: sansFont,
                              fontWeight: "bold",
                              fontSize: "1.3rem",
                              color: "#FFD700",
                            }}
                          >
                            {c.nickname}
                          </span>
                          <span
                            style={{
                              marginLeft: "auto",
                              fontSize: "1rem",
                              color: "#aaa",
                            }}
                          >
                            {formatDate(c.submittedAt)}
                          </span>
                        </div>

                        {/* Transaction hash */}
                        <div
                          style={{
                            fontFamily: "monospace",
                            fontSize: "1.1rem",
                            color: "rgba(255,255,255,0.75)",
                            wordBreak: "break-all",
                            marginBottom: "1rem",
                            lineHeight: 1.5,
                          }}
                        >
                          {c.transactionHash}
                        </div>

                        {/* Action buttons */}
                        <div
                          style={{
                            display: "flex",
                            gap: "0.8rem",
                            flexWrap: "wrap",
                            alignItems: "center",
                          }}
                        >
                          <CopyButton text={c.transactionHash} />
                          <button
                            type="button"
                            onClick={() =>
                              handleUnlock(c.transactionHash, c.nickname)
                            }
                            style={{
                              fontFamily: sansFont,
                              backgroundColor: unlockedHashes.has(
                                c.transactionHash,
                              )
                                ? "#22c55e"
                                : "#b91c1c",
                              color: "#fff",
                              border: "none",
                              borderRadius: "6px",
                              padding: "6px 18px",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              fontSize: "1rem",
                              fontWeight: "bold",
                              flexShrink: 0,
                            }}
                          >
                            <Unlock size={16} />
                            {unlockedHashes.has(c.transactionHash)
                              ? "Freigeschaltet"
                              : "Musterschreiben freischalten"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
