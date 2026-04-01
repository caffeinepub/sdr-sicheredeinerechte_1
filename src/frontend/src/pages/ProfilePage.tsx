import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Shield, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";
import { hashPassword } from "../utils/crypto";

export function ProfilePage() {
  const { actor } = useActor();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !user) return;
    if (newPass !== confirmPass) {
      toast.error("Neue Passwörter stimmen nicht überein.");
      return;
    }
    if (newPass.length < 6) {
      toast.error("Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }
    setIsLoading(true);
    try {
      const currentHashed = await hashPassword(currentPass);
      const newHashed = await hashPassword(newPass);
      const profile = { nickname: user.nickname, password: currentHashed };
      await actor.changePassword(profile, newHashed);
      toast.success("Passwort erfolgreich geändert.");
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
    } catch {
      toast.error(
        "Passwortänderung fehlgeschlagen. Bitte prüfen Sie Ihr aktuelles Passwort.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-lg text-foreground">
              SDR
            </span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground"
            data-ocid="profile.button"
          >
            Abmelden
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/members"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-8 font-body"
            data-ocid="nav.link"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zum Mitgliederbereich
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                {user?.nickname}
              </h1>
              <p className="text-muted-foreground text-sm font-body">
                SDR Mitglied
              </p>
            </div>
          </div>

          <Card className="bg-card border-border" data-ocid="profile.card">
            <CardHeader>
              <CardTitle className="font-display text-lg text-foreground">
                Passwort ändern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="current-pass">Aktuelles Passwort</Label>
                  <Input
                    id="current-pass"
                    type="password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    required
                    data-ocid="profile.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new-pass">Neues Passwort</Label>
                  <Input
                    id="new-pass"
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    required
                    data-ocid="profile.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm-new-pass">
                    Neues Passwort bestätigen
                  </Label>
                  <Input
                    id="confirm-new-pass"
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                    data-ocid="profile.input"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  data-ocid="profile.submit_button"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {isLoading ? "Speichern..." : "Passwort speichern"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm font-body">
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
