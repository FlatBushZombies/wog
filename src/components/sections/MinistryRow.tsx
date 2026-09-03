"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Music, Sparkles, Baby, Users, HeartHandshake, Globe2 } from "lucide-react";
import type { Ministry } from "@/content/ministries";
import { ArrowIcon } from "../ui/ArrowIcon";
import { IconChip } from "../ui/IconChip";
import { Card } from "../ui/Card";
import { useUiState } from "@/lib/ui-state";

const ICONS: Record<string, LucideIcon> = {
  worship: Music,
  youth: Sparkles,
  children: Baby,
  men: Users,
  women: HeartHandshake,
  outreach: Globe2,
};

export function MinistryRow({ ministry }: { ministry: Ministry }) {
  const { openModal } = useUiState();
  const Icon = ICONS[ministry.id] ?? Users;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={() => openModal("connect")}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") openModal("connect");
      }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="h-full cursor-pointer"
    >
      <Card className="flex h-full flex-col p-[1.75rem] transition-colors duration-300 hover:border-accent/30">
        <div className="flex items-start justify-between">
          <IconChip icon={Icon} />
          <span className="text-caption text-subtle">{ministry.number}</span>
        </div>
        <h3 className="text-h3 mt-[1.25rem] text-ink">{ministry.title}</h3>
        <p className="text-body mt-[0.5rem] flex-1 text-muted">{ministry.description}</p>
        <span className="mt-[1.25rem] flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-[0.4rem] border border-line text-ink">
          <ArrowIcon />
        </span>
      </Card>
    </motion.div>
  );
}
