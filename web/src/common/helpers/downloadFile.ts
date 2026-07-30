export const downloadFile = (file: File) => {
  // Create a blob URL from the File object
  const url = URL.createObjectURL(file)

  // Create a temporary anchor element
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  document.body.appendChild(a)
  a.click()

  // Clean up
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
