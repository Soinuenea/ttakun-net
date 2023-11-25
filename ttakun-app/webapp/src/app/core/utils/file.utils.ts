import * as FileSaver from 'file-saver';

export const toBlob = (data: ArrayBuffer) => new Blob([new Uint8Array(data)]);

export const downloadFile = (file: Blob | string, fileName: string) => FileSaver.saveAs(file, fileName);
