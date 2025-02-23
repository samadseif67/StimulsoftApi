

//***********************************************************************************************


//تابعی برای نشنان دکمه اینتر در داخل تکسباکس
function FuncIsCorrectTextArea(inputString) {
    var newline = String.fromCharCode(13, 10);
    var Result = inputString.replaceAll('\\n', newline);
    return Result;
}




//***********************************************************************************************
//تابع حرکت به انتهای صفحه یا ورودی داهده شده

function FuncMoveToScrolInAllPageToDownForContainerMain(DivIDOrClass, V_scrollTop) {

    //DivIDOrClass آن قسمتی که اسکرول دارد
    $(DivIDOrClass).animate({
        scrollTop: V_scrollTop
    }, 2000);

}




//***********************************************************************************************
//ست کردن عقریه های ساعت بر روی گرید
function FuncSetTimeOnlyForPublicTimes(GridName, LstClumnsName) {

    //نام ستونی از گرید که مد نظر مون هست رو بصورت آرایه تعریف میکنیم
    // LstClumnsName.publish({ "title": "fromTime" }, { "title": "toTime" });

    setTimeout(() => {
        $("#" + GridName + " tr").each(function () {

            var RowID = String($(this).attr("id"));
            if (RowID != "undefined") {

                for (var i = 0; i < LstClumnsName.length; i++) {
                    FuncDispalyPluginTimeOnlyForElement($(this).find("#" + RowID + "_" + LstClumnsName[i].title));
                }

            }
        });


    }, 500);



}



function FuncDispalyPluginTimeOnlyForElement(Element) {
    $(Element).mdtimepicker({
        timeFormat: 'hh:mm:ss.000', // format of the time value (data-time attribute)
        format: 'hh:mm tt',    // format of the input value
        readOnly: false,       // determines if input is readonly
        hourPadding: false,
        theme: 'green',
        okLabel: 'تائید',
        cancelLabel: 'انصراف',
    });
}
 

//*********************************************************************************
//تنظیم عرض گرید به اندازه 100 درصد
function FuncSetWidthJqGrid(GridName, GridNamePage) {
    // gview_jqPublicAffairsFactorDeskTwos
    //gbox_jqPublicAffairsFactorDeskTwos
    //jqPublicAffairsFactorDeskTwosPager


    $("#gbox_" + GridName).css("width", "100%");
    $("#gview_" + GridName).css("width", "100%");
    $("#gview_" + GridName).find("div.ui-state-default").css("width", "100%");
    $("#" + GridNamePage).css("width", "100%");
}

//*****************************************************************************
//برای پاک کردن عنوان سلول دکمه های ویرایش و حذف و .. که در کنار هم قرار میگیرند
function FuncEmptyTitleForTdJqgrid(GridnameId, ColumnsName) {
     ColumnsName=GridnameId + "_" + ColumnsName;
    $("#" + GridnameId).find('td[aria-describedby="'+ColumnsName+'"]').attr("title", "");
}


//*****************************************************************************
//پنهان کردن ستون در جی کوئری گرید
function FuncHideColInJqgrid(GridNameID, LstClumnsName) {
    //LstClumnsName
    //["ID","name"]
    $("#" + GridNameID).jqGrid("hideCol", LstClumnsName);
}

//پنهان نکردن کردن ستون در جی کوئری گرید
function FuncSHowColInJqgrid(GridNameID, LstClumnsName) {
    //LstClumnsName
    //["ID","name"]
    $("#" + GridNameID).jqGrid("showCol", LstClumnsName);
}

//**********************************************************************************
//ست کردن مقدار در داخل تکس باکس
function FuncSetValueInput(DivNameParent, ElementNameID, ValueElement) {
    //DivNameParent اشاره به قالبی میکند که تمام تکسباکس ها داخل آن هستند
    //ElementNameID نام آی دی المنت تکباکس می باشد
    //ValueElement مقدار المنت تکسباکس که قرار هست تکسباکس خودش را با این مقدار ست کند
    $("#" + DivNameParent).find("#" + ElementNameID).val(ValueElement);

}

//گرفتن مقدار از تکس باکس
function FuncGetValueInput(DivNameParent, ElementNameID) {
    //DivNameParent اشاره به قالبی میکند که تمام تکسباکس ها داخل آن هستند
    //ElementNameID نام آی دی المنت تکباکس می باشد
    var ValeElement = String($("#" + DivNameParent).find("#" + ElementNameID).val()).trim();
    return ValeElement;
}






//************************************************************************************************************
//اجرای انیمشن رباط رایان
function FuncStartAnimate(DivRepaceNameID) {
    var arrAnimate = [
        "/animation/First/4.html",
    ];
    $.get(arrAnimate[Math.floor(Math.random() * arrAnimate.length)], function (data, status) {
        $("#" + DivRepaceNameID).html(data);
        init();
    });
}



//**********************************************************************************************************
//وقتی روی دکمه های حذف یا ویرایش گرید اینلاین کلیک میکنیم رنگ بکگراند سطر جدول درست اعمال شود
function FuncCreateTemplateBackgroundJQgridDisplay(JqGridNameID,NewID) {

    $("#" + JqGridNameID).find("tr").removeClass("ui-state-highlight");
    $("#" + JqGridNameID).find("tr#" + NewID).addClass("ui-state-highlight");

}


//************************************************************************************************************
//گرفتن آدرس وب سایت خودم به همراه آی پی 
function GetAddressMyWeSite()
{
    var Result = window.location.protocol + "//" + window.location.host;
    return Result;
}

