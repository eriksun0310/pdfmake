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
  // 生成大量資料的輔助函數
  // const generateLargeData = () => {
  //   const data = [];
  //   const names = ["張三", "李四", "王五", "陳六", "林七", "吳八", "趙九"];
  //   const ages = ["25", "30", "28", "35", "27", "32", "29"];
  //   const cities = ["台北", "台中", "高雄", "新竹", "彰化", "嘉義", "台南"];
  //   const qrcode =
  //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURf///wAAAAAAAH5RqV0AAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsIAAA7CARUoSoAAAADxSURBVEhLtY0BDoJAEAPx/5+W3aG2BxyIiU3wutNJXB7mNQQCPd8y93b9kvR0K+fk3i5DDk193I6Epj5uc3K1HcnVZgJ1z+1IoO65ea0kdSfifXRszO0M1F/mub3PNq3ZwGU2dc0GhsDZ1GVWO5L6zZ7bSCoQWi5iasT3nc3KR5KTxn3xfm/7c8ar8qut1/+o29xUb8vDbQ7dh0VrXTOzwjqzuRV7ND4WWObe5q2kiaFX23NbTIQrOS+GrtFJzouhS52mlZcmQ46bVl6aDDvZtXurL43s2r017OwX0tOH9dGRqYX0tGNENt07/an9ryzLG7IgA4EaD5FkAAAAAElFTkSuQmCC";
  //   const barcode =
  //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAMAAABEF7i9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURf///wAAAAAAAH5RqV0AAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsIAAA7CARUoSoAAAADPSURBVDhPbYtBCsRADMPa/396G0mEPcTQqZGV5y/v+7zz9nzfABqj5PtJs6xnmLFU15dA5ziaZT3DjKW6vgQ6x9Es6xlmLNX1JdA5jmZZzzBjqa4vgc5xNMt6hhlLdX0JdI6jWdYzzFiq60ugcxzNsp5hxlJdXwKd42iW9Qwzlur6EugcR7OsZ5ixVNeXQOc4mmU9w4ylur4EOsfRLOsZZizV9SXQOY5mWc8wY6muL4HOcTTLeoYZS3V9CXSOo1nWM8xYqutLoHMczbKW5/kBwdAB/979pvkAAAAASUVORK5CYII=";

  //   const totalRecords = 100 * 40;

  //   // 生成 7000 頁的資料，每頁約 10 筆資料
  //   for (let i = 0; i < totalRecords; i++) {
  //     const randomIndex = i % 7; // 使用模除運算循環使用範例資料
  //     data.push([
  //       names[randomIndex],
  //       ages[randomIndex],
  //       cities[randomIndex],
  //       { image: qrcode, width: 45, height: 45 }, // 第一個條碼
  //       { image: barcode, width: 80, height: 15 }, // 第二個條碼
  //     ]);
  //   }
  //   return data;
  // };

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

  // 停止計時器
  // const stopTimer = () => {
  //   if (timerInterval) {
  //     clearInterval(timerInterval);
  //     setTimerInterval(null);
  //   }
  // };

  const downloadProcessingList = async () => {
    setProgress("正在生成 PDF 文件...");
    setIsDownloading(true);

    try {
      const data = generateProcessingData()[0];

      const docDefinition = {
        pageSize: "A4",
        pageMargins: [40, 40, 40, 40],
        content: [
          {
            columns: [
              {
                width: 50,
                text: "LOGO", // 暫時使用文字代替圖片
                alignment: "center",
                margin: [0, 10, 0, 0],
              },
              {
                text: "加工明細單",
                alignment: "center",
                fontSize: 20,
                bold: true,
                margin: [0, 10, 0, 0],
              },
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
            margin: [0, 10, 0, 10],
            table: {
              headerRows: 1,
              widths: [
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
                "auto",
              ],
              body: [
                [
                  { text: "項目", style: "tableHeader" },
                  { text: "斷面規格", style: "tableHeader" },
                  { text: "材質", style: "tableHeader" },
                  { text: "總料長(mm)", style: "tableHeader" },
                  { text: "加工長度(mm)", style: "tableHeader" },
                  { text: "數量", style: "tableHeader" },
                  { text: "鑽孔數", style: "tableHeader" },
                  { text: "備註", style: "tableHeader" },
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
                width: "10%",
                text: [
                  { text: "零件編號: ", bold: true },
                  data.barcodeInfo.serialNumber,
                ],
                margin: [0, 10, 0, 0],
              },
              {
                width: "20%",
                image:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAMAAABEF7i9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURf///wAAAAAAAH5RqV0AAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsIAAA7CARUoSoAAAADPSURBVDhPbYtBCsRADMPa/396G0mEPcTQqZGV5y/v+7zz9nzfABqj5PtJs6xnmLFU15dA5ziaZT3DjKW6vgQ6x9Es6xlmLNX1JdA5jmZZzzBjqa4vgc5xNMt6hhlLdX0JdI6jWdYzzFiq60ugcxzNsp5hxlJdXwKd42iW9Qwzlur6EugcR7OsZ5ixVNeXQOc4mmU9w4ylur4EOsfRLOsZZizV9SXQOY5mWc8wY6muL4HOcTTLeoYZS3V9CXSOo1nWM8xYqutLoHMczbKW5/kBwdAB/979pvkAAAAASUVORK5CYII=",
                fit: 50,
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
