import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getSession();
  
  if (!session || session.role !== "Admin") {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const logs = await db.activityLog.findMany({
    include: {
      user: { select: { email: true, role: true } }
    },
    orderBy: { timestamp: "desc" }
  });

  const csvRows = [
    ["ID", "Timestamp", "User Email", "User Role", "Action Type", "Target Entity", "Result Status"]
  ];

  for (const log of logs) {
    csvRows.push([
      log.id,
      log.timestamp.toISOString(),
      log.user.email,
      log.user.role,
      log.actionType,
      log.targetEntity || "",
      log.resultStatus || ""
    ]);
  }

  const csvContent = csvRows.map(row => row.join(",")).join("\n");

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="health-ai-audit-logs.csv"`,
    },
  });
}
