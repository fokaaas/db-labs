# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення початкового наповнення бази даних

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`media_request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`media_request` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `keywords` VARCHAR(255) NULL DEFAULT NULL,
  `type` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  `source_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`, `source_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`source`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`source` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`state` (
  `id` INT NOT NULL,
  `display_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`role` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`, `role_id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_User_Role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_Role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `mydb`.`role` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`action`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`action` (
  `id` INT NOT NULL,
  `craeted_at` DATETIME NOT NULL,
  `state_id` INT NOT NULL,
  `media_request_id` INT NOT NULL,
  `source_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `state_id`, `media_request_id`, `source_id`, `user_id`),
  INDEX `fk_action_media_request1_idx` (`media_request_id` ASC) VISIBLE,
  INDEX `fk_action_source1_idx` (`source_id` ASC) VISIBLE,
  INDEX `fk_action_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_action_media_request1`
    FOREIGN KEY (`media_request_id`)
    REFERENCES `mydb`.`media_request` (`id`),
  CONSTRAINT `fk_action_source1`
    FOREIGN KEY (`source_id`)
    REFERENCES `mydb`.`source` (`id`),
  CONSTRAINT `fk_action_state1`
    FOREIGN KEY (`state_id`)
    REFERENCES `mydb`.`state` (`id`),
  CONSTRAINT `fk_action_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`based_on`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`based_on` (
  `source_id` INT NOT NULL,
  `media_request_id` INT NOT NULL,
  PRIMARY KEY (`source_id`, `media_request_id`),
  INDEX `fk_source_has_media_request_media_request1_idx` (`media_request_id` ASC) VISIBLE,
  INDEX `fk_source_has_media_request_source1_idx` (`source_id` ASC) VISIBLE,
  CONSTRAINT `fk_source_has_media_request_media_request1`
    FOREIGN KEY (`media_request_id`)
    REFERENCES `mydb`.`media_request` (`id`),
  CONSTRAINT `fk_source_has_media_request_source1`
    FOREIGN KEY (`source_id`)
    REFERENCES `mydb`.`source` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`feedback` (
  `id` INT NOT NULL,
  `body` VARCHAR(255) NULL DEFAULT NULL,
  `rating` FLOAT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `media_request_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`, `user_id`, `media_request_id`),
  INDEX `fk_Feedback_MediaRequest1_idx` (`media_request_id` ASC) VISIBLE,
  INDEX `fk_Feedback_User1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_Feedback_MediaRequest1`
    FOREIGN KEY (`media_request_id`)
    REFERENCES `mydb`.`media_request` (`id`),
  CONSTRAINT `fk_Feedback_User1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tag` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`label`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`label` (
  `tag_id` INT NOT NULL,
  `source_id` INT NOT NULL,
  PRIMARY KEY (`tag_id`, `source_id`),
  INDEX `fk_tag_has_source_source1_idx` (`source_id` ASC) VISIBLE,
  INDEX `fk_tag_has_source_tag1_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `fk_tag_has_source_source1`
    FOREIGN KEY (`source_id`)
    REFERENCES `mydb`.`source` (`id`),
  CONSTRAINT `fk_tag_has_source_tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `mydb`.`tag` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`permission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`permission` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`role_has_permission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`role_has_permission` (
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`),
  INDEX `fk_Role_has_Permission_Permission1_idx` (`permission_id` ASC) VISIBLE,
  INDEX `fk_Role_has_Permission_Role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_Role_has_Permission_Permission1`
    FOREIGN KEY (`permission_id`)
    REFERENCES `mydb`.`permission` (`id`),
  CONSTRAINT `fk_Role_has_Permission_Role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `mydb`.`role` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

```

## RESTfull сервіс для управління даними


Для розробки RESTfull сервісу було використано технологію ASP.net Core MVC та споміжний фреймворк для роботи з базами даних Entity Framework Core.

Головними компонентами сервісу є файли:
- **Program.cs** - головний файл сервісу, який ініціалізує застосунок й задає правила його роботи;
- **appsettings.json** - конфігураційний файл застосунку;
- **launchSettings.json** - кофігураційний файл запуску сервісу;
- **ActionController.cs** - контроллер, який оброблює запити щодо сутності Action;
- **CheckDbFilter.cs** - фільтр, який перевіряє наявність таблиці Action в базі даних;
- **MydbContext.cs** - файл, через який відбувається взаємодія між базою даних та кодом C#;

## Головний файл сервісу:
#### Program.cs
```csharp
using Microsoft.EntityFrameworkCore;
using Action_REST_API.ActionDbContext;
using Action_REST_API.Filters;

var builder = WebApplication.CreateBuilder(args);

var connection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<MydbContext>((options) => options.UseMySql(connection, Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.34-mysql")));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<CheckDbFilter>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

```
## Конфігураційні файли:
#### appsettings.json
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;user=root;password=47878712;database=mydb"
  }
}

