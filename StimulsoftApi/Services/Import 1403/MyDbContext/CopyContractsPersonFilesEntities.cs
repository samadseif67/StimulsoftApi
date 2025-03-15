using ContractsPerson.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContractsPerson.Classes.MyDbContext
{
    public class CopyContractsPersonFilesEntities
    {
        InfoConnectionString infoConnectionString = new InfoConnectionString();
        public ContractsPersonFilesEntities Create()
        {
            ContractsPersonFilesEntities Context = new ContractsPersonFilesEntities(infoConnectionString.Getconnection_ContractsPersonFiles());
            return Context;
        }
    }
}