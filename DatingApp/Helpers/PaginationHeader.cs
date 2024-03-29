namespace DatingApp.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set;}
        public int Totalpages { get; set; }

        public PaginationHeader(int currentPage, int itemsPerPage, int totalItems, int totalpages)
        {
            this.CurrentPage = currentPage;
            this.ItemsPerPage = itemsPerPage;
            this.Totalpages = totalpages;
            this.TotalItems = totalItems; 
        }
        
    }
}