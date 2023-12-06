using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class MediaRequest
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? Keywords { get; set; }

    public string Type { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int UserId { get; set; }

    public int SourceId { get; set; }
}
