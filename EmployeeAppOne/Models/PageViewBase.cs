﻿namespace EmployeeAppOne.Models
{
    public abstract class PageViewBase
    {
        public int CurrentPage { get; set; }
        public int PageCount { get; set; }
        public int RowCount { get; set; }
        public int PageSize { get; set; }

        public int FirstRowOnPage() => (CurrentPage - 1) * PageSize + 1;

        public int LastRowOnPage() => Math.Min(CurrentPage * PageSize, RowCount);
    }
}
