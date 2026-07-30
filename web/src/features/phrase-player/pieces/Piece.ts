import { v4 } from 'uuid'

export class Piece {
  readonly id: string
  readonly text: string
  readonly timestamp: number | null
  readonly isFirstWord: boolean

  constructor(data: {
    id?: string
    text: string
    isFirstWord?: boolean
    timestamp?: number | null
  }) {
    this.id = data.id ?? v4()
    this.text = data.text
    this.isFirstWord = data.isFirstWord ?? false
    this.timestamp = data.timestamp ?? null
  }

  static create = (
    text: string,
    isFirstWord: boolean = false,
    timestamp: number | null = null,
  ): Piece => new Piece({ text, isFirstWord, timestamp })

  static setTimestamp = (piece: Piece, timestamp: number): Piece =>
    new Piece({
      id: piece.id,
      text: piece.text,
      isFirstWord: piece.isFirstWord,
      timestamp,
    })

  static removeTimestamp = (piece: Piece): Piece =>
    new Piece({
      id: piece.id,
      text: piece.text,
      isFirstWord: piece.isFirstWord,
      timestamp: null,
    })
}
