import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import "../../public/fonts/vfs_fonts";

// 註冊字體
pdfMake.vfs = pdfFonts.vfs;
// 註冊中文字體
pdfMake.fonts = {
  aaa: {
    normal: "NotoSansTC-VariableFont_wght.ttf",
    bold: "NotoSansTC-VariableFont_wght.ttf",
  },
};

self.onmessage = (e: any) => {
  const items = pdfMake.createPdf(e.data);

  items.getBlob((blob: Blob) => {
    self.postMessage({ blob, success: true });
  });
};
