using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Stimulsoft.Base.Design;
using Stimulsoft.Base.Drawing;
using Stimulsoft.Report;
using Stimulsoft.Report.Components;
using Stimulsoft.Report.Components.TextFormats;
using Stimulsoft.Report.Dictionary;
using Stimulsoft.Report.Export;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Reflection;

[ApiController]
[Route("api/[controller]/[action]")]
public class ReportController : ControllerBase
{

    private readonly IConfiguration _confiption;

    private readonly IWebHostEnvironment webHostEnvironment;
    public ReportController(IWebHostEnvironment webHostEnvironment, IConfiguration confiption)
    {
        this.webHostEnvironment = webHostEnvironment;
        _confiption = confiption;
    }


    //***************************************************************************

    [HttpGet]
    [MyValidation]
    public ActionResult CreateDatey(DateTime from, DateTime to)
    {
        return Ok();
    }


    //****************************************************************************



    [HttpGet]
    public ActionResult GenericReporDynamic()
    {

        var Report = new StiReport();
        var page = Report.Pages[0];
        Font headFont = new Font(familyName: "Tahoma", emSize: 10, FontStyle.Regular);


        //**********************************************************************************************
        #region Header
        //هدری که بالای تمام صفحات قرار میگیرد
        StiPageHeaderBand HeaderBand = new StiPageHeaderBand();
        HeaderBand.Height = .6;
        HeaderBand.Name = "Header1";
        HeaderBand.Border.Side = StiBorderSides.All;
        page.Components.Add(HeaderBand);



        //متنی که قرار هست درون هدر بالا قرار بگیرد

        StiText headerText = new StiText(new RectangleD(0, 0, page.Width, 0.6));
        headerText.Text = "Headertitle1";
        headerText.HorAlignment = StiTextHorAlignment.Center;
        headerText.VertAlignment = StiVertAlignment.Center;
        headerText.Font = headFont;
        headerText.Name = "Header1";
        headerText.Top = 0;
        headerText.Height = 0.6;
        headerText.TextOptions.RightToLeft = true;
        HeaderBand.Components.Add(headerText);

        #endregion

        //***********************************************************************************************

        List<string> cloumnSelected = new List<string>() { "Name", "Family" };



        StiDataSource dataSource = new StiDataTableSource(nameInSource: "dt", name: "dt", alias: "dt");
        List<StiDataColumn> columns = new List<StiDataColumn>();


        Report.DataSources.Add(dataSource);



        var Mainheaderband = new StiHeaderBand();
        Mainheaderband.Height = 0.4;
        Mainheaderband.Name = "dt";
        Mainheaderband.Border.Side = StiBorderSides.All;
        Mainheaderband.Brush = new StiSolidBrush(System.Drawing.Color.Silver);
        Mainheaderband.CanGrow = true;
        Mainheaderband.GrowToHeight = true;
        page.Components.Add(Mainheaderband);




        double currentleft = page.Width;
        int nameCap = 0;
        double columnWidth = (page.Width - 0.5) / (3);//3 ستونه 
        double pos = page.Width - 0.5;


        int nameIndex = 1;
        nameCap = nameCap + 1;
        StiText titleLineDataText = new StiText();
        titleLineDataText.Width = 0.5;
        titleLineDataText.Left = pos;
        titleLineDataText.Text = "ردیف";
        titleLineDataText.Height = 0.4;
        titleLineDataText.Name = "line1" + nameIndex.ToString();
        titleLineDataText.Border.Side = StiBorderSides.All;
        titleLineDataText.HorAlignment = StiTextHorAlignment.Center;
        titleLineDataText.VertAlignment = StiVertAlignment.Center;
        titleLineDataText.CanGrow = true;
        titleLineDataText.GrowToHeight = true;
        titleLineDataText.Font = headFont;
        titleLineDataText.WordWrap = true;
        titleLineDataText.TextOptions.RightToLeft = true;
        Mainheaderband.Components.Add(titleLineDataText);




        pos = pos - columnWidth;
        nameIndex++;


        var lineTitleleft = titleLineDataText.Left;
        double leftTitleNow = titleLineDataText.Left;



        foreach (var item in cloumnSelected)
        {




        }

        nameCap = nameCap + 1;


        StiDataBand dataBand = new StiDataBand();
        dataBand.DataSourceName = "dt";
        dataBand.GrowToHeight = true;
        dataBand.CanGrow = true;
        dataBand.Name = "DataBand";
        page.Components.Add(dataBand);




        //****Data Feild

        double positionDataText = (page.Width) - 0.5;

        StiText LineDataText = new StiText(new RectangleD(positionDataText, 0, columnWidth, 0.4));
        StiNumberFormatService Textformat2 = new StiNumberFormatService(3, ".", 0, ",", 3, false, false, " ");
        LineDataText.Width = 0.5;
        LineDataText.Text = "{Line}";
        LineDataText.Name = "DataText" + nameIndex.ToString();
        LineDataText.Border.Side = StiBorderSides.All;
        LineDataText.HorAlignment = StiTextHorAlignment.Center;
        LineDataText.VertAlignment = StiVertAlignment.Center;
        LineDataText.CanGrow = true;
        LineDataText.GrowToHeight = true;
        LineDataText.Font = headFont;
        LineDataText.WordWrap = true;
        LineDataText.TextFormat = Textformat2;
        dataBand.Components.Add(LineDataText);


        nameIndex++;


        var LineTextleft = LineDataText.Left;
        double leftDataPosition = LineDataText.Left;


        //********************************************************************************
        Type type = typeof(Student);
        PropertyInfo[] properties = type.GetProperties();
        List<ColumnsReport> feildsDataOrginal = new List<ColumnsReport>();
        List<ColumnsReport> fieldsData = new List<ColumnsReport>();

        for (int i = 0; i < properties.Length; i++)
        {
            ColumnsReport row = new ColumnsReport();
            string value = properties[i].Name;
            row.Value = value;
            var attribute = properties[i].GetCustomAttribute(typeof(DisplayAttribute));
            if(attribute!=null)
            {
                var caption = (attribute as DisplayAttribute).Name;
                row.Caption= caption;
            }

        }








        //*******************************************************************************


        List<SelectedColumn> SelectedColumns = new List<SelectedColumn>();
        foreach (var item in SelectedColumns)
        {
            var widthColumnPrecent = item.Size != null ? Convert.ToInt32(item.Size) : 0;
            var ColSecond = page.Width - 0.5;
            var ColumnWidth = (widthColumnPrecent * ColSecond) / 100;
            leftDataPosition = leftDataPosition - ColumnWidth;

            StiText dataText = new StiText();
            dataText.Left = leftDataPosition;
            dataText.Width = ColumnWidth;
            dataText.Height = 0.4;
            StiNumberFormatService Textformat = new StiNumberFormatService(3, ".", 0, ",", 3, false, false, " ");
            dataText.Width = 0.5;
            dataText.Text = "{" + "dt" + "." + item.Value + "}";
            dataText.Name = "DataText" + nameIndex.ToString();
            dataText.Border.Side = StiBorderSides.All;
            dataText.HorAlignment = StiTextHorAlignment.Center;
            dataText.VertAlignment = StiVertAlignment.Center;
            dataText.CanGrow = true;
            dataText.GrowToHeight = true;
            dataText.Font = headFont;
            dataText.WordWrap = true;
            dataText.TextOptions.RightToLeft = true;
            dataText.TextFormat = Textformat;
            dataText.TextQuality = StiTextQuality.Wysiwyg;
            dataBand.Components.Add(dataText);

            positionDataText = positionDataText - columnWidth;

            nameIndex++;

        }





        //*************************************************************************************************

        #region Footer
        //Footer
        StiPageFooterBand footerBand = new StiPageFooterBand();
        footerBand.Height = 0.6;
        footerBand.Name = "foooter1";
        footerBand.Border.Side = StiBorderSides.All;
        page.Components.Add(footerBand);


        //Text in Footer
        StiText footerText = new StiText(new RectangleD(0, 0, page.Width, 0.6));
        footerText.Text = "Footertitle1";
        footerText.HorAlignment = StiTextHorAlignment.Center;
        footerText.VertAlignment = StiVertAlignment.Center;
        footerText.Font = headFont;
        footerText.Name = "Footer1";
        footerText.Top = 0;
        footerText.Height = 0.6;
        footerText.TextOptions.RightToLeft = true;
        footerBand.Components.Add(footerText);

        #endregion



        //***************************************************************************************************

        var contentRoot = webHostEnvironment.ContentRootPath;
        var reportFile = System.IO.Path.Combine(contentRoot, "Reports", "ReportExample.mrt");


        var lstData = new List<Student>() { new Student() { Name = "علی", Family = "محمدی" }, new Student() { Name = "ناصر", Family = "ناصری" } };
        Report.Save(reportFile);
        Report.RegData("dt", lstData);
        Report.Render();

        var PdfSettings = new Stimulsoft.Report.Export.StiPdfExportSettings();
        var service = new Stimulsoft.Report.Export.StiPdfExportService();
        var stream = new MemoryStream();
        service.ExportTo(Report, stream, PdfSettings);
        byte[] bytes = stream.ToArray();
        string Base64 = Convert.ToBase64String(bytes);


        return Content(content: "data:application/pdf;base64," + Base64);

    }





