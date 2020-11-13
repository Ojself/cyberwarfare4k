import React, { useState, useEffect } from "react";
// import api from "../../api";

const Information = () => {

  return (
    <div>
      <h1>INFORMATION</h1>

      <div>
        <p>
          <strong>HOME</strong>: Here you can find a general overview about your
          player stats etc.
        </p>

        <strong>STATS:</strong>

        <p>
          <span>FIREWALL</span>: Indicates your HP. If it reaches zero it will
          result in your death and a penalty will follow.
        </p>

        <p>
          <span>BATTERY</span>: Indicates your stamina. Battery of your computer
          will decrease as you perform actions. It will recharge 10%
          automatically every 20 minutes or by sending us a donation.
        </p>

        <p>
          <span>CPU</span>: Indicates your strength. The better your CPU-stat,
          the better you will perform in Crimes and hacking other players.
        </p>

        <p>
          <span>ANTIVIRUS SYSTEM (AVS)</span>: Indicates your defense. A good
          Firewall-stat will help you defend against enemy hackers.
        </p>

        <p>
          <span>ENCRYPTION</span>: Indicates your dodge. Dodging will help you
          to dodge and hitting enemy players or succeeding in Crime.
        </p>

        <p>
          <span>EXP</span>: indicates your experience. The more Crimes and
          Hacking you do, the more EXP you will get. For each milestone, you'll
          get a new Rank.
        </p>

        <p>
          <span>BITCOINS</span>: Indicates your wealth. You can use your
          Bitcoins to purchase items in the Marketplace. You can gain or lose
          them by hacking others.
        </p>

        <p>
          <span>CRIME SKILL</span>: Indicates your PvE skill. The higher the
          skill, the higher the chance of success in Crimes
        </p>

        <p>
          <strong>RANK</strong>: Indicates your level of experience as a hacker.
          This symbolize status more than anything else.
        </p>

        <p>
          <strong>CRIMES</strong>: Here you can conduct various kinds of crimes.
          If you succeed in your crime, you'll be granted some Bitcoins and EXP
          for the effort. The easiest ones are on top and the most difficult are
          at the bottom.
        </p>

        <p>
          <strong>HACK PLAYER</strong>: Here you can attack other players by
          hacking them. Every stat, except Crime Skill, will affect the outcome
          of the attack. If you succeed, you'll steal some of the opponents
          bitcoins, as well as lowering his Firewall. Regardless of the outcome,
          your battery will lower.
        </p>

        <p>
          <strong>EVENTS</strong>: Shows you the latest events that has happend
          to your character.
        </p>

        <p>
          <strong>WANTED LIST</strong>: In the Wanted List you can add bounty on
          other players head, as well as being able to see which player already
          having a bounty on his head. You can collect this by hacking them
          until their Firewall is 0.
        </p>

        <p>
          <strong>FORUM, GROUPKILL AND HIDEOUT</strong> are not deployed yet.
        </p>

        <p>
          <strong>MARKETPLACE</strong>: You can boost your character by buying
          new equipment for your computer. You can only hold one item from each
          group: CPU, AntiVirus, Firewall, Encryption.
        </p>

        <p>
          <strong>SYSTEM REPAIR</strong>: The system repair allows you to fix up
          your computer for a relatively small fee. Choose between a quick fix
          or a full repair.
        </p>

        <p>
          <strong>LADDER</strong>: The ladder offers a overview of the other
          players in the game. The best ones are usually on top.
        </p>

        <p>
          <strong>INFORMATION</strong>: You're here right now
        </p>

        <p>
          <strong>ARCADE</strong>: Enjoy yourself with some top-of-the-class
          games
        </p>

        <p>
          <strong>LOGOUT</strong>: No worries, it won't wipe your harddrive..
        </p>
      </div>

      <p>
        This game was made by three norgies that was seeking the nostaliga of
        text-based mmorpg.
      </p>

      <p>
        Thanks to Lukas, Vivian and Noellia for making the project come true.
      </p>
    </div>
  );
};

export default Information;
