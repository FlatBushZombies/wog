"use client";

import { useState } from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "../effects/ScrollReveal";
import { MessageCard } from "./MessageCard";
import { MessageViewer } from "../overlays/MessageViewer";
import { messages, type Message } from "@/content/messages";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

export function Messages() {
  const [active, setActive] = useState<Message | null>(null);

  function handleSelect(message: Message) {
    setActive(message);
    lockScroll("message-viewer");
  }

  function handleClose() {
    setActive(null);
    unlockScroll("message-viewer");
  }

  return (
    <section id="messages" className="bg-background py-[5rem] sm:py-[7rem]">
      <div className="shell">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Messages"
            heading="Words that change lives."
            subtext="Listen, watch and grow through messages from DMWOG."
          />
        </ScrollReveal>

        <ScrollStagger className="mt-[3rem] grid grid-cols-1 gap-[1.25rem] sm:grid-cols-2 lg:grid-cols-4">
          {messages.map((message) => (
            <ScrollStaggerItem key={message.id} className="h-full">
              <MessageCard message={message} onSelect={handleSelect} />
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>

      <MessageViewer message={active} onClose={handleClose} />
    </section>
  );
}
