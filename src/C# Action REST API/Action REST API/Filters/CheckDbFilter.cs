using Action_REST_API.ActionDbContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Action_REST_API.Filters
{
    public class CheckDbFilter : Attribute, IResourceFilter
    {
        MydbContext _db;
        public CheckDbFilter(MydbContext db)
        {
            _db = db;
        }
        public void OnResourceExecuted(ResourceExecutedContext _) { }
        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            if (_db.Actions is null)
            {
                context.Result = new ContentResult { Content = "The information you want to find does not exist" };
            }
        }
    }
}
