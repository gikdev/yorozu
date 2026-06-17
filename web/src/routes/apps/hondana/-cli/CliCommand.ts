export interface ICliCommand<TResult> {
  title: string
  code: string
  description: string | null
  isItThisCommand: (input: string) => boolean
  parse: (
    rawInput: string,
  ) =>
    | { isSuccess: true; result: TResult }
    | { isSuccess: false; errorMsg: string }
}
