export async function createUserTable({email: string}) {
  try {
    const await prisma.user.create({
      data: {
        email,
      },
    });
  } catch (error) {
    
  }
}