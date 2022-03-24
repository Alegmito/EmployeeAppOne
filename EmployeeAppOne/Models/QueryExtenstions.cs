using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAppOne.Models
{

    public static class QueryExtenstions
    {
        

        public static IQueryable<Employee> GetSortedEmployees(this IQueryable<Employee> query,
            EmployeeSortModel sortModel)
        {
            switch(sortModel.SortName)
            {
                case SortState.Name:
                    return sortModel.Direction ? query.OrderBy(e => e.Name) : query.OrderByDescending(e => e.Name);
                case SortState.Salary:
                    return sortModel.Direction ? query.OrderBy(e => e.Salary) : query.OrderByDescending(e => e.Salary);
                case SortState.BirthDate:
                    return sortModel.Direction ? query.OrderBy(e => e.BirthDate) : query.OrderByDescending(e => e.BirthDate);
                case SortState.Email:
                    return sortModel.Direction ? query.OrderBy(e => e.Email) : query.OrderByDescending(e => e.Email);
                default:
                    return query;
            }
        }

        /// <summary>
        /// Returns specified page of the given pageSize
        /// </summary>
        /// <typeparam name="T">Database model class</typeparam>
        /// <param name="query"></param>
        /// <param name="page">page number</param>
        /// <param name="pageSize">number of records on one page</param>
        /// <returns></returns>
        public static async Task<ActionResult<PageViewResult<T>>> GetPageViewResultAsync<T>(this IQueryable<T> query, int page = 1, int pageSize = 10)
            where T : class
        {
            var result = new PageViewResult<T>();
            result.PageSize = pageSize;
            result.RowCount = await query.CountAsync();

            var pageCount = (double)result.RowCount / pageSize;
            result.PageCount = (int)Math.Ceiling(pageCount);
            result.CurrentPage = (int)Math.Min(page, result.PageCount);

            

            var rowSkipCount = (page - 1) * pageSize;

            result.Results = await query.Skip<T>(rowSkipCount).Take(pageSize).ToListAsync();

            return result;
        }
    }
}
