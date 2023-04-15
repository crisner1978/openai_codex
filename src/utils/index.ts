export function generateUniqueId() {
  const timestamp = Date.now()
  const randomNumber = Math.random()
  const hexadecimalString = randomNumber.toString(16)

  return `id-${timestamp}-${hexadecimalString}`
}



let loadInterval: string | number | NodeJS.Timer | undefined

export function loader(element: HTMLElement | null) {
  element!.textContent = ''
  loadInterval = setInterval(() => {
    element!.textContent += '.'

    if (element!.textContent!.length > 3) {
      element!.textContent = ''
    }
  }, 300)
}


