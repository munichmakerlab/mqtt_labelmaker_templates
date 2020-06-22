let mm = 2.83465;
const BitlyClient = require('bitly').BitlyClient;
const config = require('../config.json');
const bitly = new BitlyClient(config.bitly);

async function render(input) {
    var name = input['name'];
    var type = input['type'];
    var specs = input['specs'];
    var link = null;
    if (input['link']) {
        const response = await bitly.shorten(input['link']);
        link = response.link;
    }

    var qr_size = 12 * mm;
    var qr_margin = 2 * mm;

    var qr_code_1;
    var qr_code_2;

    if (link) {
        qr_code_1 = {
            qr: link,
            fit: qr_size,
            width: 'auto',
            margin: qr_margin,
        };

        qr_code_2 = {
            qr: link,
            fit: qr_size,
            width: 'auto',
            margin: qr_margin,
        };
    } else {
        qr_code_1 = {
            text: '',
            width: 0
        };
        qr_code_2 = {
            text: '',
            width: 0
        };
    }

    var label1 = {
        columns: [
            {
                stack: [
                    {
                        text: name,
                        style: 'componentname'
                    },
                    {
                        text: type,
                        style: 'type'
                    },
                    {
                        text: specs,
                        style: 'specs'
                    }
                ],
                width: '*',
                margin: 2 * mm
            },
            qr_code_1
        ]
    };
    var label2 = {
        columns: [
            {
                stack: [
                    {
                        text: name,
                        style: 'componentname'
                    },
                    {
                        text: type,
                        style: 'type'
                    },
                    {
                        text: specs,
                        style: 'specs'
                    }
                ],
                width: '*',
                margin: 2 * mm
            },
            qr_code_2
        ]
    };
    var separator = {
        canvas: [{
            type: 'line',
            x1: 0, y1: 0,
            x2: 57 * mm, y2: 0,
            lineWidth: 0.1
        }]
    };

    var dd = {
        pageSize: {
            width: 57 * mm,
            height: 32 * mm,
        },
        pageMargins: 0,
        content: [label1, separator, label2],
        styles: {
            componentname: {
                bold: true,
                fontSize: 12
            },
            type: {
                italics: true,
                fontSize: 10
            },
            specs: {
                fontSize: 10
            }
        },
        defaultStyle: {
            font: 'Helvetica'
        }
    };

    return dd;
}

module.exports.render = render;