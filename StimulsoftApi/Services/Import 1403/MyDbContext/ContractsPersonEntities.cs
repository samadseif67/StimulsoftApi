using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ContractsPerson.Models
{
    public partial class ContractsPersonEntities : DbContext
    {

        public ContractsPersonEntities(string connectionString)
            : base(connectionString)
        {


        }
        public ContractsPersonEntities(DbConnection connection)
        : base(connection, true)
        {

        }

    }
}