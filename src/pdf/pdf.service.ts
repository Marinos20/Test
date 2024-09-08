import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class PdfService {
  createPdfdoc(): PDFKit.PDFDocument {
    //logique de generation de pfg
    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf',
      },
    };
    const printer = new PdfPrinter(fonts);

    const docDefinition = {
      content: [
        { text: 'Spécial spectacle', style: 'header' },
        'Le concert legendaire qui fera parler de lui partout',
        {
          text: 'Information sur le deroulement',
          style: 'subheader',
        },
        'Si bas vous aviez les information ',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Date debut', 'Date Fin', ''],
              ['One value goes here', 'Another one here', 'OK?'],
            ],
          },
        },
        { text: 'A simple table with nested elements', style: 'subheader' },
        'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              [
                {
                  stack: [
                    "Let's try an unordered list",
                    {
                      ul: ['item 1', 'item 2'],
                    },
                  ],
                },
                [
                  'or a nested table',
                  {
                    table: {
                      body: [
                        ['Col1', 'Col2', 'Col3'],
                        ['1', '2', '3'],
                        ['1', '2', '3'],
                      ],
                    },
                  },
                ],
                {
                  text: [
                    'Inlines can be ',
                    { text: 'styled\n', italics: true },
                    { text: 'easily as everywhere else', fontSize: 10 },
                  ],
                },
              ],
            ],
          },
        },
        { text: 'Defining column widths', style: 'subheader' },
        'Tables support the same width definitions as standard columns:',
        {
          bold: true,
          ul: ['auto', 'star', 'fixed value'],
        },
      ],
    } as TDocumentDefinitions;

    const options = {
      // ...
    };

    return printer.createPdfKitDocument(docDefinition, options);
  }
}
