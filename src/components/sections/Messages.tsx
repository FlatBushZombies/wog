"use client";

import { useState } from "react";
import { Eyebrow } from "../ui/Eyebrow";
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
        <ScrollReveal className="max-w-[32rem]">
          <Eyebrow>Messages</Eyebrow>
          <h2 className="text-h2 mt-[1rem] text-ink">
            Words that change lives.
          </h2>
          <p className="text-body-lg mt-[1.25rem] text-muted">
            Listen, watch and grow through messages from DMWOG.
          </p>
        </ScrollReveal>

        <ScrollStagger className="mt-[3rem] grid grid-cols-1 gap-[1.25rem] sm:grid-cols-2 lg:grid-cols-4">
          {messages.map((message) => (
            <ScrollStaggerItem key={message.id}>
              <MessageCard message={message} onSelect={handleSelect} />
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>

      <MessageViewer message={active} onClose={handleClose} />
    </section>
  );
}
