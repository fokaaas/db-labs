using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class Source
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Url { get; set; } = null!;

    public virtual ICollection<Action> Actions { get; } = new List<Action>();

    public virtual ICollection<BasedOn> BasedOns { get; } = new List<BasedOn>();

    public virtual ICollection<Tag> Tags { get; } = new List<Tag>();
}
