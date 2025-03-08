const generateItems = (e: any) => {
  console.log("worker data:", e.data);
  const data = e.data;
  return data
    .map((item) => [
      // 每筆資料的表格
      {
        margin: [0, 10, 0, 10],
        table: {
          headerRows: 2,
          widths: [50, "auto", 60, 70, "auto", 50, 50, "*"],
          body: [
            [
              {
                text: "型鋼型態",
                style: "tableHeader",
                alignment: "left",
                bold: true,
                colSpan: 8,
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {}, // 需要填充空值來配合 colSpan
            ],
            [
              {
                text: "項目",
                style: "tableHeader",
                alignment: "center",
              },
              {
                text: "斷面規格",
                style: "tableHeader",
                alignment: "center",
              },
              {
                text: "材質",
                style: "tableHeader",
                alignment: "center",
              },
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
              {
                text: "數量",
                style: "tableHeader",
                alignment: "center",
              },
              {
                text: "鑽孔數",
                style: "tableHeader",
                alignment: "center",
              },
              {
                text: "備註",
                style: "tableHeader",
                alignment: "center",
              },
            ],
            [
              item.id,
              item.spec,
              item.material,
              item.length,
              item.processLength,
              item.quantity,
              item.holes,
              item.notes,
            ],
          ],
        },
        // 使用 unbreakable 確保整個區塊不會被分頁
        unbreakable: true,
      },

      // 每筆資料的條碼資訊

      ...item.partList.map((part, partIndex) => ({
        columns: [
          {
            width: "10%",
            ...(item.partList.length > 1 && partIndex === 0
              ? {
                  qr: `${111}-${222}`,
                  fit: 50,
                  margin: [0, 10, 0, 0],
                }
              : {
                  text: "",
                  margin: [0, 10, 0, 0],
                }),
          },

          // 構件資訊
          {
            width: "15%",
            text: [{ text: "構件編號", bold: true }, "\n", part.assemblyNo],
            margin: [0, 10, 0, 0],
          },
          {
            width: "15%",
            text: [{ text: "零件編號", bold: true }, "\n", part.partNo],
            margin: [0, 10, 0, 0],
          },
          {
            width: "10%",
            text: [{ text: "長度", bold: true }, "\n", part.partLength],
            margin: [0, 10, 0, 0],
          },
          {
            width: "10%",
            text: [{ text: "數量", bold: true }, "\n", part.partQuantity],
            margin: [0, 10, 0, 0],
          },
          {
            width: "10%",
            text: [{ text: "標題一", bold: true }, "\n", part.title1],
            margin: [0, 10, 0, 0],
          },
          {
            width: "10%",
            text: [{ text: "標題二", bold: true }, "\n", part.title2],
            margin: [0, 10, 0, 0],
          },
          // 條碼
          {
            width: "20%",
            alignment: "center",
            stack: [
              {
                text: "條碼",
                alignment: "center",
                margin: [0, 10, 0, 0],
              },
              {
                image:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAMAAABEF7i9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJUExURf///wAAAAAAAH5RqV0AAAADdFJOU///ANfKDUEAAAAJcEhZcwAADsIAAA7CARUoSoAAAADPSURBVDhPbYtBCsRADMPa/396G0mEPcTQqZGV5y/v+7zz9nzfABqj5PtJs6xnmLFU15dA5ziaZT3DjKW6vgQ6x9Es6xlmLNX1JdA5jmZZzzBjqa4vgc5xNMt6hhlLdX0JdI6jWdYzzFiq60ugcxzNsp5hxlJdXwKd42iW9Qwzlur6EugcR7OsZ5ixVNeXQOc4mmU9w4ylur4EOsfRLOsZZizV9SXQOY5mWc8wY6muL4HOcTTLeoYZS3V9CXSOo1nWM8xYqutLoHMczbKW5/kBwdAB/979pvkAAAAASUVORK5CYII=", // Your base64 image, // 您的條碼圖片
                fit: [100, 100],
                margin: [0, 5, 0, 0],
              },
            ],
          },
        ],
        // 使用 unbreakable 確保整個區塊不會被分頁
        unbreakable: true,
      })),
    ])
    .flat();
};

self.onmessage = (data: any) => {
  const items = generateItems(data);
  self.postMessage(items);
};
