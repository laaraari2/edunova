"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/shared/branding/Logo";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Veuillez saisir votre email et votre mot de passe.");
      return;
    }

    setIsLoading(true);

    try {
      console.log("🔐 Tentative de connexion:", email);
      console.log("🔐 Before signInWithPassword");

      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      console.log("🔐 After signInWithPassword");
      console.log("👤 User:", data?.user);
      console.log("❌ Login error:", loginError);

      if (loginError) {
        console.error("❌ Erreur login:", loginError);
        setError(loginError.message);
        return;
      }

      if (!data.user) {
        setError("Connexion impossible. Aucun utilisateur trouvé.");
        return;
      }

  const { data: managerEstablishment, error: managerRpcError } =
  await supabase.rpc("get_user_establishment", {
    p_user_id: data.user.id,
  });

console.log("🔎 RPC data:", managerEstablishment);
console.log("🔎 RPC error:", managerRpcError);

if (managerRpcError) {
  console.error("❌ RPC error:", managerRpcError);
  setError(
    managerRpcError.message ||
      "Erreur lors de la vérification du compte responsable."
  );
  return;
}

// get_user_establishment retourne une ligne pour un manager
// et peut retourner zéro ligne pour un owner.
if (
  Array.isArray(managerEstablishment) &&
  managerEstablishment.length > 0
) {
  const establishment = managerEstablishment[0];

  const establishmentSlug = establishment.establishment_slug;
  const setupCompleted = establishment.setup_completed;

  if (typeof establishmentSlug === "string") {
    if (setupCompleted === false) {
      router.push(
        `/setup?institution=${encodeURIComponent(establishmentSlug)}`
      );
    } else {
      router.push(
        `/school?institution=${encodeURIComponent(establishmentSlug)}`
      );
    }

    return;
  }
}
console.log("👑 BEFORE company_members query");

let ownerMembership = null;
let ownerError = null;

try {
  const result = await supabase
    .from("company_members")
    .select("company_id")
    .eq("user_id", data.user.id)
    .eq("role", "owner")
    .maybeSingle();

  ownerMembership = result.data;
  ownerError = result.error;

  console.log("👑 AFTER company_members query");
  console.log("👑 Owner membership data:", ownerMembership);
  console.log("👑 Owner membership error:", ownerError);
} catch (error) {
  console.error("🔴 company_members QUERY THREW:", error);
  setError("Erreur lors de la vérification du compte propriétaire.");
  return;
}

      if (ownerError) {
        console.error("❌ Owner lookup error:", ownerError);
        setError(ownerError.message || "Erreur lors de la vérification du compte propriétaire.");
        return;
      }

     console.log("👑 Checking ownerMembership:", ownerMembership);

if (ownerMembership) {
  console.log("✅ OWNER detected → redirecting to /company");
  router.push("/company");
  return;
}

console.log("❌ ownerMembership is empty");

      await supabase.auth.signOut();
      setError(
        "Accès refusé : cet utilisateur n'est ni manager ni propriétaire."
      );
    } catch (error) {
      console.error("🔴 Catch login flow:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <div className="relative hidden overflow-hidden bg-slate-950 lg:flex">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <Logo />

            <div className="max-w-xl">
              <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                Edunova
              </span>

              <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-white xl:text-5xl">
                Gérez votre établissement
                <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  depuis un seul espace.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-slate-400">
                Retrouvez vos élèves, enseignants, finances, communications
                et outils intelligents au même endroit.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Gestion centralisée de votre établissement",
                  "Communication avec les parents et enseignants",
                  "Outils intelligents avec Edunova AI",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/10 text-xs font-bold text-cyan-300">
                      ✓
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} Edunova. Tous droits réservés.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <Logo />
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-9">
              <div>
                <p className="text-sm font-semibold text-cyan-600">
                  Bienvenue
                </p>

                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
                  Connexion
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Connectez-vous à votre espace Edunova pour continuer.
                </p>
              </div>

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleLogin}
                className="mt-8 space-y-5"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Adresse email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@etablissement.ma"
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Mot de passe
                    </label>

                    <button
                      type="button"
                      className="text-xs font-semibold text-cyan-600 transition hover:text-cyan-700"
                      onClick={() => {
                        alert(
                          "La récupération du mot de passe sera ajoutée prochainement."
                        );
                      }}
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-xl bg-slate-950 text-sm font-bold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Connexion..." : "Se connecter"}

                  {!isLoading && (
                    <span className="ml-2">→</span>
                  )}
                </Button>
              </form>
            </div>

            <div className="mt-7 text-center">
              <a
                href="/marketing"
                className="text-sm font-medium text-slate-500 transition hover:text-cyan-600"
              >
                ← Retour au site
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}