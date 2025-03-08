// import "./App.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useState } from "react";
import "../public/fonts/vfs_fonts";

// // 註冊字體
// pdfMake.vfs = pdfFonts.vfs;
// // 註冊中文字體
// pdfMake.fonts = {
//   aaa: {
//     normal: "NotoSansTC-VariableFont_wght.ttf",
//     bold: "NotoSansTC-VariableFont_wght.ttf",
//   },
// };

function App() {
  const ccc = async (data: any) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(
        new URL("./worker/workerPdfmake.ts", import.meta.url),
        { type: "module" }
      );
      worker.postMessage(data);
      worker.onmessage = (e) => {
        const { blob, success, error } = e.data;

        if (!success) {
          reject(new Error(error));
          worker.terminate();
          return;
        }

        // 建立一個可下載的物件
        const pdfDoc = {
          download: (filename: string) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
          },
        };

        resolve(pdfDoc);
        worker.terminate();
      };
    });
  };

  const aaa = async (data: any) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(
        new URL("./worker/worker_test.ts", import.meta.url)
      );

      worker.postMessage(data);
      // worker.onmessage = (e) => {
      //   const items = e.data;
      //   const processingData = {
      //     projectNumber: "T333",
      //     projectName: "T333",
      //     printDate: new Date().toLocaleString("zh-TW", {
      //       year: "numeric",
      //       month: "2-digit",
      //       day: "2-digit",
      //       hour: "2-digit",
      //       minute: "2-digit",
      //       second: "2-digit",
      //       hour12: false,
      //     }),
      //     pageInfo: "1/1",
      //     totalHoles: "0孔",
      //     totalCutting: "0車",
      //     items,
      //   };
      //   worker.terminate();
      //   resolve(processingData);
      // };

      worker.onmessage = (e) => {
        resolve(e.data);
      };
      worker.onerror = (error) => {
        worker.terminate();
        reject(error);
      };

      // worker.postMessage({ length });
    });
  };

  const generateProcessingData = () => {
    const items = Array.from({ length: 1000 }, (_, i) => ({
      id: `RH${(i + 1).toString().padStart(3, "0")}`,
      spec: "RH200X100X5.5X8",
      material: "SN490YB",
      length: (3000 + (i + 1) * 10).toString(),
      processLength: (8684 + (i + 1) * 20).toString(),
      quantity: (313 + (i + 1)).toString(),
      holes: (3 + (i + 1)).toString(),
      notes: `備註 ${i + 1}`,

      partList: Array.from({ length: 2 + Math.floor(i / 10) }, (_, j) => ({
        assemblyNo: `C${7 + Math.floor(i / 10)}-${12 + (i % 10)}`,
        partNo: `M${1133 + i}`,
        partLength: (15500 + i).toString(),
        partQuantity: (2 + Math.floor(i / 10)).toString(),
        title1: `標題一 ${i + 1}`,
        title2: `標題二 ${i + 1}`,
      })),
    }));

    // 基本資料保持不變，只有 items 改變
    const processingData = {
      projectNumber: "T333",
      projectName: "T333",
      printDate: new Date().toLocaleString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
      pageInfo: "1/1",
      totalHoles: "0孔",
      totalCutting: "0車",
      items, // 使用產生的 100 筆資料
    };

    return processingData;
  };

  const [progress, setProgress] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadProcessingList = async () => {
    setProgress("正在生成 PDF 文件...");
    setIsDownloading(true);

    try {
      const data = generateProcessingData();
      console.log("data", data);

      const bbb = await Promise.all([
        aaa(data.items.slice(0, 200)),
        aaa(data.items.slice(201, 400)),
        aaa(data.items.slice(401, 600)),
        aaa(data.items.slice(601, 800)),
        aaa(data.items.slice(801, 1000)),
        aaa(data.items.slice(1001, 1200)),
        aaa(data.items.slice(1201, 1400)),
        aaa(data.items.slice(1401, 1600)),
        aaa(data.items.slice(1601, 1800)),
        aaa(data.items.slice(1801, 2000)),
      ]);
      const docDefinition = {
        pageSize: "A4",
        pageMargins: [20, 20, 20, 20],

        content: [
          {
            columns: [
              {
                width: 20,
                image:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKJSURBVHgBvVZBbtpAFH02Ro1KpHCDOjcggKqSqqo5QekJak4QKrZIwLqVQk8AnID0BJBFS7sBC7GPI9aoVCoREuDpmwCtMcQYUvVJA2Y8897/f/78j4IAKBaLuqIoVY4an+vYA4rfyzaO9BQm9lLgZjltc7SEEJ/K5bKFQwW+4riiwDlJ4S7rEXDD4nzFcZxritnbeFRsWB3VvyHSVSAusBsxelKT4qVSqUpDDO8CbZ382BCYNvgYxf4wKWRSyOZ3aeWV6iIvAaKpHEbuhr7yKp/PNzQZEmBaJbmxZbHtQzSCjzGDwQD9fj9DD6ZN/ja8C3jAOR5w2UXWcr/XNC1GK+W+2vL9H5AYlmVhNptBaSMi1qmFLeCY55hce0VlNkljSPyGArlCoXDremeOx+OLXq8XGw6Hfw3dFICZwrjuIY6S9JKx/Sw94eGNsAXxeFwedNU9pyIYZKzl5gbHD2ZKU4oG2RhUwHsGRjgcPgmyUdu1gCE0nfJH6yXGaWm1qqqvGarMdDr9iQDYKUAU6abexlMb5Q+tGdT6K/zKIiCChohQdA5T42WUidHB0bMgu/YQOAw7BVg6ruB/ox8n8ALj98A8jQPx/0PEa537jsg77IlkMilLSNE7v61UrIRGbDpXMi01zGwgtNbRnmCuxzG5XZLneDcuNziEsB8M0aIvLNJSINR9aF0ikahuIydabDppTdBKBUoGPvBrQiSXofHOlTqdzn2pV89x9xYInzqAvJ02HgESj2i1sSK/F5AfKYxs1poay/RpCHMDiyayL7lF8rNut7vWRzbO4DkbDYWyK6/o/M7/PiSv0OozdjEbh+ALIjFmW5XjRmaduxbxkDP4l6CYSYFm0GL3G9yRHDBxPr6+AAAAAElFTkSuQmCC",
                fit: [15, 15],
                margin: [0, 10, 0, 0],
              },
              {
                text: "加工明細單",
                fontSize: 15,
                bold: true,
                margin: [0, 5, 0, 0],
              },
            ],
          },
          {
            columns: [
              {
                text: "加工明細單",
                alignment: "center",
                fontSize: 20,
                bold: true,
                margin: [0, 10, 0, 0],
              },
            ],
          },
          {
            columns: [
              {
                text: `列印日期: ${data.printDate}`,
                alignment: "right",
                fontSize: 10,
                margin: [0, 15, 0, 0],
              },
            ],
          },
          {
            margin: [0, 20, 0, 10],
            columns: [
              {
                width: "50%",
                text: [
                  { text: "工程案號: ", bold: true },
                  data.projectNumber,
                  "\n",
                  { text: "工程名稱: ", bold: true },
                  data.projectName,
                  "\n",
                ],
              },
              {
                width: "50%",
                text: [
                  { text: "頁數: ", alignment: "right", bold: true },
                  data.pageInfo,
                  "\n",
                  { text: "總孔數: ", alignment: "right", bold: true },
                  data.totalHoles,
                  "\n",
                  { text: "總切割數: ", alignment: "right", bold: true },
                  data.totalCutting,
                ],
                margin: [0, 20, 0, 0],
              },
            ],
          },
          {
            columns: [
              {
                text: [{ text: "內容型態: ", bold: true }, null],
              },
            ],
          },

          ...bbb,
          // ...data.items
          //   .map((item) => [
          //     {
          //       columns: [
          //         {
          //           text: [{ text: "型鋼型態: ", bold: true }, null],
          //         },
          //       ],
          //     },
          //     // 每筆資料的表格
          //     {
          //       margin: [0, 10, 0, 10],
          //       table: {
          //         headerRows: 1,
          //         widths: [50, "auto", 60, 70, "auto", 50, 50, "*"],
          //         body: [
          //           [
          //             {
          //               text: "項目",
          //               style: "tableHeader",
          //               alignment: "center",
          //             },
          //             {
          //               text: "斷面規格",
          //               style: "tableHeader",
          //               alignment: "center",
          //             },
          //             {
          //               text: "材質",
          //               style: "tableHeader",
          //               alignment: "center",
          //             },
          //             {
          //               text: "總料長(mm)",
          //               style: "tableHeader",
          //               alignment: "center",
          //             },
          //             {
          //               text: "加工長度(mm)",
          //               style: "tableHeader",
          //               alignment: "center",
          //             },
          //             {
          //               text: "數量",
          //               style: "tableHeader",
          //               alignment: "center",
          //             },
          //             {
          //               text: "鑽孔數",
          //               style: "tableHeader",
          //               alignment: "center",
          //             },
          //             {
          //               text: "備註",
          //               style: "tableHeader",
          //               alignment: "center",
          //             },
          //           ],
          //           [
          //             item.id,
          //             item.spec,
          //             item.material,
          //             item.length,
          //             item.processLength,
          //             item.quantity,
          //             item.holes,
          //             item.notes,
          //           ],
          //         ],
          //       },
          //       // 使用 unbreakable 確保整個區塊不會被分頁
          //       unbreakable: true,
          //     },

          //     // 每筆資料的條碼資訊

          //     ...item.partList.map((part, partIndex) => ({
          //       columns: [
          //         {
          //           width: "10%",
          //           ...(item.partList.length > 1 && partIndex === 0
          //             ? {
          //                 qr: `${111}-${222}`,
          //                 fit: 50,
          //                 margin: [0, 10, 0, 0],
          //               }
          //             : {
          //                 text: "",
          //                 margin: [0, 10, 0, 0],
          //               }),
          //         },

          //         // 構件資訊
          //         {
          //           width: "15%",
          //           text: [
          //             { text: "構件編號", bold: true },
          //             "\n",
          //             part.assemblyNo,
          //           ],
          //           margin: [0, 10, 0, 0],
          //         },
          //         {
          //           width: "15%",
          //           text: [{ text: "零件編號", bold: true }, "\n", part.partNo],
          //           margin: [0, 10, 0, 0],
          //         },
          //         {
          //           width: "10%",
          //           text: [{ text: "長度", bold: true }, "\n", part.partLength],
          //           margin: [0, 10, 0, 0],
          //         },
          //         {
          //           width: "10%",
          //           text: [
          //             { text: "數量", bold: true },
          //             "\n",
          //             part.partQuantity,
          //           ],
          //           margin: [0, 10, 0, 0],
          //         },
          //         {
          //           width: "10%",
          //           text: [{ text: "標題一", bold: true }, "\n", part.title1],
          //           margin: [0, 10, 0, 0],
          //         },
          //         {
          //           width: "10%",
          //           text: [{ text: "標題二", bold: true }, "\n", part.title2],
          //           margin: [0, 10, 0, 0],
          //         },
          //         // 條碼
          //         {
          //           width: "20%",
          //           alignment: "center",
          //           stack: [
          //             {
          //               text: "條碼",
          //               alignment: "center",
          //               margin: [0, 10, 0, 0],
          //             },
          //             {
          //               image:
          //                 "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAMAAABEF7i9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURf///wAAAAAAAH5RqV0AAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsIAAA7CARUoSoAAAADPSURBVDhPbYtBCsRADMPa/396G0mEPcTQqZGV5y/v+7zz9nzfABqj5PtJs6xnmLFU15dA5ziaZT3DjKW6vgQ6x9Es6xlmLNX1JdA5jmZZzzBjqa4vgc5xNMt6hhlLdX0JdI6jWdYzzFiq60ugcxzNsp5hxlJdXwKd42iW9Qwzlur6EugcR7OsZ5ixVNeXQOc4mmU9w4ylur4EOsfRLOsZZizV9SXQOY5mWc8wY6muL4HOcTTLeoYZS3V9CXSOo1nWM8xYqutLoHMczbKW5/kBwdAB/979pvkAAAAASUVORK5CYII=", // Your base64 image, // 您的條碼圖片
          //               fit: [100, 100],
          //               margin: [0, 5, 0, 0],
          //             },
          //           ],
          //         },
          //       ],
          //       // 使用 unbreakable 確保整個區塊不會被分頁
          //       unbreakable: true,
          //     })),
          //   ])
          //   .flat(),
        ],
        styles: {
          tableHeader: {
            bold: true,
            fontSize: 12,
            alignment: "center",
            fillColor: "#f2f2f2",
          },
        },
        defaultStyle: {
          font: "aaa",
        },
      };

      const pdfDoc = (await ccc(docDefinition)) as { download: (filename: string) => void };
      console.log(pdfDoc);
      await pdfDoc.download("加工明細單.pdf");
      setProgress("PDF 下載完成！");
    } catch (error) {
      setProgress("生成 PDF 時發生錯誤");
      console.error("錯誤:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div>
        <button
          onClick={async () => {
            downloadProcessingList();
          }}
          disabled={isDownloading}
        >
          {isDownloading ? "下載中..." : "下載 PDF"}
        </button>
        {/* <button onClick={showPDF} disabled={isDownloading}>
          show pdf
        </button> */}
      </div>
      <div
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{progress}</span>
      </div>

      {/* <iframe
        id="pdfPreview"
        style={{
          width: "100%",
          height: "800px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginTop: "10px",
        }}
      /> */}
    </div>
  );
}

export default App;
