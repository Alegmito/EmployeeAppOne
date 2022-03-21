namespace EmployeeAppOne.Models
{
    public class PageViewResult<T> : PageViewBase where T : class
    {
        public IList<T> Results { get; set; }
        public PageViewResult()
        {
            Results = new List<T>();
        }
    }


}
