import { cookies } from "next/headers";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ClientSidebarWrapper } from "@/components/ClientSidebarWrapper";
import { ChatProvider } from "@/context/chat-context";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <ChatProvider>
        <ClientSidebarWrapper />
        <main className="w-full">
          <SidebarTrigger />
          {children}
        </main>
      </ChatProvider>
    </SidebarProvider>
  );
}
