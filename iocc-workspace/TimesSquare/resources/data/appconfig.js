var TimesSquare = TimesSquare || {};

TimesSquare.CONFIG = {
    'application': {
        'name': 'NetLine/Ops ++ TimesSquare',
        'urls': {
            'AMQUrlPrefix': 'http://127.0.0.1:8080/NetLine-1.0/amq'
        },

        'ajaxTimeout': 240000,
        'hornetQueue': {
            getHeadTimeout: 5000,
            pullSubscriptionsTimeout: 240000,
            normalTimeout: 44000,
            consumeNextTimeout: false,
            waitForNextDelay: 2000,
            waitForNextUpdateTimeout: 10000,
            maxWaitForUpdatesTimeout: 30000
        },

        'services': [
            {
                ns: 'Security',
                name: 'login',
                url: '/NetLine/Security/login',
                method: 'GET',
                paramsKind: {
                    user: 'QUERY',
                    password: 'QUERY'
                }
            },
            {
                ns: 'Security',
                name: 'logoff',
                url: '/NetLine/Security/logoff',
                method: 'GET'
            },
            {
                ns: 'Aircraft',
                name: 'findSelections',
                url: 'http://127.0.0.1:8080/NetLine-1.0/aircraft/findSelections',
                method: 'GET'
            },
            {
                ns: 'Oss',
                name: 'findLegs',
                url: 'http://127.0.0.1:8080/NetLine-1.0/oss/findLegs',
                method: 'POST'
            },
            {
                ns: 'Oss',
                name: 'getCurrentTime',
                url: 'http://127.0.0.1:8080/NetLine-1.0/oss/getCurrentTime',
                method: 'GET'
            },
            {
                ns: 'Oss',
                name: 'getAirportTimes',
                url: '/NetLine/oss/getAirportTimes/{key}',
                method: 'GET',
                paramsKind: {
                    key: 'URL'
                }
            },
            {
                ns: 'Oss',
                name: 'findAllCompactParameters',
                url: 'http://127.0.0.1:8080/NetLine-1.0/oss/findAllCompactParameters',
                method: 'GET'
            }
        ]
    },

    appLogo: 'resources/images/lsy-logo-transparent.png',

    'detailViewFieldSize': {
        smallField: 40,
        mediumField: 80,
        largeField: 120,
        margin: '0 6 6 0',
        labelStyle: {
            padding: '21px 0 0 0',
            verticalAlign: 'middle'
        },
        set: function(small, margin) {
            this.margin = margin.join(' ');
            this.smallField = small;
            this.mediumField = (2 * small);
            this.largeField = this.mediumField + this.smallField + margin[1] + margin[3];
        }
    }
};
