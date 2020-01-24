import React, { useState, useEffect } from 'react';
import { NavLink, Progress } from 'reactstrap';

const StatusBar = props => {
  return (
    <div className='statusBar'>
      {props.user ? (
        <div>
          <ul className='list-unstyled'>
            <li className='list-inline-item' href='#'>
              <NavLink href={`/my-profile`}>
                <i
                  style={{
                    color: props.user.alliance.name,
                    fontSize: '30px'
                  }}
                  class='fab fa-redhat'
                ></i>
              </NavLink>
            </li>
            <li className='list-inline-item' href='#'>
              <NavLink href={`/my-profile`}>{props.user.name}</NavLink>
            </li>

            <li className='list-inline-item' href='#'>
              <span style={{ color: 'red' }}>&#9829;</span>
              {(
                (props.user.playerStats.currentFirewall /
                  props.user.playerStats.maxFirewall) *
                100
              ).toFixed(0)}
              %
            </li>
            <li className='list-inline-item ml-2' href='#'>
              <span>&#9889;{props.user.playerStats.battery}%</span>
            </li>
            <li className='list-inline-item ml-2' href='#'>
              <span style={{ color: '#F08F18' }}>&#8383;</span>

              {Math.floor(props.user.playerStats.bitCoins)}
            </li>
            <li className='list-inline-item ml-2' href='#'>
              {props.user.playerStats.rankName}
            </li>
            <li className='list-inline-item ml-2' href='#'>
              XP:{/*  {props.user.playerStats.exp} */}
            </li>
            <li className='list-inline-item navProgressBar'>
              <Progress
                color='warning'
                value={
                  (props.user.playerStats.exp /
                    props.user.playerStats.expToLevel) *
                  100
                }
              />
            </li>
          </ul>
        </div>
      ) : (
        <p>loading..</p>
      )}
    </div>
  );
};
export default StatusBar;
