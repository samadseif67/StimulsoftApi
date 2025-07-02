using DocumentFormat.OpenXml.Spreadsheet;
using SpreadsheetLight;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DocumentFormat.OpenXml;
using System.Reflection;
using System.Collections;
using static ContractsControl.Classes.Utility;

namespace ContractsControl.Classes
{
    public class ReportExcell
    {

        SLDocument sl = new SLDocument();
        public void CreateCells(int row, int col, string data, string cell1, string cell2, bool bold, System.Drawing.Color Fontcolor,
                 double colWidth, double rowHeight, VerticalAlignmentValues xlvAlign, HorizontalAlignmentValues xlhAlign, bool wrapText, string fName, int fSize, string Formol, System.Drawing.Color BackgroundColor, BorderStyleValues BorderStyleLeft,
            BorderStyleValues BorderStyleRight, BorderStyleValues BorderStyleTop, BorderStyleValues BorderStyleBottom, string format)
        {
            //sl.CreateFont();
            SLStyle style = sl.CreateStyle();

            if (Formol != "")
            {
                sl.SetCellValue(row, col, data);
                style.FormatCode = format;
            }
            else if (format != "")
            {
                sl.SetCellValueNumeric(row, col, data);
                style.FormatCode = format;
            }
            else
                sl.SetCellValue(row, col, data);


            sl.MergeWorksheetCells(cell1, cell2);
            sl.SetColumnWidth(cell1, cell2, colWidth);

            if (rowHeight != 0)
                sl.SetRowHeight(row, col, rowHeight);

            style.Alignment.ReadingOrder = SLAlignmentReadingOrderValues.RightToLeft;
            style.Border.LeftBorder.BorderStyle = BorderStyleLeft;
            style.Border.RightBorder.BorderStyle = BorderStyleRight;
            style.Border.TopBorder.BorderStyle = BorderStyleTop;
            style.Border.BottomBorder.BorderStyle = BorderStyleBottom;
            style.SetVerticalAlignment(xlvAlign);
            style.SetHorizontalAlignment(xlhAlign);
            style.Fill.SetPattern(PatternValues.Solid, BackgroundColor, BackgroundColor);//رنگ زمینه

            style.Font.FontSize = fSize;
            style.Font.FontColor = Fontcolor;
            style.Font.Bold = bold;

            style.SetWrapText(wrapText);

            style.Font.FontName = fName;

            sl.SetCellStyle(cell1, cell2, style);
        }


        public void SetRowHeight(int row, double rowHeight)
        {
            sl.SetRowHeight(row, rowHeight);
        }


        public void SetColumnWidth(string cell, double colWidth)
        {
            sl.SetColumnWidth(cell, colWidth);
        }


        //براي نمايش ندادن بعضي ستون ها
        public void HideColumn(int col)
        {
            sl.HideColumn(col);
        }


        //براي نمايش ندادن بعضي سطرها
        public void HideRow(int row)
        {
            sl.HideRow(row);
        }


        public void HideColWithCondition(int row, int col)
        {
            bool tt = sl.HasCellValue(row, col, true);
            int aa = sl.GetCellValueAsInt32(row, col);
            if (sl.GetCellValueAsInt32(row, col) == 0)
                sl.HideColumn(col);
        }

        public int GetCellValue(int row, int col)
        {
            return sl.GetCellValueAsInt32(row, col);
        }


        public byte[] SaveAs(string url = "")
        {
            sl.SetRightToLeft(true);
            sl.SaveAs(url);
            Console.WriteLine("End of program");
            string filepath = (url);
            byte[] filedata = System.IO.File.ReadAllBytes(filepath);
            return filedata;
        }


        public static class Program
        {
            public const string fNameTitles = "B Titr";
            public const int fSizeTitles = 13;
            public const string fNameHeaders = "B Titr";
            public const int fSizeHeaders = 10;
            public const string fNameTables = "v_Mitra";
            public const int fSizeTables = 10;
            public const string fNameNumbers = "B Traffic";
            public const int fSizeNumbers = 12;
        }

