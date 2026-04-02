import { Shield } from "lucide-react";
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

export function AdminPage({ onClose }: { onClose: () => void }) {
  const { actor } = useActor();
  const [registrationCount, setRegistrationCount] = useState<number | null>(
    null,
  );
  const [confirmations, setConfirmations] = useState<PaymentConfirmation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!actor) return;
      try {
        const [count, confs] = await Promise.all([
          actor.getRegistrationCount(),
          actor.getPaymentConfirmations(),
        ]);
        setRegistrationCount(Number(count));
        setConfirmations(confs as PaymentConfirmation[]);
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 overflow-y-auto py-8"
      style={{ fontFamily: sansFont }}
    >
      <div className="relative bg-card border border-border rounded-xl p-8 w-full max-w-3xl shadow-2xl mx-4">
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

            {/* Payment confirmations */}
            <div>
              <h3
                className="font-bold text-lg text-foreground mb-3"
                style={{ fontFamily: sansFont }}
              >
                Zahlungsbestätigungen ({confirmations.length})
              </h3>
              {confirmations.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Noch keine Bestätigungen eingegangen.
                </p>
              ) : (
                <div className="space-y-3">
                  {confirmations.map((c) => (
                    <div
                      key={c.transactionHash}
                      className="border border-border rounded-xl p-4"
                      style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="px-2 py-0.5 rounded text-xs font-bold text-white"
                          style={{
                            backgroundColor:
                              CRYPTO_COLORS[c.cryptocurrency] ?? oceanBlue,
                          }}
                        >
                          {c.cryptocurrency}
                        </span>
                        <span className="font-semibold text-foreground">
                          {c.nickname}
                        </span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {formatDate(c.submittedAt)}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-foreground/70 break-all">
                        {c.transactionHash}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
