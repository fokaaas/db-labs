using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Action_REST_API.ActionDbContext;

public partial class MydbContext : DbContext
{
    public MydbContext()
    {
    }

    public MydbContext(DbContextOptions<MydbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Action> Actions { get; set; }

    public virtual DbSet<BasedOn> BasedOns { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<MediaRequest> MediaRequests { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Source> Sources { get; set; }

    public virtual DbSet<State> States { get; set; }

    public virtual DbSet<Tag> Tags { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<ActionViweModel> ActionViwe { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;user=root;password=47878712;database=mydb", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.34-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb3_general_ci")
            .HasCharSet("utf8mb3");

        modelBuilder.Entity<ActionViweModel>(entity =>
        {
            entity.HasNoKey();
            entity.ToView("action_view");

            entity.Property(e => e.time).HasColumnName("craeted_at");
        });

        modelBuilder.Entity<Action>(entity =>
        {
            entity.HasKey(e => new { e.StateId, e.MediaRequestId, e.SourceId, e.UserId, e.Id })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0, 0, 0 });

            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("action");

            entity.Property(e => e.Id).HasColumnName("id");

            entity.HasIndex(e => e.MediaRequestId, "fk_action_media_request1_idx");

            entity.HasIndex(e => e.SourceId, "fk_action_source1_idx");

            entity.HasIndex(e => e.UserId, "fk_action_user1_idx");

            entity.Property(e => e.StateId).HasColumnName("state_id");
            entity.Property(e => e.MediaRequestId).HasColumnName("media_request_id");
            entity.Property(e => e.SourceId).HasColumnName("source_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.CraetedAt)
                .HasColumnType("datetime")
                .HasColumnName("craeted_at");

            entity.HasOne(d => d.Source).WithMany(p => p.Actions)
                .HasForeignKey(d => d.SourceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_action_source1");

            entity.HasOne(d => d.State).WithMany(p => p.Actions)
                .HasForeignKey(d => d.StateId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_action_state1");
        });

        modelBuilder.Entity<BasedOn>(entity =>
        {
            entity.HasKey(e => new { e.SourceId, e.MediaRequestId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("based_on");

            entity.HasIndex(e => e.MediaRequestId, "fk_source_has_media_request_media_request1_idx");

            entity.HasIndex(e => e.SourceId, "fk_source_has_media_request_source1_idx");

            entity.Property(e => e.SourceId).HasColumnName("source_id");
            entity.Property(e => e.MediaRequestId).HasColumnName("media_request_id");

            entity.HasOne(d => d.Source).WithMany(p => p.BasedOns)
                .HasForeignKey(d => d.SourceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_source_has_media_request_source1");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => new { e.Id, e.UserId, e.MediaRequestId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

            entity.ToTable("feedback");

            entity.HasIndex(e => e.MediaRequestId, "fk_Feedback_MediaRequest1_idx");

            entity.HasIndex(e => e.UserId, "fk_Feedback_User1_idx");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.MediaRequestId).HasColumnName("media_request_id");
            entity.Property(e => e.Body)
                .HasMaxLength(255)
                .HasColumnName("body");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<MediaRequest>(entity =>
        {
            entity.HasKey(e => new { e.Id, e.UserId, e.SourceId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0, 0 });

            entity.ToTable("media_request");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.SourceId).HasColumnName("source_id");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Keywords)
                .HasMaxLength(255)
                .HasColumnName("keywords");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasColumnName("type");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("permission");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("role");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");

            entity.HasMany(d => d.Permissions).WithMany(p => p.Roles)
                .UsingEntity<Dictionary<string, object>>(
                    "RoleHasPermission",
                    r => r.HasOne<Permission>().WithMany()
                        .HasForeignKey("PermissionId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("fk_Role_has_Permission_Permission1"),
                    l => l.HasOne<Role>().WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("fk_Role_has_Permission_Role1"),
                    j =>
                    {
                        j.HasKey("RoleId", "PermissionId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("role_has_permission");
                        j.HasIndex(new[] { "PermissionId" }, "fk_Role_has_Permission_Permission1_idx");
                        j.HasIndex(new[] { "RoleId" }, "fk_Role_has_Permission_Role1_idx");
                    });
        });

        modelBuilder.Entity<Source>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("source");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Url)
                .HasMaxLength(255)
                .HasColumnName("url");
        });

        modelBuilder.Entity<State>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("state");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.DisplayName)
                .HasMaxLength(255)
                .HasColumnName("display_name");
        });

        modelBuilder.Entity<Tag>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tag");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");

            entity.HasMany(d => d.Sources).WithMany(p => p.Tags)
                .UsingEntity<Dictionary<string, object>>(
                    "Label",
                    r => r.HasOne<Source>().WithMany()
                        .HasForeignKey("SourceId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("fk_tag_has_source_source1"),
                    l => l.HasOne<Tag>().WithMany()
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("fk_tag_has_source_tag1"),
                    j =>
                    {
                        j.HasKey("TagId", "SourceId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("label");
                        j.HasIndex(new[] { "SourceId" }, "fk_tag_has_source_source1_idx");
                        j.HasIndex(new[] { "TagId" }, "fk_tag_has_source_tag1_idx");
                    });
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => new { e.Id, e.RoleId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("user");

            entity.HasIndex(e => e.Email, "email_UNIQUE").IsUnique();

            entity.HasIndex(e => e.RoleId, "fk_User_Role1_idx");

            entity.HasIndex(e => e.Username, "username_UNIQUE").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .HasColumnName("last_name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Username).HasColumnName("username");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_User_Role1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
