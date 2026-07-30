import { Piece } from './Piece'

export class Pieces {
  static fromRawText(rawText: string): Piece[] {
    const finalPieces: Piece[] = []

    const lines = rawText
      .split('\n')
      .map(l => l.trim())
      .filter(l => !!l)

    for (const line of lines) {
      const words = line.split(';').filter(w => !!w)

      for (let i = 0; i < words.length; i++) {
        const word = words[i]
        // i === 0 => first word of the line
        const newPiece = Piece.create(word, i === 0)
        finalPieces.push(newPiece)
      }
    }

    return finalPieces
  }
}
