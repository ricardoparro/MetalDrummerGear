const fs = require('fs');

// Read the original file  
let content = fs.readFileSync('./api/drummers/index.js', 'utf8');

// Slugify function
function slugify(name) {
  return name.toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/[ö]/g, 'o')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Original Wikipedia URLs for attribution
const originalUrls = {
  'Lars Ulrich': 'https://upload.wikimedia.org/wikipedia/commons/7/79/Lars_Ulrich_by_Gage_Skidmore_%28cropped%29.jpg',
  'Joey Jordison': 'https://upload.wikimedia.org/wikipedia/commons/b/b4/JoeyJordison.jpg',
  'Gene Hoglan': 'https://upload.wikimedia.org/wikipedia/commons/6/60/Gene_Hoglan_-_Testament_%28cropped%29.jpg',
  'Dave Lombardo': 'https://upload.wikimedia.org/wikipedia/commons/d/df/Dave_Lombardo_8.5.14.jpeg',
  'Tomas Haake': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meshuggah_-_Rock_am_Ring_2023-44313.jpg',
  'George Kollias': 'https://upload.wikimedia.org/wikipedia/commons/e/e8/GK_10.jpg',
  'Eloy Casagrande': 'https://upload.wikimedia.org/wikipedia/commons/8/86/Sepultura_-_2023219214143_2023-08-07_Sepultura_-_Sven_-_1D_X_MK_II_-_0650_-_AK8I2527.jpg',
  'Ray Luzier': 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Ray_Luzier_of_Korn.jpg',
  'John Otto': 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Drummer_John_Otto_of_Limp_Bizkit_in_2006.jpg',
  'Jay Weinberg': 'https://upload.wikimedia.org/wikipedia/commons/4/46/Suicidal_Tendencies_Rockharz_2024_18.jpg',
  'Vinnie Paul': 'https://upload.wikimedia.org/wikipedia/commons/5/55/VinniePaul2008.JPG',
  'Charlie Benante': 'https://upload.wikimedia.org/wikipedia/commons/1/11/2017_Anthrax_-_Charlie_Benante_-_by_2eight_-_DSC1986_%28cropped%29.jpg',
  'Mike Portnoy': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Mike_Portnoy.jpg',
  'Danny Carey': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Danny_Carey_Hellfest_2019.jpg',
  'Mario Duplantier': 'https://upload.wikimedia.org/wikipedia/commons/8/83/2017_RiP_-_Gojira_-_Mario_Duplantier_-_by_2eight_-_8SC9168.jpg',
  'Brann Dailor': 'https://upload.wikimedia.org/wikipedia/commons/6/6b/20150612-054-Nova_Rock_2015-Mastodon-Brann_Dailor.jpg',
  'Chris Adler': 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Lamb_Of_God_-_Rock_am_Ring_2015-9876_%28cropped%29.jpg',
  'Matt Halpern': 'https://upload.wikimedia.org/wikipedia/commons/2/26/20151122_Eindhoven_Epic_Metal_Fest_Periphery_0116.jpg',
  'Inferno': 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Behemoth_Rockharz_2015_02.jpg',
  'Hellhammer': 'https://upload.wikimedia.org/wikipedia/commons/5/58/Mayhem_-_Jalometalli_2008_-_Hellhammer_01_crop.JPG',
  'Pete Sandoval': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Pete_Sandoval.jpg',
  'Art Cruz': 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Lamb_of_God_Full_Force_2019_01.jpg',
  'Arin Ilejay': 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Arin.1280.jpg',
  'Navene Koperweis': 'https://upload.wikimedia.org/wikipedia/commons/4/43/Navene_Koperweis.jpg',
  'Alex Bent': 'https://upload.wikimedia.org/wikipedia/commons/5/59/Trivium_%2836826824775%29_%28cropped%29.jpg',
  'Shannon Larkin': 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Godsmack_-_2019160161909_2019-06-09_Rock_am_Ring_-_0432_-_B70I1399.jpg',
  'Raymond Herrera': 'https://upload.wikimedia.org/wikipedia/commons/7/71/Fear_factory_010505_117.jpg',
  'Morgan Ågren': 'https://upload.wikimedia.org/wikipedia/commons/1/12/Morgan_Agren_04.jpg',
  'Igor Cavalera': 'https://upload.wikimedia.org/wikipedia/commons/b/b6/20170805_Wacken_Wacken_Open_Air_Max_%26_Iggor_Cavalera_Return_To_Roots_0093.jpg',
  'Bill Ward': 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Black_Sabbath_%281970%29_%28cropped%29.jpg',
  'Nick Augusto': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Trivium_2012.JPG',
  'Chris Turner': 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Oceans_Ate_Alaska_With_Full_Force_2018_10.jpg',
  'Matt Greiner': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/August_Burns_Red_%E2%80%93_Elbriot_2014_04.jpg',
  'Blake Richardson': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Between_the_Buried_and_Me_%40_Euroblast_2015_08.jpg',
  'Ben Koller': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Converge_%40_Roadburn_Festival_2018-04-19_002.jpg',
  'Flo Mounier': 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Cryptopsy_Party.San_Metal_Open_Air_2017_20.jpg',
  'Jason Bittner': 'https://upload.wikimedia.org/wikipedia/commons/7/74/Overkill_Party.San_Metal_Open_Air_2017_21.jpg',
  'Martin Lopez': 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Soen_%40_Euroblast_Festival_2018-10-06_030.jpg',
  'Travis Orbin': 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Darkest_Hour_%282%29.jpg',
  'Ryan Van Poederooyen': 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Devin_Townsend_Project_%E2%80%93_Wacken_Open_Air_2014_03.jpg',
  'Nicko McBrain': 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Nicko_McBrain_2.jpg',
  'Scott Travis': 'https://upload.wikimedia.org/wikipedia/commons/3/32/Scott_Travis2005.jpg',
  'Mikkey Dee': 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Mikkey_Dee_%28PK%29_%E2%80%93_Wacken_Open_Air_2015_02.jpg',
  'Derek Roddy': 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Derek_Roddy_2003_%28cropped%29.jpg',
  'Dirk Verbeuren': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Megadeth_-_Wacken_Open_Air_2023_01_%28cropped%29.jpg',
  'Frost': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Satyricon%2C_Tons_of_Rock%2C_Oslo_Norway_%2853845732674%29_%28cropped%29.jpg',
  'Gavin Harrison': 'https://upload.wikimedia.org/wikipedia/commons/4/49/Gavin_Harrison_Drum_Clinic_2011.jpg',
  'Abe Cunningham': 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Deftones_-_Rock_am_Ring_2016_-2016156214257_2016-06-04_Rock_am_Ring_-_Sven_-_1D_X_-_0105_-_DV3P9764_mod.jpg',
  'Richard Christy': 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Sal%2C_Leyla_%26_Richard_Christy_%284902556102%29.jpg',
  'Aquiles Priester': 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Aquiles_Priester_Cropped_-Aquiles_Priester_El_SALVADOR.jpg',
  'Paul Mazurkiewicz': 'https://upload.wikimedia.org/wikipedia/commons/b/b9/20160515_Gelsenkirchen_RockHard_Festival_Cannibal_Corpse_0037_%28cropped%29.jpg',
  'Mike Mangini': 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Mike_Mangini_at_Moscow_12_Jul_2011_%28cropped%29.jpg',
  'Matt Garstka': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Matt_Garstka_-_2014_NAMM_Show_%28cropped%29.jpg',
  'Daniel Erlandsson': 'https://upload.wikimedia.org/wikipedia/commons/f/f4/2023_Rock_im_Park_-_Arch_Enemy_-_Daniel_Erlandsson_-_by_2eight_-_ZSC4502.jpg',
  'Jaska Raatikainen': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Jaska_Raatikainen_-_Ilosaarirock_2009_%28cropped%29.jpg',
  'Hannes Grossmann': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Hannes_wiki2.jpg',
  'Daray': 'https://upload.wikimedia.org/wikipedia/commons/4/49/Dariusz_Brzozowski.jpg',
  'Jocke Wallgren': 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Amon_Amarth_%2827839859354%29.jpg',
  'Tim Yeung': 'https://upload.wikimedia.org/wikipedia/commons/7/79/DevineHerecy002_sharp.jpg',
  'Kevin Talley': 'https://upload.wikimedia.org/wikipedia/commons/a/ad/MiseryIndex_band1.jpg'
};

