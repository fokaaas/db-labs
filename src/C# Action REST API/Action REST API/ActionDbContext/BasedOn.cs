using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class BasedOn
{
    public int SourceId { get; set; }

    public int MediaRequestId { get; set; }

    public virtual Source Source { get; set; } = null!;
}
