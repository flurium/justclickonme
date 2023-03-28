using Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Utilities
{
    public record OperationResult();

    public class URepository<T> where T : class
    {
        private readonly JustClickOnMeDbContext db;
        private readonly DbSet<T> entities;

        public URepository(JustClickOnMeDbContext db)
        {
            this.db = db;
            entities = db.Set<T>();
        }

        public async Task Update(Expression<Func<T, bool>> condition, Action<T> mutation)
        {
            var entity = await entities.FirstOrDefaultAsync(condition);

            if (entity != null) mutation(entity);

            await db.SaveChangesAsync();
        }
    }
}