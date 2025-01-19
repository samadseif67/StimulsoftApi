using Microsoft.Data.SqlClient;
using System.Collections;
using System.Collections.Generic;
using System.Data;

namespace StimulsoftApi.Services
{
    public class Utiltys
    {


        public Type GetIEnumerableType(IEnumerable enumerable)
        {
            Type type = enumerable.GetType();

            // Check if the type is a generic type
            if (type.IsGenericType)
            {
                // Check if it implements IEnumerable<T>
                Type enumerableInterface = type.GetInterface(typeof(IEnumerable<>).Name);
                if (enumerableInterface != null)
                {
                    // Get the type argument T from IEnumerable<T>
                    Type elementType = enumerableInterface.GetGenericArguments()[0];
                    Console.WriteLine($"Type is IEnumerable<{elementType.Name}>.");
                    return elementType;
                }
            }

            // If not generic, it's a non-generic IEnumerable
            Console.WriteLine("Type is non-generic IEnumerable.");
            return null;
        }


        //public virtual myResult Delete(Guid id)
        //{

        //    try
        //    {
        //        myResult myResult = new myResult(1, "");
        //        var existing = dbSet.Find(id);
        //        if (existing != null)
        //        {
        //            myResult = HasDependencies(existing);
        //            if (myResult.ErrorCode != 1)//اگر وابستگی نداشت
        //            {
        //                existing.IsDelete = true;
        //                // dbSet.Remove(existing);
        //                return Save();
        //            }
        //        }

        //        return myResult;

        //    }
        //    catch (Exception ex)
        //    {
        //        return new(ex.HResult, ex.Message);
        //    }
        //}





        //public List<M> ExcuteStoreProcedure<M>(string StoredProcedureName, List<myFilter> AddFilters)
        //{

        //    string where = " ";
        //    string filterRules = "";



        //    if (AddFilters != null)
        //        where = myUtilityStatic.myFilter(filterRules?.ToString(), AddFilters);
        //    else
        //        where = myUtilityStatic.myFilter(filterRules?.ToString());

        //    using var connection = new SqlConnection(myUtilityStatic.GetConnectionString());
        //    using (var resultMultiple = connection.QueryMultiple(StoredProcedureName, new { Rows = 300, Page = 1, Where = where, SortName = "id", SortOrder = "", ExportToExcel = false }, commandType: CommandType.StoredProcedure))
        //    {
        //        var result = resultMultiple.Read<M>().ToList();
        //        return result;
        //    };
        //}




        //#region DependenciesInformation

        //public myResult HasDependencies<TEntity>(TEntity entity) where TEntity : class
        //{

        //    myResult ErrorMsg = new myResult();
        //    string CollectionControllerActionTitle = "";

        //    bool HasDependencies = false;//وابستگی ندارد
        //    string EntityName = entity.GetType().Name;
        //    var Value_ID = typeof(TEntity).GetProperty("ID").GetValue(entity, null);

        //    var foreignKeys = db.Model.GetEntityTypes()
        //.SelectMany(entity => entity.GetForeignKeys())
        //.Select(fk => new
        //{
        //    ForeignKeyName = fk.PrincipalToDependent?.Name ?? "N/A",
        //    ParentTableSchema = fk.DeclaringEntityType.GetSchema() ?? "dbo",
        //    ParentTable = fk.DeclaringEntityType.GetTableName(),
        //    ParentColumn = string.Join(", ", fk.Properties.Select(p => p.Name)),
        //    ReferencedTableSchema = fk.PrincipalEntityType.GetSchema() ?? "dbo",
        //    ReferencedTable = fk.PrincipalEntityType.GetTableName(),
        //    ReferencedColumn = string.Join(", ", fk.PrincipalKey.Properties.Select(p => p.Name))
        //})
        //.ToList().Where(x => x.ReferencedTable == EntityName).ToList();


        //    using (SqlConnection connection = new(myUtilityStatic.GetConnectionString()))
        //    {

        //        List<string> LstParentTable = new List<string>();
        //        LstParentTable = foreignKeys.Select(x => x.ParentTable).ToList();
        //        var LstControllerActions = db.ControllerActions.Where(x => x.IsDelete == false && x.ActivityID == null
        //        && LstParentTable.Contains(x.ControllerName)).Select(x => new { x.ID, x.ControllerName, x.Title }).ToList();


