let mm = 2.83465;
const BitlyClient = require('bitly').BitlyClient;
const config = require('../config.json');
const bitly = new BitlyClient(config.bitly);

async function render(input) {
    let usage;
    if (input["free_to_use"] == "hack") {
        usage = "FREE TO HACK";
    } else if (input["free_to_use"]) {
        usage = "FREE TO USE";
    } else {
        usage = "Do Not Use! Ask owner!"
    }

    let qr_code;
    if (input["link"]) {
        const response = await bitly.shorten(input['link']);
        qr_code = {
            qr: response.link,
            fit: 11 * mm,
            margin: [2 * mm, 0, 0, 0],
        };
    } else {
        qr_code = {
            text: '',
            width: 0
        };
    }

    let dd = {
        pageSize: {
            width: 57 * mm,
            height: 32 * mm,
        },
        pageMargins: 0,
        content:
            [{
                columns: [
                    {
                        stack: [
                            { image: 'mumalab_logo.png', width: 10 * mm, margin: [2.5 * mm, 0.5 * mm, 2.5 * mm, 2 * mm] },
                            qr_code,
                        ],
                        width: "auto"
                    },
                    {
                        stack: [{ text: "Owner: " + input["owner"], height: "auto" },
                        { text: input["notes"], style: "notes", height: 12 * mm },
                        ], margin: [0, 2 * mm, 0, 0]
                    }

                ]
            }, { text: usage, absolutePosition: { x: 15 * mm, y: 27.5 * mm } }],
        styles: {
            notes: {
                italics: true,
                color: "gray",
            },
        },
        defaultStyle: {
            font: 'Helvetica',
            fontSize: 10
        },
        footer: "Free to use",
        header: "Ask owner"
    };

    return dd;
}

module.exports.render = render;
