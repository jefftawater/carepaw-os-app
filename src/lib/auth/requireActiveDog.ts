import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/requireUser";
import { getFirstDogForCurrentUser } from "@/lib/dogs";

export async function requireActiveDog() {
  await requireUser();

  const dog = await getFirstDogForCurrentUser();

  if (!dog) {
    redirect("/onboarding/dog");
  }

  return dog;
}
