import { asset, stickerAsset } from "../assets";
import { Icon } from "./UI";
import type { Sticker } from "../state/model";
import { demoServices } from "../services/demo";
export function MovieStage({
  progress = 0,
  playing = true,
  stickers = [],
  sceneId = "park",
  text = "",
  filming = false,
}: {
  progress?: number;
  playing?: boolean;
  stickers?: Sticker[];
  sceneId?: string;
  text?: string;
  filming?: boolean;
}) {
  const act = Math.min(3, Math.floor(progress * 4));
  const line = demoServices.storyboard(text)[act];
  return (
    <div className={"movie-stage " + (playing ? "is-playing" : "")}>
      <img
        className="stage-background"
        src={asset("stage")}
        alt="红色帷幕与木质舞台"
      />
      {sceneId !== "park" && (
        <div
          className="alternate-scenery"
          style={{ backgroundImage: `url(${asset(sceneId)})` }}
        />
      )}
      <span className="act-label">
        <Icon name="camera" tone="blue" />第 {act + 1} 幕
      </span>
      <div className="stage-actors">
        <img className={"actor boy act-" + act} src={asset("boy")} alt="男孩" />
        <img className={"actor cat act-" + act} src={asset("cat")} alt="小猫" />
        <img
          className={"actor kite act-" + act}
          src={asset("kite")}
          alt="红风筝"
        />
        {stickers
          .filter((s) => !["boy", "cat", "kite"].includes(s.assetId))
          .map((s, i) => (
            <img
              key={s.id}
              className="movie-sticker"
              style={{
                left: s.x * 80 + 10 + "%",
                top: s.y * 65 + 12 + "%",
                width: 8 * s.scale + "%",
                transform: `rotate(${s.rotation}deg)`,
                animationDelay: i * 0.15 + "s",
              }}
              src={stickerAsset(s.assetId)}
              alt="故事里放置的贴纸"
            />
          ))}
      </div>
      {filming && (
        <div className="ready-badges">
          {["男孩", "小猫", "红风筝"].map((s) => (
            <span key={s}>
              <Icon name="check" tone="green" />
              {s}
              <small>就绪</small>
            </span>
          ))}
        </div>
      )}
      {!filming && line && <p className="movie-caption">{line}</p>}
    </div>
  );
}
