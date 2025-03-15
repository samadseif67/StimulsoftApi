using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ContractsPerson.Classes.MyDbContext
{
    public class InfoItemConnectionString
    {
        public string DataSource { get; set; }
        public string InitialCatalog { get; set; }
        public string UserID { get; set; }
        public string Password { get; set; }
    }



    public class InfoConnectionString
    {
        private string InitialCatalog = "";
        private string DataSource = "";
        private string UserID = "";
        private string Password = "";



        public InfoConnectionString()
        {
            var PropertyConnectionString = ChangePassFromWebConfig();
            InitialCatalog = PropertyConnectionString.InitialCatalog;
            DataSource = PropertyConnectionString.DataSource;
            UserID = PropertyConnectionString.UserID;
            Password = PropertyConnectionString.Password;
        }

        public EntityConnection Getconnection_ContractsPerson()
        {
             
            string YourModel = "ContractsPersonemModel";
            var sqlBuilder = new SqlConnectionStringBuilder
            {
                DataSource = DataSource,
                InitialCatalog = InitialCatalog,
                UserID = UserID,
                Password = Password
            };

           
            var entityBuilder = new EntityConnectionStringBuilder
            {
                Provider = "System.Data.SqlClient",
                ProviderConnectionString = sqlBuilder.ToString(),
                Metadata = "res://*/Models." + YourModel + ".csdl|res://*/Models." + YourModel + ".ssdl|res://*/Models." + YourModel + ".msl"
            };

            
            var connection = new EntityConnection(entityBuilder.ToString());
            return connection;
        }

        public EntityConnection Getconnection_ContractsPersonFiles()
        {
          
            string YourModel = "ContractsPersonFilesModel";
            var sqlBuilder = new SqlConnectionStringBuilder
            {
                DataSource = DataSource,
                InitialCatalog = "ContractsPersonFilesRead",
                UserID = UserID,
                Password = Password
            };

             
            var entityBuilder = new EntityConnectionStringBuilder
            {
                Provider = "System.Data.SqlClient",
                ProviderConnectionString = sqlBuilder.ToString(),
                Metadata = "res://*/Models." + YourModel + ".csdl|res://*/Models." + YourModel + ".ssdl|res://*/Models." + YourModel + ".msl"
            };

           
            var connection = new EntityConnection(entityBuilder.ToString());
            return connection;
        }

        private InfoItemConnectionString ChangePassFromWebConfig()
        {
            string DataSource = "";
            string UserID = "";
            string password = "";
            string InitialCatalog = "";
            string KeyIsServer = Convert.ToString(ConfigurationManager.AppSettings["KeyIsServer"]);
            string ConnectionString = ConfigurationManager.ConnectionStrings["ContractsPersonEntities"].ConnectionString;
            var entityBuilder = new EntityConnectionStringBuilder(ConnectionString);
            string providerConnectionString = entityBuilder.ProviderConnectionString;
            var Builder = new SqlConnectionStringBuilder(providerConnectionString);

            DataSource = Builder.DataSource;
            UserID = Builder.UserID;
            password = Builder.Password;
            InitialCatalog = Builder.InitialCatalog;
            string Part1 =  (InitialCatalog.Length) + "1@#321A#3$57";
            string PassFull = (Part1 + password);

            password = KeyIsServer == "1" ? PassFull : password;


            InfoItemConnectionString infoItemConnectionString = new InfoItemConnectionString();
            infoItemConnectionString.InitialCatalog = InitialCatalog;
            infoItemConnectionString.DataSource = DataSource;
            infoItemConnectionString.UserID = UserID;
            infoItemConnectionString.Password = password;



            return infoItemConnectionString;
        }
    }
}