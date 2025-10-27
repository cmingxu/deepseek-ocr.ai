import { redirect } from "next/navigation";

export default function Page() {
  // Redirect duplicate route to canonical app page
  redirect("/app");
}