const os = require('os');
const ms = require('ms');
const si = require('systeminformation');
// const size = require('readable-size');

exports.info = async function (req, res, next) {
   try {
      const tiem = si.time();
      const version = si.version();
      const system = await si.system();
      const cpu_temperature = await si.cpuTemperature()
      const cpu = await si.cpu();
      const memory = await si.mem();
      const battery = await si.battery();
      const os_info = await si.osInfo();
      const disk = await si.diskLayout();
      const services = await si.services('redis, node-red, nginx');
      const network_interfaces = await si.networkInterfaces();
      const audio = await si.audio();
      const bluetooth = await si.bluetoothDevices();
      const wifi = await si.wifiNetworks();
      const usb = await si.usb();

      return res.status(200).json({
         tiem: tiem,
         uptime: ms(os.uptime()),
         version: version,
         os_info: os_info,
         cpu: cpu,
         cpu_temperature: cpu_temperature,
         system: system,
         memory: memory,
         battery: battery,
         disk: disk,
         network_interfaces: network_interfaces,
         usb: usb,
         resorcses: {
            audio: audio,
            wifi: wifi,
            bluetooth: bluetooth,
         },
         services: services,
      });
   } catch (ex) {
      res.status(500).json({ message: ex.message })
   }
};

/*
{
   arch: os.arch(),
   cpus: os.cpus(),
   memory: {
      free: size(os.freemem()),
      total: size(os.totalmem()),
      used: size(os.totalmem() - os.freemem()),
   },
   hostname: os.hostname(),
   loadavg: os.loadavg(),
   networkInterfaces: os.networkInterfaces(),
   platform: os.platform(),
   release: os.release(),
   uptime: ms(os.uptime()),
   type: os.type(),
   version: os.version(),
   userInfo: os.userInfo(),
}
*/