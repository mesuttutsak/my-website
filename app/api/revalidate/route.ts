import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

// Purges the statically generated pages after Firestore content changes:
// curl -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" https://www.mesuttutsak.dev/api/revalidate
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "Revalidation is not configured." },
      { status: 503 }
    );
  }

  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
