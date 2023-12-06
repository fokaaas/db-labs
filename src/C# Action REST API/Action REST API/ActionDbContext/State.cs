using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class State
{
    public int Id { get; set; }

    public string DisplayName { get; set; } = null!;

    public virtual ICollection<Action> Actions { get; } = new List<Action>();
}
