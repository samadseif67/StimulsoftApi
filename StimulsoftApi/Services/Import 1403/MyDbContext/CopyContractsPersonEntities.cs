using ContractsPerson.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContractsPerson.Classes.MyDbContext
{
    public class CopyContractsPersonEntities
    {
        InfoConnectionString infoConnectionString = new InfoConnectionString();
        public ContractsPersonEntities Create()
        {
            ContractsPersonEntities Context = new ContractsPersonEntities(infoConnectionString.Getconnection_ContractsPerson());
            return Context;
        }
    }
}