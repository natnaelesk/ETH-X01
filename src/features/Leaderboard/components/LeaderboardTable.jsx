import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table'
import { Badge } from '../../../components/ui/badge'

export function LeaderboardTable({ entries }) {
  return (
    <div className="overflow-hidden border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000]">
      <Table>
        <TableHeader className="bg-[#FFD93D]">
          <TableRow className="border-b-4 border-black hover:bg-transparent">
            <TableHead className="px-4 py-4 text-xs font-black uppercase tracking-[0.24em] text-black">Rank</TableHead>
            <TableHead className="px-4 py-4 text-xs font-black uppercase tracking-[0.24em] text-black">User</TableHead>
            <TableHead className="px-4 py-4 text-xs font-black uppercase tracking-[0.24em] text-black">Points</TableHead>
            <TableHead className="px-4 py-4 text-xs font-black uppercase tracking-[0.24em] text-black">Completed challenges</TableHead>
            <TableHead className="px-4 py-4 text-xs font-black uppercase tracking-[0.24em] text-black">Streak</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow
              key={entry.rank}
              className="border-b-4 border-black text-black transition hover:bg-[#FFFDF5]"
            >
              <TableCell className="px-4 py-4">
                <Badge
                  className={
                    entry.rank <= 3
                      ? 'rounded-full border-4 border-black bg-[#FF6B6B] text-black shadow-[4px_4px_0px_0px_#000]'
                      : 'rounded-full border-4 border-black bg-white text-black shadow-[4px_4px_0px_0px_#000]'
                  }
                  variant="outline"
                >
                  #{entry.rank}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-4 font-black uppercase text-black">{entry.user}</TableCell>
              <TableCell className="px-4 py-4 font-black uppercase text-black">{entry.points.toLocaleString()}</TableCell>
              <TableCell className="px-4 py-4 font-bold text-black">{entry.completed}</TableCell>
              <TableCell className="px-4 py-4 font-bold text-black">{entry.streak} days</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
