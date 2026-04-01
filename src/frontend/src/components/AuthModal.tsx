import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";
import { hashPassword } from "../utils/crypto";

interface AuthModalProps {
  trigger?: React.ReactNode;
  defaultTab?: "login" | "register";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AuthModal({
  trigger,
  defaultTab = "login",
  open,
  onOpenChange,
}: AuthModalProps) {
  const { actor } = useActor();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginNick, setLoginNick] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [regNick, setRegNick] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setLoginLoading(true);
    try {
      const hashed = await hashPassword(loginPass);
      const ok = await actor.login(loginNick, hashed);
      if (ok) {
        login(loginNick);
        onOpenChange?.(false);
        navigate({ to: "/members" });
      } else {
        toast.error("Ungültiger Benutzername oder Passwort.");
      }
    } catch {
      toast.error("Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    if (regPass !== regConfirm) {
      toast.error("Passwörter stimmen nicht überein.");
      return;
    }
    if (regPass.length < 6) {
      toast.error("Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }
    setRegLoading(true);
    try {
      const hashed = await hashPassword(regPass);
      await actor.register(regNick, hashed);
      login(regNick);
      onOpenChange?.(false);
      navigate({ to: "/members" });
      toast.success("Willkommen bei SDR!");
    } catch {
      toast.error(
        "Registrierung fehlgeschlagen. Benutzername möglicherweise vergeben.",
      );
    } finally {
      setRegLoading(false);
    }
  };

  const content = (
    <DialogContent
      className="sm:max-w-2xl bg-card border-border"
      data-ocid="auth.dialog"
    >
      <DialogHeader>
        <DialogTitle className="font-display text-2xl text-foreground">
          SDR – SichereDeineRechte
        </DialogTitle>
      </DialogHeader>
      <Tabs defaultValue={defaultTab} className="mt-2">
        <TabsList className="w-full bg-secondary">
          <TabsTrigger
            value="login"
            className="flex-1 text-lg"
            data-ocid="auth.tab"
          >
            Anmelden
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="flex-1 text-lg"
            data-ocid="auth.tab"
          >
            Registrieren
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-5 pt-5">
            <div className="space-y-1">
              <Label htmlFor="login-nick" className="text-base">
                Benutzername
              </Label>
              <Input
                id="login-nick"
                placeholder="Ihr Nickname"
                value={loginNick}
                onChange={(e) => setLoginNick(e.target.value)}
                required
                className="h-12 text-base"
                data-ocid="auth.input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="login-pass" className="text-base">
                Passwort
              </Label>
              <Input
                id="login-pass"
                type="password"
                placeholder="Ihr Passwort"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                required
                className="h-12 text-base"
                data-ocid="auth.input"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={loginLoading}
              data-ocid="auth.submit_button"
            >
              {loginLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {loginLoading ? "Anmelden..." : "Anmelden"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="register">
          <form onSubmit={handleRegister} className="space-y-5 pt-5">
            <div className="space-y-1">
              <Label htmlFor="reg-nick" className="text-base">
                Benutzername
              </Label>
              <Input
                id="reg-nick"
                placeholder="Wählen Sie einen Nickname"
                value={regNick}
                onChange={(e) => setRegNick(e.target.value)}
                required
                className="h-12 text-base"
                data-ocid="auth.input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="reg-pass" className="text-base">
                Passwort
              </Label>
              <Input
                id="reg-pass"
                type="password"
                placeholder="Mindestens 6 Zeichen"
                value={regPass}
                onChange={(e) => setRegPass(e.target.value)}
                required
                className="h-12 text-base"
                data-ocid="auth.input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="reg-confirm" className="text-base">
                Passwort bestätigen
              </Label>
              <Input
                id="reg-confirm"
                type="password"
                placeholder="Passwort wiederholen"
                value={regConfirm}
                onChange={(e) => setRegConfirm(e.target.value)}
                required
                className="h-12 text-base"
                data-ocid="auth.input"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={regLoading}
              data-ocid="auth.submit_button"
            >
              {regLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {regLoading ? "Registrieren..." : "Konto erstellen"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );

  if (trigger) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        {content}
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {content}
    </Dialog>
  );
}
