import { surpriseMePrompts } from '../constants'
import FileSaver from 'file-saver'

export function GetRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
  const randomPrompt = surpriseMePrompts[randomIndex]

  if (prompt === randomPrompt) {
    return GetRandomPrompt(prompt)
  }

  return randomPrompt
}

export async function downloadImage(image, id) {
  FileSaver.saveAs(image, `${id}.jpg`)
}