        //        foreach (var item in foreignKeys)
        //        {
        //            string ParentTableSchema = item.ParentTableSchema;
        //            string ParentTable = item.ParentTable;
        //            string ParentColumn = item.ParentColumn;
        //            string TableNameFull = ParentTableSchema + "." + ParentTable;

        //            var TextCmd = "select top(1) ID from " + TableNameFull + " " + "where IsDelete=0 and " + ParentColumn + "='" + Value_ID + "'";
        //            SqlCommand command = new SqlCommand(TextCmd, connection);
        //            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
        //            DataTable dataTable = new DataTable();
        //            dataAdapter.Fill(dataTable);
        //            int CountRow = dataTable.Rows.Count;
        //            if (CountRow > 0)
        //            {

        //                var FindControllerActions = LstControllerActions.FirstOrDefault(x => x.ControllerName == ParentTable);
        //                string ControllerActionTitle = FindControllerActions == null ? "" : FindControllerActions.Title;
        //                CollectionControllerActionTitle = CollectionControllerActionTitle.Trim().Length == 0 ? (ControllerActionTitle) : ("," + ControllerActionTitle);
        //                HasDependencies = true;//وابستگی دارد

        //            }
        //        }
        //    }

        //    string ErrorText = "اطلاعات مورد نظر دارای وابستگی می باشد";
        //    ErrorText = ErrorText + " (" + CollectionControllerActionTitle + ") ";
        //    ErrorMsg.ErrorMessage = HasDependencies ? ErrorText : "";
        //    ErrorMsg.ErrorCode = HasDependencies ? 1 : 0;


        //    return ErrorMsg;
        //}


        //#endregion




        //Call in SaveChange
        //private void RegisterLogSystem()
        //{
        //    string actionName = "";
        //    string controllerName = "";
        //    var httpContextAccessor = new HttpContextAccessor();
        //    var HttpContext = httpContextAccessor.HttpContext;
        //    if (HttpContext != null)
        //    {
        //        controllerName = HttpContext.GetRouteData().Values["controller"]?.ToString();
        //        actionName = HttpContext.GetRouteData().Values["action"]?.ToString();
        //    }


        //    var modifiedEntries = ChangeTracker
        //        .Entries()
        //        .Where(e => e.State == EntityState.Modified || e.State == EntityState.Added || e.State == EntityState.Deleted);

        //    foreach (var entry in modifiedEntries)
        //    {
        //        dataContext ??= new DataContext();

        //        string EntityName = entry.Entity.GetType().Name;

        //        if (EntityName != "LogSystem")
        //        {
        //            var entityType = dataContext.Model.FindEntityType(entry.Entity.GetType());
        //            string AreaName = entityType.GetSchema() ?? "dbo";
        //            string JsonEntity = myUtilityStatic.ConvertOriginalValuesToJson(entry);

        //            dynamic Obj = JObject.Parse(JsonEntity);

        //            var UserInsertID = Obj.UserInsertID;
        //            var UserUpdateID = Obj.UserUpdateID;
        //            var DateInsert = Obj.DateInsert;
        //            var DateUpdate = Obj.DateUpdate;

        //            dataContext.LogSystems.Add(new LogSystem()
        //            {
        //                ID = Guid.NewGuid(),
        //                AreaName = AreaName,
        //                ControllerName = EntityName,
        //                ActionName = actionName,
        //                Entity = JsonEntity,
        //                IsDelete = false,

        //                UserInsertID = UserInsertID,
        //                UserUpdateID = UserUpdateID,
        //                DateInsert = DateInsert,
        //                DateUpdate = DateUpdate,

        //            });
        //            dataContext.SaveChanges();
        //        }
        //    }
        //}


        //public List<M> ExcuteStoreProcedure<M>(string StoredProcedureName, List<myFilter> AddFilters)
        //{

        //    string where = " ";
        //    string filterRules = "";



        //    if (AddFilters != null)
        //        where = myUtilityStatic.myFilter(filterRules?.ToString(), AddFilters);
        //    else
        //        where = myUtilityStatic.myFilter(filterRules?.ToString());

        //    using var connection = new SqlConnection(myUtilityStatic.GetConnectionString());
        //    using (var resultMultiple = connection.QueryMultiple(StoredProcedureName, new { Rows = 300, Page = 1, Where = where, SortName = "id", SortOrder = "", ExportToExcel = false }, commandType: CommandType.StoredProcedure))
        //    {
        //        var result = resultMultiple.Read<M>().ToList();
        //        return result;
        //    };
        //}
    }
}