    public class ColumnsReport
    {
        public string? Caption { get; set; }
        public string? Value { get; set; }
        public int? Width { get; set; }

    }



    public class SelectedColumn
    {
        public string? Value { get; set; }
        public string? Size { get; set; }
    }



    public class Student
    {
        public string? Name { get; set; }
        public string? Family { get; set; }
    }




    [HttpGet]
    public IActionResult GenerateReport()
    {
        // مسیر فایل گزارش
        var reportPath = Path.Combine(Directory.GetCurrentDirectory(), "Reports", "Report.mrt");

        // بارگذاری گزارش
        var report = new StiReport();
        report.Load(reportPath);

        // تنظیم داده‌ها برای گزارش (در صورت نیاز)
        var data = GetSampleData();
        report.RegBusinessObject("SampleData", data);
        report.Render();

        // خروجی گرفتن گزارش به صورت PDF
        using var stream = new MemoryStream();
        report.ExportDocument(StiExportFormat.Pdf, stream);
        stream.Position = 0;

        return File(stream.ToArray(), "application/pdf", "report.pdf");
    }

    private List<SampleData> GetSampleData()
    {
        return new List<SampleData>
        {
            new SampleData { Id = 1, Name = "Item 1", Value = 100 },
            new SampleData { Id = 2, Name = "Item 2", Value = 200 },
        };
    }


    //**********************************************************************
    [HttpPost]
    public ActionResult ReadFromAppsetting()
    {
        string result = _confiption["keyAll:key"];
        return Ok(result);
    }

    //***********************************************************************

}

public class SampleData
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Value { get; set; }
}
