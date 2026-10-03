import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !anonKey || !serviceKey) {
      return NextResponse.json({ error: "Configuration Supabase manquante." }, { status: 500 });
    }

    const cookieStore = await cookies();
    const supabaseUser = createClient(url, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
      global: {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    });

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Session invalide ou expirée." }, { status: 401 });
    }

    const supabaseAdmin = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const body = await request.json();
    const {
      institutionName, city, email, phone, address, status = "active",
      managerName, managerEmail, managerPassword,
    } = body;

    if (!institutionName?.trim() || !city?.trim()) {
      return NextResponse.json({ error: "Le nom de l'établissement et la ville sont obligatoires." }, { status: 400 });
    }
    if (!managerName?.trim() || !managerEmail?.trim() || !managerPassword) {
      return NextResponse.json({ error: "Les informations du directeur sont obligatoires." }, { status: 400 });
    }
    if (managerPassword.length < 6) {
      return NextResponse.json({ error: "Le mot de passe du directeur doit contenir au moins 6 caractères." }, { status: 400 });
    }

    const { data: ownerMembership, error: ownerError } = await supabaseAdmin
      .from("company_members")
      .select("company_id, role")
      .eq("user_id", user.id)
      .eq("role", "owner")
      .maybeSingle();

    if (ownerError) return NextResponse.json({ error: ownerError.message }, { status: 500 });
    if (!ownerMembership) {
      return NextResponse.json({ error: "Vous devez être propriétaire de la société pour créer une institution." }, { status: 403 });
    }

    const baseSlug = slugify(institutionName) || `institution-${Date.now()}`;
    const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;

    const { data: establishment, error: establishmentError } = await supabaseAdmin
      .from("establishments")
      .insert({
        company_id: ownerMembership.company_id,
        name: institutionName.trim(),
        slug,
        city: city.trim(),
        address: address?.trim() || null,
        phone: phone?.trim() || null,
        email: email?.trim() || null,
        status,
        setup_completed: false,
      })
      .select("id, slug")
      .single();

    if (establishmentError || !establishment) {
      return NextResponse.json({ error: establishmentError?.message || "Impossible de créer l'établissement." }, { status: 500 });
    }

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: managerEmail.trim(),
      password: managerPassword,
      email_confirm: true,
      user_metadata: { full_name: managerName.trim() },
    });

    if (authError || !authData.user) {
      await supabaseAdmin.from("establishments").delete().eq("id", establishment.id);
      return NextResponse.json({ error: authError?.message || "Le compte du directeur n'a pas pu être créé." }, { status: 400 });
    }

    const { error: membershipError } = await supabaseAdmin
      .from("establishment_members")
      .insert({
        establishment_id: establishment.id,
        user_id: authData.user.id,
        role: "manager",
      });

    if (membershipError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      await supabaseAdmin.from("establishments").delete().eq("id", establishment.id);
      return NextResponse.json({ error: "Impossible d'associer le directeur à l'établissement." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      institution: { id: establishment.id, slug: establishment.slug, name: institutionName.trim() },
      manager: { id: authData.user.id, email: managerEmail.trim(), name: managerName.trim() },
      loginLink: `/login?institution=${encodeURIComponent(establishment.slug)}`,
    });
  } catch (error) {
    console.error("❌ Erreur inattendue API create-manager:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erreur serveur inconnue." }, { status: 500 });
  }
}