//**************************************************************************************************************
//فعال سازی علامت مرتب سازی کنار نام ستونهای جی کوئری گرید
function ShowSortableJqGrid(GridNameID)
{

    

    var ClumnPersionsName = $("div[id=gbox_" + GridNameID + "] .s-ico").closest("div[class=ui-jqgrid-sortable]");
    for (var i = 0; i < ClumnPersionsName.length; i++)
    {
        var text = String($(ClumnPersionsName[i]).text());
        if (text.length != 0) {
            $(ClumnPersionsName[i]).find(".s-ico").show();

        }
    }
     
   // $("div[id=gbox_" + GridNameID + "] .s-ico").show();

    $("div[id=gbox_" + GridNameID + "] .s-ico").css("position", "relative");
    $("div[id=gbox_" + GridNameID + "] .s-ico").css("top", "-10px");
   
    

    $("div[id=gbox_" + GridNameID + "] .s-ico").find("span[sort=asc]").attr("onclick", "FuncSortAscAndDescInJqGrid(this,event,'" + GridNameID + "','asc')");
    $("div[id=gbox_" + GridNameID + "] .s-ico").find("span[sort=desc]").attr("onclick", "FuncSortAscAndDescInJqGrid(this,event,'" + GridNameID + "','desc')");

    $("div[id=gbox_" + GridNameID + "] .s-ico").find("span[sort=asc]").css("color", "red");

    $("div[id=gbox_" + GridNameID + "] .s-ico").find("span[sort=desc]").css("color", "red");
    $("div[id=gbox_" + GridNameID + "] .s-ico").find("span[sort=desc]").css("margin-top", "10px");
    
}

function FuncSortAscAndDescInJqGrid(Element,e, GridNameID, sortorder)
{
    e.stopPropagation();
    var ParentDivSort = $(Element).closest("div[class=ui-jqgrid-sortable]").attr("id");
    var sortname = ParentDivSort.replace("jqgh_" + GridNameID + "_", '');
    FuncShowLoading();
    $('#' + GridNameID).jqGrid('setGridParam', { sortorder: sortorder, sortname: sortname }).trigger("reloadGrid");
    setTimeout(() =>
    {
        FuncHideLoading();
    },4000)

    
}


//*****************************************************************************************************************
//نمایش لودینگ
function FuncShowLoading()
{
    $(".loadingCustom").addClass("showLoading");
}
//پنهان کردن لودینگ
function FuncHideLoading()
{
    $(".loadingCustom").removeClass("showLoading");
}



//*********************************************************************************************************************

//مخفی کردن رونامبر یا همان شماره سطر در جیکوئری گرید
function FuncHideRowNumberJqGrid(GridNameID, RowID)
{
    $("#" + GridNameID).find("tr#" + RowID).find("td.jqgrid-rownum").addClass("DisplayNoneRowNumberTd");
}



 

//********************************************************************************************************************
//موقع زدن دکمه اینتر در تکس باکس عملیات یک باتون اجرا شود
function FuncKeydownEnter(e, ElementNameBtnID) {
    var ValueKeyCode = e.keyCode || e.which;    
    if (ValueKeyCode == '13') {
        $("#" + ElementNameBtnID).trigger("click");
    }
}




//********************************************************************************************************************
//بکگراند سلول جدول تغییر کند
//تغییر رنگ بکگراند در گرید
function SetBackGroundTdInRowInJqGrid(GridNameID, RowID, StateColor) {
    if (StateColor == 1) {
        $("#" + GridNameID).find("tr#" + RowID).find("td").addClass("SuccessTd");
    }
    if (StateColor == 2) {
        $("#" + GridNameID).find("tr#" + RowID).find("td").addClass("DangerTd");
    }
    if (StateColor == 3) {
        $("#" + GridNameID).find("tr#" + RowID).find("td").addClass("WarringTd");
    }
    if (StateColor == 4)//برای عملیات جمع
    {
        $("#" + GridNameID).find("tr#" + RowID).find("td").addClass("EndRowTdRed");       
    }
    if (StateColor == 5)//برای عملیات جمع
    {
        $("#" + GridNameID).find("tr#" + RowID).find("td").addClass("EndRowTdBlue");
    }
    if (StateColor == 6)//برای  تشخیص قرارداد های با پیشرفت بالا
    {
        $("#" + GridNameID).find("tr#" + RowID).find("td").addClass("FinancialProgressTdBlue");
    }

}



//***************************************************************************************************************

//گرد یا رند کردن اعداد
function FuncRound(InputNumber) {
    var InputNumber = String(FuncDeleteSepreatoreInNumber(InputNumber));
    InputNumber = InputNumber.trim().length == 0 ? 0 : parseFloat(InputNumber);
    InputNumber = Math.floor(InputNumber);
    return InputNumber;
}
//*****************************************************************************************************************

//جلوگیری از کپی و پیست کردن داخل تکس باکس
function FuncCanNotCopyAndPastInTextBox(LstElementID) {

    $(LstElementID).keydown(function (event) {
        if (event.ctrlKey == true && (event.which == '118' || event.which == '86')) {
            event.preventDefault();
            ErrorMsg("امکان کپی و انداختن متن وجود ندارد");
        }
    });
}




//****************************************************************************************************************
//پنهان کردن المنت
function HideElementID(ElementID) {

    $("#" + ElementID).hide();
    $("#" + ElementID).css("visibility", "hidden");
}
//نمایش المنت
function ShowElementID(ElementID) {
    $("#" + ElementID).show();
    $("#" + ElementID).css("visibility", "visible");
}
//حذف المنت
function DeleteElementID(ElementID) {
    $("#" + ElementID).remove();
}


