import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { Badge } from '../../../components/ui/badge'

export function LeaderboardTable({ entries }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/45">
      <Table>
        <TableHeader className="bg-white/[0.04]">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="px-4 py-4 text-xs font-medium uppercase tracking-[0.24em] text-white/45">Rank</TableHead>
            <TableHead className="px-4 py-4 text-xs font-medium uppercase tracking-[0.24em] text-white/45">User</TableHead>
            <TableHead className="px-4 py-4 text-xs font-medium uppercase tracking-[0.24em] text-white/45">Points</TableHead>
            <TableHead className="px-4 py-4 text-xs font-medium uppercase tracking-[0.24em] text-white/45">Completed challenges</TableHead>
            <TableHead className="px-4 py-4 text-xs font-medium uppercase tracking-[0.24em] text-white/45">Streak</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow
              key={entry.rank}
              className="border-white/10 text-white/72 transition hover:bg-white/[0.03]"
            >
              <TableCell className="px-4 py-4">
                <Badge
                  className={
                    entry.rank <= 3
                      ? 'border-amber-300/30 bg-amber-300/15 text-amber-100'
                      : 'border-white/10 bg-white/[0.05] text-white/72'
                  }
                  variant="outline"
                >
                  #{entry.rank}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-4 font-medium text-white">{entry.user}</TableCell>
              <TableCell className="px-4 py-4 font-medium text-white/88">{entry.points.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-4 text-white/68">{entry.completed}</TableCell>
              <TableCell className="px-4 py-4 text-white/68">{entry.streak} days</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
