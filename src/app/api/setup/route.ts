import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_SUPABASE_URL غير موجود." },
        { status: 500 }
      );
    }

    if (!serviceKey) {
      return NextResponse.json(
        { error: "SUPABASE_SERVICE_ROLE_KEY غير موجودة في .env.local." },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(
      url,
      serviceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const body = await request.json();

    const institutionId = body?.institutionId;
    const logoUrl = body?.logoUrl ?? null;

    console.log("🔐 API setup:");
    console.log("institutionId:", institutionId);
    console.log("logoUrl:", logoUrl);
    console.log("serviceKey موجودة:", Boolean(serviceKey));

    if (!institutionId) {
      return NextResponse.json(
        {
          error: "institutionId est obligatoire.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("establishments")
      .update({
        logo_url: logoUrl,
        setup_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", institutionId)
      .select(
        "id, company_id, name, slug, city, address, phone, email, status, setup_completed, logo_url, created_at, updated_at"
      )
      .single();

    if (error) {
      console.error("❌ API UPDATE ERROR:", error);

      return NextResponse.json(
        {
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 }
      );
    }

    console.log("✅ API UPDATE SUCCESS:", data);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ API SETUP ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur serveur inconnue.",
      },
      { status: 500 }
    );
  }
}