type ValidationProblem = {
  title?: string
  status?: number
  errors?: Record<string, string[]>
}

export function extractErrorMessage(error: any): string {
  // Axios-style server response
  const data: ValidationProblem | undefined = error?.response?.data

  if (data) {
    // 1) If there is an "errors" dictionary, format it nicely
    if (data.errors && typeof data.errors === "object") {
      const messages: string[] = []

      for (const key of Object.keys(data.errors)) {
        const arr = data.errors[key]
        if (Array.isArray(arr)) {
          for (const msg of arr) {
            messages.push(msg)
          }
        }
      }

      if (messages.length > 0) {
        return messages.join("\n") // or join(" | ") if you prefer a single line
      }
    }

    // 2) Fallback to common fields like title
    if (data.title) return data.title
  }

  // 3) Fallback to normal error.message (e.g., JS errors, Axios errors, etc.)
  if (error?.message) return error.message

  // 4) Final fallback
  return "An unexpected error occurred."
}