        private class KeepHeaderGroupMain
        {
            public int ID { get; set; }
            public int Row { get; set; }
            public int Clumn { get; set; }
            public string NameRow { get; set; }
            public string NameClumn { get; set; }
            public string NameHeader { get; set; }

        }

        private ReportExcell ResultHeaderFloorTwo(System.Drawing.Color BackGroundColor, List<HeaderFloorTwo> LHeaderFloorTwo, int Row = 0, int Clumns = 0, int StartNumberCell = 0, string BMitra = "", int SizeBMitra = 0)
        {
            ReportExcell ExportExcelForWebSite2 = new ReportExcell();

            List<KeepHeaderGroupMain> HeaderGroup = new List<KeepHeaderGroupMain>();
            int RowBelowOne = Row - 2;//هدر بالا
            int RowBelowTwo = Row - 1;//هدر یکی مانده به بالا
            int ClumnsBelowOne = Clumns;
            int FloorTwoID = 0;

            int Count = LHeaderFloorTwo.Count();
            int Counter = 0;
            foreach (var item in LHeaderFloorTwo)
            {
                Counter += 1;

                string VFloorOneTilte = item.FloorOneTilte;
                string VFloorTWoTilte = item.FloorTwoTilte;
                int FloorOneID = item.FloorOneID;


                FloorTwoID = item.FloorTwoID;

                if (FloorOneID < 1)
                {
                    string Char = GetCell(StartNumberCell);

                    string CellRow = Char + Convert.ToString(RowBelowOne);
                    string CellClumns = Char + Convert.ToString(RowBelowOne + 1);


                    ExportExcelForWebSite2.CreateCells(RowBelowOne, ClumnsBelowOne, VFloorOneTilte, CellRow, CellClumns, true, System.Drawing.Color.Black, 22, 25, VerticalAlignmentValues.Center, HorizontalAlignmentValues.Center, false, BMitra, SizeBMitra, "", BackGroundColor, BorderStyleValues.Thin, BorderStyleValues.Thin, BorderStyleValues.Thin, BorderStyleValues.Thin, "");


                }
                if (FloorOneID > 0)
                {

                    string Char = GetCell(StartNumberCell);
                    string CellRow = Char + Convert.ToString(RowBelowTwo);
                    string CellClumns = Char + Convert.ToString(RowBelowTwo);


                    var QueryFind = HeaderGroup.FirstOrDefault(x => x.ID == FloorTwoID);
                    if (QueryFind == null)
                    {
                        HeaderGroup.Add(new KeepHeaderGroupMain()
                        {
                            ID = FloorTwoID,
                            Row = (RowBelowTwo - 1),
                            Clumn = ClumnsBelowOne,
                            NameRow = Char + Convert.ToString(RowBelowTwo - 1),
                            NameClumn = "",
                            NameHeader = VFloorTWoTilte,
                        });
                    }

                    if (QueryFind == null)
                    {
                        var QueryFindTwo = HeaderGroup.FirstOrDefault(x => x.ID != FloorTwoID && x.NameClumn.Trim().Length == 0);
                        if (QueryFindTwo != null)
                        {
                            Char = GetCell(StartNumberCell - 1);
                            string NameClumn = Char + Convert.ToString((RowBelowTwo - 1));
                            QueryFindTwo.NameClumn = NameClumn;
                        }

                    }

                    if (Counter == Count)
                    {
                        var QueryFindLast = HeaderGroup.FirstOrDefault(x => x.ID == FloorTwoID && x.NameClumn.Trim().Length == 0);
                        if (QueryFindLast != null)
                        {

                            Char = GetCell(StartNumberCell);
                            string NameClumn = Char + Convert.ToString((RowBelowTwo - 1));
                            QueryFindLast.NameClumn = NameClumn;
                        }

                    }



                    ExportExcelForWebSite2.CreateCells(RowBelowTwo, ClumnsBelowOne, VFloorOneTilte, CellRow, CellClumns, true, System.Drawing.Color.Black, 22, 25, VerticalAlignmentValues.Center, HorizontalAlignmentValues.Center, false, BMitra, SizeBMitra, "", BackGroundColor, BorderStyleValues.Thin, BorderStyleValues.Thin, BorderStyleValues.Thin, BorderStyleValues.Thin, "");



                }





                StartNumberCell += 1;
                ClumnsBelowOne += 1;


            }



            if (HeaderGroup != null)
            {
                if (HeaderGroup.Count() != 0)
                    foreach (var item in HeaderGroup)
                    {

                        ExportExcelForWebSite2.CreateCells(item.Row, item.Clumn, item.NameHeader, item.NameRow, item.NameClumn, true, System.Drawing.Color.Black, 22, 25, VerticalAlignmentValues.Center, HorizontalAlignmentValues.Center, false, BMitra, SizeBMitra, "", BackGroundColor, BorderStyleValues.Thin, BorderStyleValues.Thin, BorderStyleValues.Thin, BorderStyleValues.Thin, "");

                    }
            }



            return ExportExcelForWebSite2;
        }



