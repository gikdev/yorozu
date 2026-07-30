import type { Piece } from './pieces'

export interface Line {
  pieces: Piece[]
  startTime: number
}

export interface CurrentPosition {
  currentLine: Line | null
  currentWordIndex: number
}

export class SongTimeline {
  /**
   * Sorts pieces by timestamp (ascending, nulls last) and groups them
   * into lines. A new line starts when a piece has `isFirstWord === true`.
   * Pieces without a timestamp are ignored.
   */
  static buildLines(pieces: Piece[]): Line[] {
    const sorted = [...pieces].sort((a, b) => {
      if (a.timestamp === null && b.timestamp === null) return 0
      if (a.timestamp === null) return 1
      if (b.timestamp === null) return -1
      return a.timestamp - b.timestamp
    })

    const lines: Line[] = []
    let currentLinePieces: Piece[] = []

    for (const piece of sorted) {
      if (piece.timestamp === null) continue // skip pieces without timestamp

      if (piece.isFirstWord && currentLinePieces.length > 0) {
        lines.push({
          pieces: currentLinePieces,
          startTime: currentLinePieces[0].timestamp as number,
        })
        currentLinePieces = []
      }
      currentLinePieces.push(piece)
    }

    if (currentLinePieces.length > 0) {
      lines.push({
        pieces: currentLinePieces,
        startTime: currentLinePieces[0].timestamp as number,
      })
    }

    return lines
  }

  /**
   * Given an ordered list of lines (from buildLines) and the current playback time,
   * returns the active line and the index of the last word that should be visible.
   */
  static getCurrentPosition(
    lines: Line[],
    currentTime: number,
  ): CurrentPosition {
    if (lines.length === 0) {
      return { currentLine: null, currentWordIndex: -1 }
    }

    // Find the line whose time window contains currentTime
    let activeLineIdx = -1
    for (let i = 0; i < lines.length; i++) {
      const lineStart = lines[i].startTime
      const nextLineStart =
        i < lines.length - 1 ? lines[i + 1].startTime : Infinity
      if (currentTime >= lineStart && currentTime < nextLineStart) {
        activeLineIdx = i
        break
      }
    }

    // Before the first line or after the last line
    if (activeLineIdx === -1) {
      // If we're past the last line, we could still show the last line fully,
      // but current implementation hides all. You can adjust here.
      return { currentLine: null, currentWordIndex: -1 }
    }

    const activeLine = lines[activeLineIdx]
    const words = activeLine.pieces
    let wordIdx = -1
    for (let j = 0; j < words.length; j++) {
      if ((words[j].timestamp as number) <= currentTime) {
        wordIdx = j
      } else {
        break
      }
    }

    return {
      currentLine: activeLine,
      currentWordIndex: wordIdx,
    }
  }
}
