const systemctl = require('sysctlx');
const execute = require("linux-shell-command").execute;

function service_name(service) {
    service = (service || "").trim();
    if (!service.includes('.service')) {
        return `${service}.service`;
    }
    return service;
}

// TODO: execute in child process
function list_names(callback) {
    const args = [];
    const command = "sudo systemctl list-unit-files -alt service --no-legend --no-pager";
    let _callback = (err, { shellCommand, success }) => {
        if (err) {
            return callback(err);
        }

        if (success !== true) {
            return callback(shellCommand.error);
        }

        let result = shellCommand.stdout.trim().split('\n');
        let names = [];
        for (const item of result) {
            let name = item.split('.service')[0];
            if (name.includes('@')) {
                continue;
            }

            names.push(`${name}.service`)
        }

        return callback(null, names);
    };

    execute(command, args, 0, _callback);
}

// TODO: execute in child process
function list(services, callback) {
    const args = [];
    var command = `systemctl show ${(services || []).join(' ')} --no-pager -p Names,Description,LoadState,ActiveState,SubState,UnitFileState`;

    let parse = (stdout) => {
        let data = [];
        let result = stdout.trim().split('\n\n');
        for (const item of result) {
            let obj = item.trim().split('\n');
            let name = (obj[0] || "").split('=')[1];
            let description = (obj[1] || "").split('=')[1];
            let load_state = (obj[2] || "").split('=')[1];
            let active_state = (obj[3] || "").split('=')[1];
            let sub_state = (obj[4] || "").split('=')[1];
            let unit_file_state = (obj[5] || "").split('=')[1];

            if (name) {
                const service = {
                    name,
                    description,
                    load_state,
                    active_state,
                    sub_state,
                    unit_file_state
                };

                data.push(service)
            }
        }
        return data;
    }

    let _callback = (err, { shellCommand, success }) => {
        if (err) {
            return callback(err);
        }

        if (success !== true) {
            return callback(shellCommand.error);
        }

        let data = parse(shellCommand.stdout)

        return callback(null, data);
    };

    execute(command, args, 0, _callback);
}

function status(service, callback) {
    service = service_name(service);
    systemctl.status(service).then(function (status) {
        if (status) {
            return callback(null, status);
        } else {
            return callback(new Error(`unknown service [${service}]`));
        }
    }).catch(function (err) {
        return callback(err);
    });
}

function _status_(service, callback) {
    service = service_name(service);
    let command = 'sudo systemctl status \'!?!\'';
    const args = [service];
    run(command, args, callback)
}

function start(service, callback) {
    service = service_name(service);
    let command = 'sudo systemctl start \'!?!\'';
    const args = [service];
    run(command, args, callback)
}

function stop(service, callback) {
    service = service_name(service);
    let command = 'sudo systemctl stop \'!?!\'';
    const args = [service];
    run(command, args, callback)
}

function restart(service, callback) {
    service = service_name(service);
    let command = 'sudo systemctl restart \'!?!\'';
    const args = [service];
    run(command, args, callback)
}

function enable(service, callback) {
    service = service_name(service);
    let command = 'sudo systemctl enable \'!?!\'';
    const args = [service];
    run(command, args, callback)
}

function disable(service, callback) {
    service = service_name(service);
    let command = 'sudo systemctl disable \'!?!\'';
    const args = [service];
    run(command, args, callback)
}

function run(command, args, callback) {
    let _callback = (err, { shellCommand, success }) => {
        if (err) {
            return callback(err);
        }

        if (success !== true) {
            return callback(shellCommand.error);
        }

        return callback(null, shellCommand.stdout);
    };

    execute(command, args, 0, _callback);
}

exports.list_names = list_names;
exports.list = list;
exports.status = status;
exports.start = start;
exports.stop = stop;
exports.restart = restart;
exports.enable = enable;
exports.disable = disable;