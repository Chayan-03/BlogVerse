import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const ExportToExcel = (data, fileName = "my_posts") => {
  const formattedData = data.map(post => ({
    Title: post.title,
    Content: post.content,
    Sentiment: post.sentiment,
    // Date: post.date || "", // Optional: if you have date
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Posts");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
};