        private ReportExcell ResultHeaderFloorOne(System.Drawing.Color BackGroundColor, List<HeaderFloorOne> LHeaderFloorOne, int Row = 0, int Clumns = 0, int StartNumberCell = 0, string BMitra = "", int SizeBMitra = 0)
        {
            ReportExcell ExportExcelForWebSite1 = new ReportExcell();

            int RowBelowOne = Row - 2;//هدر بالا
            int RowBelowTwo = Row - 1;//هدر یکی مانده به بالا
            int ClumnsBelowOne = Clumns;

            foreach (var item in LHeaderFloorOne)
            {
                string Char = GetCell(StartNumberCell);
                string CellRow = Char + Convert.ToString(RowBelowOne);
                string CellClumns = Char + Convert.ToString(RowBelowOne + 1);

                ExportExcelForWebSite1.CreateCells(RowBelowOne, ClumnsBelowOne, item.Tilte, CellRow, CellClumns, true, System.Drawing.Color.Black, 22, 25, VerticalAlignmentValues.Center, HorizontalAlignmentValues.Center, false, BMitra, SizeBMitra, "", BackGroundColor, BorderStyleValues.Thin, BorderStyleValues.Thin, BorderStyleValues.Thin, BorderStyleValues.Thin, "");

                ClumnsBelowOne += 1;
                Clumns += 1;
                StartNumberCell += 1;
            }




            return ExportExcelForWebSite1;

        }

         