//****************************************************************************************************************
//تبدیل عدد به حروف در حالت onkeyup
function ConvertPriceToPersionInWordInlive(ElementPriceInNumber, ElementNameIDPriceToWord) {
    var V_Price = FuncDeleteSepreatoreInNumber(String($(ElementPriceInNumber).val()).trim());//مبلغ ریالی قرارداد
    if (V_Price.length == 0) {
        $('#' + ElementNameIDPriceToWord).val("");
    }
    else {
        $('#' + ElementNameIDPriceToWord).val(wordifyRials(V_Price));
        $('#' + ElementNameIDPriceToWord).text(wordifyRials(V_Price));
    }
}
function ConvertPriceToPersionInWordInliveType(ElementPriceInNumber, ElementNameIDPriceToWord, Type) {
    var V_Price = FuncDeleteSepreatoreInNumber(String($(ElementPriceInNumber).val()).trim());//مبلغ ریالی قرارداد
    if (V_Price.length == 0) {
        $('#' + ElementNameIDPriceToWord).val("");
        $('#' + ElementNameIDPriceToWord).text("");
    }
    else {
        var S_Numnber = wordifyRials(V_Price);

        S_Numnber = S_Numnber + " " + Type;
        $('#' + ElementNameIDPriceToWord).val(S_Numnber);
        $('#' + ElementNameIDPriceToWord).text(S_Numnber)
    }
}


function TwoOperation_ConvertPriceToPersionInWordInliveType(ElementPriceInNumber, ElementNameIDPriceToWord) {
    console.log("ElementNameIDPriceToWord=", ElementNameIDPriceToWord);
    var V_Value = String($(ElementPriceInNumber).val()).trim();
    if (V_Value.length != 0) {
        ConvertPriceToPersionInWordInlive(ElementPriceInNumber, ElementNameIDPriceToWord);
        $(ElementPriceInNumber).val(FuncOnlyPriceSepreatore($(ElementPriceInNumber).val()));
    }
    else {
        $("#" + ElementNameIDPriceToWord).text("");
        $("#" + ElementNameIDPriceToWord).val("");
    }


}

function TwoOperation_ConvertPriceToPersionInWordInliveTypeWithLbl(ElementPriceInNumber) {
    var V_Value = String($(ElementPriceInNumber).val()).trim();
    var ElementNameIDPriceToWord = $(ElementPriceInNumber).attr("AttrLblMoneyPersion");
    if (V_Value.length != 0) {
        ConvertPriceToPersionInWordInlive(ElementPriceInNumber, ElementNameIDPriceToWord);
        $(ElementPriceInNumber).val(FuncOnlyPriceSepreatore($(ElementPriceInNumber).val()));
    }
    else {
        $("#" + ElementNameIDPriceToWord).text("");
        $("#" + ElementNameIDPriceToWord).val("");
    }
}


function ConvertNumberToPersion(Number) {
    Number = String(Number).trim();
    if (Number.length == 0) {
        return "";
    }
    else {
        return wordifyRials(Number);
    }

}
function ConvertNumberToPersionType(Number, Type) {
    Number = String(Number).trim();
    if (Number.length == 0) {
        return "";
    }
    else {
        var S_Numnber = wordifyRials(Number);
        S_Numnber = S_Numnber + " " + Type;

        return S_Numnber;
    }

}


//*******************************************************************************************************************
//برای اینکه قالب صحیح تاریخ در  قسمت کارتابل درست نمایش داده شود باید از کد پایین استفاده کنیم 
function SetDateTimeForPage_DivThatHaveDatetime() {
    $("body").addClass("DivThatHaveDatetime");
}

//************************************************************************************************************************
//جدا کردن اعداد به وسیله کاما
function FuncOnlyPriceSepreatore(ElementValue) {

    var str = "";
    var thisval = String(ElementValue);

    if (String(thisval).trim().length != 0) {
        var start = 0;
        var end = thisval.length - 1;


        var arr = new Array(end);

        while (end >= 0) {
            arr[start++] = str.charAt(end--);
            thisval = thisval.replace(',', '');
        }
        var nStr = '';
        nStr = thisval;
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        var myval = x1 + x2;
        return myval;
    }
    else {
        return "";
    }

}

function FuncDeleteSepreatoreInNumber(ValueInput) {
    return (String(ValueInput).split(",").join(""));
}




//*******************************************************************************************************************


var CustomOptionsKamaDatePicker = {
    placeholder: "روز / ماه / سال",
    twodigit: true,
    closeAfterSelect: false,
    nextButtonIcon: "fa fa-arrow-circle-right",
    previousButtonIcon: "fa fa-arrow-circle-left",
    buttonsColor: "blue",
    forceFarsiDigits: true,
    markToday: true,
    markHolidays: true,
    highlightSelectedDay: true,
    sync: true,
    gotoToday: true
}
//ست کردن تاریخ تکس باکس
function FuncSetAllDatePopupKamaDatePicker() {
    $(".datePopup input").each(function (i) {
        $(this).closest("div.datePopup").find(".bd-main").remove();
        var id = $(this).attr('id')
        kamaDatepicker(id, CustomOptionsKamaDatePicker);
    });
}

function FuncCreateDateBoxKamaDatePicker(Title, ElementID) {
    var Text = "";
    Text += '<label>' + Title + ' : </label>';
    Text += '<div class="inputSearch datePopup">';
    Text += ' <i class="bg"></i>';
    Text += ' <i class="icon fas fa-calendar-alt"></i>';
    Text += '<input type="text" id=' + ElementID + ' type="text" maxlength="10" autocomplete="off" />';
    Text += ' <div class="showDatePicker"></div>';
    Text += '</div>';

}



//*************************************************************************************************************************



