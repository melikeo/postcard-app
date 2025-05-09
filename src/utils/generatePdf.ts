import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'

export async function generatePostcardPdf(element: HTMLElement) {
  const pdf = new jsPDF('landscape', 'mm', [148, 105]) // standard postcard format
  
  // front
  const frontCanvas = await html2canvas(element.querySelector('.front')!)
  pdf.addImage(frontCanvas, 'JPEG', 0, 0, 148, 105)

  // back
  pdf.addPage([148, 105], 'landscape')
  const backCanvas = await html2canvas(element.querySelector('.back')!)
  pdf.addImage(backCanvas, 'JPEG', 0, 0, 148, 105)

  pdf.save('postcard.pdf')
}