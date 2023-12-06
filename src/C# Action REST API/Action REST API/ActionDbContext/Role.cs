using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class Role
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<User> Users { get; } = new List<User>();

    public virtual ICollection<Permission> Permissions { get; } = new List<Permission>();
}
