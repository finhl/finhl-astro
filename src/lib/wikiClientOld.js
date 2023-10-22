import * as cheerio from 'cheerio';

export async function getWikiData() {

const response = await fetch('https://fi.wikipedia.org/wiki/Luettelo_NHL:ss%C3%A4_pelanneista_suomalaisista');
// Convert the response into text
const body = await response.text();    
// Load body data
const $ = cheerio.load(body);
let data = [];
$(".wikitable tbody tr").each((i,row) => {
    // Skip first row
    if (i === 0) {
        return;
    }
    const nameLink = $(row).find("td:first-of-type a");
    const name = $(nameLink).text();
    const wikiLink = $(nameLink).attr("href");
    const isActive = $(nameLink).parent().is("b");


    const allTeams = $(row).find("td + td").text();
    // console.log(allTeams);
    // Add | between numbers and letters. Example: 1A -> 1|A
    const teamsWithPipe = allTeams.replace(/(\d)([A-Z])/g, '$1|$2');
    // console.log(teamsWithPipe);
    // Create array of teams
    const teamsArray = teamsWithPipe.split("|");
    // console.log(teamsArray);
   
    // For each team, find the last letter and add | after it
    // Example: 1A2B3C -> 1A|2B|3C
    const teams = teamsArray.map(team => {
        // remove "\n" from string
        team = team.replace(/\n/g, '');
        let isCurrent = false;
        const firstNumberInString = team.search(/\d/);
        const name = team.slice(0, firstNumberInString);
        const years = team.slice(firstNumberInString);
        const yearsArray = years.split(",");
        const trimmedYearsArray = yearsArray.map(year => year.trim());
        // If year contains dash between numbers, calculate all years between them
        const yearsWithDash = trimmedYearsArray.filter(year => year.includes("–"));
        const yearsWithoutDash = trimmedYearsArray.filter(year => !year.includes("–"));
        const yearsWithoutDashAsNumbers = yearsWithoutDash.map(year => Number(year));
        // console.log('yearsWithDash', yearsWithDash);
        // console.log('yearsWithoutDash', yearsWithoutDash);

        const yearsWithDashCalculated = yearsWithDash.map(year => {
            const yearsSplit = year.split("–");
            const years = yearsSplit.filter(year => year !== '');
            isCurrent = years.length === 1;
            const firstYear = Number(years[0]);
            // Create number from firstYear string
            
            // Use current Year as last year if there is only one year
            const lastYear = years.length > 1 ? Number(years[1]) : new Date().getFullYear();
            const yearsBetween = [];
            for (let i = firstYear; i <= lastYear; i++) {
                yearsBetween.push(i);
            }
            return yearsBetween;
        });

        // Flatten yearsWithDashCalculated array
        const flattenedYearsWithDashCalculated = [].concat.apply([], yearsWithDashCalculated);
        const allYears = yearsWithoutDashAsNumbers.concat(flattenedYearsWithDashCalculated);
        const allYearsSorted = allYears.sort((a, b) => a - b);
    
        return {
            name: name.trim(),
            years: trimmedYearsArray,
            allYears: allYearsSorted,
            isCurrent,
        };
        });
    // console.log(teamsWithPipe2);

    

    // const teams = [];

        // $(row).find("td + td a").each((i,elem) => {
        //     const name = $(elem).text();
        //     const isCurrent = $(elem).parent().is("b");
        //     teams.push({
        //         name,
        //         isCurrent,
        //     })
        // });

       data.push({
           name,
           teams,
           isActive,
           wikiLink,
       })
   })
//    console.log(JSON.stringify(data, null, 4));

// Add player position to data
const dataWithPlayerPositions = await Promise.all(data.map(async player => {
    const playerInfo = await getPlayerInfo(player.wikiLink);
    return {
        ...player,
        position: playerInfo.position,
        yearOfBirth: playerInfo.yearOfBirth,
    }
}
));

// console.log(JSON.stringify(dataWithPlayerPositions, null, 4));

// Get all players that do not have position
const playersWithoutPosition = dataWithPlayerPositions.filter(player => !player.position).map(player => { return { name: player.name, link: 'https://fi.wikipedia.org/' + player.wikiLink } });
// console.log(JSON.stringify(playersWithoutPosition, null, 4));

// console.log(playersWithoutPosition.length, ' playersWithoutPosition');

// Get all players that do not have yearOfBirth
const playersWithoutYearOfBirth = dataWithPlayerPositions.filter(player => !player.yearOfBirth).map(player => { return { name: player.name, link: 'https://fi.wikipedia.org/' + player.wikiLink } });
// console.log(JSON.stringify(playersWithoutYearOfBirth, null, 4));

// console.log(playersWithoutYearOfBirth.length, ' playersWithoutYearOfBirth');

// Check if there are players that have position but do not have yearOfBirth
const playersWithPositionButWithoutYearOfBirth = dataWithPlayerPositions.filter(player => player.position && !player.yearOfBirth).map(player => { return { name: player.name, link: 'https://fi.wikipedia.org/' + player.wikiLink } });
// console.log(JSON.stringify(playersWithPositionButWithoutYearOfBirth, null, 4));

// console.log(playersWithPositionButWithoutYearOfBirth.length, ' playersWithPositionButWithoutYearOfBirth');

// Check if there are players that have yearOfBirth but do not have position
const playersWithYearOfBirthButWithoutPosition = dataWithPlayerPositions.filter(player => !player.position && player.yearOfBirth).map(player => { return { name: player.name, link: 'https://fi.wikipedia.org/' + player.wikiLink } });
// console.log(JSON.stringify(playersWithYearOfBirthButWithoutPosition, null, 4));

// console.log(playersWithYearOfBirthButWithoutPosition.length, ' playersWithYearOfBirthButWithoutPosition');



// Create array of obejcts where every object contains player team and year
const playerTeamYear = [];
dataWithPlayerPositions.forEach(player => {
    player.teams.forEach(team => {
        team.allYears.forEach(year => {
            playerTeamYear.push({
                name: player.name,
                team: team.name,
                year,
                isCurrent: team.isCurrent,
            })
        })
    })
})
// console.log(JSON.stringify(playerTeamYear, null, 4));

const allUniqueTeams = new Set();
dataWithPlayerPositions.forEach(player => {
    player.teams.forEach(team => {
        allUniqueTeams.add(team.name);
    });
});

// console.log(allUniqueTeams);


const activePlayers = playerTeamYear.filter(player => player.isCurrent);
const activePlayersAndCurrentTeam = activePlayers.map(player => {
    return {
        name: player.name,
        team: player.team,
    }
}
);
// Remove duplicates
const activePlayersAndCurrentTeamUnique = activePlayersAndCurrentTeam.filter((player, index, self) =>
    index === self.findIndex((t) => (
        t.name === player.name && t.team === player.team
    ))
)

return dataWithPlayerPositions;
}

async function getPlayerInfo(wikiLink) {
    if (!wikiLink) {
        return {
            yearOfBirth: null,
            position: null,
        }
    }

    const response = await fetch('https://fi.wikipedia.org' + wikiLink);
	const body = await response.text();    
    const $ = await cheerio.load(body);
    const infobox = $("table.infobox");
    // Get content of second link in cell that comes after cell that has content "Syntynyt"
    const yearOfBirth = $(infobox).find("td:contains('Syntynyt')").next().find("a:nth-of-type(2)").text();

    // Get table cell that has content "Pelipaikka"
    let position = null;
    const pos = $(infobox).find("td:contains('Pelipaikka')").next().text();
    // return "h" if position contains "hyökkääjä", "p" if position contains "puolustaja", "mv" if position contains "maalivahti" and null in other cases
    if (pos.toLowerCase().includes("hyökkääjä")) {
        position = "h";
    } else if (pos.toLowerCase().includes("puolustaja")) {
        position = "p";
    } else if (pos.toLowerCase().includes("maalivahti")) {
        position = "m";
    }

    return {
        yearOfBirth,
        position,
    }
}