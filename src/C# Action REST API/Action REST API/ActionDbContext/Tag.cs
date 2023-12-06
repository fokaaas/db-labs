using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class Tag
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Source> Sources { get; } = new List<Source>();
}
