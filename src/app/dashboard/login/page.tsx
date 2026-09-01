import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const redirectTo = from && from.startsWith("/dashboard") ? from : "/dashboard";

  return <LoginForm redirectTo={redirectTo} />;
}
