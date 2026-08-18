import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!url || !serviceKey) {
            return NextResponse.json(
                { error: "Configuration Supabase manquante." },
                { status: 500 }
            );
        }

        const supabaseAdmin = createClient(url, serviceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });

        const body = await request.json();
        const { establishmentId, managerName, managerEmail, managerPassword } = body;

        // Validation des entrées
        if (!establishmentId || !managerName || !managerEmail || !managerPassword) {
            return NextResponse.json(
                { error: "Tous les champs sont obligatoires." },
                { status: 400 }
            );
        }

        if (managerPassword.length < 6) {
            return NextResponse.json(
                { error: "Le mot de passe doit contenir au moins 6 caractères." },
                { status: 400 }
            );
        }

        console.log(`🔐 Création du compte manager pour l'établissement: ${establishmentId}`);
        console.log(`📧 Email du manager: ${managerEmail}`);

        // 1. Création de l'utilisateur Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: managerEmail,
            password: managerPassword,
            email_confirm: true,
            user_metadata: {
                full_name: managerName,
            },
        });

        if (authError) {
            console.error("❌ Erreur lors de la création de l'utilisateur Auth:", authError);
            return NextResponse.json(
                { error: authError.message },
                { status: 400 }
            );
        }

        if (!authData.user) {
            return NextResponse.json(
                { error: "L'utilisateur n'a pas pu être créé." },
                { status: 500 }
            );
        }

        const userId = authData.user.id;
        console.log(`✅ Utilisateur Auth créé avec succès: ${userId}`);

        // 2. Création de la membership
        const { error: membershipError } = await supabaseAdmin
            .from("establishment_members")
            .insert({
                establishment_id: establishmentId,
                user_id: userId,
                role: "manager",
            });

        if (membershipError) {
            console.error("❌ Erreur lors de la création de la membership:", membershipError);

            // Tentative de nettoyage (suppression de l'utilisateur Auth) si la membership échoue
            // pour éviter les comptes orphelins
            await supabaseAdmin.auth.admin.deleteUser(userId);

            return NextResponse.json(
                { error: "Erreur lors de l'association de l'utilisateur à l'établissement." },
                { status: 500 }
            );
        }

        console.log(`✅ Membership créée avec succès pour l'utilisateur ${userId}`);

        return NextResponse.json({
            success: true,
            user: {
                id: userId,
                email: managerEmail,
                name: managerName,
            },
        });
    } catch (error) {
        console.error("❌ Erreur inattendue API create-manager:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Erreur serveur inconnue.",
            },
            { status: 500 }
        );
    }
}
