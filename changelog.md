# Changelog

All notable changes to CyberhackerWarfare4000 will be documented in this file.

## In Development

- More alliance options
- Funeral layout
- API tests

## [0.3.7] - 2021-03-21

- Add: Authentication for redeem route
- Organized crime are notified in navbar
- OC can be carried out by anyone in the alliance if every position is filled out

## [0.3.6] - 2021-03-19

- Bug fix: bounty is now given to player when opponent is shutdown
- Remove decimals from top alliance ladder
- Bug fix: Shutdown stats are now counted for when shutting down players
- Bug fix: Pasting from clipboard works by clicking the icon rather than double clicking input field
- Wording fix: Naming of analyst -> Analyst
- Add: Trying to claim more than one crime will result in a scroll-to-top to see the error message
- Add: Supporter emoji for hacker profile

## [0.3.5] - 2021-03-18

- Price adjustments for organized crime. 10 -> 15
- OC ui changes, better overview of battey cost
- Crypto currency purchase cost 2 battery
- Crimes cost more battery, 3 -> 4
- Easier to copy/paste values. Clicking amount in ledger, statusbar and cryptocurrency will copy. double clicking input will paste

## [0.3.4] - 2021-03-17

- Add copy bitcoins when clicking it in status bar
- Add cronjob for lowering price of bg every midnight
- Add clearing of global message when multilpe messages appears

## [0.3.3] - 2021-03-16

- Add delete button for forum posts

## [0.3.2] - 2021-03-12

- Fix prices for marketplace
- Add city name in attack logs
- Add unread status for forum and alliance forum posts

## [0.3.1] - 2021-03-11

- Currencies are now calculated in the Ladder
- Small UI fix in hall of fame

## [0.3.0] - 2021-03-11

- Round reset
- Added possibility for new forum post detection
- Added newbie protection for fresh players (4 days)
- Remove xp gain when attacking players
- Updated npm packages and audit issues
- Add hall of fame for previous round

## [0.2.6] - 2021-02-24

- Bug fix: Marketplace exploit. It will now substract the values correctly when purchasing new item (Thanks community for pointing it out!)
- Minor grammer issues

## [0.2.5] - 2021-02-14

- Bug fix: Messages are now visible and glowing red on mobile
- Bug fix: Data centers heal (insufficent funds) is fixed
- Bug fix: Wrong naming of users being shutdown in terminal feedback
- UI: Messagecenter now looks slighly better in phone view

## [0.2.4] - 2021-02-12

- Added Prizes in navbar
- Bug fix: Reset of stat points does not reset rank name (to avoid double gifting stat poitns)
- Bug fix: Local Hackers did not match with the city user was in.
- Minor ui fix in funeral
- Small adjustment to crypto currency. The span between min- and max price are now slightly smaller
- Attacks from datacenters are now calculated from Equipped weapon and overall crime skills
- More information in Datacenter FAQ
- Crypto currency is now open at night!

## [0.2.3] - 2021-02-12

- Bug fix: Login feedback fix
- Tax fee overview in fence
- Alliance can now set taxes in their claimed city
- Bug fix: Required stash for attacking DC is now removed from inventory when attacking
- Default "Never show again" in Tutorial (?) are set to false
- Change order of funeral members
- Sort local users by name (and not by arrival time)
- Communication navbar icon now glows red when there's unread notifications
- Minor grammar mistakes

## [0.2.2] - 2021-02-10

- Hotfix of ledger bug where users could deposit, withdraw and transfer negative numbers

## [0.2.1] - 2021-02-06

- Fix bug where you couldn't send messages to other hackers through profile page
- Minor UI fixes for more responsive design
- Add Feedback when insufficent battery in petty crimes
- Add placement position in Top Hackers page
- Fix bug where you couldn't attack Datacenters
- Fix bug where you could upgrade your stats too much
- Change text for earn battery cards
- Add missing text for required battery for attacking other hackers
- Lower required battery for petty hacks from 2 -> 1
- Lower required battery for crimes from 5 -> 3
- Add delay for updating results in statusbar when attacking or hacking
- Add feedback message for doing crimes when on mobile
- Cleaned up Top Hackers site to lower response time

## [0.2.0] - 2021-02-04

- More mobile friendly view
- Styled navbar with icons
- Sorted items in Fence
- Sorted Datacenters by price
- NordVPN affiliation
- Change timezone to Europe/Oslo
- Add Espionage feature
- Changed combat system to a rock - paper - scissor system
- New signup login form
- Crypto currency doesn't change at night
- NPC have data centers
- Digital clock
- Tabs in notification
- Organized Crimes
- Alliances can claim cities
- Alliance can set fee for the local fence
- Alliances have a safe
- Taxes upon fence for alliances
- Token store page
- Terms of sale page
- FAQ and Information have more information
- Players start with the lowest firewall item
- A notification is now issued when a bounty is placed for first time
- Reset statpoints feature
- Prototype payment options

## [0.1.6] - 2020-12-20

- Change combat calculation to benefit players with more experience. See FAQ for more information

- Small GUI changes

## [0.1.5] - 2020-12-19

- Added Christmas event
- Fix wrong notifications when attacking other players
- If a user have more than 5 minute in graceperiod and logs on, it get's set to 5 minutes.

## [0.1.4] - 2020-12-18

- Datacenter heal price is now visible in the profile (prototype)
- Bug fix where personal datacenters were not visible when player changed VPN
- Critical bug fix where you could buy negative amount of crypto currency
- Minor gui fixes

## [0.1.3] - 2020-12-17

- Change repair cost do be more dynamic
- Alliances bosses can now organize their own members
- Fix bug where earning battery bonuses rounds down to 100
- User now gets feedback when creating an alliance
- Fix bug where players don't "die" when firewall is brought down to 0

## [0.1.2] - 2020-12-16

- Change battery price for changing VPN. 4 -> 3
- Change price of changing VPN (random between 1000-5000)
- Change exp gain of crimes. It's now less random and pays out slightly more

## [0.1.1] - 2020-12-16

- Fix bug where users gets the perks of leveling up without actually leveling up
- Set max Battery to 200 for subscribers
- Fix formatting of numbers in crypto charts

## [0.1.0] - 2020-12-14

- FAQ section
- Encryption stat is removed temporarily
- Add very beta forum to alliances and one global
- Alliance dashboard
- Earn battery codes auto generates once every day (so you don't lose hours between each generation)
- All ladders (top lists) includes crypto currency in total wealth
- Alliance invite function
- Data centers visible in profile and alliance dashboard
- Bodyguards visible in profile page
- Max ownage of one crypto currency is now 20% (from 25%)
- Bodyguards now has "two lifes" before dying
- Price adjustments for healing
- Navbar logo color change
- Max bodyguards is 3
- Hall of fame page
- Price adjustments for stash
- Statusbar now shows real firewall (HP) instead of calculating it to percentage
- Minor price adjustments for crypto currency
- Your alive bodyguards can be seen in profile page
- Small ui changes to notification page
- Small penalty for attacking lower level users (damage dealt gets lowered)
- This changelog
