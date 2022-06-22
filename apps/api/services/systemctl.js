const execute = require("linux-shell-command").execute;

async function list() {
    const args = [];
    let command = 'systemctl --type=service --no-legend --no-pager' //  2> /dev/null
    const { err, stdout } = await exec(command, args);
    if (err) {
        return { error: err };
    }
    return { result: parser(stdout) };
}

async function status(service) {
    service = service_name(service);
    const args = [service];
    let command = 'sudo systemctl status \'!?!\'';
    return await exec(command, args)
}

async function start(service) {
    service = service_name(service);
    const args = [service];
    let command = 'sudo systemctl start \'!?!\'';
    return await exec(command, args)
}

async function stop(service) {
    service = service_name(service);
    const args = [service];
    let command = 'sudo systemctl stop \'!?!\'';
    return await exec(command, args)
}

async function restart(service) {
    service = service_name(service);
    const args = [service];
    let command = 'sudo systemctl restart \'!?!\'';
    return await exec(command, args)
}

async function enable(service) {
    service = service_name(service);
    const args = [service];
    let command = 'sudo systemctl enable \'!?!\'';
    return await exec(command, args)
}

async function disable(service) {
    service = service_name(service);
    const args = [service];
    let command = 'sudo systemctl disable \'!?!\'';
    return await exec(command, args)
}

async function exec(command, args, callback) {
    let stdout = null;
    let err = null;

    try {
        const { shellCommand, success } = await execute(command, args, 0);
        if (success === true)
            stdout = shellCommand.stdout;
        else
            err = shellCommand.error
    } catch (ex) {
        err = ex
    }

    return { error: err, stdout: stdout  };
}

function service_name(service) {
    service = (service || "").trim();
    if (!service.includes('.service')) {
        return `${service}.service`;
    }

    return service;
}

function parser(stdout) {
    if (stdout.includes('"systemd" is not running')) {
        return [];
    }

    let data = [];
    let lines = stdout.trim().split('\n');
    for (const line of lines) {
        let str = line.replace(/  +/g, ' ')
        let arr = str.split(" ")

        let name = (arr[0] || "");
        let load_state = (arr[1] || "");
        let active_state = (arr[2] || "");
        let sub_state = (arr[3] || "");
        let description = arr.slice(4).join(" ");

        if (name) {
            const service = {
                name,
                description,
                load_state,
                active_state,
                sub_state
            };

            data.push(service)
        }
    }

    return data
}

exports.list = list;
exports.status = status;
exports.start = start;
exports.stop = stop;
exports.restart = restart;
exports.enable = enable;
exports.disable = disable;