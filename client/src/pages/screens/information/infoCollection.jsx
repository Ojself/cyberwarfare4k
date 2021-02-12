import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";

export default {
  "Alliance Forum": {
    title: "Alliance Forum",
    text: "Alliance forum which is only available for you and your comrades",
  },

  Attacks: {
    title: "Attacks",
    text: (
      <>
        If you need to get someone out of the way for good, then attacking is
        your best option. The equipped weapon of both you and your opponent will
        determine the hit/miss chance.
        <br />
        <br />
        <strong>Effectiveness</strong>:
        <br />
        <span className="text-primary">CPU </span> is effective versus{" "}
        <span className="text-primary">AntiVirus</span>.{" "}
        <span className="text-primary">AntiVirus </span>
        is effective versus <span className="text-primary">Encryption</span>.
        And <span className="text-primary">Encryption</span> is efective versus{" "}
        <span className="text-primary">CPU</span>.
        <br />
        <br />
        Damage = (Weapon Skill * effectiveness / 100) + (rank level * 1.5)
        <br />
        EG: (130 * 1.5 / 100) + (7 * 1.5) = <strong>34,5</strong> damage
        <br />
        <br /> An attack, successful or not, will grace the player for 60 or 5
        minutes depending on their online status. If you manage to bring a
        hacker down to 0 or less <span className="text-danger">Firewall</span>,
        the hacker is shutdown and is forced to start over. You will get
        whatever crypto currency the player was carrying at the time of a
        shutdown.
      </>
    ),
  },
  Chessathor: {
    title: "Chessathor",
    text:
      "Play through the Chessathor game and insert the code (included the #) in the player name input to get a battery bonus. You can do this once every day. The code is case sensitive!",
  },
  Create: {
    title: "Create",
    text: "Form an alliance, if you have the bitcoins for it",
  },
  "Crime Skills": {
    title: "Crime Skills",
    text: (
      <>
        There are 4 Crime Skills:{" "}
        <span className="text-success"> Technical</span>,
        <span className="text-success"> Forensics</span>,
        <span className="text-success"> Social Engineering</span> and
        <span className="text-success"> Cryptography</span>. These skills can be
        gained by doing petty crimes, normal crimes or upgrading them with your
        stat points. The more Crime Skills you have, the more chance of success
        you have for commiting crimes and frauding other hackers!
      </>
    ),
  },
  Crimes: {
    title: "Crimes",
    text: (
      <>
        A list of availble crimes for you to commit. Your success is based upon
        your <span className="text-success">Crime Skills</span>. Your reward for
        success will be bitcoins and experience
      </>
    ),
  },
  Crimes2: {
    title: "Crimes",
    text:
      "All sorts of crimes will give you both experience and bitcoins (or stash). The higher your Crime Skills, the more successful you are, which results in more bitcoins and experience.",
  },
  "Crypto Currency": {
    title: "Crypto Currency",
    text: (
      <>
        Arguably the best way to get rich fast. The rules are simple, buy low
        and sell high. Be careful, though, as your name will show as most recent
        buyer after purchasing. Prices changes every hour (except at night) and
        is the same for every city.
        <br />
        <br />
        All crypto currencies held by a hacker that are shutdown will be
        transfered to the attacker.
      </>
    ),
  },
  Dashboard: {
    title: "Dashboard",
    text:
      "The dashboard shows you and your alliance members aditional information about the alliance you're in. The Boss can do aditional settings in the dashboard",
  },
  "Data Centers": {
    title: "Data Centers",
    text: (
      <>
        There are 5 data centers in each city throughout the world of
        cyberhackerwarfare4000. Upon purchase, you will receive a small income
        every minute. Be sure to keep them healthy by healing them if they get
        attacked.
        <br />
        When attacking a data center, be sure to have the right stash in your
        inventory. The damage you inflict is calculated from your overall{" "}
        <span className="text-success">Crime Skills</span> and your currently
        equipped weapon
      </>
    ),
  },
  "Earn Battery": {
    title: (
      <>
        <span role="img" aria-label="battery">
          &#9889;
        </span>
        Earn Battery
      </>
    ),
    text:
      "A variety of options for you to support CyberhackerWarfare4000 and/or earn some battery",
  },
  Espionage: {
    title: "Espionage",
    text:
      "The espionage is your personal intelligence center. You buy spies and send them to whomever. If the money you spend is more than what the opponent has in their vault, you will be notified with precious information. If it's less however, their vault will be lowered with the amount you spent, and they will be notified that you tried to spy on them.",
  },
  "Equip Weapon": {
    title: "Equip Weapon",
    text: (
      <>
        Chose the right weapon for your task! When going into a fight with
        another hacker, your weapon of choice might decide the outcome.
        <br />
        <br />
        CPU is effective vs. AntiVirus
        <br />
        AntiVirus is effective vs. Encryption
        <br />
        Encryption is effective vs. CPU
      </>
    ),
  },
  Experience: {
    title: "Experience",
    text: (
      <>
        You gain <span className="text-warning">experience</span> by doing
        various crimes. The more experience you get, the higher the rank of your
        hacker will be. With every new rank, you get 5 stat points you can spend
        in your profile page.
      </>
    ),
  },
  Fence: {
    title: "Fence",
    text:
      "Gimmie the loot! The fence is always looking to buy your stolen stash.  The prices varies from each hour and city. Also, the local alliance might take a fee for selling your items in their city!",
  },
  Firewall: {
    title: "Firewall",
    text: (
      <>
        The <span className="text-danger">firewall</span> stat point represents
        your overall HP. You start off with 100HP, but this can be upgraded with
        statpoints or in the market place. Your firewall might go down when
        attacked by others. But you can repair yourself in the Service &
        Support.
      </>
    ),
  },
  Frauds: {
    title: "Frauds",
    text: (
      <>
        Why earn your own bitcoins when you can steal from others? Use your
        Crime Skills and dig deep into the pockets of your enemies! Make sure to
        protect yourself from other thiefs and secure your bitcoins in your
        ledger. A fraud will lead to a 5 minute grace period for your target.{" "}
        <br /> <br /> The success of a fraud is based upon the total of the
        attackers <span className="text-success">Crime Skill</span>.
      </>
    ),
  },

  Funeral: {
    title: "Funeral",
    text: <>Visit the funeral and pay your respect!</>,
  },

  Github: {
    title: "Github",
    text: (
      <>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Ojself/cyberwarfare4k"
        >
          CyberhackerWarfare4000
        </a>
        is an open source project and can be found on Github. You will receive
        an hourly battery bonus by entering your Github username in the
        "earn-battery" page and giving the project a star on Github
      </>
    ),
  },

  "Grace period": {
    title: "Grace period",
    text:
      "When someone is attacked, a grace will protect the hacker for a certain time. A fraud will result in a 5 minute grace, while attack will be 5 or 60 minutes grace depending on the online status.",
  },
  "Hack players": {
    title: "Hack players",
    text:
      "Takes you to the local hackers in your city. You can commit attacks on their profile. Make sure to have the right weapon equipped, as it will give you advantage when going into combat!",
  },
  "Hack Skills": {
    title: "Hack Skills",
    text: (
      <>
        There are 3 hack Skills:<span className="text-primary"> CPU</span>,
        <span className="text-primary"> AntiVirus</span> and
        <span className="text-primary"> Encryption</span>. These skills
        determines your hit/miss chance when going into battle with an opponent
        hacker.
        <br />
        <br />
        <strong>
          CPU is effective versus AntiVirus, AntiVirus is effective versus
          Encryption and Encryption is effective versus CPU.
        </strong>
        <br />
        <br />
        Make sure to have the right equipped weapon when going into battle - or
        when suspecting an incoming attack. You can buy components in the market
        place if you have the bitcoins
      </>
    ),
  },
  "Information & FAQ": {
    title: "Information & FAQ",
    text: "You are here right now!",
  },
  Ledger: {
    title: "Ledger",
    text:
      "You can safely store your bitcoins in your ledger. Here it will be safe from being robbed. You can also transfer bitcoins to other users for a small fee.",
  },
  "Local Hackers": {
    title: "Local Hackers",
    text: (
      <>
        An overview of the local hackers in your current city. The icon{" "}
        <FontAwesomeIcon className="text-warning" icon={faWifi} /> will indicate
        if they are online.
      </>
    ),
  },
  Marketplace: {
    title: "Marketplace",
    text: (
      <>
        Boost your system by buying some aditional components. You can only hold
        one of each category. <br /> <br />
        Remember: CPU, AntiVirus and Encrpytion will strengthen your{" "}
        <span className="text-primary">Hack Skills</span>. While{" "}
        <span className="text-danger">Firewall</span> will boost your max HP.
      </>
    ),
  },
  Megarpg: {
    title: "Megarpg",
    text:
      "Join the megarpg and type in the code to get a battery bonus. You can do this once every day. The code is case sensitive!",
  },
  Messages: {
    title: "Messages",
    text: "Send messages to other hackers.",
  },
  "My Profile": {
    title: "My Profile",
    text: "Everything you need to know about yourself is there.",
  },
  Notifications: {
    title: "Notifications",
    text: (
      <>
        Whenever you are notified with an event, it will pop up here. The
        sections are divided into <strong>General</strong>,{" "}
        <strong> Organized Crime</strong>, <strong> Spy Report</strong> and{" "}
        <strong>Logs</strong>.
      </>
    ),
  },
  "Organized Crimes": {
    title: "Organized Crimes",
    text:
      "Commit crimes with your fellow alliance members. Make sure to fill up all the positions in order to get the maximum loot. Upon success, you will be notified with the result.",
  },

  Patreon: {
    title: "",
    text: (
      <>
        Support the project at{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={
            "https://www.patreon.com/cyberhackerwarfare4000?fan_landing=true"
          }
        >
          {" "}
          Patreon
        </a>{" "}
        and you will recieve an hourly battery bonus and a huge thank you for
        supporting open source. The money will go to new features and upkeeping
        the servers.
      </>
    ),
  },
  Petty: {
    title: "Petty",
    text: (
      <>
        The easiest and cheapest way to commit crimes. This one is recommended
        for the new players starting out. You can gain experience, bitcoins and
        skills by doing petty crimes. Your success is based upon your total{" "}
        <span className="text-success"> Crime Skills</span>.
      </>
    ),
  },
  "Public Forum": {
    title: "Public Forum",
    text: "A beta forum is in place for you to communicate to the world!",
  },

  Safe: {
    title: "Safe",
    text:
      "Every alliance have their own safe which is accessible by the Boss, Analyst and CTO. When loot is being sold at the fence, a percentage of your profit will go to the alliance safe that owns the city (if any).",
  },

  "Service & Support": {
    title: "Service & Support",
    text:
      "Service & Support is your personal self care area. Here you can heal up, hire body guards or even rebuild your character. The prices will raise every time you purchase one of these services.",
  },
  "Top Alliances": {
    title: "Top Alliances",
    text: "An overview of the active alliances and their claimed cities.",
  },

  "Token Store": {
    title: (
      <>
        <span role="img" aria-label="battery">
          &#9889;
        </span>
        Token Store
      </>
    ),
    text: (
      <>
        Tokens are a virtual currency that allows you to purchase bonus items in
        the game like extra battery.
        <br />
        <br />
        After purchasing tokens with either Vipps or Stripe, you can buy various
        items in the Token Store by clicking "Redeem Tokens" below the item you
        would like to obtain.
      </>
    ),
  },

  "Top Hackers": {
    title: "Top Hackers",
    text:
      "There is a great reward for anyone who shuts down a hacker with a bounty on their head. Be careful, though. Placing a bounty on someone will attract attention to yourself",
  },
  Vault: {
    title: "Vault",
    text: (
      <>
        Vault is only accessible and used in your Espioanage center and is used
        to buy spy services. The Vault has two functions:
        <br />
        <br />
        1: Defend yourself from other spies
        <br />
        2. Assign spies to carry out espionage on enemies.
        <br />
        <br />
        If you purchase a spy for 100k and the enemy has 150k in their vault,
        your spy will fail and your enemy will be notified about your mischief.
      </>
    ),
  },
  VPN: {
    title: "VPN",
    text: (
      <>
        Change your VPN status between several cities. Each city has their own
        prices and datacenters. You can only hack others within the same city.
        <br />
        <br />
        Our VPN services are affiliated by Nord VPN. You can support
        CyberhackerWarfare4000 by signing up using our{" "}
        <a
          href="https://go.nordvpn.net/aff_c?offer_id=15&aff_id=50381&url_id=902"
          rel="noopener noreferrer"
          target="_blank"
        >
          reference
        </a>
        .
      </>
    ),
  },

  "Wanted Hackers": {
    title: "Wanted Hackers",
    text:
      "There is a great reward for anyone who shuts down a hacker with a bounty on their head. Be careful, though. Placing a bounty on someone will attract attention to yourself.",
  },
};
