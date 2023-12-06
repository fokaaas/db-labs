using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class Permission
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Role> Roles { get; } = new List<Role>();
}