function CreateSelectChosen(Title, DivReplace, DataInfoSelect, NameElementSelect, ValueSetSelect, NotFirstOption = 1,FuncNameForChange="") {
    var TextSelect = "";
    TextSelect += "<label>" + Title + "</label>";
    if (FuncNameForChange.trim().length == 0) {
        TextSelect += '<select class="form-control chosen-select" style="width:100%" id="' + NameElementSelect + '"></select>'
    }
    else
    {
        TextSelect += '<select onchange="' + FuncNameForChange +'" class="form-control chosen-select" style="width:100%" id="' + NameElementSelect + '"></select>'
    }
   
    $("#" + DivReplace).html(TextSelect);
    SetValueSelect(DataInfoSelect, NameElementSelect, ValueSetSelect, NotFirstOption);
    FuncChosenReady();
}
function CreateSelectChosenMultiSelect(Title, DivReplace, DataInfoSelect, NameElementSelect, ValueSetSelect, NotFirstOption = 1) {
    var TextSelect = "";
    TextSelect += "<label>" + Title + "</label>";
    TextSelect += '<select class="form-control chosen-select" multiple style="width:100%;border:1px solid black" id="' + NameElementSelect + '"></select>'
    $("#" + DivReplace).html(TextSelect);
    SetValueSelect(DataInfoSelect, NameElementSelect, ValueSetSelect, NotFirstOption);
    FuncChosenReady();
}

