import { defineModel } from "@vis-three/tdcm";
import {
  AnimationClipConfig,
  getAnimationClipConfig,
} from "../AnimationClipConfig";
import {
  AnimationClip,
  BooleanKeyframeTrack,
  ColorKeyframeTrack,
  KeyframeTrack,
  NumberKeyframeTrack,
  QuaternionKeyframeTrack,
  StringKeyframeTrack,
  VectorKeyframeTrack,
} from "three";

export default defineModel<
  AnimationClipConfig,
  AnimationClip,
  {},
  {
    parseName: (name: string) => string;
  }
>({
  type: "AnimationClip",
  config: getAnimationClipConfig,
  shared: {
    parseName(name: string) {
      const list = name.split(".");
      if (list.length < 2) {
        return name;
      }

      return (
        list.slice(0, 2).join(".") +
        list
          .slice(2, list.length)
          .map((str) => `[${str}]`)
          .join("")
      );
    },
  },
  commands: {},
  create({ model, config, engine }) {
    const keyframeTracks: Array<KeyframeTrack> = [];

    for (const track of config.tracks) {
      const name = model.parseName(track.name);

      if (track.type === "Boolean") {
        keyframeTracks.push(
          new BooleanKeyframeTrack(name, track.times, track.values),
        );
      } else if (track.type === "Color") {
        keyframeTracks.push(
          new ColorKeyframeTrack(
            name,
            track.times,
            track.values,
            track.interpolation,
          ),
        );
      } else if (track.type === "Number") {
        keyframeTracks.push(
          new NumberKeyframeTrack(
            name,
            track.times,
            track.values,
            track.interpolation,
          ),
        );
      } else if (track.type === "Quaternion") {
        keyframeTracks.push(
          new QuaternionKeyframeTrack(
            name,
            track.times,
            track.values,
            track.interpolation,
          ),
        );
      } else if (track.type === "String") {
        keyframeTracks.push(
          new StringKeyframeTrack(name, track.times, track.values),
        );
      } else if (track.type === "Vector") {
        keyframeTracks.push(
          new VectorKeyframeTrack(
            name,
            track.times,
            track.values,
            track.interpolation,
          ),
        );
      }
    }

    return new AnimationClip(
      "",
      config.duration,
      keyframeTracks,
      config.blendMode,
    );
  },
  dispose({ target }) {},
});
