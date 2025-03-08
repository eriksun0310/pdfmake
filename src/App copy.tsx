// import "./App.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useState } from "react";
import "../public/fonts/vfs_fonts";

// 註冊字體
pdfMake.vfs = pdfFonts.vfs;
// 註冊中文字體
pdfMake.fonts = {
  aaa: {
    normal: "NotoSansTC-VariableFont_wght.ttf",
    bold: "NotoSansTC-VariableFont_wght.ttf",
  },
};

function App() {
  const generateProcessingData = () => {
    const data = [];
    // Sample data based on the image
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
      items: [
        {
          id: "RH001",
          spec: "RH200X100X5.5X8",
          material: "SN490YB",
          length: "3000",
          processLength: "8684",
          quantity: "313",
          holes: "3",
          notes: "",
        },
      ],
      barcodeInfo: {
        location: "C7-12",
        serialNumber: "M1133",
        length: "155",
        quantity: "2",
      },
    };

    data.push(processingData);
    return data;
  };

  const [progress, setProgress] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadProcessingList = async () => {
    setProgress("正在生成 PDF 文件...");
    setIsDownloading(true);

    try {
      const data = generateProcessingData()[0];

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
          {
            columns: [
              {
                text: [{ text: "型鋼型態: ", bold: true }, null],
              },
            ],
          },
          {
            margin: [0, 10, 0, 10],
            table: {
              justifyContent: "center",
              headerRows: 1,

              // 讓表格寬度固定，以便置中
              widths: [50, "auto", 60, 70, "auto", 50, 50, "*"],
              body: [
                [
                  { text: "項目", style: "tableHeader", alignment: "center" },
                  {
                    text: "斷面規格",
                    style: "tableHeader",
                    alignment: "center",
                  },
                  { text: "材質", style: "tableHeader", alignment: "center" },
                  {
                    text: "總料長(mm)",
                    style: "tableHeader",
                    alignment: "center",
                  },
                  {
                    text: "加工長度(mm)",
                    style: "tableHeader",
                    alignment: "center",
                  },
                  { text: "數量", style: "tableHeader", alignment: "center" },
                  { text: "鑽孔數", style: "tableHeader", alignment: "center" },
                  { text: "備註", style: "tableHeader", alignment: "center" },
                ],
                ...data.items.map((item) => [
                  item.id,
                  item.spec,
                  item.material,
                  item.length,
                  item.processLength,
                  item.quantity,
                  item.holes,
                  item.notes,
                ]),
              ],
            },
          },
          {
            columns: [
              {
                width: "20%",
                qr: `${data.barcodeInfo.location}-${data.barcodeInfo.serialNumber}-${data.barcodeInfo.length}-${data.barcodeInfo.quantity}`,
                fit: 50,
                margin: [0, 10, 0, 0],
              },
              {
                width: "10%",
                text: [
                  { text: "儲位編號: ", bold: true },
                  data.barcodeInfo.location,
                ],
                margin: [0, 10, 0, 0],
              },
              {
                width: "10%",
                text: [
                  { text: "零件編號: ", bold: true },
                  data.barcodeInfo.serialNumber,
                ],
                margin: [0, 10, 0, 0],
              },
              {
                width: "10%",
                text: [
                  { text: "零件編號: ", bold: true },
                  data.barcodeInfo.serialNumber,
                ],
                margin: [0, 10, 0, 0],
              },
              {
                width: "10%",
                text: [
                  { text: "零件編號: ", bold: true },
                  data.barcodeInfo.serialNumber,
                ],
                margin: [0, 10, 0, 0],
              },
              {
                width: "10%",
                text: [
                  { text: "零件編號: ", bold: true },
                  data.barcodeInfo.serialNumber,
                ],
                margin: [0, 10, 0, 0],
              },
              {
                width: "30%",
                alignment: "center", // 整個容器置中對齊
                stack: [
                  {
                    text: "條碼", // Text below image
                    alignment: "center",

                    margin: [0, 10, 0, 0],
                  },
                  {
                    image:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAMAAABEF7i9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURf///wAAAAAAAH5RqV0AAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsIAAA7CARUoSoAAAADPSURBVDhPbYtBCsRADMPa/396G0mEPcTQqZGV5y/v+7zz9nzfABqj5PtJs6xnmLFU15dA5ziaZT3DjKW6vgQ6x9Es6xlmLNX1JdA5jmZZzzBjqa4vgc5xNMt6hhlLdX0JdI6jWdYzzFiq60ugcxzNsp5hxlJdXwKd42iW9Qwzlur6EugcR7OsZ5ixVNeXQOc4mmU9w4ylur4EOsfRLOsZZizV9SXQOY5mWc8wY6muL4HOcTTLeoYZS3V9CXSOo1nWM8xYqutLoHMczbKW5/kBwdAB/979pvkAAAAASUVORK5CYII=", // Your base64 image
                    fit: [100, 100],
                    margin: [0, 5, 0, 0],
                  },
                ],
              },
            ],
          },
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

      const pdfDoc = pdfMake.createPdf(docDefinition);
      console.log("pdfDoc", pdfDoc);
      pdfDoc.download("加工明細單.pdf");
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
      {progress > 0 && (
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
      )}

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
