
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace BriefingRoom4DCS.Data.JSON
{
    public class MongoBase
    {
        public string _id { get; set; }

        [JsonProperty("@dcsversion")]
        public string dcsversion { get; set; }

        [JsonProperty("@created")]
        public DateTime created { get; set; }
    }

    public class WorldPos
    {
        public double lon { get; set; }
        public double lat { get; set; }
        public double alt { get; set; }
    }

    public class Pos
    {
        public DCSPos DCS { get; set; }
        public WorldPos World { get; set; }
    }

    public class DCSPos
    {
        public double y { get; set; }
        public double x { get; set; }
        public double z { get; set; }
    }

    public class BRInfo
    {
        public string type { get; set; }
        public List<string> families { get; set; } = new List<string>();
        public (int start, int end) operational { get; set; } = (start: 1940, end: 2020);
        public Dictionary<string, List<int>> extraOperators { get; set; } = new Dictionary<string, List<int>>();
        public bool lowPolly { get; set; }
        public bool immovable { get; set; }
        public bool playerControllable { get; set; }
    }

    public class Unit: MongoBase
    {
        public string type { get; set; }
        public List<string> countries { get; set; }
        public List<int> countriesWorldID { get; set; }
        public string displayName { get; set; }
        public string module { get; set; }
        public string shape { get; set; }
    }
}
