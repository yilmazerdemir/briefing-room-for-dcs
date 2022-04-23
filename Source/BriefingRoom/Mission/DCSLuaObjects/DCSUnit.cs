using System.Collections.Generic;
using System.Linq;
using LuaTableSerialiser;

namespace BriefingRoom4DCS.Mission.DCSLuaObjects
{
    public class DCSUnit
    {
        public string DCSID { get; set; }
        public int UnitId { get; set; }
        public float X { get; set; }
        public float Y { get; set; }
        public string Name { get; set; }
        public float Heading { get; set; }
        public Dictionary<string, object> ExtraLua { get; set; } = new Dictionary<string, object>();
        public string ToLuaString(int number)
        {
            var obj = new Dictionary<string, object>[] {ExtraLua, new Dictionary<string, object>{
                {"type", DCSID},
                {"unitId", UnitId},
                {"x", X},
                {"y", Y},
                {"name", Name},
                {"heading", Heading},
                {"type", DCSID},
            }}.SelectMany(x => x)
                    .ToDictionary(x => x.Key, y => y.Value);
            return LuaSerialiser.Serialize(obj);
        }
    }
}