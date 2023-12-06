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