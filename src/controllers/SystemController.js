const si = require("systeminformation");
const os = require("os");
const { getFileProperties } = require("get-file-properties");

const {openldr} = require("../database");

module.exports = {
  async index(req, res) {
    const cpu = await si.cpu();
    const ram = await si.mem();
    const disk = await si.diskLayout();

    return res.json({
      cpu:
        cpu.manufacturer +
        " " +
        cpu.brand +
        " CPU @ " +
        cpu.speed +
        "GHz " +
        cpu.speedmax +
        "GHz",
      ram: Math.round(ram.total / 1000000000),
      disk_storage: Math.round(disk[0].size / 1000000000),
    });
  },

  async osInfo() {
    const cpu = await si.cpuCurrentspeed();
    const ram = await si.mem();
    const disk = await si.diskLayout();

    return {
      cpu:
        cpu.manufacturer +
        " " +
        cpu.brand +
        " CPU @ " +
        cpu.speed +
        "GHz " +
        cpu.speedmax +
        "GHz",
      ram: Math.round(ram.total / 1000000000),
      disk_storage: Math.round(disk[0].size / 1000000000),
    };
  },

  async version() {
    const disacomms = await getFileProperties(`C:\\disalab\\DisaComms.exe`);
    const openldr_exe = await getFileProperties(`C:\\disalab\\openldr.exe`);
    const wxdisa = await getFileProperties(`C:\\disalab\\wxdisa.exe`);
    const wxdict = await getFileProperties(`C:\\disalab\\wxdict.exe`);
    const wxinstrument = await getFileProperties(
      `C:\\disalab\\wxinstrument.exe`
    );
    const disaxlreports = await getFileProperties(
      `C:\\disalab\\disaxlreports.exe`
    );

    const sqlserver = await openldr.query("SELECT @@VERSION", {raw: true});

    const sqlversion = sqlserver[0][0];

    return {
      server_id: process.env.SERVER_ID,
      disacomms: disacomms.Version,
      openldr: openldr_exe.Version,
      wxdisa: wxdisa.Version,
      wxdict: wxdict.Version,
      wxinstrument: wxinstrument.Version,
      disaxlreports: disaxlreports.Version,
      sqlserver: sqlversion[""]
    };
  },

  async checkIfSQLAgentIsOnline(){
    const sql = "DECLARE @agent NVARCHAR(512); " +
    "SELECT @agent = COALESCE(N'SQLAgent$' + CONVERT(SYSNAME, SERVERPROPERTY('localhost')),"+
    " N'SQLServerAgent'); "+
    "EXEC master.dbo.xp_servicecontrol 'QueryState', @agent;";

    const sqlagent = await openldr.query(sql, {raw: true});

    const status = sqlagent[0][0];

    return status["Current Service State"];
  },
};
