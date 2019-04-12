___
# Acast RSS assesment

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
___


# Issues

* In order to calculate checksum, one would need to (probably?) download the file and calculate the checksum, for example with md5, locally. This would mean, that for a given RSS, with around 200 files, 1:00:00 long each, with weight around 60MB, would result in downloading around 11GB for one API request. I assumed that would be too much, and not the right thing to do at the moment. Instead of mp3 checksum I took the episodeID to calculate the checksum out of. In order to do it properly for the media file, the file would need to be downloaded first.

* The ID3 media tags retrieval may take some time
___

# What could be improved

* Extended express routing, with proper routing on /rss | /id3, that would be stored in configuration file, which would then be easier to maintain, and expand

* Export data retrieval into another files and the export their functions and import them in general server.js file. As server should only have server-related functions and code, while functionalities should be placed outside.

* More tests on retrieved data could be performed.

* More detailed messages could be send to user in case of API errros.