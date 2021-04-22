[$INDEX$] = 
{
  ["lateActivation"] = false,
  ["tasks"] =
  {
  }, -- end of ["tasks"]
  ["task"] = "Nothing",
  ["uncontrolled"] = true,
  ["taskSelected"] = true,
  ["route"] =
  {
    ["routeRelativeTOT"] = true,
    ["points"] =
    {
      [1] = 
      {
          ["alt"] = 13,
          ["action"] = "From Parking Area",
          ["alt_type"] = "BARO",
          ["speed"] = $SPEED$,
          ["task"] = 
          {
              ["id"] = "ComboTask",
              ["params"] = 
              {
                  ["tasks"] = 
                  {
                  }, -- end of ["tasks"]
              }, -- end of ["params"]
          }, -- end of ["task"]
          ["type"] = "TakeOffParking",
          ["ETA"] = 0,
          ["ETA_locked"] = true,
          ["y"] = $Y$,
          ["x"] = $X$,
          ["formation_template"] = "",
          ["airdromeId"] = $OBJECTIVEAIRBASEID$,
          ["speed_locked"] = true,
      }, -- end of [1]
    }, -- end of ["points"]
  }, -- end of ["route"]
  ["groupId"] = $ID$,
  ["hidden"] = $HIDDEN$,
  ["units"] =
  {
$UNITS$
  }, -- end of ["units"]
  ["y"] = $Y$,
  ["x"] = $X$,
  ["name"] = "$NAME$",
  ["communication"] = true,
  ["start_time"] = 0,
  ["modulation"] = $RADIOBAND$,
  ["frequency"] = $RADIOFREQUENCY$,
}, -- end of [$INDEX$]
