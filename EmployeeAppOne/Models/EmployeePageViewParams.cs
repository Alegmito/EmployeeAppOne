namespace EmployeeAppOne.Models
{
    public class EmployeePageViewParams: PageViewModel
    {
        public SortState SortState { get; set; }
        public bool SortOrder { get; set; }
    }
}
