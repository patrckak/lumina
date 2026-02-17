import { prisma } from "@/constructor/PrismaConstructor";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, name } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    let userSync = await prisma.user.findFirst({
      where: { authId: userId },
    });

    if (!userSync) {
      const nameStg = name || "Usuário Lúmina";
      
      // Create debt first
      const newDebt = await prisma.debt.create({ 
        data: { 
          debtValue: 0,
          // Note: In your schema, debt has a relation to user via debtId.
          // But user also has debtId. This is a bit circular.
          // Based on your original code: (await prisma.debt.create({ data: { debtValue: 0 } })).debtId
        } 
      });
      
      userSync = await prisma.user.create({
        data: {
          authId: userId,
          name: nameStg,
          debtId: newDebt.debtId,
        },
      });
      
      return NextResponse.json({ success: true, created: true, user: userSync });
    }

    return NextResponse.json({ success: true, created: false, user: userSync });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
