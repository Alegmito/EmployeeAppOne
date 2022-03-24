namespace EmployeeAppOne.Models
{
    public class EmployeeSortModel
    {

        public SortState SortName { get; private set; }
        public bool Direction { get; private set; }

        public EmployeeSortModel(SortState _sortName = SortState.None, bool _ascending = true)
        {
            SortName = _sortName;
            Direction = _ascending;
        }
    }
}
