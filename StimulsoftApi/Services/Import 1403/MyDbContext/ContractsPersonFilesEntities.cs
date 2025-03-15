using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ContractsPerson.Models
{
    public partial class ContractsPersonFilesEntities : DbContext
    {
        public ContractsPersonFilesEntities(string connectionString)
            : base(connectionString)
        {


        }
        public ContractsPersonFilesEntities(DbConnection connection)
        : base(connection, true)
        {

        }

    }
}