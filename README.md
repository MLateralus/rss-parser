___
# RSS-parser

* The code is structured as per simple Node app.
- Tests are done in Mocha, in test/test.js
- node_modules are excluded by gitignore, as well as config.json
- The repo contains default LICENSE and Readme.md


* Standalone node server that handle API calls on two endpoints:
- http://localhost:3000/rss?url=<RSS_URL>
- http://localhost:3000/id3?url=<MP3_URL>

The first one takes a RSS url, fetches the result, parses, and returns the result in JSON format as follows:

[
 { title: 'Episode 1 - abc', checksum: 123, url: 'xyz' },
 { title: 'Episode 2 - abc', checksum: 234, url: 'qwe' }
]

Second one takes an URL of mp3 file and retrieves ID3 tags for the file, in the format:
{
    type: "ID3",
    version: "2.3.0",
    major: 3,
    revision: 0,
    flags: {
        unsynchronisation: false,
        extended_header: false,
        experimental_indicator: false,
        footer_present: false
    },
    size: 294,
    tags: {
        title: "55. Säger B verkligen B?",
        artist: "Acast",
        TIT2: {
            id: "TIT2",
            size: 51,
            description: "Title/songname/content description",
            data: "55. Säger B verkligen B?"
        },
        TPE1: {
            id: "TPE1",
            size: 13,
            description: "Lead performer(s)/Soloist(s)",
            data: "Acast"
        }
    }
}