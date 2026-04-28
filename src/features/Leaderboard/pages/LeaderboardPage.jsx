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
      <Skeleton className="h-14 w-full border-4 border-black bg-[#FFD93D]" />
      <Skeleton className="h-96 w-full border-4 border-black bg-[#C4B5FD]" />
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
      <section className="neo-panel relative overflow-hidden bg-[#FF6B6B] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-5">
            <p className="neo-kicker bg-white">
              Community Rankings
            </p>

            <div className="space-y-3">
              <h1 className="neo-display max-w-3xl text-4xl sm:text-5xl">
                Leaderboard - See how you stack up against the community
              </h1>
              <p className="max-w-2xl text-sm font-bold leading-7 text-black sm:text-base">
                Track weekly momentum, compare all-time scores, and scan the
                most active learners without losing readability.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-4 border-black bg-white p-1.5 shadow-[6px_6px_0px_0px_#000]">
              {["weekly", "all-time"].map((value) => (
                <Button
                  key={value}
                  className={
                    period === value
                      ? "border-4 border-black bg-[#FFD93D] font-black uppercase text-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#FFD93D]"
                      : "border-4 border-transparent bg-transparent font-black uppercase text-black hover:border-black hover:bg-[#C4B5FD] hover:shadow-[4px_4px_0px_0px_#000]"
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
            <div className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Active players</p>
                <Users className="h-4 w-4 text-black" />
              </div>
              <p className="mt-4 text-3xl font-black uppercase tracking-tight text-black">
                {stats.activePlayers}
              </p>
              <p className="mt-2 text-sm font-bold text-black">
                Visible after your current filters.
              </p>
            </div>

            <div className="border-4 border-black bg-[#FFD93D] p-5 shadow-[6px_6px_0px_0px_#000]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Top score</p>
                <Trophy className="h-4 w-4 text-black" />
              </div>
              <p className="mt-4 text-3xl font-black uppercase tracking-tight text-black">
                {stats.topScore.toLocaleString()}
              </p>
              <p className="mt-2 text-sm font-bold text-black">
                Current best for the selected period.
              </p>
            </div>

            <div className="border-4 border-black bg-[#C4B5FD] p-5 shadow-[6px_6px_0px_0px_#000]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Challenges solved</p>
                <Search className="h-4 w-4 text-black" />
              </div>
              <p className="mt-4 text-3xl font-black uppercase tracking-tight text-black">
                {stats.totalCompleted.toLocaleString()}
              </p>
              <p className="mt-2 text-sm font-bold text-black">
                Total completions across the current view.
              </p>
            </div>

            <div className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-black">Best streak</p>
                <Flame className="h-4 w-4 text-black" />
              </div>
              <p className="mt-4 text-3xl font-black uppercase tracking-tight text-black">
                {stats.bestStreak} days
              </p>
              <p className="mt-2 text-sm font-bold text-black">
                Longest active run among visible users.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="neo-panel bg-[#FFD93D] p-4 sm:p-6">
        <div className="border-4 border-black bg-white p-4 shadow-[6px_6px_0px_0px_#000] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-black">
                Search & standings
              </p>
              <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                Find a learner and compare performance fast.
              </h2>
              <p className="max-w-2xl text-sm font-bold leading-6 text-black">
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
