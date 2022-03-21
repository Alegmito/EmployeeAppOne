namespace EmployeeAppOne.Models
{

    public static class QueryExtenstions
    {
        /// <summary>
        /// Returns specified page of the given pageSize
        /// </summary>
        /// <typeparam name="T">Database model class</typeparam>
        /// <param name="query"></param>
        /// <param name="page">page number</param>
        /// <param name="pageSize">number of records on one page</param>
        /// <returns></returns>
        public static PageViewResult<T> GetPageViewResult<T>(this IQueryable<T> query, int page, int pageSize)
            where T : class
        {
            var result = new PageViewResult<T>();
            result.CurrentPage = page;
            result.PageSize = pageSize;
            result.RowCount = query.Count();

            var pageCount = (double)result.RowCount / pageSize;
            result.PageCount = (int)Math.Ceiling(pageCount);

            var rowSkipCount = (page - 1) * pageSize;
            result.Results = query.Skip<T>(rowSkipCount).Take(pageSize).ToList();

            return result;
        }
    }
}