```
#### launchSettings.json
```json
{
  "$schema": "http://json.schemastore.org/launchsettings.json",
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:28677",
      "sslPort": 44340
    }
  },
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "http://localhost:5279",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "https": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "launchUrl": "swagger",
      "applicationUrl": "https://localhost:7299;http://localhost:5279",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "launchUrl": "swagger",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}

```
## Контроллер:
#### ActionController.cs
```csharp
using Action_REST_API.ActionDbContext;
using Action_REST_API.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using static System.Collections.Specialized.BitVector32;
using Action = Action_REST_API.ActionDbContext.Action;

namespace Action_REST_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ServiceFilter(typeof(CheckDbFilter))]

    public class ActionController : ControllerBase
    {
        MydbContext _db;

        public ActionController(MydbContext db)
        {
            _db = db;
        }

        [HttpGet("GetActions")]
        public async Task<IActionResult> GetAll()
        {
            var actions = await _db.ActionViwe.ToListAsync();

            return Ok(actions);
        }

        [HttpGet("GetAction")]
        public async Task<IActionResult> GetOne(int id)
        {
            if (!_db.Actions.ToList().Exists(a => a.Id == id)) return BadRequest();

            var action = await _db.Actions.FirstOrDefaultAsync(a => a.Id == id);
            var actionViwe = await _db.ActionViwe.FirstOrDefaultAsync(a => a.time == action!.CraetedAt);

            return Ok(actionViwe);
        }

        [HttpPost("CreateAction")]
        public async Task<IActionResult> Post(Action action)
        {
            if (_db.Actions.ToList().Exists(a => a.Id == action.Id)) return BadRequest();

            var creationTime = DateTime.Now;

            var newAction = new Action()
            {
                Id = action.Id,
                CraetedAt = action.CraetedAt,
                StateId = new Random().Next(1, 1),                            // StateId = action.State.Id,
                MediaRequestId = new Random().Next(1, 1),                     // MediaRequestId = action.MediaRequest.Id
                SourceId = new Random().Next(1, 1),                           // SourceId = action.Source.Id
                UserId = new Random().Next(1, 1)                              // UserId = action.User.Id
            };

            await _db.Actions.AddAsync(newAction);
            await _db.SaveChangesAsync();

            var newActionViwe = _db.ActionViwe.ToList().Find(a => a.time.ToShortTimeString() == newAction!.CraetedAt.ToShortTimeString());

            return CreatedAtAction("Post", newActionViwe);
        }

        [HttpPut("EditAction")]
        public async Task<IActionResult> Put(Action action)
        {
            if (!_db.Actions.ToList().Exists(a => a.Id == action.Id)) return BadRequest();

            var workingAction = await _db.Actions.FirstOrDefaultAsync(a => a.Id.Equals(action.Id));
            workingAction!.Id = action.Id;
            workingAction.CraetedAt = action.CraetedAt;

            _db.Actions.Update(workingAction);
            await _db.SaveChangesAsync();

            var newActionViwe = _db.ActionViwe.ToList().Find(a => a.time.ToShortTimeString() == workingAction!.CraetedAt.ToShortTimeString());

            return Ok(newActionViwe);
        }

        [HttpDelete("DeleteAction")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!_db.Actions.ToList().Exists(a => a.Id == id)) return BadRequest();

            var action = await _db.Actions.FirstOrDefaultAsync(a => id == a.Id);
            var actionViwe = await _db.ActionViwe.FirstOrDefaultAsync(a => a.time == action!.CraetedAt);

            _db.Actions.Remove(action!);
            await _db.SaveChangesAsync();

            return Ok(actionViwe);
        }
    }
}

```
## Фільтр:
#### CheckDbFilter.cs
```csharp
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

```
## Контекстний файл бази даних:
#### MydbContext.cs
```csharp
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

```
## Моделі:
#### Action.cs
```csharp
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

```
#### ActionViweModel.cs
```csharp
namespace Action_REST_API.ActionDbContext
{
    public record class ActionViweModel(DateTime time);

}
```
#### BasedOn.cs
```csharp
using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class BasedOn
{
    public int SourceId { get; set; }

    public int MediaRequestId { get; set; }

    public virtual Source Source { get; set; } = null!;
}

```
#### Feedback.cs
```csharp
using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class Feedback
{
    public int Id { get; set; }

    public string? Body { get; set; }

    public float Rating { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int MediaRequestId { get; set; }

    public int UserId { get; set; }
}

```
#### MediaRequest.cs
```csharp 
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

```
#### Permission.cs
```csharp
using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class Permission
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Role> Roles { get; } = new List<Role>();
}

```
#### Role.cs
```csharp
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

```
#### Source.cs
```csharp
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

```
#### State.cs
```csharp
using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class State
{
    public int Id { get; set; }

    public string DisplayName { get; set; } = null!;

    public virtual ICollection<Action> Actions { get; } = new List<Action>();
}

```
#### Tag.cs
```csharp
using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class Tag
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Source> Sources { get; } = new List<Source>();
}

```
#### User.cs
```csharp
using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class User
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int RoleId { get; set; }

    public virtual Role Role { get; set; } = null!;
}

```
