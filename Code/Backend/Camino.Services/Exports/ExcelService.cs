using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.Icds;
using Camino.Data;
using Camino.Services.Exports;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Collections;
using System.Drawing;

namespace Camino.Services.QuanTris.NhomPhongKhams
{
    [ScopedDependency(ServiceType = typeof(IExcelService))]
    public class ExcelService : MasterFileService<Icd>, IExcelService
    {
        public ExcelService(IRepository<Icd> repository) : base(repository)
        {
        }

        public byte[] ExportManagermentView<T>(List<T> lstModel, List<(string, string)> valueObject, string titleName, int indexStartChildGrid, string labelName = null, bool isAutomaticallyIncreasesSTT = false)
        {
            //
            using (var stream = new MemoryStream())
            {
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                using (var xlPackage = new ExcelPackage(stream))
                {

                    var classChildName = typeof(T).Name + "Child";
                    var worksheet = xlPackage.Workbook.Worksheets.Add(titleName);


                    //set column header
                    worksheet.Cells[2, 1].Value = "STT";
                    worksheet = SetStyleForHeader(worksheet, 2, 1);

                    #region get group value
                    //check parent grid have group
                    var keyNamePropertyGroupParent = string.Empty;
                    var lstGroupStringParent = new List<string>();

                    var keyNamePropertyGroupChildrent = string.Empty;
                    var lstGroupStringChildrent = new List<string>();
                    var totalColumnChildrent = 1;

                    var typeParentForCheckGroup = typeof(T);
                    foreach (var prop in typeParentForCheckGroup.GetProperties())
                    {
                        if (prop.CustomAttributes.Any(p => p.AttributeType == typeof(GroupAttribute)))
                        {
                            keyNamePropertyGroupParent = prop.Name;
                        }

                        if (classChildName.Equals(prop.Name))
                        {
                            var typeOfClassChild = prop.PropertyType.GetProperty("Item")?.PropertyType;
                            if (typeOfClassChild != null)
                            {
                                foreach (var propChild in typeOfClassChild.GetProperties())
                                {
                                    if (propChild.CustomAttributes.Any(p => p.AttributeType == typeof(GroupAttribute)))
                                    {
                                        keyNamePropertyGroupChildrent = propChild.Name;
                                    }
                                    else
                                    {
                                        totalColumnChildrent++;
                                    }
                                }
                            }

                        }
                    }

                    //set title for excel
                    var rangeObject = valueObject.Where(p => p.Item1 != keyNamePropertyGroupParent).ToList().Count + 1;
                    var totalColumnParent = valueObject.Where(p => p.Item1 != keyNamePropertyGroupParent).ToList().Count + 1;

                    var labelNameTitle = !string.IsNullOrEmpty(labelName) ? labelName.ToUpper() : (titleName).ToUpper();

                    using (var range = worksheet.Cells[1, 2, lstModel.Count + 1, 2])
                    {
                        range.Worksheet.Cells[1, 1, 1, rangeObject].Merge = true;
                        range.Worksheet.Cells[1, 1, 1, rangeObject].Value = labelNameTitle;
                        range.Worksheet.Cells[1, 1, 1, rangeObject].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                        range.Worksheet.Cells[1, 1, 1, rangeObject].Style.Font.SetFromFont("Times New Roman", 16);
                        range.Worksheet.Cells[1, 1, 1, rangeObject].Style.Font.Color.SetColor(Color.Black);
                        range.Worksheet.Cells[1, 1, 1, rangeObject].Style.Font.Bold = true;
                    }

                    if (!string.IsNullOrEmpty(keyNamePropertyGroupParent) || !string.IsNullOrEmpty(keyNamePropertyGroupChildrent))
                    {
                        foreach (var item in lstModel)
                        {
                            foreach (var column in valueObject)
                            {
                                var columnKey = column.Item1;

                                //child
                                if (classChildName.Equals(columnKey))
                                {
                                    var columnValue = GetPropValue(item, columnKey);
                                    var totalChildItemObject = GetPropValue(columnValue, "Count").ToString();
                                    int.TryParse(totalChildItemObject, out var totalChildItem);

                                    //is have item child
                                    if (totalChildItem != 0)
                                    {
                                        var typeOfChildItem = columnValue.GetType().GetProperty("Item")?.PropertyType;
                                        if (typeOfChildItem != null)
                                        {
                                            var enumerable = columnValue as IEnumerable;
                                            var lstItemChild = enumerable?.Cast<object>().ToList();
                                            if (lstItemChild != null)
                                            {
                                                foreach (var itemChild in lstItemChild)
                                                {
                                                    foreach (var propChild in itemChild.GetType().GetProperties())
                                                    {
                                                        if (!propChild.CanRead || !propChild.CanWrite)
                                                            continue;
                                                        if (keyNamePropertyGroupChildrent.Equals(propChild.Name))
                                                        {
                                                            var columnChildValue = GetPropValue(itemChild, propChild.Name);
                                                            if (!lstGroupStringChildrent.Any(p => p.Equals(columnChildValue)))
                                                            {
                                                                lstGroupStringChildrent.Add(columnChildValue + "");
                                                            }
                                                        }

                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                //parent
                                else
                                {
                                    var type = typeof(T);
                                    foreach (var prop in type.GetProperties())
                                    {
                                        if (!prop.CanRead || !prop.CanWrite)
                                            continue;
                                        if (prop.Name.Equals(columnKey) && keyNamePropertyGroupParent.Equals(columnKey))
                                        {
                                            var columnValue = GetPropValue(item, columnKey);
                                            if (!lstGroupStringParent.Any(p => p.Equals(columnValue)))
                                            {
                                                lstGroupStringParent.Add(columnValue + "");
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //
                    #endregion get group value

                    if (string.IsNullOrEmpty(keyNamePropertyGroupParent) && !lstGroupStringParent.Any())
                    {
                        #region without group of parent

                        var index = 2;
                        foreach (var column in valueObject)
                        {
                            var columnName = column.Item2;
                            var columnKey = column.Item1;

                            if (!classChildName.Equals(columnKey))
                            {
                                worksheet.Cells[2, index].Value = columnName;
                                worksheet = SetStyleForHeader(worksheet, 2, index);

                                index++;
                            }
                        }
                        //index value start is 3
                        var indexValue = 3;
                        var STT = 1;

                        foreach (var item in lstModel)
                        {
                            //STT
                            worksheet.Cells[indexValue, 1].Value = STT;
                            worksheet = SetStyleForDataTable(worksheet, indexValue, 1);
                            //index value start is A
                            var indexColumn = 2;

                            foreach (var column in valueObject)
                            {
                                //
                                var columnKey = column.Item1;
                                double height = 20;
                                double width = 20;
                                //
                                var type = typeof(T);
                                foreach (var prop in type.GetProperties())
                                {
                                    if (!prop.CanRead || !prop.CanWrite)
                                        continue;
                                    if (prop.Name.Equals(columnKey) && prop.CustomAttributes.Any())
                                    {
                                        double.TryParse(
                                            prop.CustomAttributes.FirstOrDefault(p => p.AttributeType == typeof(WidthAttribute))?
                                            .ConstructorArguments.Select(x => x.Value).ToList()[0] +
                                            "", out height);
                                        double.TryParse(
                                            prop.CustomAttributes.FirstOrDefault(p => p.AttributeType == typeof(WidthAttribute))?
                                                .ConstructorArguments.Select(x => x.Value).ToList()[0] +
                                            "", out width);
                                    }
                                }
                                //
                                if (!classChildName.Equals(columnKey))
                                {
                                    //
                                    var attributeTextAlign = GetTextAlignAttributeValue(item, columnKey);
                                    worksheet = SetStyleForDataTable(worksheet, indexValue, indexColumn, attributeTextAlign);
                                    //
                                    worksheet.Column(indexColumn).Width = width;
                                    var columnValue = GetPropValue(item, columnKey);
                                    worksheet.Cells[indexValue, indexColumn].Value = columnValue;
                                }
                                //set value for grid child
                                else
                                {
                                    var columnValue = GetPropValue(item, columnKey);
                                    var totalChildItemObject = GetPropValue(columnValue, "Count").ToString();
                                    int.TryParse(totalChildItemObject, out var totalChildItem);

                                    //is have item child
                                    if (totalChildItem != 0)
                                    {
                                        var typeOfChildItem = columnValue.GetType().GetProperty("Item")?.PropertyType;
                                        if (typeOfChildItem != null)
                                        {
                                            //Set header for grid child
                                            indexValue++;
                                            //STT for grid child
                                            worksheet.Cells[indexValue, indexStartChildGrid].Value = "STT";
                                            worksheet = SetStyleForHeader(worksheet, indexValue, indexStartChildGrid);


                                            var indexColumnChild = indexStartChildGrid + 1;

                                            foreach (var propChild in typeOfChildItem.GetProperties())
                                            {
                                                //Reject header of group
                                                if (propChild.Name.Equals(keyNamePropertyGroupChildrent)) continue;
                                                //
                                                if (propChild.CustomAttributes.Any())
                                                {
                                                    var titleChild = propChild.CustomAttributes.FirstOrDefault(p => p.AttributeType == typeof(TitleGridChildAttribute))?
                                                                         .ConstructorArguments.Select(x => x.Value).ToList()[0] + "";

                                                    worksheet.Cells[indexValue, indexColumnChild].Value = titleChild;
                                                    worksheet = SetStyleForHeader(worksheet, indexValue, indexColumnChild);

                                                    int.TryParse(propChild.CustomAttributes.FirstOrDefault(p =>
                                                                         p.AttributeType == typeof(WidthAttribute))?
                                                                     .ConstructorArguments.Select(x => x.Value).ToList()[0] + "", out var widthChild);

                                                    if (widthChild != 0)
                                                    {
                                                        worksheet.Column(indexColumnChild).Width = widthChild;
                                                    }

                                                    indexColumnChild++;
                                                }
                                            }

                                            if (string.IsNullOrEmpty(keyNamePropertyGroupChildrent) && !lstGroupStringChildrent.Any())
                                            {
                                                #region without group of childrent

                                                indexValue++;
                                                //Set item for grid child
                                                var enumerable = columnValue as IEnumerable;
                                                var lstItemChild = enumerable?.Cast<object>().ToList();
                                                if (lstItemChild != null)
                                                {
                                                    var STTChild = 1;
                                                    var countItemChild = 0;
                                                    foreach (var itemChild in lstItemChild)
                                                    {
                                                        var indexColumnChildItem = indexStartChildGrid + 1;
                                                        //STT Child
                                                        worksheet.Cells[indexValue, indexStartChildGrid].Value = STTChild;
                                                        worksheet = SetStyleForDataTable(worksheet, indexValue, indexStartChildGrid);

                                                        foreach (var propChild in itemChild.GetType().GetProperties())
                                                        {
                                                            var columnChildValue = GetPropValue(itemChild, propChild.Name);
                                                            //set value item
                                                            worksheet.Cells[indexValue, indexColumnChildItem].Value = columnChildValue;

                                                            //
                                                            var attributeTextAlign = GetTextAlignAttributeValue(itemChild, propChild.Name);
                                                            worksheet = SetStyleForDataTable(worksheet, indexValue, indexColumnChildItem, attributeTextAlign);
                                                            //

                                                            //worksheet = SetStyleForDataTable(worksheet, indexValue, indexColumnChildItem);

                                                            indexColumnChildItem++;
                                                        }

                                                        //set last column for value
                                                        worksheet.Cells[indexValue, indexColumnChildItem].Value = "";

                                                        STTChild++;
                                                        countItemChild++;

                                                        if (countItemChild < totalChildItem)
                                                        {
                                                            indexValue++;
                                                        }
                                                    }
                                                }
                                                #endregion without group of childrent
                                            }
                                            else
                                            {
                                                #region with group of childrent

                                                indexValue++;
                                                //Set item for grid child
                                                var enumerable = columnValue as IEnumerable;
                                                var lstItemChild = enumerable?.Cast<object>().ToList();
                                                if (lstItemChild != null)
                                                {
                                                    //group

                                                    //get group name of child grid
                                                    var lstGroupStringChildrentCurrent = new List<string>();
                                                    foreach (var itemChild in lstItemChild)
                                                    {
                                                        foreach (var propChild in itemChild.GetType().GetProperties())
                                                        {
                                                            if (!propChild.CanRead || !propChild.CanWrite)
                                                                continue;
                                                            if (keyNamePropertyGroupChildrent.Equals(propChild.Name))
                                                            {
                                                                var columnChildValue = GetPropValue(itemChild, propChild.Name);
                                                                if (!lstGroupStringChildrentCurrent.Any(p => p.Equals(columnChildValue)))
                                                                {
                                                                    lstGroupStringChildrentCurrent.Add(columnChildValue + "");
                                                                }
                                                            }

                                                        }
                                                    }
                                                    //

                                                    var countItemChild = 0;
                                                    foreach (var groupChildName in lstGroupStringChildrentCurrent)
                                                    {

                                                        var STTChild = 1;
                                                        //set group name
                                                        worksheet.Cells[indexValue, indexStartChildGrid, indexValue,
                                                            indexStartChildGrid + totalColumnChildrent].Merge = true;
                                                        worksheet.Cells[indexValue, indexStartChildGrid, indexValue,
                                                            indexStartChildGrid + totalColumnChildrent].Value = groupChildName;
                                                        worksheet = SetStyleForGroup(worksheet, indexValue, indexStartChildGrid, indexValue,
                                                            indexStartChildGrid + totalColumnChildrent);

                                                        indexValue++;
                                                        //
                                                        foreach (var itemChild in lstItemChild)
                                                        {
                                                            var groupNameItemChild = GetPropValue(itemChild, keyNamePropertyGroupChildrent);
                                                            if (groupNameItemChild.Equals(groupChildName))
                                                            {
                                                                var indexColumnChildItem = indexStartChildGrid + 1;
                                                                //STT Child
                                                                worksheet.Cells[indexValue, indexStartChildGrid].Value = STTChild;
                                                                worksheet = SetStyleForDataTable(worksheet, indexValue, indexStartChildGrid);

                                                                foreach (var propChild in itemChild.GetType().GetProperties())
                                                                {
                                                                    //Reject column grid
                                                                    if (propChild.Name.Equals(keyNamePropertyGroupChildrent)) continue;
                                                                    //
                                                                    var columnChildValue = GetPropValue(itemChild, propChild.Name);
                                                                    //set value item
                                                                    worksheet.Cells[indexValue, indexColumnChildItem].Value = columnChildValue;
                                                                    //worksheet = SetStyleForDataTable(worksheet, indexValue, indexColumnChildItem);
                                                                    //
                                                                    var attributeTextAlign = GetTextAlignAttributeValue(itemChild, propChild.Name);
                                                                    worksheet = SetStyleForDataTable(worksheet, indexValue, indexColumnChildItem, attributeTextAlign);
                                                                    //

                                                                    indexColumnChildItem++;
                                                                }

                                                                //set last column for value
                                                                worksheet.Cells[indexValue, indexColumnChildItem].Value = "";

                                                                STTChild++;
                                                                countItemChild++;
                                                                if (countItemChild < totalChildItem)
                                                                {
                                                                    indexValue++;
                                                                }
                                                            }

                                                        }
                                                        //indexValue--;
                                                    }
                                                    //

                                                }
                                                #endregion with group of childrent
                                            }


                                            // var xm = JsonConvert.DeserializeObject<List<BenhNhanExportExcelChild>>((string)columnValue);
                                        }
                                    }
                                    //foreach (var itemChild in columnValue.)
                                    //{

                                    //}
                                }


                                indexColumn++;
                            }

                            //đm éo hiểu trước mình code kiểu gì
                            //worksheet.Cells[indexValue, indexColumn].Value = "";

                            indexValue++;
                            STT++;
                        }

                        #endregion without group of parent
                    }
                    else
                    {
                        #region with group of parent

                        var index = 2;
                        foreach (var column in valueObject)
                        {
                            var columnName = column.Item2;
                            var columnKey = column.Item1;
                            //Reject header of group
                            if (columnKey.Equals(keyNamePropertyGroupParent)) continue;
                            //
                            if (!classChildName.Equals(columnKey))
                            {
                                worksheet.Cells[4, index].Value = columnName;
                                worksheet = SetStyleForHeader(worksheet, 4, index);

                                index++;
                            }
                        }
                        //index value start is 5
                        var indexValue = 5;

                        //group for parent grid
                        var STT = 1;
                        foreach (var groupParentName in lstGroupStringParent)
                        {
                            //set group name
                            worksheet.Cells[indexValue, 1, indexValue,
                                totalColumnParent].Merge = true;
                            worksheet.Cells[indexValue, 1, indexValue,
                                totalColumnParent].Value = groupParentName;
                            worksheet = SetStyleForGroup(worksheet, indexValue, 1, indexValue,
                                totalColumnParent);

                            indexValue++;
                            //
                            if (!isAutomaticallyIncreasesSTT)//STT tăng liên tục
                            {
                                STT = 1;
                            }
                            foreach (var item in lstModel)
                            {
                                var groupNameItem = GetPropValue(item, keyNamePropertyGroupParent);
                                if (!groupNameItem.Equals(groupParentName)) continue;

                                //STT
                                worksheet.Cells[indexValue, 1].Value = STT;
                                worksheet = SetStyleForDataTable(worksheet, indexValue, 1);
                                //index value start is A
                                var indexColumn = 2;

                                foreach (var column in valueObject)
                                {
                                    //
                                    var columnKey = column.Item1;
                                    double height = 20;
                                    double width = 20;
                                    //
                                    if (columnKey.Equals(keyNamePropertyGroupParent)) continue;
                                    //
                                    var type = typeof(T);
                                    foreach (var prop in type.GetProperties())
                                    {
                                        if (!prop.CanRead || !prop.CanWrite)
                                            continue;
                                        if (prop.Name.Equals(columnKey) && prop.CustomAttributes.Any())
                                        {
                                            double.TryParse(
                                                prop.CustomAttributes.FirstOrDefault(p => p.AttributeType == typeof(WidthAttribute))?
                                                .ConstructorArguments.Select(x => x.Value).ToList()[0] +
                                                "", out height);
                                            double.TryParse(
                                                prop.CustomAttributes.FirstOrDefault(p => p.AttributeType == typeof(WidthAttribute))?
                                                    .ConstructorArguments.Select(x => x.Value).ToList()[0] +
                                                "", out width);
                                        }
                                    }
                                    //
                                    if (!classChildName.Equals(columnKey))
                                    {
                                        worksheet.Column(indexColumn).Width = width;
                                        //worksheet = SetStyleForDataTable(worksheet, indexValue, indexColumn);
                                        //
                                        var attributeTextAlign = GetTextAlignAttributeValue(item, columnKey);
                                        worksheet = SetStyleForDataTable(worksheet, indexValue, indexColumn, attributeTextAlign);
                                        //
                                        var columnValue = GetPropValue(item, columnKey);
                                        worksheet.Cells[indexValue, indexColumn].Value = columnValue;
                                    }
                                    //set value for grid child
                                    else
                                    {
                                        var columnValue = GetPropValue(item, columnKey);
                                        var totalChildItemObject = GetPropValue(columnValue, "Count").ToString();
                                        int.TryParse(totalChildItemObject, out var totalChildItem);

                                        //is have item child
                                        if (totalChildItem != 0)
                                        {
                                            var typeOfChildItem = columnValue.GetType().GetProperty("Item")?.PropertyType;
                                            if (typeOfChildItem != null)
                                            {
                                                //Set header for grid child
                                                indexValue++;
                                                //STT for grid child
                                                worksheet.Cells[indexValue, indexStartChildGrid].Value = "STT";
                                                worksheet = SetStyleForHeader(worksheet, indexValue, indexStartChildGrid);


                                                var indexColumnChild = indexStartChildGrid + 1;

                                                foreach (var propChild in typeOfChildItem.GetProperties())
                                                {
                                                    if (propChild.Name.Equals(keyNamePropertyGroupChildrent)) continue;
                                                    if (propChild.CustomAttributes.Any())
                                                    {
                                                        var titleChild = propChild.CustomAttributes.FirstOrDefault(p => p.AttributeType == typeof(TitleGridChildAttribute))?
                                                                             .ConstructorArguments.Select(x => x.Value).ToList()[0] + "";

                                                        worksheet.Cells[indexValue, indexColumnChild].Value = titleChild;
                                                        worksheet = SetStyleForHeader(worksheet, indexValue, indexColumnChild);

                                                        int.TryParse(propChild.CustomAttributes.FirstOrDefault(p =>
                                                                             p.AttributeType == typeof(WidthAttribute))?
                                                                         .ConstructorArguments.Select(x => x.Value).ToList()[0] + "", out var widthChild);

                                                        if (widthChild != 0)
                                                        {
                                                            worksheet.Column(indexColumnChild).Width = widthChild;
                                                        }

                                                        indexColumnChild++;
                                                    }
                                                }

                                                if (string.IsNullOrEmpty(keyNamePropertyGroupChildrent) && !lstGroupStringChildrent.Any())
                                                {
                                                    #region without group of childrent

                                                    indexValue++;
                                                    //Set item for grid child
                                                    var enumerable = columnValue as IEnumerable;
                                                    var lstItemChild = enumerable?.Cast<object>().ToList();
                                                    if (lstItemChild != null)
                                                    {
                                                        var STTChild = 1;
                                                        var countItemChild = 0;
                                                        foreach (var itemChild in lstItemChild)
                                                        {
                                                            var indexColumnChildItem = indexStartChildGrid + 1;
                                                            //STT Child
                                                            worksheet.Cells[indexValue, indexStartChildGrid].Value = STTChild;
                                                            worksheet = SetStyleForDataTable(worksheet, indexValue, indexStartChildGrid);

                                                            foreach (var propChild in itemChild.GetType().GetProperties())
                                                            {
                                                                var columnChildValue = GetPropValue(itemChild, propChild.Name);
                                                                //set value item
                                                                worksheet.Cells[indexValue, indexColumnChildItem].Value = columnChildValue;
                                                                //worksheet = SetStyleForDataTable(worksheet, indexValue, indexColumnChildItem);
                                                                //
                                                                var attributeTextAlign = GetTextAlignAttributeValue(itemChild, propChild.Name);
                                                                worksheet = SetStyleForDataTable(worksheet, indexValue, indexColumnChildItem, attributeTextAlign);
                                                                //

                                                                indexColumnChildItem++;
                                                            }

                                                            //set last column for value
                                                            worksheet.Cells[indexValue, indexColumnChildItem].Value = "";

                                                            STTChild++;
                                                            countItemChild++;

                                                            if (countItemChild < totalChildItem)
                                                            {
                                                                indexValue++;
                                                            }
                                                        }
                                                    }
                                                    #endregion without group of childrent
                                                }
                                                else
                                                {
                                                    #region with group of childrent

                                                    indexValue++;
                                                    //Set item for grid child
                                                    var enumerable = columnValue as IEnumerable;
                                                    var lstItemChild = enumerable?.Cast<object>().ToList();
                                                    if (lstItemChild != null)
                                                    {
                                                        //group

                                                        //get group name of child grid
                                                        var lstGroupStringChildrentCurrent = new List<string>();
                                                        foreach (var itemChild in lstItemChild)
                                                        {
                                                            foreach (var propChild in itemChild.GetType().GetProperties())
                                                            {
                                                                //if (propChild.Name.Equals(keyNamePropertyGroupChildrent)) continue;
                                                                if (!propChild.CanRead || !propChild.CanWrite)
                                                                    continue;
                                                                if (keyNamePropertyGroupChildrent.Equals(propChild.Name))
                                                                {
                                                                    var columnChildValue = GetPropValue(itemChild, propChild.Name);
                                                                    if (!lstGroupStringChildrentCurrent.Any(p => p.Equals(columnChildValue)))
                                                                    {
                                                                        lstGroupStringChildrentCurrent.Add(columnChildValue + "");
                                                                    }
                                                                }

                                                            }
                                                        }
                                                        //
                                                        var countItemChild = 0;

                                                        foreach (var groupChildName in lstGroupStringChildrentCurrent)
                                                        {
                                                            var STTChild = 1;
                                                            //set group name
                                                            worksheet.Cells[indexValue, indexStartChildGrid, indexValue,
                                                                indexStartChildGrid + totalColumnChildrent].Merge = true;
                                                            worksheet.Cells[indexValue, indexStartChildGrid, indexValue,
                                                                indexStartChildGrid + totalColumnChildrent].Value = groupChildName;
                                                            worksheet = SetStyleForGroup(worksheet, indexValue, indexStartChildGrid, indexValue,
                                                                indexStartChildGrid + totalColumnChildrent);

                                                            indexValue++;
                                                            //
                                                            foreach (var itemChild in lstItemChild)
                                                            {
                                                                var groupNameItemChild = GetPropValue(itemChild, keyNamePropertyGroupChildrent);
                                                                if (groupNameItemChild.Equals(groupChildName))
                                                                {
                                                                    var indexColumnChildItem = indexStartChildGrid + 1;
                                                                    //STT Child
                                                                    worksheet.Cells[indexValue, indexStartChildGrid].Value = STTChild;
                                                                    worksheet = SetStyleForDataTable(worksheet, indexValue, indexStartChildGrid);

                                                                    foreach (var propChild in itemChild.GetType().GetProperties())
                                                                    {
                                                                        //
                                                                        if (propChild.Name.Equals(keyNamePropertyGroupChildrent)) continue;
                                                                        //
                                                                        var columnChildValue = GetPropValue(itemChild, propChild.Name);
                                                                        //set value item
                                                                        worksheet.Cells[indexValue, indexColumnChildItem].Value = columnChildValue;
                                                                        //worksheet = SetStyleForDataTable(worksheet, indexValue, indexColumnChildItem);
                                                                        //
                                                                        var attributeTextAlign = GetTextAlignAttributeValue(itemChild, propChild.Name);
                                                                        worksheet = SetStyleForDataTable(worksheet, indexValue, indexColumnChildItem, attributeTextAlign);
                                                                        //

                                                                        indexColumnChildItem++;
                                                                    }

                                                                    //set last column for value
                                                                    worksheet.Cells[indexValue, indexColumnChildItem].Value = "";

                                                                    STTChild++;
                                                                    countItemChild++;
                                                                    if (countItemChild < totalChildItem)
                                                                    {
                                                                        indexValue++;
                                                                    }
                                                                }
                                                            }
                                                            //indexValue--;
                                                        }
                                                        //

                                                    }
                                                    #endregion with group of childrent
                                                }


                                                // var xm = JsonConvert.DeserializeObject<List<BenhNhanExportExcelChild>>((string)columnValue);
                                            }
                                        }
                                        //foreach (var itemChild in columnValue.)
                                        //{

                                        //}
                                    }


                                    indexColumn++;
                                }

                                worksheet.Cells[indexValue, indexColumn].Value = "";

                                indexValue++;
                                STT++;
                            }
                        }


                        #endregion with group of parent
                    }

                    xlPackage.Save();
                }

                return stream.ToArray();
            }
        }


        private ExcelWorksheet SetStyleForHeader(ExcelWorksheet worksheet, int startCell = 0, int endCell = 0)
        {
            worksheet.Cells[startCell, endCell].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[startCell, endCell].Style.Font.SetFromFont("Times New Roman", 13);
            worksheet.Cells[startCell, endCell].Style.Font.Color.SetColor(Color.Black);
            worksheet.Cells[startCell, endCell].Style.Font.Bold = true;
            worksheet.Cells[startCell, endCell].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[startCell, endCell].Style.Border.Top.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[startCell, endCell].Style.Border.Left.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[startCell, endCell].Style.Border.Right.Style = ExcelBorderStyle.Thin;
            return worksheet;
        }

        private ExcelWorksheet SetStyleForDataTable(ExcelWorksheet worksheet, int startCell = 0, int endCell = 0, string horizontalString = null)
        {
            var horizontal = ExcelHorizontalAlignment.Left;
            if (!string.IsNullOrEmpty(horizontalString))
            {
                switch (horizontalString)
                {
                    case "Right":
                        horizontal = ExcelHorizontalAlignment.Right;
                        break;
                    case "Left":
                        horizontal = ExcelHorizontalAlignment.Left;
                        break;
                    case "Center":
                        horizontal = ExcelHorizontalAlignment.Center;
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
            worksheet.Cells[startCell, endCell].Style.HorizontalAlignment = horizontal;
            worksheet.Cells[startCell, endCell].Style.Font.SetFromFont("Times New Roman", 13);
            worksheet.Cells[startCell, endCell].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[startCell, endCell].Style.Border.Top.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[startCell, endCell].Style.Border.Left.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[startCell, endCell].Style.Border.Right.Style = ExcelBorderStyle.Thin;
            return worksheet;
        }

        private ExcelWorksheet SetStyleForGroup(ExcelWorksheet worksheet, int fromStartCell = 0, int fromEndCell = 0, int toStartCell = 0, int toEndCell = 0)
        {
            worksheet.Cells[fromStartCell, fromEndCell, toStartCell, toEndCell].Style.Font
                .Color
                .SetColor(Color.Black);
            worksheet.Cells[fromStartCell, fromEndCell, toStartCell, toEndCell].Style.Font.SetFromFont("Times New Roman", 13);
            worksheet.Cells[fromStartCell, fromEndCell, toStartCell, toEndCell].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[fromStartCell, fromEndCell, toStartCell, toEndCell].Style.Border.Top.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[fromStartCell, fromEndCell, toStartCell, toEndCell].Style.Border.Left.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[fromStartCell, fromEndCell, toStartCell, toEndCell].Style.Border.Right.Style = ExcelBorderStyle.Thin;
            worksheet.Cells[fromStartCell, fromEndCell, toStartCell, toEndCell].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
            worksheet.Cells[fromStartCell, fromEndCell, toStartCell, toEndCell].Style.Font.Bold = true;
            return worksheet;
        }

        private object GetPropValue(object src, string propName)
        {
            return src.GetType().GetProperty(propName)?.GetValue(src, null);
        }

        private string GetTextAlignAttributeValue(object src, string propName)
        {
            var result = string.Empty;

            var attribute = src.GetType().GetProperty(propName).CustomAttributes.FirstOrDefault(p => p.AttributeType == typeof(TextAlignAttribute));

            if (attribute == null) return null;

            result = attribute.ConstructorArguments.First().Value + "";

            return result;
        }
    }
}
