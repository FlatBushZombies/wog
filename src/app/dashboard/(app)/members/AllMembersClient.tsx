"use client";

import { useMemo, useState } from "react";
import type { Member } from "@/lib/db/schema";
import { CATEGORY_LABELS } from "@/lib/db/schema";
import type { Category } from "@/lib/db/queries";
import { AddMemberForm } from "@/components/dashboard/AddMemberForm";
import { MemberRow } from "@/components/dashboard/MemberRow";
import { Building2, Filter, MapPin, Search, Users } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

const inputClass =
  "text-[16px] sm:text-body rounded-[0.4rem] border border-line bg-white px-[0.75rem] py-[0.625rem] text-ink outline-none focus-visible:border-accent";

export function AllMembersClient({
  initialMembers,
  churches,
  branches,
}: {
  initialMembers: Member[];
  churches: string[];
  branches: string[];
}) {
  const [search, setSearch] = useState("");
  const [selectedChurch, setSelectedChurch] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name_asc" | "name_desc">("name_asc");

  const filteredMembers = useMemo(() => {
    return initialMembers
      .filter((m) => {
        // Search filter
        if (search.trim()) {
          const q = search.toLowerCase().trim();
          const matchName = m.fullName.toLowerCase().includes(q);
          const matchEmail = m.email?.toLowerCase().includes(q) ?? false;
          const matchPhone = m.phone?.toLowerCase().includes(q) ?? false;
          const matchChurch = m.church?.toLowerCase().includes(q) ?? false;
          const matchBranch = m.branch?.toLowerCase().includes(q) ?? false;
          const matchNotes = m.notes?.toLowerCase().includes(q) ?? false;
          if (!matchName && !matchEmail && !matchPhone && !matchChurch && !matchBranch && !matchNotes) {
            return false;
          }
        }

        // Church filter
        if (selectedChurch !== "all" && (m.church || "Word of Grace") !== selectedChurch) {
          return false;
        }

        // Branch filter
        if (selectedBranch !== "all" && (m.branch || "Main Branch") !== selectedBranch) {
          return false;
        }

        // Category filter
        if (selectedCategory !== "all" && m.category !== selectedCategory) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name_asc") return a.fullName.localeCompare(b.fullName);
        if (sortBy === "name_desc") return b.fullName.localeCompare(a.fullName);
        if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return 0;
      });
  }, [initialMembers, search, selectedChurch, selectedBranch, selectedCategory, sortBy]);

  const uniqueChurches = useMemo(() => {
    const set = new Set<string>(churches);
    initialMembers.forEach((m) => set.add(m.church || "Word of Grace"));
    return Array.from(set).filter(Boolean).sort();
  }, [churches, initialMembers]);

  const uniqueBranches = useMemo(() => {
    const set = new Set<string>(branches);
    initialMembers.forEach((m) => set.add(m.branch || "Main Branch"));
    return Array.from(set).filter(Boolean).sort();
  }, [branches, initialMembers]);

  return (
    <div className="flex flex-col gap-[1.25rem] sm:gap-[1.5rem]">
      {/* Header & Primary Action */}
      <div className="flex flex-col gap-[1rem] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-h1 text-ink">All Members Directory</h1>
          <p className="text-body-lg mt-[0.375rem] text-muted">
            Manage every member across all churches, branches, and ministries in one central database.
          </p>
        </div>
        <div className="shrink-0">
          <AddMemberForm />
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 gap-[0.75rem] sm:grid-cols-4 sm:gap-[1rem]">
        <StatCard label="Total Members" value={initialMembers.length} icon={Users} accent />
        <StatCard label="Churches" value={uniqueChurches.length} icon={Building2} />
        <StatCard label="Branches" value={uniqueBranches.length} icon={MapPin} />
        <StatCard label="Filtered Members" value={filteredMembers.length} icon={Filter} />
      </div>

      {/* Search & Filter Controls */}
      <div className="rounded-[0.5rem] border border-line bg-white p-[1rem] sm:p-[1.25rem] shadow-sm">
        <div className="grid grid-cols-1 gap-[0.75rem] sm:grid-cols-2 lg:grid-cols-4">
          {/* Search Box */}
          <div className="relative sm:col-span-2 lg:col-span-2">
            <Search size={18} className="absolute left-[0.75rem] top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, church, branch, phone..."
              className={inputClass + " w-full pl-[2.375rem]"}
            />
          </div>

          {/* Church Filter */}
          <div>
            <select
              value={selectedChurch}
              onChange={(e) => setSelectedChurch(e.target.value)}
              className={inputClass + " w-full font-medium text-ink min-h-[44px]"}
            >
              <option value="all">All Churches ({uniqueChurches.length})</option>
              {uniqueChurches.map((church) => (
                <option key={church} value={church}>
                  {church}
                </option>
              ))}
            </select>
          </div>

          {/* Branch Filter */}
          <div>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className={inputClass + " w-full font-medium text-ink min-h-[44px]"}
            >
              <option value="all">All Branches ({uniqueBranches.length})</option>
              {uniqueBranches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-[0.875rem] flex flex-col gap-[0.75rem] border-t border-line/60 pt-[0.875rem] sm:flex-row sm:items-center sm:justify-between">
          {/* Category Quick Filter Pills (Horizontal scroll on small screens) */}
          <div className="flex items-center gap-[0.5rem] overflow-x-auto pb-[0.25rem] sm:pb-0 scrollbar-none">
            <span className="text-caption font-semibold shrink-0 text-muted">Ministry:</span>
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`text-caption min-h-[36px] shrink-0 rounded-full px-[0.875rem] py-[0.25rem] font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-accent text-white"
                  : "bg-surface text-ink hover:bg-line"
              }`}
            >
              All
            </button>
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-caption min-h-[36px] shrink-0 rounded-full px-[0.875rem] py-[0.25rem] font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-accent text-white"
                    : "bg-surface text-ink hover:bg-line"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Sort By Selector */}
          <div className="flex shrink-0 items-center justify-between sm:justify-end gap-[0.5rem]">
            <span className="text-caption font-semibold text-muted">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-[15px] sm:text-caption rounded-[0.4rem] border border-line bg-white px-[0.625rem] py-[0.5rem] font-medium text-ink min-h-[40px]"
            >
              <option value="name_asc">Name (A - Z)</option>
              <option value="name_desc">Name (Z - A)</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Member Results List */}
      <div>
        <div className="mb-[0.75rem] flex items-center justify-between px-[0.25rem]">
          <p className="text-eyebrow text-muted">
            Showing {filteredMembers.length} of {initialMembers.length} members
          </p>
          {(search || selectedChurch !== "all" || selectedBranch !== "all" || selectedCategory !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedChurch("all");
                setSelectedBranch("all");
                setSelectedCategory("all");
              }}
              className="text-caption font-medium text-accent hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="flex flex-col gap-[0.75rem]">
          {filteredMembers.length === 0 ? (
            <div className="rounded-[0.5rem] border border-dashed border-line bg-white p-[3rem] text-center">
              <Users size={36} className="mx-auto text-muted/50" aria-hidden="true" />
              <p className="text-h3 mt-[0.75rem] text-ink">No members found</p>
              <p className="text-body-lg mt-[0.375rem] text-muted">
                Try clearing your search terms or adjusting the filters above.
              </p>
            </div>
          ) : (
            filteredMembers.map((member) => <MemberRow key={member.id} member={member} />)
          )}
        </div>
      </div>
    </div>
  );
}
