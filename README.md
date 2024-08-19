# Battle City

*Created by:* <strong>8-Bit Alchemists</strong>

View the deployed game [here](https://battlecity-5c42a227b130.herokuapp.com/).

---

## User Experience


### User Stories

As a player I want to:
- Read instructions on how to play the game.
- See my tank interacting in the game environment.
- Control my tanks movements using arrow keys.
- Rotate my tank when changing directions.
- Fire bullets so I can defeat my opponent.
- See my score displayed on the screen so I can track my progress.
- See my how many lives I have remaining.
- Exit the gameplay (/to read instructions).
- Mute the sounds in case I am in a public space.


As the game owner I want to:
- Create a game that is fun & nostalgic.
- Provide a fully responsive game.
- Create simple navigation.
- Clear prompts using visuals & 8 bit sound effects.
- Have a sound icon so users can mute & unmute sounds.

---

## Project Management

### Agile
- An Agile approach has been applied in the creation and planning of this game.
- Github projects was used to manage the project's development cycles.
- GitHub projects was used to track user stories and implement them based on priority.
- GiHub projects was used to manage the team working sprints at each stage of development.
- Find the link to the kanban board [here](https://github.com/users/Dima-Bulavenko/projects/7/views/1).


---


## Features

### Gameplay

The player controls a tank that can move in four directions—up, down, left, and right—and fire bullets to destroy enemy tanks and obstacles. The battlefield is a mix of destructible and indestructible obstacles, such as brick walls, which can be destroyed by shooting, and steel walls, which are indestructible. These obstacles serve as both cover and potential hazards; while they can be used to hide from enemy tanks, destroying them could leave the player vulnerable to attacks.
The player starts with 3 lives, losing one each time their tank is hit by an enemy. As the player successfully destroys enemy tanks, more enemy tanks appear, escalating the challenge. The game requires not only precise shooting but also strategic use of the environment to survive.
To win, the player must eliminate all enemy tanks while keeping their remaining lives intact. Victory is achieved when all waves of enemy tanks are destroyed. If the player loses all lives, the game ends, forcing them to start over and refine their strategy for another attempt.

---

## Design


### Colour Scheme

The following colours were generated from the [Battle City Spritsheet](assets/battle_city_spritesheet.png) using [Coolors](https://coolors.co/). We chose a selection of neutral, muted and strong colours. They accent the gaming environment with an array of contrasts available.

![Battle City Neutral Colour Palette](docs/design/battle_city_neutral.png)
![Battle City Muted Colour Palette](docs/design/battle_city_muted.png)
![Battle City Strong Colour Palette](docs/design/battle_city_strong.png)


### Typography

![Battle City Font](docs/fonts/battle_city_font.PNG)
The [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P?preview.text=Welcome%20to%20Battle%20City&query=Press+Start+2P) font adds to the pixelated theme of the game. It adds some fun, and evokes a feeling of nostalgia. It is illustrative, yet has a structural integrity and readability to it. The user can get a clear sense of the design from this font.


### Flowchart

![Game Layout](/docs/battle_city_game_layout_visual.png)

---

## Testing

Please see [TESTING.md](TESTING.md) for a comprehensive list of tests performed.

---

## Technologies Used


### Languages

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) was used to create the page structure.
- [CSS](https://developer.mozilla.org/en-US/docs/Web/css) was used to create the layout and add styles.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) was used to add interactivity to the game & page.


### Frameworks, Libraries & Programs

- [Chat GPT](https://chat.openai.com/) - for general consultation when troubleshooting.
- [Google Chrome Developer Tools](https://developer.chrome.com/docs/devtools/overview/) - For testing.
- [GitHub](https://github.com/) - To store associated files & developments of the website.
- [Gitpod](https://www.gitpod.io/) - IDE used.
- [Phaser](https://phaser.io/) - To create game.
- [Tiled](https://www.mapeditor.org/) - Map editor used.
- [VS Code](https://code.visualstudio.com/) - IDE used.
- [Sweetalert2](https://sweetalert2.github.io/#download) - Create alerts for the exit game


---

## Deployment

### Deployment to Github

The site was deployed early using Github Pages. The is how the live site was deployed:

  1. Log in (or sign up) to Github.
  2. Find the repository for this project, [Dima-Bulavenko / BattleCity](https://github.com/Dima-Bulavenko/BattleCity).
  3. Click on the Settings link.
  4. Click on the Pages link in the left hand side navigation bar.
  5. In the Source section, choose main from the drop down select branch menu. Select Root from the drop down select folder menu.
  6. Click Save. Your live Github Pages site is now deployed at the URL shown.

### Deployment to Heroku

  The site was deployed using Heroku. The is how the live site was deployed:

  1. Log in (or sign up) to Heroku.
  2. Go to the user dashboard & click "Create new app". Keep in mind that each app name on Heroku has to be unique.
  3. Select the region & click "Create app".
  4. Go to the settings tab & scroll to the "Config vars" section.
  5. Click "Reveal Config Vars".
  6. Create a Config Var, input the required hidden variables.
  7. Scroll to the "Buildpacks" section.
  8. Click "Add buildpacks". Select "Python" and "nodejs", and in that order.
  9. Go to the “Deploy” tab.
  10. Scroll to the “Deployment Method” section.
  11. Click on “Connect to Github”. Search for the repository name & click "Connect".
  12. Scroll to the "Manual Deploys" section.
  13. Click "Deploy Branch". A message will show up to say "Your app was usccessfully deployed. The "View" button will take you to your deployed link.

Find the live deployed site with Heroku [here](https://battlecity-5c42a227b130.herokuapp.com/).

### Local Development

  #### How to Fork

  To fork the Hobby repository:

  1. Log in (or sign up) to Github.
  2. Go to the repository for this project, [Dima-Bulavenko / BattleCity](https://github.com/Dima-Bulavenko/BattleCity).
  3. Click the Fork button in the top right corner. This action will create a copy of the repository under your GitHub account.


  #### How to Clone

  To clone the Hobby repository:

  1. Log in (or sign up) to GitHub.
  2. Go to the repository for this project, [Dima-Bulavenko / BattleCity](https://github.com/Dima-Bulavenko/BattleCity).
  3. Click on the code button, select whether you would like to clone with HTTPS, SSH or GitHub CLI and copy the link shown.
  4. Open the terminal in your code editor and change the current working directory to the location you want to use for the cloned directory.
  5. Type 'git clone' into the terminal and then paste the link you copied in step 3. Press enter.

The live link can be found [here](https://dima-bulavenko.github.io/BattleCity/).


---

## Credits

This game was inspired by the original Battle City by Namco (now Bandai Namco) in 1985 for the Nintendo Entertainment System (NES) and other platforms.

### Media

* [Coolors](https://coolors.co/) to create colour palettes.
* [Favicon](https://favicon.io/) for favicon generation.
* [Flaticon](https://favicon.io/) for favicon image.
* [Freesound](https://freesound.org/) for sounds.
* [Google Fonts](https://fonts.google.com/) to extract fonts for the website.
* [Online Audio Converter](https://online-audio-converter.com/) was used to change the audio file types.
* [Pixabay](https://pixabay.com/sound-effects/search/retro%20games/) for retro background music.

### Code

- [Sprite collision implementation](https://stackoverflow.com/questions/56729650/phaser3-detecting-sprite-collision)

### Collaborators

[Berat Zorlu](https://github.com/beratzorlu)<br>
[Dănuț Grigore](https://github.com/Danut89)<br>
[Dima Bulavenko](https://github.com/Dima-Bulavenko)<br>
[Hope Tracy Njoroge](https://github.com/Njorogetracy)<br>
[Kate McGuane](https://github.com/KateMcGuane)<br>
[Nonty Dazana](https://github.com/NontyD)

### Acknowledgemnets

We would like to thank Code Institute for hosting Pixel Pioneers.
