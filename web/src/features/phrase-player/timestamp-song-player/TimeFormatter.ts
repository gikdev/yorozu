export class TimeFormatter {
  /**
   * Formats seconds into "MM:SS.t"
   * @param seconds - total seconds (e.g., 161.750204)
   * @param round - if true, rounds to nearest tenth; if false (default), truncates
   * @returns formatted string like "02:41.7" or "02:41.8"
   */
  static formatSeconds(seconds: number, round: boolean = false): string {
    // Apply rounding first if requested
    if (round) {
      seconds = Math.round(seconds * 10) / 10
    }

    // Truncate to 1 decimal (safe integer arithmetic)
    const totalTenths = Math.floor(seconds * 10)
    const totalSeconds = Math.floor(totalTenths / 10)
    const minutes = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    const tenths = totalTenths % 10

    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${tenths}`
  }
}
