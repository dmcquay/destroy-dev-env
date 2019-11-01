namespace Prioritizer
{
    public class Sentiment
    {
        public bool cacheHit { get; set; }
        public string payload { get; set; }
    }
    public class TodoItem
    {
        public string id { get; set; }
        public string text { get; set; }
        public string createdAt { get; set; }
        public Sentiment sentiment { get; set; }
        public string Color { get; set; }
    }
}