// Extract the drummers array
const match = content.match(/const drummers = (\[[\s\S]*?\]);/);
const drummers = eval(match[1]);

// Fix each drummer's image path based on their name
let changes = 0;
drummers.forEach(d => {
  const slug = slugify(d.name);
  const correctPath = `/images/drummers/${slug}.jpg`;
  const originalUrl = originalUrls[d.name];
  
  // Find and replace the image field for this drummer
  // Search for the drummer block by id and name
  const idPattern = `id: ${d.id},`;
  const namePattern = `name: '${d.name.replace(/'/g, "\\'")}',`;
  
  // Find the position of this drummer's block
  const idIndex = content.indexOf(idPattern);
  if (idIndex === -1) return;
  
  // Find the image line within 500 chars after the id
  const blockStart = idIndex;
  const blockEnd = Math.min(content.indexOf('  },', blockStart) + 4, content.length);
  const block = content.substring(blockStart, blockEnd);
  
  // Find and fix the image line in this block
  const imageMatch = block.match(/image: '([^']+)'/);
  if (imageMatch) {
    const currentPath = imageMatch[1];
    if (currentPath !== correctPath) {
      const newImageLine = `image: '${correctPath}'`; // No comment to avoid breaking
      const oldImageLine = `image: '${currentPath}'`;
      
      const newBlock = block.replace(oldImageLine, newImageLine);
      content = content.substring(0, blockStart) + newBlock + content.substring(blockEnd);
      
      console.log(`Fixed ${d.name}: ${currentPath} -> ${correctPath}`);
      changes++;
    }
  }
});

// Write the updated file
fs.writeFileSync('./api/drummers/index.js', content);
console.log(`\nTotal changes: ${changes}`);
console.log('File updated successfully!');
