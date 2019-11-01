using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Prioritizer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PrioritizeTodoController : ControllerBase
    {
        private static readonly string[] Colors = new[]
        {
            "red", "green", "blue", "yellow"
        };

        private readonly ILogger<PrioritizeTodoController> _logger;

        public PrioritizeTodoController(ILogger<PrioritizeTodoController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IEnumerable<TodoItem> Post([FromBody] List<TodoItem> items)
        {
            _logger.LogError(null, "hello" + items.First().ToString(), items);
            var rng = new Random();
            items.ForEach(item => item.Color = Colors[rng.Next(Colors.Length)]);
            return items.ToArray();
        }
    }
}