function FuncChosenReady() {
    var config = {
        '.chosen-select': {},
        '.chosen-select-deselect': { allow_single_deselect: true },
        '.chosen-select-no-single': { disable_search_threshold: 10 },
        '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
        '.chosen-select-width': { width: "95%" }
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
}

function FuncUpdateChosen(ElementID)
{
    $("#" + ElementID).trigger("chosen:updated");
}

function SetDatePicker(ElementName) {
    $("#" + ElementName).kendoDatePicker();
}

function SetDatePickerCalender(ElementName) {

    $("#" + ElementName).datepicker({
        dateFormat: 'yy/mm/dd',
        onSelect: function (dateText, inst) {
            var date = new JalaliDate(inst['selectedYear'], inst['selectedMonth'], inst['selectedDay']).getGregorianDate();
            var month = date.getMonth() + 1;
            if (month <= 9)
                month = '0' + month.toString();
            var day = date.getDate();
            if (day <= 9)
                day = '0' + day.toString();
        }
    });
}



function SetValueSelect(DataInfoSelect, NameElementSelect, ValueSetSelect, NotFirstOption = 1) {

    var textOption = NotFirstOption == 1 ? "<option value=''>(انتخاب نمائید)</option>" : " ";
    if (DataInfoSelect != null) {
        for (var i = 0; i < DataInfoSelect.length; i++) {

            if (DataInfoSelect[i].Type != undefined) {
                textOption += "<option AttrType=" + DataInfoSelect[i].Type + " value=" + DataInfoSelect[i].ID + ">" + DataInfoSelect[i].Title + "</option>";
            }
            else {
                textOption += "<option value=" + DataInfoSelect[i].ID + ">" + DataInfoSelect[i].Title + "</option>";
            }
        }
    }
    $("#" + NameElementSelect).html(textOption);
    $("#" + NameElementSelect).val(ValueSetSelect);

}

function FuncNumberInt(e, Value) {
    var ValueKeyCode = e.keyCode || e.which;
    if (ValueKeyCode > 46 && ValueKeyCode < 58) {

        return true;
    }
    else {

        return false;
    }

}

function FuncNumberPhoneAndYourAccountBank(e, Value) {
    var ValueKeyCode = e.keyCode || e.which;

    if ((ValueKeyCode > 46 && ValueKeyCode < 58) || (ValueKeyCode == 45)) {

        return true;
    }
    else {

        return false;
    }

}

function FuncNumber(e, Value) {
    var ValueKeyCode = e.keyCode || e.which;
    if (ValueKeyCode > 45 && ValueKeyCode < 58) {
        if (ValueKeyCode == 46) {

            var ArraySplitValue = String(Value).split('.');
            if (ArraySplitValue.length > 1) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }

    }
    else {

        return false;
    }

}

function ValidationFiledEssentional(Item, Filed) {
    var Result = false;
    for (var i = 0; i < Item.length; i++) {
        if (Item[i] == Filed) {
            Result = true;
        }
    }

    return Result;
}
function ValidationFiled_Persian(ItemObject) {

    var Validation = false;
    var Validation_N = [];
    for (var i = 0; i < ItemObject.length; i++) {

        if (String(ItemObject[i].value).trim().length == 0 || String(ItemObject[i].value) == null || String(ItemObject[i].value) == "null") {

            Validation_N.push(ItemObject[i].key);
        }

    };
    return Validation_N;
}
function ValidationFiled(ItemObject, ItemEssentional = null, NotItemEssentional = null) {

    //ItemEssentional==null  همه ضروری هستند
    //ItemEssentional!=null  فقط نام همان فیلدها که در لیست وجود دارد الزامی است



    //ItemObject  {ID:1,Name:"reza",Family:"naseri"}
    //ItemEssentional  => [ID,Name]
    var Validation = false;
    for (var item in ItemObject) {

        //***************************************************************************************************************

        if (ItemEssentional == null) {

            if (NotItemEssentional == null) {
                if (String(ItemObject[item]).trim().length == 0 || ItemObject[item] == null || ItemObject[item] == "null") {
                    Validation = true;
                }
            } else {
                if (!ValidationFiledEssentional(NotItemEssentional, item)) {
                    if (String(ItemObject[item]).trim().length == 0 || ItemObject[item] == null || ItemObject[item] == "null") {
                        Validation = true;
                    }
                }
            }

        }
        else {
            if (ItemEssentional != null) {
                if (ValidationFiledEssentional(ItemEssentional, item)) {
                    if (String(ItemObject[item]).trim().length == 0 || ItemObject[item] == null || ItemObject[item] == "null") {
                        Validation = true;
                    }
                }
            }
        }

        //******************************************************************************************************************


    }
    return Validation;
}

function SetMultiselect(ElementName) {
    $('#' + ElementName).multiselect({
        enableFiltering: true,
        includeSelectAllOption: true,
        selectAllJustVisible: false,
        enableCaseInsensitiveFiltering: true
    });
    $('#' + ElementName).next('.btn-group').find('button.multiselect').css('background', 'white');
}

function SetValueMultiSelect(ElementName, ArrayNumber) {
    $("#" + ElementName).val(String(ArrayNumber).split(','));
    $("#" + ElementName).multiselect("refresh");
}

function ConvertArrayStringToList(Value) {
    Value = String(Value);
    if (Value.length != 0) {
        Value = Value.substring(0, Value.length - 1);
        Value = Value.substring(1, Value.length);
        Value = ConvertStringToList(Value);
    }
    return Value;
}


function ConvertStringToList(Value) {
    var ArrayNumber = [];
    if (Value != null && String(Value).length != 0) {

        var Result = String(Value).split(',');
        for (var i = 0; i < Result.length; i++) {
            ArrayNumber.push({ "ID": Result[i] });
        }
    }
    return ArrayNumber;
}

function SetMultiSelectCustomize(Data, ElementName, StringLstSelected) {
    try {

        SetValueSelect(Data, ElementName, 0, 0);
        SetMultiselect(ElementName);
        $("#" + ElementName).val(String(StringLstSelected).split(','));
        $("#" + ElementName).multiselect("refresh");

    }
    catch (e) {

        SetValueSelect(Data, ElementName, 0, 0);
        SetMultiselect(ElementName);
        $("#" + ElementName).val(String(StringLstSelected).split(','));
    }

}


//*****************************************************************************************


function FuncCollectionOption(Elemnt) {
    var AllTextOptionsSelected = "";
    var AllID = String($(Elemnt).val()).trim();
    var LstID = ConvertStringToList(AllID);
    for (var i = 0; i < LstID.length; i++) {
        var Text = $(Elemnt).find("option[value=" + LstID[i].ID + "]").text();
        AllTextOptionsSelected = AllTextOptionsSelected + Text + "/";
    }
    AllTextOptionsSelected = String(AllTextOptionsSelected).trim();
    if (AllTextOptionsSelected.length != 0) {
        AllTextOptionsSelected = AllTextOptionsSelected.substring(0, AllTextOptionsSelected.length - 1);
    }

    var Data = {
        AllID,
        AllTextOptionsSelected
    }
    return Data;
}


//*******************************************************************************************

function SetTimePicker(ElementID) {
    $('#' + ElementID).timepicker();
}



//********************************************************************************************


//*********************************************************************************************************
//ساخت مالتی سلکت در جی کوئری گرید

function FuncCreateMultiselectIntoJqGrid(cellvalue, options, rowObject, V_FieldName, V_FillValueSelect) {


    var TextSelect = "";
    TextSelect += '<div class="ClsparentLstItem">';
    TextSelect += '<input AttrToggle' + V_FieldName + '="1" GridIntoID=' + options.gid + ' AtrrV_FieldName=' + V_FieldName + '  onclick="FuncToggleUsageTypeJIntoJqGrid(this);" id=' + options.rowId + '_' + V_FieldName + '   type="button" value="کلیک کنید"/>';
    TextSelect += '<span class="SpanTxt' + V_FieldName + '"> </span>';
    TextSelect += '<ul class=' + options.rowId + '_' + V_FieldName + '  style="position: absolute;border: 1px solid;width: 20%;background: white;display:none;border-radius: 4px;">'
    TextSelect += TextOptionNonfinancialAssistanceTypes;
    TextSelect += '<li style="list-style-type: none;"><input type="submit" value="بستن" style="float: left;"  AtrrV_FieldName=' + V_FieldName + '  onclick="FuncCloseBoxToggleUsageTypeJIntoJqGrid(this);"  CloseBox_GridIntoID=' + options.gid + '  CloseBox_ID=' + options.rowId + '_' + V_FieldName + ' /></li>';
    TextSelect += '</ul>';
    TextSelect += '</div>';


    return TextSelect;
}

function CreateLiForMultiSelectIntoJqGrid(DataQueryUsage, V_FieldName) {
    TextOption = '<li style="list-style-type:  none;margin-top: 1px;margin-bottom: 1px;"><div style="text-align: initial;margin-right: -15px;"><input AttrClsFiledname=' + V_FieldName + ' onclick="FuncDetectCheckedIntoJqGrid(this);" AttrID_CheckBox="0" type="checkbox" /> انتخاب همه</div> </li>';;
    for (var i = 0; i < DataQueryUsage.length; i++) {
        TextOption += '<li style="list-style-type:  none;margin-top: 1px;margin-bottom: 1px;"><div style="text-align: initial;"><input AttrClsFiledname=' + V_FieldName + ' onclick="FuncDetectCheckedIntoJqGrid(this);"   AttrText_CheckBox="' + DataQueryUsage[i].Title + '"       AttrID_CheckBox=' + DataQueryUsage[i].ID + ' type="checkbox" /> ' + DataQueryUsage[i].Title + '</div> </li>';
    }
    return TextOption;
}

function FuncCloseBoxToggleUsageTypeJIntoJqGrid(Element) {
    var V_FieldName = $(Element).attr("AtrrV_FieldName");
    var Value_ID = $(Element).attr("CloseBox_ID");
    var GridName = $(Element).attr("CloseBox_GridIntoID");
    $("#" + GridName).find("input[AttrToggle" + V_FieldName + "=1]").closest("div.ClsparentLstItem").find("ul[class!=" + Value_ID + "]").hide();
    $(Element).closest("div.ClsparentLstItem").find("ul").toggle();

}

function FuncDetectCheckedIntoJqGrid(Element) {
    var ValueID = $(Element).attr("AttrID_CheckBox");
    var IsChecked = $(Element).prop("checked");
    var V_Filedname = $(Element).attr("AttrClsFiledname");

    if (ValueID == 0) {
        if (IsChecked) {
            $(Element).closest("div.ClsparentLstItem").find("input[type=checkbox][AttrID_CheckBox]").prop("checked", true);
        }
        else {
            $(Element).closest("div.ClsparentLstItem").find("input[type=checkbox][AttrID_CheckBox]").prop("checked", false);
        }
    }
    else {
        var TotlaLenChecked = $(Element).closest("div.ClsparentLstItem").find("input[type=checkbox][AttrID_CheckBox!=0]").length;
        var LenChecked = $(Element).closest("div.ClsparentLstItem").find("input[type=checkbox][AttrID_CheckBox!=0]:checked").length;

        if (TotlaLenChecked == LenChecked) {
            $(Element).closest("div.ClsparentLstItem").find("input[type=checkbox][AttrID_CheckBox=0]").prop("checked", true);
        }
        else {
            $(Element).closest("div.ClsparentLstItem").find("input[type=checkbox][AttrID_CheckBox=0]").prop("checked", false);
        }

    }

    //***********************در انتها نام هر کدام بیافتد
    var TextSpan = "";
    var ChoseCheckBox_SpanText = $(Element).closest("div.ClsparentLstItem").find("input[type=checkbox][AttrID_CheckBox!=0]:checked");

    for (var i = 0; i < ChoseCheckBox_SpanText.length; i++) {
        TextSpan += $($(ChoseCheckBox_SpanText)[i]).attr("AttrText_CheckBox") + '،';
    }
    TextSpan = TextSpan.length == 0 ? TextSpan : "\n" + String(TextSpan).substring(0, TextSpan.length - 1);

    $(Element).closest("div.ClsparentLstItem").find(".SpanTxt" + V_Filedname + "").text(TextSpan);


}

function FuncToggleUsageTypeJIntoJqGrid(Element) {
    distanceBetweenElemsIntoJqGrid(Element);

    var V_FieldName = $(Element).attr("AtrrV_FieldName");
    var Value_ID = $(Element).attr("ID");
    var GridName = $(Element).attr("GridIntoID");
    $("#" + GridName).find("input[AttrToggle" + V_FieldName + "=1]").closest("div.ClsparentLstItem").find("ul[class!=" + Value_ID + "]").hide();
    $(Element).closest("div.ClsparentLstItem").find("ul").toggle();


}

function distanceBetweenElemsIntoJqGrid(V_Element) {

    var GridName = $(V_Element).attr("GridIntoID");
    var V_FieldName = $(V_Element).attr("AtrrV_FieldName");
    var lstClumns = $("#" + GridName).jqGrid('getGridParam', 'colModel');

    var Sum = 0;
    for (var i = 0; i < lstClumns.length; i++) {
        if (lstClumns[i].hidden == false)
            Sum += parseInt(lstClumns[i].width);
        if (lstClumns[i].name == V_FieldName)
            break;
    }
    Sum = Sum - 70;
    $(V_Element).closest("div.ClsparentLstItem").find("ul").css("right", Sum + "px");

}

function SaveMultiSelectIntoJqGrid(Element, RowID, V_FieldName) {
    var Text_CheckBoxID = "";
    V_FieldName = "_" + V_FieldName;
    var Query_UsageTypeJ = $(Element).find("#" + RowID + V_FieldName).closest("div").find("ul").find("input[type=checkbox]:checked");
    for (var j = 0; j < Query_UsageTypeJ.length; j++) {

        var Value_CheckBox = $($(Query_UsageTypeJ)[j]).attr("AttrID_CheckBox");
        if (Value_CheckBox != 0) {

            Text_CheckBoxID += Value_CheckBox + ",";
        }
    }
    if (Text_CheckBoxID.trim().length != 0) {
        Text_CheckBoxID = Text_CheckBoxID.substring(0, Text_CheckBoxID.length - 1);
        Text_CheckBoxID = "[" + Text_CheckBoxID + "]";
    }

    return Text_CheckBoxID;
}

function LoadComplateJqgridSelectIntoJqGrid(GridName, NameFiledKeyGrid, NameHelpFiled) {
    //GridName نام گرید
    //NameFiledKeyGrid نام کلید اصلی گرید
    //NameHelpFiled نام فیلد کمکی
    var QueryModelData = $(GridName).jqGrid('getRowData');



    for (var i = 0; i < QueryModelData.length; i++) {

        var ValueHelpUsageTypeJ = String(QueryModelData[i][NameHelpFiled]);
        var RowID_Grid = QueryModelData[i][NameFiledKeyGrid];

        if (ValueHelpUsageTypeJ != "null") {
            ValueHelpUsageTypeJ = ValueHelpUsageTypeJ.substring(1, ValueHelpUsageTypeJ.length - 1);


            var AllCheckBox_Count = $(GridName).find("tr#" + RowID_Grid).find("ul." + RowID_Grid + "_UsageTypeJ").find("input[type=checkbox][AttrID_CheckBox]").length;
            var AllChecked_Count = ValueHelpUsageTypeJ.split(",").length;
            AllCheckBox_Count = parseInt(AllCheckBox_Count) - parseInt(1);
            if (AllCheckBox_Count == AllChecked_Count) {
                $(GridName).find("tr#" + RowID_Grid).find("ul." + RowID_Grid + "_UsageTypeJ").find("input[type=checkbox][AttrID_CheckBox=0]").prop("checked", true);
            }

            var Value_TextCheckBox = "";

            for (var j = 0; j < ValueHelpUsageTypeJ.split(",").length; j++) {
                var ItemID = String(ValueHelpUsageTypeJ.split(",")[j]).trim();
                if (ItemID.length != 0) {
                    $(GridName).find("tr#" + RowID_Grid).find("ul." + RowID_Grid + "_UsageTypeJ").find("input[type=checkbox][AttrID_CheckBox=" + ItemID + "]").prop("checked", true);
                    Value_TextCheckBox += String($(GridName).find("tr#" + RowID_Grid).find("ul." + RowID_Grid + "_UsageTypeJ").find("input[type=checkbox][AttrID_CheckBox=" + ItemID + "]").attr("AttrText_CheckBox")).trim() + '،';
                }
            }
            Value_TextCheckBox = String(Value_TextCheckBox).trim().length == 0 ? Value_TextCheckBox : Value_TextCheckBox.substring(0, Value_TextCheckBox.trim().length - 1);
            $(GridName).find("tr#" + RowID_Grid).find("span.SpanTxt").text(Value_TextCheckBox);
            $(GridName).find("tr#" + RowID_Grid).find("input[AttrToggleUsageTypeJ=1]").hide();

        }

    }
}
//--------------atash-----------------------------------
function addremoveClassshowLoading(type) {

    if (type == 1) {
        $(".loadingCustom").addClass("showLoading");
        $(".loadingCustom").attr("AttshowLoading", "1");
    }
    if (type == 0) {

        $(".loadingCustom").removeClass("showLoading");
        $(".loadingCustom").attr("AttshowLoading", "0");
    }
}
//--------------atash----------------------------------
//**********************************************************************************************************

function ExcuteAjaxjQuery(UrlAction, ObjectData, ImagePleaseWaiteID = null, BtnActionShowHideID = null, MyElement = null,IsLoading=1) {
    //$(".loadingCustom").removeClass("showLoading");
    var Result = new Promise((resolve, reject) => {
        $.ajax({
            url: UrlAction,
            data: AddAntiForgeryTokenAjaxjQuery(ObjectData),
            type: "post",
            datatype: "json",
            beforeSend: function () {

                if (UrlAction != "/Home/GetPageThatUseQuickAccess") {
                    if (IsLoading == 1) {
                        var AttshowLoading = $(".loadingCustom").attr("AttshowLoading");
                        if (AttshowLoading == 0) {
                            $(".loadingCustom").addClass("showLoading");
                        }
                    }                 
                }

                if (ImagePleaseWaiteID != null) {
                    $("#" + ImagePleaseWaiteID).show();
                }

                if (BtnActionShowHideID != null) {
                    $("#" + BtnActionShowHideID).hide();
                    $("#" + BtnActionShowHideID).css("visibility", "hidden");


                    $("." + BtnActionShowHideID).hide();
                    $("." + BtnActionShowHideID).css("visibility", "hidden");
                }
                 

                if (MyElement != null) {
                    $(MyElement).hide();
                    $(MyElement).css("visibility", "hidden");
                }


            },
            complete: function () {

                if (IsLoading == 1) {
                    var AttshowLoading = $(".loadingCustom").attr("AttshowLoading");
                    if (AttshowLoading == 0) {
                        $(".loadingCustom").removeClass("showLoading");
                    }
                    else {
                        $(".loadingCustom").addClass("showLoading");
                    }
                }

                if (ImagePleaseWaiteID != null) {
                    $("#" + ImagePleaseWaiteID).hide();

                }
                if (BtnActionShowHideID != null) {

                    $("#" + BtnActionShowHideID).show();
                    $("#" + BtnActionShowHideID).css("visibility", "visible");


                    $("." + BtnActionShowHideID).show();
                    $("." + BtnActionShowHideID).css("visibility", "visible");

                }

                if (MyElement != null) {
                    $(MyElement).show();
                    $(MyElement).css("visibility", "visible");
                }
            },
            success: function (data) {
                resolve(data);
            }
        })
    });
    return Result;
}

AddAntiForgeryTokenAjaxjQuery = function (data) {
    data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
    return data;
};

//*********************************************************************************************

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

//*******************************************************************************************
function SuccessMsg(msg,timeSecend=4) {

    hrb_notify([
        'success',
        msg,
        'topRight',
        'rollIn',
        'rollOut',
        timeSecend
    ]);

}

function ErrorMsg(msg, timeSecend = 4) {

    hrb_notify([
        'danger',
        msg,
        'topRight',
        'rollIn',
        'rollOut',
        timeSecend
    ]);
}

function NotifyMsg(msg) {

    hrb_notify([
        'history',
        msg,
        'topLeft',
        'bounceIn',
        'rollOut',
        '50'
    ]);
}

function infoMsg(msg) {

    hrb_notify([
        'info',
        msg,
        'topLeft',
        'bounceIn',
        'rollOut',
        '50'
    ]);
}
function HrbCreateDatetimePicker() {
    $('.datePopup').each(function () {
        var $tDate = $(this);

        $tDate.children(".icon").click(function () {
            var elTopPosition = $tDate.offset().top;
            var $th = $(this).parent();
            if (parseInt(elTopPosition) > 500) {
                $th.addClass("top")
            }
            if ($th.hasClass("show"))
                $th.removeClass('show');
            else
                $th.addClass('show');
        })
        $("i.bg").click(function () {
            $('.datePopup').removeClass('show');
        });
        $tDate.children(".showDatePicker").MdPersianDateTimePicker({
            targetTextSelector: $tDate.children("input"),
            inLine: true,
            // enableTimePicker: true,
            toDate: true,
            groupId: 'date6-7-range'
        });
    });
}

function HrbCreateElementHtml(DivReplaceLocation, ElementID, labelName) {
    var Text = "";
    Text += ' <div class="inputSearch datePopup">';
    Text += '<i class="bg"></i>';
    Text += '<i class="icon fas fa-calendar-alt"></i>';
    Text += '<label>' + labelName + ' </label>';
    Text += ' <input type="text" id="' + ElementID + '" name="min" />';
    Text += ' <div class="showDatePicker"></div>';
    Text += '</div>';
    $("#" + DivReplaceLocation).html(Text);
}

//***********************************************************************************************
//Confirm
function HrbConfirmCustoms(IconTitle, Title, Msg, IconButton) {

    var Result = new Promise((resolve, reject) => {
        hrb_alert(
            [
                IconTitle, //['danger','success','warning','info']
                Title,
                Msg,
                IconButton, //['ok','okCancel','sendCancel','delCancel','cancel']
                'بله',
                'خیر',
            ], function hrb_success(e) {

                resolve(true);

            }, function hrb_cancel(e) {

                resolve(false);

            }
        );
    });
    return Result;

}


//*************************************************************************************************
//Create Template file and File


function FuncCreateIconFile(QueryFiles, Array_FileExtension, BeforeImageDocumentFileID, DivReplaceID) {


    var TextElementFile = "";
    for (var i = 0; i < QueryFiles.length; i++) {
        TextElementFile += CreateTemplateFile(QueryFiles[i].Title, BeforeImageDocumentFileID, QueryFiles[i].ID, QueryFiles[i].EncryptID, QueryFiles[i].FileDocumentTypeTitle)
    }
    $("#" + DivReplaceID).html(TextElementFile);

    for (var i = 0; i < QueryFiles.length; i++) {

        var V_File_DocumentID = QueryFiles[i].ID;
        var V_OrginalFileName = QueryFiles[i].OrginalFileName;
        LoadIconByExtensionTitle(Array_FileExtension, V_OrginalFileName, BeforeImageDocumentFileID, V_File_DocumentID, DivReplaceID);
    }


}


function LoadIconByExtensionTitle(Array_FileExtension, NameFile, BeforeImageDocumentFileID, V_ImageDocumentFileID, DivReplaceID) {


    var PicName = "";
    var LenSplit = String(NameFile).split(".").length;

    var ExtentionTitle = String(String(NameFile).split(".")[LenSplit - 1]).toLowerCase();

    var FindExtentionFile = $.grep(Array_FileExtension, function (e) { return String(e.Title).toLowerCase() == ExtentionTitle });

    if (FindExtentionFile.length != 0) {
        var V_ExtensionID = FindExtentionFile[0].ID;
        if (V_ExtensionID == 1 || V_ExtensionID == 2)//JPG
        {
            PicName = "../Images/ExtensionIcons/jpg.png";
        }
        if (V_ExtensionID == 3)//bmp
        {
            PicName = "../Images/ExtensionIcons/bmp.png";
        }
        if (V_ExtensionID == 4 || V_ExtensionID == 5)//tif
        {
            PicName = "../Images/ExtensionIcons/tif.png";
        }
        if (V_ExtensionID == 6)//png
        {
            PicName = "../Images/ExtensionIcons/png.png";
        }

        if (V_ExtensionID == 7 || V_ExtensionID == 8)//word
        {
            PicName = "../Images/ExtensionIcons/WordIcon.png";
        }
        if (V_ExtensionID == 9)//pdf
        {
            PicName = "../Images/ExtensionIcons/PdfIcon.png";
        }
        if (V_ExtensionID == 10)//zip
        {
            PicName = "../Images/ExtensionIcons/ZipIcon.png";
        }
        if (V_ExtensionID == 11)//rar
        {
            PicName = "../Images/ExtensionIcons/RarIcon.png";
        }
        if (V_ExtensionID == 12)//pptx
        {
            PicName = "../Images/ExtensionIcons/PPTXIcon.png";
        }
        if (V_ExtensionID == 13)//dwg
        {
            PicName = "../Images/ExtensionIcons/DWGIcon.png";
        }
        if (V_ExtensionID == 14)//ppt
        {
            PicName = "../Images/ExtensionIcons/PPTXIcon.png";
        }

        if (V_ExtensionID == 15)//sdb Icon
        {
            PicName = "../Images/ExtensionIcons/SdbIcon.png";
        }
        if (V_ExtensionID == 16)//Xlsx Icon
        {
            PicName = "../Images/ExtensionIcons/XlsxIcon.png";
        }

        if (V_ExtensionID == 17)// Kmz Icon
        {
            PicName = "../Images/ExtensionIcons/KmzIcon.png";
        }

        if (V_ExtensionID == 18)// Lyr Icon
        {
            PicName = "../Images/ExtensionIcons/LyrIcon.png";
        }

        if (V_ExtensionID == 19)// Psd Icon
        {
            PicName = "../Images/ExtensionIcons/PsdIcon.png";
        }



    } else {
        PicName = "../Images/ExtensionIcons/NotFoundIcon.png";
    }


    $("#" + DivReplaceID).find("#" + BeforeImageDocumentFileID + V_ImageDocumentFileID).attr("src", PicName);

}

function CreateTemplateFile(ParamFileName, BeforeParamFileID, ParamFileID, ParamEncryptID, FileTypeTitle) {

    var FileText = "";
    FileText += "<div class='col-sm-2 itemFileShow' style='margin-top:6px;margin-bottom:10px;'>"
    FileText += '<img src="" AttrParamFileID=' + ParamFileID + '     AttrParamEncryptID=' + ParamEncryptID + '    style="width: 100%;cursor: pointer;" id=' + BeforeParamFileID + ParamFileID + ' onclick="FuncDownloadFiles(this);" />';
    FileText += "<div style='height: 60px;width: 100%;overflow:auto;font-size: 12px;'>" + ParamFileName + "(" + FileTypeTitle + ")</div>";
    FileText += "</div>"
    return FileText;

}

function FuncDownloadFiles(Element) {

    var ParamFileID = $(Element).attr("AttrParamFileID");
    var ParamEncryptID = $(Element).attr("AttrParamEncryptID");
    window.open("/Lookup/DownloadtblFile_DocumentFiles?Value_AttrImgDownloadFileFile_DocumentsID=" + ParamFileID + "&Value_AttrEncryptID=" + ParamEncryptID);

}

//**************************************************************************************************


