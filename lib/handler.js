var YAML = require('yamljs');

exports.fileGen = {
    handler: function (req, res) {

        // Empty strings and other value sent over are not considered undefined
        // so set them as so to be caught by JSON.stringify
        var verbosity = req.payload.sysLogVerbosity || undefined,
            quiet = req.payload.sysLogQuiet,
            traceExceptions = req.payload.sysLogTraceAllExceptions,
            facility = req.payload.sysLogFacility || undefined,
            logPath = req.payload.sysLogPath || undefined,
            logAppend = req.payload.sysLogAppend,
            destination = req.payload.sysLogDestination,
            timestamp = req.payload.sysLogTimestamp,
            pidFilePath = req.payload.pidFilePath || undefined,
            processFork = req.payload.processManFork,
            port = req.payload.port || undefined,
            ip = req.payload.bindIp,
            maxConnections = req.payload.maxConnections || undefined,
            wireObjectCheck = req.payload.wireObjectCheck,
            httpEnabled = req.payload.http,
            enabledUDS = req.payload.enabledUDS,
            pathUDS = req.payload.pathUDS || undefined,
            ipv6Enabled = req.payload.ipv6,
            jsonp = req.payload.jsonp,
            restEnabled = req.payload.rest,
            sslOnPorts = req.payload.sslOnPorts
            sslMode = req.payload.sslMode,
            sslPemKey = req.payload.sslPemKey || undefined,
            sslPemKeyPwd = req.payload.sslPemKeyPwd || undefined,
            sslClusterFile = req.payload.sslClusterFile || undefined,
            sslClusterPwd = req.payload.sslClusterPwd || undefined,
            sslCaFile = req.payload.sslCaFile || undefined,
            sslCrlFile = req.payload.sslCrlFile || undefined,
            sslWeakCa = req.payload.sslWeakCa,
            sslInvalidCa = req.payload.sslInvalidCa,
            sslFipsMode = req.payload.sslFipsMode,
            keyFile = req.payload.keyFile || undefined,
            clusterAuthMode = req.payload.clusterAuthMode,
            auth = req.payload.auth,
            saslHostName = req.payload.saslHostName || undefined,
            saslServiceName = req.payload.saslServiceName || undefined,
            saslAuthdSocketPath = req.payload.saslAuthdSocketPath || undefined,
            javascriptEnabled = req.payload.javascriptEnabled,
            slowOpThresholdMs = req.payload.slowOpThresholdMs || undefined,
            mode = req.payload.opProfilingMode,
            dbPath = req.payload.dbPath,
            directoryPerDb = req.payload.directoryPerDb,
            indexBuildRetry = req.payload.indexBuildRetry,
            preAllocDataFiles = req.payload.preAllocDataFiles,
            nsSize = req.payload.nsSize || undefined,
            quotaEnforced = req.payload.quotaEnforced,
            maxFilesPerDb = req.payload.maxFilesPerDb || undefined,
            smallFiles = req.payload.smallFiles,
            syncPeriodSecs = req.payload.syncPeriodSecs || undefined,
            repairPath = req.payload.repairPath || undefined,
            journalEnabled = req.payload.journalEnabled,
            debugFlags = req.payload.debugFlags || undefined,
            commitIntervalMs = req.payload.commitIntervalMs || undefined,
            opLogSizeMB = req.payload.opLogSizeMB || undefined,
            replSetName = req.payload.replSetName || undefined,
            secondaryIndexPrefetch = req.payload.secondaryIndexPrefetch,
            clusterRole = req.payload.clusterRole,
            archiveMovedChunks = req.payload.archiveMovedChunks || undefined,
            auditLogDestination = req.payload.auditLogDestination,
            auditLogFormat = req.payload.auditLogFormat,
            auditLogPath = req.payload.auditLogPath || undefined,
            snmpSubagent = req.payload.snmpSubagent,
            snmpMaster = req.payload.snmpMaster,
            localPingThresholdMs = req.payload.localPingThresholdMs || undefined,
            shardAutoSplit = req.payload.shardAutoSplit,
            shardConfigDb = req.payload.shardConfigDb || undefined,
            shardChunkSize = req.payload.shardChunkSize || undefined,
            windowsServiceName = req.payload.windowsServiceName || undefined,
            windowsDisplayName = req.payload.windowsDisplayName || undefined,
            windowsServiceDescription = req.payload.windowsServiceDescription || undefined,
            windowsServiceUser = req.payload.windowsServiceUser || undefined,
            windowsServicePwd = req.payload.windowsServicePwd || undefined;

            var filename = req.payload.filename + '.' + req.payload.ext;

            var data = {};

            if (verbosity || quiet || traceExceptions || facility || logPath
                || logAppend || destination) {

                data.systemLog = {
                    verbosity: verbosity,
                    quiet: quiet,
                    traceAllExceptions: traceExceptions,
                    syslogFacility: facility,
                    path: logPath,
                    logAppend: logAppend,
                    destination: destination,
                    timeStampFormat: timestamp
                }
            };

            if (pidFilePath || processFork) {

                data.processManagement = {
                    pidFilePath: pidFilePath,
                    fork: processFork
                }
            };

            if (port || ip || maxConnections || wireObjectCheck || ipv6Enabled) {

                data.net = {
                    port: port,
                    bindIp: ip,
                    maxIncomingConnections: maxConnections,
                    wireObjectCheck: wireObjectCheck,
                    ipv6: ipv6Enabled
                }
            };

            if (httpEnabled || jsonp || restEnabled) {

                data.net.http = {
                    enabled: httpEnabled,
                    JSONPEnabled: jsonp,
                    RESTInterfaceEnabled: restEnabled
                }
            };

            if (enabledUDS || pathUDS) {

                data.net.unixDomainSocket = {
                    enabled: enabledUDS,
                    pathPrefix: pathUDS
                }
            };

            if (sslOnPorts || sslPemKey || sslPemKeyPwd || sslClusterFile || sslClusterPwd
                || sslCaFile || sslCrlFile || sslWeakCa || sslInvalidCa || sslFipsMode) {

                data.net.ssl = {
                    sslOnNormalPorts: sslOnPorts,
                    mode: sslMode,
                    PEMKeyFile: sslPemKey,
                    PEMKeyPassword: sslPemKeyPwd,
                    clusterFile: sslClusterFile,
                    clusterPassword: sslClusterPwd,
                    CAFile: sslCaFile,
                    CRLFile: sslCrlFile,
                    weakCertificateValidation: sslWeakCa,
                    allowInvalidCertificates: sslInvalidCa,
                    FIPSMode: sslFipsMode
                }
            };

            if (keyFile || clusterAuthMode || auth || javascriptEnabled) {

                data.security = {
                    keyFile: keyFile,
                    clusterAuthMode: clusterAuthMode,
                    authorization: auth,
                    javascriptEnabled: javascriptEnabled
                }
            };

            if (saslHostName || saslServiceName || saslAuthdSocketPath) {

                data.security.sasl = {
                    hostName: saslHostName,
                    serviceName: saslServiceName,
                    saslauthdSocketPath: saslAuthdSocketPath
                }
            };

            if (slowOpThresholdMs || (mode !== 'off')) {

                data.operationProfiling = {
                    slowOpThresholdMs: slowOpThresholdMs,
                    mode: mode
                }
            };

            if (dbPath || directoryPerDb || indexBuildRetry || preAllocDataFiles || nsSize
                || smallFiles || syncPeriodSecs || repairPath) {

                data.storage = {
                    dbPath: dbPath,
                    directoryPerDB: directoryPerDb,
                    indexBuildRetry: indexBuildRetry,
                    preallocDataFiles: preAllocDataFiles,
                    nsSize: nsSize,
                    smallFiles: smallFiles,
                    syncPeriodSecs: syncPeriodSecs,
                    repairPath: repairPath
                }
            };

            if (quotaEnforced || maxFilesPerDb) {

                data.storage.quota = {
                    enforced: quotaEnforced,
                    maxFilesPerDB: maxFilesPerDb
                }
            };

            if (journalEnabled || debugFlags || commitIntervalMs) {

                data.storage.journal = {
                    enabled: journalEnabled,
                    debugFlags: debugFlags,
                    commitIntervalMs: commitIntervalMs
                }
            };

            if (opLogSizeMB || replSetName) {

                data.replication = {
                    oplogSizeMB: opLogSizeMB,
                    replSetName: replSetName,
                    secondaryIndexPrefetch: secondaryIndexPrefetch
                }
            };

            if (clusterRole || archiveMovedChunks) {

                data.sharding = {
                    clusterRole: clusterRole,
                    archiveMovedChunks: archiveMovedChunks
                }
            };

            if (auditLogPath) {

                data.auditLog = {
                    destination: auditLogDestination,
                    format: auditLogFormat,
                    path: auditLogPath
                }
            };

            if (snmpSubagent || snmpMaster) {

                data.snmp = {
                    subagent: snmpSubagent,
                    master: snmpMaster
                }
            };

            if (localPingThresholdMs) {

                if (data['replication']) {
                    data.replication.localPingThresholdMs = localPingThresholdMs;
                }
                else {
                    data.replication = {
                        localPingThresholdMs: localPingThresholdMs
                    }
                }
            };

            if (shardAutoSplit || shardConfigDb || shardChunkSize) {

                if (data['sharding']) {
                    data.sharding.autoSplit = shardAutoSplit;
                    data.sharding.configDB =  shardConfigDb;
                    data.sharding.chunkSize = shardChunkSize;
                }
                else {
                    data.sharding = {
                        autoSplit: shardAutoSplit,
                        configDB: shardConfigDb,
                        chunkSize: shardChunkSize
                    }
                }
            };

            if (windowsServiceName || windowsDisplayName || windowsServiceDescription
                || windowsServiceUser || windowsServicePwd) {

                if (data['processManagement']) {
                    data.processManagement.windowsService = {
                        serviceName: windowsServiceName,
                        displayName: windowsDisplayName,
                        description: windowsServiceDescription,
                        serviceUser: windowsServiceUser,
                        servicePassword: windowsServicePwd
                    }
                }
                else {
                    data.processManagement = {
                        windowsService: {
                            serviceName: windowsServiceName,
                            displayName: windowsDisplayName,
                            description: windowsServiceDescription,
                            serviceUser: windowsServiceUser,
                            servicePassword: windowsServicePwd
                        }
                    }
                }
            };

            // JSON.stringify to catch undefined values
            // JSON.parse to allow YAML.stringify to handle it properly
            var jfile = JSON.stringify(data),
                jfileParsed = JSON.parse(jfile),
                file = YAML.stringify(jfileParsed, 4);

            res(file).type('text/plain').header('Content-Disposition', 'attachment; filename=' + filename);
    }
};
