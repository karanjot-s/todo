"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "./Provider";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedProps {
  children: ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user)
      router.push("/auth/login?callbackUrl=" + encodeURIComponent(pathname));
  }, [user, router, pathname]);

  return <>{children}</>;
}
