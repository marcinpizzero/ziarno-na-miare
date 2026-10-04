import { redirect } from "next/navigation";

export default function RecipeSlugPage() {
  // W MVP Etapu 1 cała baza przepisów z przelicznikiem działa bezpośrednio na stronie głównej
  redirect("/#baza-przepisow");
}