using System.Collections.Generic;
using System.Linq;
using LuaTableSerialiser;

namespace BriefingRoom4DCS.Mission.DCSLuaObjects
{
    public class DCSUnitShip: DCSUnit
    {
        public string Skill { get; set; }
        public float Modulation { get; set; }
        public float Frequency { get; set; }

        public new string ToLuaString(int number)
        {
            var obj = new Dictionary<string, object>[] {ExtraLua, new Dictionary<string, object>{
                {"type", DCSID},
                {"unitId", UnitId},
                {"x", X},
                {"y", Y},
                {"name", Name},
                {"heading", Heading},
                {"type", DCSID},
                {"transportable", new Dictionary<string, object>{{"randomTransportable", false}}},
                {"skill", Skill},
                {"modulation", Modulation},
                {"frequency", Frequency},
            }}.SelectMany(x => x)
                    .ToDictionary(x => x.Key, y => y.Value);
            return LuaSerialiser.Serialize(obj);
        }
    }
}