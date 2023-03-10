import React, { memo } from "react";
import { useDispatch } from 'react-redux';

import { TopRankingWrapper } from "./style";
import { getSizeImage } from "@/utils/format-utils";
import { getSongDetailAction } from '@/pages/player/store';

export default memo(function HYTopRanking(props) {
  const { info } = props;
  const { tracks = [] } = info;

  const dispatch = useDispatch();
  
  const playMusic = (item) => {
    dispatch(getSongDetailAction(item.id));
  }

  return (
    <TopRankingWrapper>
      <div className="header">
        <div className="image">
          <img src={getSizeImage(info.coverImgUrl)} alt="" />
          <a href="/todo" className="image_cover">
            ranking
          </a>
        </div>
        <div className="info">
          <a href="/todo" className="">
            {info.name}
          </a>
          <div>
            <button className="btn play sprite_02"></button>
            <button className="btn favor sprite_02"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item, index) => {
          return (
            <div key={item.id} className="list-item">
              <div className="rank">{index + 1}</div>
              <div className="info">
                <span className="name text-nowrap">{item.name}</span>
                <div className="operate">
                  <button
                    className="btn sprite_02 play"
                    onClick={(e) => playMusic(item)}
                  ></button>
                  <button className="btn addto sprite_icon2"></button>
                  <button className="btn favor sprite_02"></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <a href="/tofo">查看全部 &gt;</a>
      </div>
    </TopRankingWrapper>
  );
});
