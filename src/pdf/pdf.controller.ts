import { Controller, Get, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get()
  getPdfDoc(@Res() response: Response) {
    const pdfDoc = this.pdfService.createPdfdoc();
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
