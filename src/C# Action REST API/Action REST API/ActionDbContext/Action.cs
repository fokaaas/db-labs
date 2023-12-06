using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class Action
{
    public int Id { get; set; }
    public DateTime CraetedAt { get; set; }

    public int StateId { get; set; }

    public int MediaRequestId { get; set; }

    public int SourceId { get; set; }

    public int UserId { get; set; }

    public virtual Source Source { get; set; } = null!;

    public virtual State State { get; set; } = null!;
}
