import { useMemo, useState } from "react";
import { Flame, Search, Trophy, Users } from "lucide-react";
import { useMockResource } from "../../../hooks/useMockResource";
import { getLeaderboard } from "../api";
import { Button } from "../../../components/ui/button";
import { SearchField } from "../../../components/shared/SearchField";
import { Skeleton } from "../../../components/ui/skeleton";
import { EmptyState } from "../../../components/shared/EmptyState";
import { LeaderboardTable } from "../components/LeaderboardTable";

function LeaderboardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-14 w-full rounded-2xl bg-white/5" />
      <Skeleton className="h-96 w-full rounded-[1.5rem] bg-white/5" />
    </div>
  );
}

export function LeaderboardPage() {
  const [period, setPeriod] = useState("all-time");
  const [query, setQuery] = useState("");
  const { data, loading } = useMockResource(
    () => getLeaderboard(period),
    [period],
  );

  const filteredEntries = useMemo(() => {
    if (!data) return [];

    return data.filter((entry) =>
      entry.user.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [data, query]);

  const stats = useMemo(() => {
    if (!filteredEntries.length) {
      return {
        activePlayers: 0,
        topScore: 0,
        totalCompleted: 0,
        bestStreak: 0,
      };
    }

    return {
      activePlayers: filteredEntries.length,
      topScore: filteredEntries[0]?.points ?? 0,
      totalCompleted: filteredEntries.reduce(
        (sum, entry) => sum + entry.completed,
        0,
      ),
      bestStreak: Math.max(...filteredEntries.map((entry) => entry.streak)),
    };
  }, [filteredEntries]);

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.32em] text-white/65">
              Community Rankings
            </p>

            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold leading-[0.95] tracking-tight text-white sm:text-5xl">
                Leaderboard - See how you stack up against the community
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
                Track weekly momentum, compare all-time scores, and scan the
                most active learners without losing readability.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-black/60 p-1.5">
              {["weekly", "all-time"].map((value) => (
                <Button
                  key={value}
                  className={
                    period === value
                      ? "rounded-xl bg-white text-black hover:bg-white/90"
                      : "rounded-xl border border-transparent text-white/72 hover:bg-white/10 hover:text-white"
                  }
                  onClick={() => setPeriod(value)}
                  size="sm"
                  variant="ghost"
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-black/70 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/55">Active players</p>
                <Users className="h-4 w-4 text-white/45" />
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-white">
                {stats.activePlayers}
              </p>
              <p className="mt-2 text-sm text-white/45">
                Visible after your current filters.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-black/70 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/55">Top score</p>
                <Trophy className="h-4 w-4 text-white/45" />
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-white">
                {stats.topScore.toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-white/45">
                Current best for the selected period.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-black/70 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/55">Challenges solved</p>
                <Search className="h-4 w-4 text-white/45" />
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-white">
                {stats.totalCompleted.toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-white/45">
                Total completions across the current view.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-black/70 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/55">Best streak</p>
                <Flame className="h-4 w-4 text-white/45" />
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-white">
                {stats.bestStreak} days
              </p>
              <p className="mt-2 text-sm text-white/45">
                Longest active run among visible users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/65 p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/40">
                Search & standings
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Find a learner and compare performance fast.
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-white/55">
                Search by name, switch the ranking window, and keep the full
                table readable on both desktop and mobile.
              </p>
            </div>

            <div className="w-full max-w-md">
              <SearchField
                aria-label="Search leaderboard"
                className="w-full"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search users"
                value={query}
              />
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <LeaderboardSkeleton />
            ) : filteredEntries.length ? (
              <LeaderboardTable entries={filteredEntries} />
            ) : (
              <EmptyState
                actionLabel="Clear search"
                description="No users match your search. Try a different name or clear the filter."
                icon={Search}
                onAction={() => setQuery("")}
                title="Nothing matched"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
