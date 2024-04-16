import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error.message);
    }

    if (data.user) {
      // url to redirect to after sign in process completes
      return NextResponse.redirect(`${requestUrl.origin}/user/${data.user.id}`);
    }


  }
  return NextResponse.redirect(requestUrl.origin);

}