        public ReportExcell ResultReportExcel(List<LstValueCellExcelClass> ValueLstExcell = null, List<HeaderFloorTwo> LHeaderFloorTwo = null, List<HeaderFloorOne> LHeaderFloorOne = null, int StateFloorOneOrFloorTwo = 0)
        {
            //StateFloorOneOrFloorTwo در صورتی که یک باشد هدر یک سطی می باشد در صورتی که هدر 2 سطری باشد باید 2 پاس بدهید مقدار این فیلد یا باید یک باشد یا دو باشد 
            //یک نشان دهنده یک سطی میخوام و عدد 2 یعنی دو سطری میخوام
            //ValueLstExcell مقادیر خانه های اکسل می باشد

            int Row = 5;
            int Clumns = 3;
            int StartNumberCell = 67;
            string BMitra = "B Nazanin";
            int SizeBMitra = 14;
            ReportExcell ExportExcelForWebSite = new ReportExcell();
            System.Drawing.Color BackGroundColor = System.Drawing.Color.FromArgb(191, 191, 191);


            if (StateFloorOneOrFloorTwo == 2)
            {
                ExportExcelForWebSite = ResultHeaderFloorTwo(BackGroundColor, LHeaderFloorTwo, Row, Clumns, StartNumberCell, BMitra, SizeBMitra);

            }
            if (StateFloorOneOrFloorTwo == 1)
            {
                ExportExcelForWebSite = ResultHeaderFloorOne(BackGroundColor, LHeaderFloorOne, Row, Clumns, StartNumberCell, BMitra, SizeBMitra);

            }

            BackGroundColor = System.Drawing.Color.FromArgb(242, 242, 242);


            SizeBMitra = 12;
            foreach (var item in ValueLstExcell)
            {

                foreach (var itemValue in item.LstValueCellExcel)
                {

                    string ValueCell = Convert.ToString(itemValue.Value);

                    string Char = GetCell(StartNumberCell);

                    string CellRow = Char + Convert.ToString(Row);
                    string CellClumns = Char + Convert.ToString(Row);



                    ExportExcelForWebSite.CreateCells(Row, Clumns, ValueCell, CellRow, CellClumns, true, System.Drawing.Color.Black, 22, 25, VerticalAlignmentValues.Center, HorizontalAlignmentValues.Center, false, BMitra, SizeBMitra, "", BackGroundColor, BorderStyleValues.Thin, BorderStyleValues.Thin, BorderStyleValues.Thin, BorderStyleValues.Thin, "");

                    Clumns = Clumns + 1;
                    StartNumberCell = StartNumberCell + 1;

                }

                StartNumberCell = 67;
                Clumns = 3;
                Row = Row + 1;

            }




            return ExportExcelForWebSite;
        }



        public string GetCell(int charAsscii)
        {
            string cellStr = "";
            double preCheck = (charAsscii - 65) / 26;
            preCheck = Math.Floor(preCheck);
            if (preCheck > 0)
            {

                charAsscii -= ((((int)preCheck - 1) * 26) + 90);
                charAsscii += 64;
                preCheck += 64;
                cellStr = Convert.ToChar((int)preCheck).ToString();
            }
            else
                cellStr = "";

            return (cellStr + Convert.ToChar(charAsscii).ToString());
        }


    }
}

public static class SlDocumentExtender
{
    public static void SetRightToLeft(this SLDocument slDoc, bool rightToLeft)
    {
        var sheetViews = GetSheetViews(slDoc.GetSlws());
        if (!sheetViews.Any() && rightToLeft)
        {
            slDoc.FreezePanes(1, 0);
            slDoc.UnfreezePanes();
            sheetViews = GetSheetViews(slDoc.GetSlws());
        }
        sheetViews.ForEach(sv => SetRightToLeftSheetView(sv, rightToLeft));
    }

    public static object GetSlws(this SLDocument slDoc) // SLWorksheet
    {
        return slDoc.GetType().GetField("slws", BindingFlags.Instance | BindingFlags.NonPublic).GetValue(slDoc);
    }

    private static void SetRightToLeftSheetView(object sheetView, bool rightToLeft)
    {
        GetRequiredType(sheetView, "SpreadsheetLight.SLSheetView").GetProperty("RightToLeft", BindingFlags.Instance | BindingFlags.NonPublic).SetValue(sheetView, rightToLeft);
    }

    private static List<object> GetSheetViews(object slws) // List<SLSheetView>
    {
        return ((IList)GetRequiredType(slws, "SpreadsheetLight.SLWorksheet").GetProperty("SheetViews", BindingFlags.Instance | BindingFlags.NonPublic).GetValue(slws)).OfType<object>().ToList();
    }

    private static Type GetRequiredType(object obj, string requiredType_FullName)
    {
        var type = obj.GetType();
        if (!type.FullName.Equals(requiredType_FullName))
            throw new NotSupportedException(string.Format("Type \"{0}\" is not supported, this method only handles only type \"{1}\".", type.FullName, requiredType_FullName));
        return type;
    }
}