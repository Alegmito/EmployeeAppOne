namespace EmployeeAppOne.Models
{
    public class PageViewResult<T>: PageViewModel where T : class
    {
        public IList<T> Results { get; set; }
        public PageViewResult()
        {
            Results = new List<T>();
        }
    }


}
